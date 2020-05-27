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
    Platform,
    ActivityIndicator
} from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { db } from '../../config';
// import {db} from './src/config';

import * as firebase from 'firebase'
import {
    LineChart,
} from "react-native-chart-kit";

export default class BloodPressure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            firebaseData : null , 
            dataFound: true,
            loadagain: false,
            resolvable_arraystate : null,
            count: null,
            childcount: null,
            data: {
                labels: [],
                legend: ["Diastolic", "Systolic"],
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
      var lab_distolic
      var dat_diastolic
      var lab_systolic
      var dat_systolic
      var mean_obj = {}
            var last;
            var plot = {}

            for (var i in this.state.resolvable_arraystate[0]) {
                //console.log(i);
                mean_obj[i] = this.state.resolvable_arraystate[0][i][1] / this.state.resolvable_arraystate[0][i][0];
                last = i;
            }
            // console.log(mean_obj, last);
            last = Number(last)
            for (var i = 0; i < 10; i++) {
                if (String(last) in mean_obj) {
                    plot[last] = mean_obj[last]
                } else {
                    plot[last] = 0;
                }
                last = last - 1;
            }
            // console.log(plot)
            lab_distolic = Object.keys(plot),
                dat_diastolic = Object.values(plot)
            // console.log("lab=", lab);
            // console.log("dat=", dat);


            for (var i in this.state.resolvable_arraystate[1]) {
                //console.log(i);
                mean_obj[i] = this.state.resolvable_arraystate[1][i][1] / this.state.resolvable_arraystate[1][i][0];
                last = i;
            }
            // console.log(mean_obj, last);
            last = Number(last)
            for (var i = 0; i < 10; i++) {
                if (String(last) in mean_obj) {
                    plot[last] = mean_obj[last]
                } else {
                    plot[last] = 0;
                }
                last = last - 1;
            }
            // console.log(plot)
            lab_systolic = Object.keys(plot),
                dat_systolic = Object.values(plot)

            const dataClone = { ...this.state.data }
            dataClone.datasets[0].data = dat_diastolic;
            dataClone.datasets[1].data = dat_systolic;
            dataClone.labels = lab_distolic;
            this.setState({
                isLoading: false,
                data: dataClone,
                dataFound: true,
            })
    }

    BloodPressure = () => {
        
        // var fetchData = new Promise((resolve, reject) => {
            var diastolic_obj = {}
            var systolic_obj = {}
            var resolvable_array = []
            var counting = 1
            var email = this.props.email
            firebase.database().ref('history-reading/' + email +'/bloodPressure').on("child_added", function (snapshot) {
                console.log(snapshot.val())
                var arr = snapshot.val()
                // var keys = Object.keys(arr);
                var val
                // this.setState({ firebaseData : arr })
                // console.log(keys.length)
                // for (var i = 0; i < keys.length; i++) {
                    // console.log("in loop")
                    // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
                        // var arr2 = this.state.firebaseData[keys[i]]
                        var monthin = arr['time'].split('-')
                        var y = monthin[0];
                        var diastolic = Number(arr['diastolic']);
                        var systolic = Number(arr['systolic']);
                        // console.log('diastolic= ', diastolic);

                        if (diastolic != 0) {
                            if (y in diastolic_obj) {
                                val = diastolic_obj[y][0];
                                val = val + 1;
                                diastolic_obj[y][0] = val;
                                diastolic_obj[y][1] = diastolic_obj[y][1] + diastolic;
                            }
                            else {
                                diastolic_obj[y] = [1, diastolic];
                            }
                        }

                        if (systolic != 0) {
                            if (y in systolic_obj) {
                                val = systolic_obj[y][0];
                                val = val + 1;
                                systolic_obj[y][0] = val;
                                systolic_obj[y][1] = systolic_obj[y][1] + systolic;
                            }
                            else {
                                systolic_obj[y] = [1, diastolic];
                            }
                        }
                resolvable_array.push(diastolic_obj);
                resolvable_array.push(systolic_obj)
                // console.log(c);
                this.setState({
                  resolvable_arraystate: resolvable_array,
                  childcount: counting++,
              })
              console.log("this.state.childcount >= this.state.count",this.state.childcount,this.state.count)
              if(this.state.resolvable_arraystate && this.state.childcount >= this.state.count){
                this.graphToPlot()
              }
            }.bind(this));
        // })
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
            this.BloodPressure();
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
                            height={hp('40%')}
                            verticalLabelRotation={70}
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