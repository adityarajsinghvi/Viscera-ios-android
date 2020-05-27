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

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

export default class Oxygen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataFound: true,
            firebaseData : null,
            cstate:null,
            loadagain: false,
            resolvable_arraystate : null,
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
      var last;
      var plot = {}

      for (var i in this.state.cstate) {
          // console.log(i);
          mean_obj[i] = this.state.cstate[i][1] / this.state.cstate[i][0];
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
      lab = Object.keys(plot),
          dat = Object.values(plot)
      // console.log("lab=", lab);
      // console.log("dat=", dat);

      const dataClone = { ...this.state.data }
      dataClone.datasets[0].data = dat;
      dataClone.labels = lab;
      this.setState({
          isLoading: false,
          data: dataClone,
          dataFound: true,
      })
    }

    Oxygen = () => {
        
        // var fetchData = new Promise((resolve, reject) => {
            var c = {}
            var email = this.props.email
            var counting = 1
            firebase.database().ref('history-reading/'+ email +'/pulseOx').on("child_added", function (snapshot) {
                console.log(snapshot.val())
                var arr = snapshot.val()
                // var keys = Object.keys(arr);
                var val
                // this.setState({ firebaseData : arr })
                // console.log(keys.length)
                // for (var i = 0; i < keys.length; i++) {/
                    // console.log("in loop")
                    // firebase.database().ref('history-reading/' + email + '/pulseOx/' + keys[i]).on("value", function (snapshot) {
                        // var arr2 = this.state.firebaseData[keys[i]]
                        var monthin = arr['time'].split('-')
                        var y = monthin[0];
                        var x = Number(arr['reading']);
                        // console.log('x= ', x);
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
                    // });

                // }
                this.setState({
                  cstate: c,
                  childcount: counting++,
              })
              console.log("this.state.childcount >= this.state.count",this.state.childcount,this.state.count)
              if(this.state.cstate && this.state.childcount >= this.state.count){
                this.graphToPlot()
              }
                // console.log(c);
                // if (c)
                //     resolve(c)
                // else
                //     reject("NO data found")
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
                                if(x[index]=='pulseOx')
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
            firebase.database().ref('history-reading/' + this.props.email + '/pulseOx').on("value",snapshot => {
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
            this.Oxygen();
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
        //     firebase.database().ref('history-reading/' + this.props.email + '/pulseOx/').on("child_changed",(snapshot)=> {
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
        //     this.Oxygen()

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