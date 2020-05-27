import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
    Image,
    Dimensions,
    Platform, ActivityIndicator
} from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { db } from '../../config';
// import {db} from './src/config';

import * as firebase from 'firebase'
import {
    LineChart,
} from "react-native-chart-kit";

export default class WeightWeekly extends Component {

    constructor(props) {
        super(props);
        //state object which changes once we get the required manipulated data from firebase 
        this.state = {
            firebaseData : null ,
            isLoading: true,
            dataFound: true,
            loadagain: false,
            cstate: null,
            count: null,
            childcount: null,
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => '#ABA8CB',
                        strokeWidth: 2 // optional
                    },
                ]
            },
        }
    }

    graphToPlot = () => {
        var lab
        var dat
        var mean_obj = {}
        var plot = {}
        var date_array
        // console.log("cstate= ", c);
        for (var i in this.state.cstate) {
            console.log("initial= ", i);
            mean_obj[i] = this.state.cstate[i][1] / this.state.cstate[i][0];
        }
        // console.log("mean_obj= ",mean_obj);

        // find current date.
        // take 7 dates back from this date 
        var date_array = [];
        var labels = []
        for (var i = 1; i < 8; i++) {
            var today = new Date();
            today.setDate(today.getDate() - i);
            // console.log("inloop" ,today);

            date_array.push(today)
            // console.log("da= ",da);
        }
        // console.log("da= ",date_array);

        for (var i in date_array) {
            var year = date_array[i].getFullYear();

            var month = (date_array[i].getMonth() + 1)
            if (month < 10) {
                month = String(month);
                month = '0' + month;
            }
            // console.log("month=",month);

            var day = date_array[i].getDate()
            if (day < 10) {
                day = String(day);
                day = '0' + day;
            }

            var date = year + '-' + month + '-' + day;
            labels.push(date)
            // console.log("date for ",i,"th loop = ",date);
        }


        console.log("d= ", labels);
        // this code accordingly to get the 7 previous date and then use those dates as the keys and find the corresponding values of these dates in the mean_obj
        // if value for corresponding key is not there then set it to 0.
        // using keys and values set them as lables and data for data obj in linechart and then done for plotting.
        console.log("lables= ", labels);
        var data_to_plot
        for (var i in labels) {
            console.log("i= ", labels[i]);
            if (labels[i] in mean_obj) {
                plot[labels[i]] = mean_obj[labels[i]]
            }
            else {
                plot[labels[i]] = 0;
            }
        }

        console.log("plot= ", plot)
        data_to_plot = Object.values(plot)
        const dataClone = { ...this.state.data }
        dataClone.datasets[0].data = data_to_plot;
        dataClone.labels = labels;
        this.setState({
            isLoading: false,
            data: dataClone,
            dataFound: true,
        })
    }
    //function to generate the 7 past dates from current date and find the mean data corresponding to the dates.

    Oxygen = () => {
        console.log("inside bloodglucose");

        
        var email = this.props.email
        //promise to fetch data from firebase for particular person and then resolve it.


        // var fetchData = new Promise((resolve, reject) => {
            var c = {}
            var counting = 1
            console.log("fdata= ");
            firebase.database().ref('history-reading/' + email + '/weight').on("child_added", (snapshot) => {
                // console.log(snapshot.val())
                var arr = snapshot.val()
                console.log("arr= ");

                // var keys = Object.keys(arr);
                var val
                var timeFromDB = arr.time.split(" ")
                console.log(timeFromDB[0]);

                // var y = monthin[0];
                var x = Number(arr.reading);
                if (x != 0) {
                    if (timeFromDB[0] in c) {
                        val = c[timeFromDB[0]][0];
                        val = val + 1;
                        c[timeFromDB[0]][0] = val;
                        c[timeFromDB[0]][1] = c[timeFromDB[0]][1] + x;
                    }
                    else {
                        c[timeFromDB[0]] = [1, x];
                    }
                }

                this.setState({
                    cstate: c,
                    childcount: counting++,
                })
                if(this.state.cstate && this.state.childcount >= this.state.count){
                    this.graphToPlot()
                  }
            });
    }

    componentDidMount() {
        var existance = new Promise((resolve, reject) => {
            firebase.database().ref("history-reading/").on("value", snapshot => {
                // snapshot.forEach((data) => {
                    if (snapshot.val()[this.props.email] != undefined){
                        // console.log("inside if");  
                        // console.log("TEST CALLS",snapshot.val()[this.props.email])          
                        // firebase.database().ref("history-reading/"+this.props.email+"/").on("value", snapshot => {
                            // console.log("inside call two");
                            
                            var x=Object.keys(snapshot.val()[this.props.email]);
                            console.log("X = ",x);
                            for (let index = 0; index < x.length; index++) {
                                const element = x[index];
                                if(x[index]=='weight')
                                {
                                    // console.log("inside if for resolving");
                                    resolve(true)   
                                }                              
                            }       
                        // })
                    }else{
                        console.log("NOT FOUND")
                    }
                    // else
                // })
                reject(false)
            })
        })

        existance.then((data) => {
            var countdata = new Promise((resolve,reject) => {
                firebase.database().ref('history-reading/' + this.props.email + '/weight').on("value",snapshot => {
                  var arr = Object.keys(snapshot.val())
                  if(arr)
                  resolve(arr.length)
                  else
                  reject("No data found")
                })
              })
      
              countdata.then((num) => {
                this.setState({
                  count : num,
                })
                this.Oxygen()
            })    
        }).catch((err) => {
            console.log("data=", err);
            this.setState({
                dataFound: false,
                isLoading: false
            })
        })
    }
    
    render() {
        // var reCall=new Promise((resolve,reject)=>{
        //     firebase.database().ref('history-reading/' + this.props.email + '/bloodGlucose/').on("child_changed",(snapshot)=> {
        //         console.log("inside child changed")
        //         console.log(snapshot.val())
        //         if(snapshot.val()){
        //             resolve(true)
        //         }
        //         else{
        //             reject(false)
        //         }
        //         // this.BloodGlucose();
               
        //     })
        // })

        // reCall.then((data)=>{
        //     console.log("data = ",data);
            
        //     this.BloodGlucose()

        // }).catch((error)=>{

        // })

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            if (this.state.dataFound) {
                console.log("if");

                return (
                    <View>
                        <LineChart
                            data={this.state.data}
                            // width={Dimensions.get("window").width} // from react-native
                            width={wp('90%')}
                            height={hp('60%')}
                            verticalLabelRotation={80}
                            withVerticalLabels
                            chartConfig={{
                                backgroundColor: "#FFF",
                                backgroundGradientFrom: "#FFF",
                                backgroundGradientTo: "#FFF",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                labelColor: (opacity = 1) => `#694B64`,
                                style: {
                                    borderRadius: 16,
                                    borderColor: '#694B64',
                                    borderWidth: 2
                                },
                                propsForDots: {
                                    r: wp('1.5%'),
                                    strokeWidth: wp('0.3%'),
                                    stroke: "#694B64",

                                    // backgroundColor : '#694B64'
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: hp('3%'),
                                borderRadius: wp('7%'),
                                marginLeft: wp('2%'),
                                marginRight: wp('3%'),
                                borderWidth: 2,
                                borderColor: '#694B64',
                                elevation: 3,

                            }}
                        />
                    </View>
                );
            }
            else {
                console.log("else");
                return (
                    <View style={{ marginTop: wp('1%') }}>
                        <Text>No records found for user to plot</Text>
                    </View>
                )
            }
        }
    }
}