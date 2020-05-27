// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     TouchableHighlight,
//     StyleSheet,
//     TextInput,
//     Alert,
//     Image,
//     Dimensions,
//     Platform,
//     ActivityIndicator
// } from 'react-native';

// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
// import { db } from '../../../src/config';
// import * as firebase from 'firebase'
// import {
//     LineChart,
// } from "react-native-chart-kit";

// import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

// export default class BloodPressureMonthly extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             firebaseData : null ,
//             firebaseData2 : null ,
//             dataFound: true,
//             data: {
//                 labels: [],
//                 legend: ['Diastolic', 'systolic'],
//                 datasets: [
//                     {
//                         data: [],
//                         color: (opacity = 1) => '#ABA8CB',
//                         strokeWidth: 2 // optional
//                     },
//                     {
//                         data: [],
//                         color: (opacity = 1) => '#E99572',
//                         strokeWidth: 2 // optional
//                     }
//                 ]
//             },
//         }
//     }

//     BloodPressure = () => {
//         var lab
//         var dat
//         var fetchDataDiastolic = new Promise((resolve, reject) => {
//             var thisyear = {}
//             var c = {}
//             var prevyear = {}
//             var email = this.props.email
//             firebase.database().ref('history-reading/' + email + '/bloodPressure').on("value", function (snapshot) {
//                 console.log(snapshot.val())
//                 var arr = snapshot.val()
//                 var keys = Object.keys(arr);
//                 var val
//                 this.setState({ firebaseData : arr })
//                 console.log(keys.length)
//                 for (var i = 0; i < keys.length; i++) {
//                     // console.log("in loop")
//                     // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
//                         var arr2 = this.state.firebaseData[keys[i]]
//                         var today = new Date();
//                         var year = Number(today.getFullYear());
//                         var timesplit = arr2['time'].split('-')
//                         var y = Number(timesplit[0]);
//                         var m = Number(timesplit[1]);

//                         // var x = Number(arr2['reading']);
//                         var diastolic = Number(arr2['diastolic']);
//                         // var systolic = Number(arr2['systolic']);
//                         // console.log('x= ', x);
//                         if (diastolic != 0) {
//                             if (y in c) {
//                                 val = c[y][0];
//                                 val = val + 1;
//                                 c[y][0] = val;
//                                 c[y][1] = c[y][1] + diastolic;
//                             }
//                             else {
//                                 c[y] = [1, diastolic];
//                             }
//                         }
//                         if (diastolic != 0) {
//                             if (y == year) {
//                                 if (m in thisyear) {
//                                     val = thisyear[m][0];
//                                     val = val + 1;
//                                     thisyear[m][0] = val;
//                                     thisyear[m][1] = thisyear[m][1] + diastolic;
//                                 }
//                                 else {
//                                     thisyear[m] = [1, diastolic];
//                                 }
//                             }
//                         }
//                         if (diastolic != 0) {
//                             if (y == year - 1) {
//                                 if (m in prevyear) {
//                                     val = prevyear[m][0];
//                                     val = val + 1;
//                                     prevyear[m][0] = val;
//                                     prevyear[m][1] = prevyear[m][1] + diastolic;
//                                 }
//                                 else {
//                                     prevyear[m] = [1, diastolic];
//                                 }
//                             }
//                         }
//                     // });
//                 }
//                 console.log(thisyear, prevyear);
//                 if (thisyear)
//                     resolve([thisyear, prevyear])
//                 else
//                     reject("NO data found")
//             }.bind(this));
//         })



//         var fetchDataSystolic = new Promise((resolve, reject) => {
//             var thisyear = {}
//             var c = {}
//             var prevyear = {}
//             var email = this.props.email
//             console.log(email);

//             firebase.database().ref('history-reading/' + email + '/bloodPressure').on("value", function (snapshot) {
//                 console.log(snapshot.val())
//                 var arr = snapshot.val()
//                 var keys = Object.keys(arr);
//                 var val
//                 this.setState({ firebaseData2 : arr })
//                 console.log(keys.length)
//                 for (var i = 0; i < keys.length; i++) {
//                     // console.log("in loop")
//                     // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
//                         var arr2 = this.state.firebaseData2[keys[i]]
//                         var today = new Date();
//                         var year = Number(today.getFullYear());
//                         var timesplit = arr2['time'].split('-')
//                         var y = Number(timesplit[0]);
//                         var m = Number(timesplit[1]);

