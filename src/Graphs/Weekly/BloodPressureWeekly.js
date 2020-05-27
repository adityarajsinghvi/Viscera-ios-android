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

export default class BloodGlucoseWeekly extends Component {

    constructor(props) {
        super(props);
        //state object which changes once we get the required manipulated data from firebase 
        this.state = {
            isLoading: true,
            firebaseData : null, 
            dataFound:true,
            loadagain: false,
            resolvable_arraystate : null,
            count: null,
            childcount: null,
            data: {
                labels: [],
                legend: ['Diastolic', 'systolic'],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => '#ABA8CB',
                        strokeWidth: 5 // optional
                    },
                    {
                        data: [],
                        color: (opacity = 1) => '#E99572',
                        strokeWidth: 2 // optional
                    }
                ]
            },
        }
    }

    graphToPlot = () => {
      var lab
      var dat
      if (this.state.resolvable_arraystate != "NO data found") {
        var mean_obj_distolic = {}
        var mean_obj_systolic = {}
        var plot_distolic = {}
        var plot_systolic = {}
        var date_array
        // console.log("c= ", c);
        for (var i in this.state.resolvable_arraystate[0]) {
            // console.log("initial= ", i);
            mean_obj_distolic[i] = this.state.resolvable_arraystate[0][i][1] / this.state.resolvable_arraystate[0][i][0];
        }

        for (var i in this.state.resolvable_arraystate[1]) {
            // console.log("initial= ", i);
            mean_obj_systolic[i] = this.state.resolvable_arraystate[1][i][1] / this.state.resolvable_arraystate[1][i][0];
        }
        console.log("mean_obj_dis= ", mean_obj_distolic);
        console.log("mean_obj_sys= ", mean_obj_systolic);


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

        //making labels array for the graph
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

        console.log("labels= ", labels);

        // this code accordingly to get the 7 previous date and then use those dates as the keys and find the corresponding values of these dates in the mean_obj
        // if value for corresponding key is not there then set it to 0.
        // using keys and values set them as lables and data for data obj in linechart and then done for plotting.
        // console.log("lables= ", labels);
        var data_to_plot_systolic;
        var data_to_plot_distolic;
        for (var i in labels) {
            // var g=String(labels[i])
            // console.log(labels[i]);

            // console.log("i= ", mean_obj_distolic[g]," labels= ",labels[i]);
            if (labels[i] in mean_obj_distolic) {
                // console.log("inside");

                plot_distolic[labels[i]] = mean_obj_distolic[labels[i]]
            }
            else {
                plot_distolic[labels[i]] = 0;
            }
        }

        for (var i in labels) {
            console.log("i= ", labels[i]);
            if (labels[i] in mean_obj_systolic) {
                plot_systolic[labels[i]] = mean_obj_systolic[labels[i]]
            }
            else {
                plot_systolic[labels[i]] = 0;
            }
        }

        console.log("plot= ", plot_distolic)
        console.log("plot_s =", plot_systolic)
        data_to_plot_distolic = Object.values(plot_distolic)
        data_to_plot_systolic = Object.values(plot_systolic)
        const dataClone = { ...this.state.data }
        dataClone.datasets[0].data = data_to_plot_distolic;
        dataClone.datasets[1].data = data_to_plot_systolic;
        dataClone.labels = labels;
        this.setState({
            isLoading: false,
            data: dataClone,
            dataFound: true,
        })
    }
    else {
        //if no data is found for user things to be performed here
    }
    }

    //function to generate the 7 past dates from current date and find the mean data corresponding to the dates.

    BloodPresssure = () => {
        var lab
        var dat
        var email = this.props.email
        //promise to fetch data from firebase for particular person and then resolve it.
        // var fetchData = new Promise((resolve, reject) => {
            var c = {}
            var diastolic_obj = {}
            var systolic_obj = {}
            var resolvable_array = []
            var counting = 1
            firebase.database().ref('history-reading/' + email + '/bloodPressure').on("child_added", function (snapshot) {
                // console.log(snapshot.val())
                var arr = snapshot.val()
                // var keys = Object.keys(arr);
                var val
                // console.log(keys.length)
                // this.setState({ firebaseData : arr })
                // for (var i = 0; i < keys.length; i++) {
                    // console.log("in loop")
                    // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
                        // var arr2 = this.state.firebaseData[keys[i]]
                        var timeFromDB = arr['time'].split(" ")
                        // console.log("time= ",timeFromDB[0]);

                        var diastolic = Number(arr['diastolic']);
                        var systolic = Number(arr['systolic']);

                        //if reading is not equal to zero, then check if given data is present in the object c
                        //if true, then increase the count with 1(to mantain how many times reading for particular date is there) and add the value corresponding to the timeFromDB[0]
                        if (diastolic != 0) {
                            if (timeFromDB[0] in diastolic_obj) {
                                val = diastolic_obj[timeFromDB[0]][0];
                                val = val + 1;
                                diastolic_obj[timeFromDB[0]][0] = val;
                                diastolic_obj[timeFromDB[0]][1] = diastolic_obj[timeFromDB[0]][1] + diastolic;
                            }
                            else {
                                diastolic_obj[timeFromDB[0]] = [1, diastolic];
                            }
                        }

                        if (systolic != 0) {
                            if (timeFromDB[0] in systolic_obj) {
                                val = systolic_obj[timeFromDB[0]][0];
                                val = val + 1;
                                systolic_obj[timeFromDB[0]][0] = val;
                                systolic_obj[timeFromDB[0]][1] = systolic_obj[timeFromDB[0]][1] + systolic;
                            }
                            else {
                                systolic_obj[timeFromDB[0]] = [1, systolic];
                            }
                        }

                    // });

                // }
                // console.log(c);
                // console.log("d_obj =",diastolic_obj);

                resolvable_array.push(diastolic_obj);
                resolvable_array.push(systolic_obj);
                // console.log("thisyear, prevyearashgdjsag",thisyear, prevyear);
                this.setState({
                    resolvable_arraystate: resolvable_array,
                    childcount: counting++,
                })
                console.log("this.state.childcount >= this.state.count",this.state.childcount,this.state.count)
                if(this.state.resolvable_arraystate && this.state.childcount >= this.state.count){
                    this.graphToPlot()
                }
                
            }.bind(this));
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
                                if(x[index]=='bloodPressure')
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
            firebase.database().ref('history-reading/' + this.props.email + '/bloodPressure').on("value",snapshot => {
              var arr = Object.keys(snapshot.val())
              if(arr)
              resolve(arr.length)
              else
              reject("No data found")
            })
          })
  
          countdata.then((num) => {
            console.log(num)
            this.setState({
              count : num,
            })
            this.BloodPresssure();
          })
        }).catch((data) => {
            console.log("data=", data);
            this.setState({
                dataFound: false,
                isLoading: false
            })
        })

    }
    render() {
        // var reCall=new Promise((resolve,reject)=>{
        //     firebase.database().ref('history-reading/' + this.props.email + '/bloodPressure/').on("child_changed",(snapshot)=> {
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
        //     this.BloodPressure()

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