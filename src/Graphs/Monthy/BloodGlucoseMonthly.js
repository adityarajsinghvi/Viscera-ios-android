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
import { db } from '../../../src/config';
// import {db} from './src/config';
import * as firebase from 'firebase'
import {
    LineChart,
} from "react-native-chart-kit";

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

export default class BloodGlucoseMonthly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            firebaseData : null ,
            dataFound: true,
            loadagain: false,
            thisyearstate : null,
            prevyearstate : null,
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


    tryfun = () => {
      console.log("ghdhd")
      var lab
        var dat
      var mean_obj = {}
            var mean_thisyear = {}
            var mean_prevyear = {}
            var plot = {};
            // console.log(thisyear, prevyear);
            for (var i in this.state.thisyearstate) {
                // console.log(i);
                mean_thisyear[i] = this.state.thisyearstate[i][1] / this.state.thisyearstate[i][0];
            }
            for (var i in this.state.prevyearstate) {
                // console.log(i);
                mean_prevyear[i] = this.state.prevyearstate[i][1] / this.state.prevyearstate[i][0];
            }
            // console.log(mean_thisyear, mean_prevyear);
            var today = new Date();
            var month = today.getMonth() + 1;
            var y = month;
            for (var i = 0; i < 12; i++) {
                if (month > 0) {
                    if (month in mean_thisyear) {
                        plot[month] = mean_thisyear[month];
                    }
                    else {
                        plot[month] = 0;
                    }
                }
                else {
                    var x = 12 + month;
                    // console.log(x);
                    if (x in mean_prevyear) {
                        plot[x] = mean_prevyear[x];
                    }
                    else {
                        plot[x] = 0;
                    }
                }
                month -= 1;
            }

            // console.log(plot);
            var q = Object.keys(plot);
            var w = Object.values(plot);
            for (var i = 0; i < y; i++) {
                var r = q[0];
                for (var j = 0; j < 11; ++j) {
                    q[j] = q[j + 1];
                }
                q[11] = r;
            }
            for (var i = 0; i < y; i++) {
                var r = w[0];
                for (var j = 0; j < 11; ++j) {
                    w[j] = w[j + 1];
                }
                w[11] = r;
            }
            console.log(q, w);
            var montharr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var arr = [];
            for (var i = 0; i < 12; i++) {
                arr[i] = montharr[q[i] - 1];
            }
            // console.log(arr);
            lab = arr;
            dat = w;

            const dataClone = { ...this.state.data }
            dataClone.datasets[0].data = dat;
            dataClone.labels = lab;
            console.log(dataClone)
            this.setState({
                isLoading: false,
                data: dataClone,
                dataFound: true,
            })
            console.log("this.state.isLoading",this.state.isLoading,this.state.dataFound)
    }

    BloodGlucose = () => {
        // var fetchData = new Promise((resolve, reject) => {
            var thisyear = {}
            var val
            var c = {}
            var prevyear = {}
            var counting = 1
            var email = this.props.email
            console.log("email= ",this.props.email);
            
           firebase.database().ref('history-reading/' + this.props.email + '/bloodGlucose').on("child_added", function (snapshot){
                console.log("snapshot.val()",snapshot.val())
                var arr = snapshot.val()
                // console.log("arr",arr.time)
                var today = new Date();
                var year = Number(today.getFullYear());
                var timesplit = arr['time'].split('-');
                var y = Number(timesplit[0]);
                var m = Number(timesplit[1]);
                var x = Number(arr.reading);
                console.log("x",x);
                if (x != 0) {
                  if (y in c) {
                      val = c[y][0];
                      val = val + 1;
                      c[y][0] = val;
                      c[y][1] = c[y][1] + x;
                  }
                  else {
                      c[y] = [1, x];
                  }
              }
              if (x != 0) {
                if (y == year) {
                    if (m in thisyear) {
                        val = thisyear[m][0];
                        val = val + 1;
                        thisyear[m][0] = val;
                        thisyear[m][1] = thisyear[m][1] + x;
                    }
                    else {
                        thisyear[m] = [1, x];
                    }
                }
              }
              if (x != 0) {
                  if (y == year - 1) {
                      if (m in prevyear) {
                          val = prevyear[m][0];
                          val = val + 1;
                          prevyear[m][0] = val;
                          prevyear[m][1] = prevyear[m][1] + x;
                      }
                      else {
                          prevyear[m] = [1, x];
                      }
                  }
              }
              console.log("thisyear, prevyearashgdjsag",thisyear, prevyear);
              this.setState({
                  thisyearstate: thisyear,
                  prevyearstate: prevyear,
                  childcount: counting++,
              })
              console.log("this.state.childcount >= this.state.count",this.state.childcount,this.state.count)
              if(this.state.thisyearstate && this.state.prevyearstate && this.state.childcount >= this.state.count){
                this.tryfun()
              }
            }.bind(this)
            );
            // if(this.state.thisyearstate && this.state.prevyearstate){
            //   this.tryfun()
            // }
            console.log("thisyear, prevyear",this.state.thisyearstate, this.state.prevyearstate);
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
                                if(x[index]=='bloodGlucose')
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
            firebase.database().ref('history-reading/'+this.props.email+'/bloodGlucose').on("value",snapshot => {
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
            this.BloodGlucose();
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

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>

            )
        }
        else {
          {console.log("tjasdhgsa",this.state.dataFound)}
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