//                         // var x = Number(arr2['reading']);
//                         // var diastolic = Number(arr2['diastolic']);
//                         var systolic = Number(arr2['systolic']);
//                         // console.log('x= ', x);
//                         if (systolic != 0) {
//                             if (y in c) {
//                                 val = c[y][0];
//                                 val = val + 1;
//                                 c[y][0] = val;
//                                 c[y][1] = c[y][1] + systolic;
//                             }
//                             else {
//                                 c[y] = [1, systolic];
//                             }
//                         }
//                         if (systolic != 0) {
//                             if (y == year) {
//                                 if (m in thisyear) {
//                                     val = thisyear[m][0];
//                                     val = val + 1;
//                                     thisyear[m][0] = val;
//                                     thisyear[m][1] = thisyear[m][1] + systolic;
//                                 }
//                                 else {
//                                     thisyear[m] = [1, systolic];
//                                 }
//                             }
//                         }
//                         if (systolic != 0) {
//                             if (y == year - 1) {
//                                 if (m in prevyear) {
//                                     val = prevyear[m][0];
//                                     val = val + 1;
//                                     prevyear[m][0] = val;
//                                     prevyear[m][1] = prevyear[m][1] + systolic;
//                                 }
//                                 else {
//                                     prevyear[m] = [1, systolic];
//                                 }
//                             }
//                         }
//                     // });
//                 }
//                 console.log(thisyear, prevyear);
//                 if (thisyear)
//                     resolve([thisyear, prevyear])
//                 else
//                     reject("NO data found")
//             }.bind(this));
//         })

//         fetchDataDiastolic.then(([thisyear, prevyear]) => {
//             var mean_obj = {}
//             var mean_thisyear = {}
//             var mean_prevyear = {}
//             var plot = {};
//             console.log(thisyear, prevyear);
//             for (var i in thisyear) {
//                 console.log(i);
//                 mean_thisyear[i] = thisyear[i][1] / thisyear[i][0];
//             }
//             for (var i in prevyear) {
//                 // console.log(i);
//                 mean_prevyear[i] = prevyear[i][1] / prevyear[i][0];
//             }
//             console.log(mean_thisyear, mean_prevyear);
//             var today = new Date();
//             var month = today.getMonth() + 1;
//             var y = month;
//             for (var i = 0; i < 12; i++) {
//                 if (month > 0) {
//                     if (month in mean_thisyear) {
//                         plot[month] = mean_thisyear[month];
//                     }
//                     else {
//                         plot[month] = 0;
//                     }
//                 }
//                 else {
//                     var x = 12 + month;
//                     // console.log(x);
//                     if (x in mean_prevyear) {
//                         plot[x] = mean_prevyear[x];
//                     }
//                     else {
//                         plot[x] = 0;
//                     }
//                 }
//                 month -= 1;
//             }

//             console.log(plot);
//             var q = Object.keys(plot);
//             var w = Object.values(plot);
//             for (var i = 0; i < y; i++) {
//                 var r = q[0];
//                 for (var j = 0; j < 11; ++j) {
//                     q[j] = q[j + 1];
//                 }
//                 q[11] = r;
//             }
//             for (var i = 0; i < y; i++) {
//                 var r = w[0];
//                 for (var j = 0; j < 11; ++j) {
//                     w[j] = w[j + 1];
//                 }
//                 w[11] = r;
//             }
//             console.log(q, w);
//             var montharr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
//             var arr = [];
//             for (var i = 0; i < 12; i++) {
//                 arr[i] = montharr[q[i] - 1];
//             }
//             console.log(arr);
//             lab = arr;
//             var dat_diastolic = w;

