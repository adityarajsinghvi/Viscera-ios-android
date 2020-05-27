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
import { db } from './config';
import * as firebase from 'firebase'
import {
    LineChart,
} from "react-native-chart-kit";

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

export default class ChartsYear extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataBloodGlucose: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => 'rgba(58, 143, 255, 1)',
                        strokeWidth: 2 // optional
                    },
                ]
            },
            dataBloodPressure: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => 'rgba(58, 143, 255, 1)',
                        strokeWidth: 2 // optional
                    },
                    {
                        data: [],
                        color: (opacity = 1) => 'rgba(0, 255, 255, 1)',
                        strokeWidth: 2 // optional
                    }
                ]
            },
        }
    }

    BloodGlucose=()=>
    {   var lab
        var dat
        var fetchData = new Promise((resolve, reject) => {
            var c = {}
            firebase.database().ref('history-reading/rajuralston@gmail,com/bloodGlucose').on("value", function (snapshot) {
                console.log(snapshot.val())
                var arr = snapshot.val()
                var keys = Object.keys(arr);
                var val
                console.log(keys.length)
                for (var i = 0; i < keys.length; i++) {
                    // console.log("in loop")
                    firebase.database().ref('history-reading/rajuralston@gmail,com/bloodGlucose/' + keys[i]).on("value", function (snapshot) {
                        var arr2 = snapshot.val();
                        var monthin = arr2['time'].split('-')
                        var y = monthin[0];
                        var x = Number(arr2['reading']);
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
                    });

                }
                console.log(c);
                if (c)
                    resolve(c)
                else
                    reject("NO data found")
            });
        })

        fetchData.then((c) => {
            var mean_obj = {}
            var last;
            var plot = {}

            for (var i in c) {
                // console.log(i);
                mean_obj[i] = c[i][1] / c[i][0];
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
            })
        }).catch((err) => {
            console.log(err);
        })

    }

    BloodPressure=()=>
    {
        var lab
        var dat
        var fetchData = new Promise((resolve, reject) => {
            var c = {}
            firebase.database().ref('history-reading/rajuralston@gmail,com/bloodPressure').on("value", function (snapshot) {
                console.log(snapshot.val())
                var arr = snapshot.val()
                var keys = Object.keys(arr);
                var val
                console.log(keys.length)
                for (var i = 0; i < keys.length; i++) {
                    // console.log("in loop")
                    firebase.database().ref('history-reading/rajuralston@gmail,com/bloodPressure/' + keys[i]).on("value", function (snapshot) {
                        var arr2 = snapshot.val();
                        var monthin = arr2['time'].split('-')
                        var y = monthin[0];
                        var diastolic = Number(arr2['diastolic']);
                        var systolic = Number(arr2['systolic']);
                        var heartRate = Number(arr2['heartRate']);
                        // console.log('diastolic= ', diastolic);
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
                    });

                }
                console.log(c);
                if (c)
                    resolve(c)
                else
                    reject("NO data found")
            });
        })

        fetchData.then((c) => {
            var mean_obj = {}
            var last;
            var plot = {}

            for (var i in c) {
                // console.log(i);
                mean_obj[i] = c[i][1] / c[i][0];
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
            dataClone.datasets[0].data2 = dat;
            // dataClone.datasets[0].data1 = [1,2,3,4,5,6,7,8,9,10];
            dataClone.labels = lab;
            this.setState({
                isLoading: false,
                data: dataClone,
            })
        }).catch((err) => {
            console.log(err);
        })

    }



    componentDidMount() {
        this.BloodGlucose();
        // this.BloodPressure();
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
            return (
                <View>
                    <Text>Mean(BloodGlucose) vs Month</Text>
                    <LineChart
                        data={this.state.data}
                        width={Dimensions.get("window").width} // from react-native
                        height={450}
                        verticalLabelRotation={90}
                        withVerticalLabels
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            );
        }
    }
}

