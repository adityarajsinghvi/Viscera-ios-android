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
import { db } from '../src/config';
import * as firebase from 'firebase'
import {
    LineChart,
} from "react-native-chart-kit";

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

export default class ChartsMonth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        color: (opacity = 1) => 'rgba(58, 143, 255, 1)',
                        strokeWidth: 2 // optional
                    },
                ]
            },
        }
    }

    BloodGlucose=()=>
    {   var lab
        var dat
        var fetchData = new Promise((resolve, reject) => {
            var thisyear = {}
            var c = {}
            var prevyear = {}
            firebase.database().ref('history-reading/rajuralston@gmail,com/weight').on("value", function (snapshot) {
                console.log(snapshot.val())
                var arr = snapshot.val()
                var keys = Object.keys(arr);
                var val
                console.log(keys.length)
                for (var i = 0; i < keys.length; i++) {
                    // console.log("in loop")
                    firebase.database().ref('history-reading/rajuralston@gmail,com/weight/' + keys[i]).on("value", function (snapshot) {
                        var arr2 = snapshot.val();
                        var today = new Date();
                        var year = Number(today.getFullYear());
                        var timesplit = arr2['time'].split('-')
                        var y = Number(timesplit[0]);
                        var m = Number(timesplit[1]);
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
                        if(x!=0){
                        if(y == year)
                        {
                            if(m in thisyear) {
                                val = thisyear[m][0];
                                val = val + 1;
                                thisyear[m][0] = val;
                                thisyear[m][1] = thisyear[m][1] + x;
                            }
                            else {
                                thisyear[m] = [1, x];
                            }
                        }}
                        if(x!=0){
                            if(y == year-1)
                            {
                                if(m in prevyear) {
                                    val = prevyear[m][0];
                                    val = val + 1;
                                    prevyear[m][0] = val;
                                    prevyear[m][1] = prevyear[m][1] + x;
                                }
                                else {
                                    prevyear[m] = [1, x];
                                }
                            }}
                    });

                }
                console.log(thisyear,prevyear);
                if (thisyear)
                        resolve([thisyear,prevyear])
                else
                    reject("NO data found")
            });
        })

        fetchData.then(([thisyear,prevyear]) => {
            var mean_obj = {}
            var mean_thisyear = {}
            var mean_prevyear = {}
            var plot = {};
            console.log(thisyear,prevyear);
            for (var i in thisyear) {
                console.log(i);
                mean_thisyear[i] = thisyear[i][1] / thisyear[i][0];
            }
            for (var i in prevyear) {
                // console.log(i);
                mean_prevyear[i] = prevyear[i][1] / prevyear[i][0];
            }
            console.log(mean_thisyear,mean_prevyear);
            var today = new Date();
            var month = today.getMonth()+1;
            var y= month;
            for(var i=0;i<12;i++){
                if(month>0)
                {
                    if(month in mean_thisyear)
                    {
                        plot[month] = mean_thisyear[month];
                    }
                    else {
                        plot[month] = 0;
                    }
                }
                else{
                    var x = 12+month;
                    // console.log(x);
                    if(x in mean_prevyear)
                    {
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
            for(var i=0;i<y;i++)
            {
                var r = q[0];
                for(var j=0;j<11;++j)
                {
                    q[j]=q[j+1];
                }
                q[11] = r;
            }
            for(var i=0;i<y;i++)
            {
                var r = w[0];
                for(var j=0;j<11;++j)
                {
                    w[j]=w[j+1];
                }
                w[11] = r;
            }
            console.log(q,w);
            var montharr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            var arr = [];
            for(var i=0;i<12;i++)
            {
                arr[i] = montharr[q[i]-1];
            }
            console.log(arr);
            lab = arr;
                dat = w;

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