//             fetchDataSystolic.then(([thisyear, prevyear]) => {
//                 var mean_obj = {}
//                 var mean_thisyear = {}
//                 var mean_prevyear = {}
//                 var plot = {};
//                 console.log(thisyear, prevyear);
//                 for (var i in thisyear) {
//                     console.log(i);
//                     mean_thisyear[i] = thisyear[i][1] / thisyear[i][0];
//                 }
//                 for (var i in prevyear) {
//                     // console.log(i);
//                     mean_prevyear[i] = prevyear[i][1] / prevyear[i][0];
//                 }
//                 console.log(mean_thisyear, mean_prevyear);
//                 var today = new Date();
//                 var month = today.getMonth() + 1;
//                 var y = month;
//                 for (var i = 0; i < 12; i++) {
//                     if (month > 0) {
//                         if (month in mean_thisyear) {
//                             plot[month] = mean_thisyear[month];
//                         }
//                         else {
//                             plot[month] = 0;
//                         }
//                     }
//                     else {
//                         var x = 12 + month;
//                         // console.log(x);
//                         if (x in mean_prevyear) {
//                             plot[x] = mean_prevyear[x];
//                         }
//                         else {
//                             plot[x] = 0;
//                         }
//                     }
//                     month -= 1;
//                 }

//                 console.log(plot);
//                 var q = Object.keys(plot);
//                 var w = Object.values(plot);
//                 for (var i = 0; i < y; i++) {
//                     var r = q[0];
//                     for (var j = 0; j < 11; ++j) {
//                         q[j] = q[j + 1];
//                     }
//                     q[11] = r;
//                 }
//                 for (var i = 0; i < y; i++) {
//                     var r = w[0];
//                     for (var j = 0; j < 11; ++j) {
//                         w[j] = w[j + 1];
//                     }
//                     w[11] = r;
//                 }
//                 console.log(q, w);
//                 var montharr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
//                 var arr = [];
//                 for (var i = 0; i < 12; i++) {
//                     arr[i] = montharr[q[i] - 1];
//                 }
//                 console.log(arr);
//                 lab = arr;
//                 var dat_systolic = w;

//                 const dataClone = { ...this.state.data }
//                 dataClone.datasets[0].data = dat_diastolic;
//                 dataClone.datasets[1].data = dat_systolic;
//                 dataClone.labels = lab;
//                 this.setState({
//                     isLoading: false,
//                     data: dataClone,
//                 })
//             }).catch((err) => {
//                 console.log(err);
//             })
//         }).catch((err) => {
//             console.log(err);
//         })
//     }

//     componentDidMount() {
//         console.log("inside didmount");
//         var existance = new Promise((resolve, reject) => {
//             firebase.database().ref("history-reading/").on("value", snapshot => {
//                 snapshot.forEach((data) => {
//                     console.log(data.key,"data.key",this.props.email);
                    
//                     if (data.key == this.props.email)
//                         resolve(true)
//                 })
//                 reject(false)
//             })
//         })

//         existance.then((data) => {
//             this.BloodPressure();
//         }).catch((data) => {
//             console.log("data=", data);
//             this.setState({
//                 dataFound: false,
//                 isLoading: false
//             })
//         })
//     }


//     render() {
//         var reCall=new Promise((resolve,reject)=>{
//             firebase.database().ref('history-reading/' + this.props.email + '/bloodPressure/').on("child_changed",(snapshot)=> {
//                 console.log("inside child changed")
//                 console.log(snapshot.val())
//                 if(snapshot.val()){
//                     resolve(true)
//                 }
//                 else{
//                     reject(false)
//                 }
//                 // this.BloodGlucose();
               
//             })
//         })

//         reCall.then((data)=>{
//             console.log("data = ",data);
//             this.BloodPressure()

//         }).catch((error)=>{

//         })

//         if (this.state.isLoading) {
//             return (
//                 <View style={{ flex: 1, padding: 20 }}>
//                     <ActivityIndicator />
//                 </View>

//             )
//         }
//         else {
//             if (this.state.dataFound) {
//                 return (
//                     <View>
//                         {/* <Text>Mean(BloodGlucose) vs Month</Text> */}
//                         <LineChart
//                             data={this.state.data}
//                             // width={Dimensions.get("window").width} // from react-native
//                             width={wp('90%')}
//                             height={hp('40%')}
//                             verticalLabelRotation={80}
//                             withVerticalLabels
//                             chartConfig={{
//                                 backgroundColor: "#FFF",
//                                 backgroundGradientFrom: "#FFF",
//                                 backgroundGradientTo: "#FFF",
//                                 decimalPlaces: 2, // optional, defaults to 2dp
//                                 color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
//                                 labelColor: (opacity = 1) => `#694B64`,
//                                 style: {
//                                     borderRadius: 16,
//                                     borderColor: '#694B64',
//                                     borderWidth: 2
//                                 },
//                                 propsForDots: {
//                                     r: wp('1.5%'),
//                                     strokeWidth: wp('0.3%'),
//                                     stroke: "#694B64",

//                                     // backgroundColor : '#694B64'
//                                 }
//                             }}
//                             bezier
//                             style={{
//                                 marginVertical: hp('3%'),
//                                 borderRadius: wp('7%'),
//                                 marginLeft: wp('2%'),
//                                 marginRight: wp('3%'),
//                                 borderWidth: 2,
//                                 borderColor: '#694B64',
//                                 elevation: 3,

//                             }}
//                         />
//                     </View>
//                 );
//             }
//             else {
//                 console.log("else");
//                 return (
//                     <View style={{ marginTop: wp('1%') }}>
//                         <Text>No records found for user to plot</Text>
//                     </View>
//                 )
//             }
//         }
//     }
// }



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

export default class BloodPressureMonthly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            firebaseData : null ,
            firebaseData2 : null ,
            dataFound: true,
            loadagain: false,
            thisyearstate : null,
            prevyearstate : null,
            thisyearstate1 : null,
            prevyearstate1 : null,
            count: null,
            childcount: null,
            data: {
                labels: [],
                legend: ['Diastolic', 'systolic'],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => '#ABA8CB',
                        strokeWidth: 2 // optional
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

    tryfun = () => {
      var lab
            var mean_thisyear = {}
            var mean_prevyear = {}
            var plot = {};
            // console.log(thisyear, prevyear);
            for (var i in this.state.thisyearstate) {
                console.log(i);
                mean_thisyear[i] = this.state.thisyearstate[i][1] / this.state.thisyearstate[i][0];
            }
            for (var i in this.state.prevyearstate) {
                // console.log(i);
                mean_prevyear[i] = this.state.prevyearstate[i][1] / this.state.prevyearstate[i][0];
            }
            console.log(mean_thisyear, mean_prevyear);
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

            console.log(plot);
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
            console.log(arr);
            lab = arr;
            var dat_diastolic = w;
            console.log("dat_diastolic",dat_diastolic)

            // fetchDataSystolic.then(([thisyear, prevyear]) => {
                var mean_thisyear1 = {}
                var mean_prevyear1 = {}
                var plot1 = {};
                // console.log(thisyear, prevyear);
                for (var i in this.state.thisyearstate1) {
                    console.log(i);
                    mean_thisyear1[i] = this.state.thisyearstate1[i][1] / this.state.thisyearstate1[i][0];
                }
                for (var i in this.state.prevyearstate1) {
                    // console.log(i);
                    mean_prevyear1[i] = this.state.prevyearstate1[i][1] / this.state.prevyearstate1[i][0];
                }
                console.log(mean_thisyear1, mean_prevyear1);
                var today1 = new Date();
                var month1 = today1.getMonth() + 1;
                var y1 = month1;
                for (var i = 0; i < 12; i++) {
                    if (month1 > 0) {
                        if (month1 in mean_thisyear1) {
                            plot1[month1] = mean_thisyear1[month1];
                        }
                        else {
                            plot1[month1] = 0;
                        }
                    }
                    else {
                        var x1 = 12 + month1;
                        // console.log(x);
                        if (x1 in mean_prevyear1) {
                            plot1[x1] = mean_prevyear1[x1];
                        }
                        else {
                            plot1[x1] = 0;
                        }
                    }
                    month1 -= 1;
                }

                console.log(plot1);
                var q1 = Object.keys(plot1);
                var w1 = Object.values(plot1);
                for (var i = 0; i < y1; i++) {
                    var r1 = q1[0];
                    for (var j = 0; j < 11; ++j) {
                        q1[j] = q1[j + 1];
                    }
                    q1[11] = r1;
                }
                for (var i = 0; i < y1; i++) {
                    var r1 = w1[0];
                    for (var j = 0; j < 11; ++j) {
                        w1[j] = w1[j + 1];
                    }
                    w1[11] = r1;
                }
                console.log(q1, w1);
                var lab1
                var montharr1 = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                var arr1 = [];
                for (var i = 0; i < 12; i++) {
                    arr1[i] = montharr1[q[i] - 1];
                }
                console.log(arr1);
                lab1 = arr1;
                var dat_systolic = w1;
                console.log("dat_systolic",dat_systolic)

                const dataClone = { ...this.state.data }
                dataClone.datasets[0].data = dat_diastolic;
                dataClone.datasets[1].data = dat_systolic;
                dataClone.labels = lab;
                this.setState({
                    isLoading: false,
                    data: dataClone,
                    dataFound: true,
                })
    }

    Systolicfun = () => {
      var thisyear = {}
      var c = {}
      var prevyear = {}
      var email = this.props.email
      var counting = 1
      // console.log(email);

      firebase.database().ref('history-reading/' + email + '/bloodPressure').on("child_added", (snapshot) => {
          console.log(snapshot.val())
          var arr = snapshot.val()
          // var keys = Object.keys(arr);
          var val
          // this.setState({ firebaseData2 : arr })
          // console.log(keys.length)
          // for (var i = 0; i < keys.length; i++) {
              // console.log("in loop")
              // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
                  // var arr2 = this.state.firebaseData2[keys[i]]
                  var today = new Date();
                  var year = Number(today.getFullYear());
                  var timesplit = arr.time.split('-')
                  var y = Number(timesplit[0]);
                  var m = Number(timesplit[1]);

                  // var x = Number(arr2['reading']);
                  // var diastolic = Number(arr2['diastolic']);
                  var systolic = Number(arr.systolic);
                  // console.log('x= ', x);
                  if (systolic != 0) {
                      if (y in c) {
                          val = c[y][0];
                          val = val + 1;
                          c[y][0] = val;
                          c[y][1] = c[y][1] + systolic;
                      }
                      else {
                          c[y] = [1, systolic];
                      }
                  }
                  if (systolic != 0) {
                      if (y == year) {
                          if (m in thisyear) {
                              val = thisyear[m][0];
                              val = val + 1;
                              thisyear[m][0] = val;
                              thisyear[m][1] = thisyear[m][1] + systolic;
                          }
                          else {
                              thisyear[m] = [1, systolic];
                          }
                      }
                  }
                  if (systolic != 0) {
                      if (y == year - 1) {
                          if (m in prevyear) {
                              val = prevyear[m][0];
                              val = val + 1;
                              prevyear[m][0] = val;
                              prevyear[m][1] = prevyear[m][1] + systolic;
                          }
                          else {
                              prevyear[m] = [1, systolic];
                          }
                      }
                  }
                  console.log("thisyear, prevyearashgdjsag",thisyear, prevyear);
                  this.setState({
                      thisyearstate1: thisyear,
                      prevyearstate1: prevyear,
                      childcount: counting++,
                  })
                  console.log("this.state.childcount, this.state.count",this.state.childcount,this.state.count)
                  if(this.state.thisyearstate1 && this.state.prevyearstate1 && this.state.childcount >= this.state.count){
                    this.tryfun()
                    console.log(this.state.prevyearstate,this.state.thisyearstate,this.state.prevyearstate1,this.state.thisyearstate1)
                  }
      });
    }

    BloodPressure = () => {
      console.log("sjadg")
            var thisyear = {}
            var c = {}
            var prevyear = {}
            var email = this.props.email
            var counting = 1
            firebase.database().ref('history-reading/' + email + '/bloodPressure').on("child_added", (snapshot) => {
                console.log(snapshot.val())
                var arr = snapshot.val()
                // var keys = Object.keys(arr);
                var val
                var today = new Date();
                var year = Number(today.getFullYear());
                var timesplit = arr.time.split('-')
                var y = Number(timesplit[0]);
                var m = Number(timesplit[1]);

                // var x = Number(arr2['reading']);
                var diastolic = Number(arr.diastolic);
                // var systolic = Number(arr2['systolic']);
                // console.log('x= ', x);
                if (diastolic != 0) {
                    if (y in c) {
                        val = c[y][0];
                        val = val + 1;
                        c[y][0] = val;
                        c[y][1] = c[y][1] + diastolic;
                    }
                    else {
                        c[y] = [1, diastolic];
                    }
                }
                if (diastolic != 0) {
                    if (y == year) {
                        if (m in thisyear) {
                            val = thisyear[m][0];
                            val = val + 1;
                            thisyear[m][0] = val;
                            thisyear[m][1] = thisyear[m][1] + diastolic;
                        }
                        else {
                            thisyear[m] = [1, diastolic];
                        }
                    }
                }
                if (diastolic != 0) {
                    if (y == year - 1) {
                        if (m in prevyear) {
                            val = prevyear[m][0];
                            val = val + 1;
                            prevyear[m][0] = val;
                            prevyear[m][1] = prevyear[m][1] + diastolic;
                        }
                        else {
                            prevyear[m] = [1, diastolic];
                        }
                    }
                }
                this.setState({
                  thisyearstate: thisyear,
                  prevyearstate: prevyear,
                  childcount: counting++,
              })
              console.log("this.state.childcount >= this.state.count",this.state.childcount,this.state.count)
              if(this.state.thisyearstate && this.state.prevyearstate && this.state.childcount >= this.state.count){
                this.Systolicfun()
              }
                })
                // if (thisyear)
                //     resolve([thisyear, prevyear])
                // else
                //     reject("NO data found")


        // var fetchDataSystolic = new Promise((resolve, reject) => {
        //     var thisyear = {}
        //     var c = {}
        //     var prevyear = {}
        //     var email = this.props.email
        //     console.log(email);

        //     firebase.database().ref('history-reading/' + email + '/bloodPressure').on("value", function (snapshot) {
        //         console.log(snapshot.val())
        //         var arr = snapshot.val()
        //         var keys = Object.keys(arr);
        //         var val
        //         this.setState({ firebaseData2 : arr })
        //         console.log(keys.length)
        //         for (var i = 0; i < keys.length; i++) {
        //             // console.log("in loop")
        //             // firebase.database().ref('history-reading/' + email + '/bloodPressure/' + keys[i]).on("value", function (snapshot) {
        //                 var arr2 = this.state.firebaseData2[keys[i]]
        //                 var today = new Date();
        //                 var year = Number(today.getFullYear());
        //                 var timesplit = arr2['time'].split('-')
        //                 var y = Number(timesplit[0]);
        //                 var m = Number(timesplit[1]);

        //                 // var x = Number(arr2['reading']);
        //                 // var diastolic = Number(arr2['diastolic']);
        //                 var systolic = Number(arr2['systolic']);
        //                 // console.log('x= ', x);
        //                 if (systolic != 0) {
        //                     if (y in c) {
        //                         val = c[y][0];
        //                         val = val + 1;
        //                         c[y][0] = val;
        //                         c[y][1] = c[y][1] + systolic;
        //                     }
        //                     else {
        //                         c[y] = [1, systolic];
        //                     }
        //                 }
        //                 if (systolic != 0) {
        //                     if (y == year) {
        //                         if (m in thisyear) {
        //                             val = thisyear[m][0];
        //                             val = val + 1;
        //                             thisyear[m][0] = val;
        //                             thisyear[m][1] = thisyear[m][1] + systolic;
        //                         }
        //                         else {
        //                             thisyear[m] = [1, systolic];
        //                         }
        //                     }
        //                 }
        //                 if (systolic != 0) {
        //                     if (y == year - 1) {
        //                         if (m in prevyear) {
        //                             val = prevyear[m][0];
        //                             val = val + 1;
        //                             prevyear[m][0] = val;
        //                             prevyear[m][1] = prevyear[m][1] + systolic;
        //                         }
        //                         else {
        //                             prevyear[m] = [1, systolic];
        //                         }
        //                     }
        //                 }
        //             // });
        //         }
        //         console.log(thisyear, prevyear);
        //         if (thisyear)
        //             resolve([thisyear, prevyear])
        //         else
        //             reject("NO data found")
        //     }.bind(this));
        // })

        // fetchDataDiastolic.then(([thisyear, prevyear]) => {
            
        // }).catch((err) => {
        //     console.log(err);
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
                        {/* <Text>Mean(BloodGlucose) vs Month</Text> */}
                        <LineChart
                            data={this.state.data}
                            // width={Dimensions.get("window").width} // from react-native
                            width={wp('90%')}
                            height={hp('40%')}
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