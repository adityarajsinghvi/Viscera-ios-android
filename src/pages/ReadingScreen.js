import React, { Component } from 'react';
import { View, RefreshControl,BackHandler,Alert, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView,StatusBar,SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase'
import Header from '../Components/Header'


export default class ReadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weight: null,
            Time_For_Weight_reading: null,
            HeartRate: null,
            Time_For_HeartRate_reading: null,
            SystolicBP: null,
            DiastolicBP: null,
            Time_For_BP_reading: null,
            Time_For_Glucose_reading: null,
            bloodGlucose: null,
            oxygenSaturation: null,
            Time_For_oxygenSaturation_reading: null,
            refreshing: false,
            setRefreshing: false,
            heightMeters:null,
            BMI:null

        };


        this.user = this.props.navigation.getParam('user', 'Anonymus');


        this.modified_email = ''
        for (var i = 0; i < this.user.email.length; i++) {
            if (this.user.email[i] === '.')
                this.modified_email = this.modified_email + ','
            else
                this.modified_email = this.modified_email + this.user.email[i]
        }

        console.log("mod= ", this.modified_email);
        
        var ProfileName = new Promise((resolve,reject)=>{
            console.log("inside p1");
            
            firebase.database().ref("profiles/"+this.modified_email+"/").on("value",(snapshot)=>{
                console.log("value=  ",snapshot.val());
                
                if(snapshot.val()){
                    var first=snapshot.val().firstName;
                    var second=snapshot.val().lastName;
                    var name=first+" "+second
                    resolve(name)
                }
                else    
                    reject("no records")
            })
        })

        ProfileName.then((name)=>{
            this.userName = name;
        }).catch(()=>{
            this.userName='Anonymous'
        })

    }


    refresh = () => {
        return new Promise((resolve, reject) => {
            try {
                this.FetchDataFromFirebase()
                setTimeout(() => {
                    resolve(true)
                }, 2000);
            } catch (error) {
                reject(false)
            }

        })
    }

    _onRefresh =()=> {
        console.log("onrefresh");
        
        this.setState({ refreshing: true });
        this.refresh().then(() => {

            this.setState({ refreshing: false });
        }).catch(() => {
            console.log("Reerd"
            );
            
        });
    }



    // UNSAFE_componentWillMount(){
    //     console.log('inside will mount')
    //     firebase.database().ref('profiles/').orderByChild('firstName').on("value", snapshot=>{
    //         console.log("inside firebase call")
    //         console.log(snapshot.val())
    //         snapshot.forEach(function(child) {
    //             console.log(child.val()) // NOW THE CHILDREN PRINT IN ORDER
    //         });
    //     })
    //     firebase.database().ref('profiles/' ).orderByChild('email').on("value", function (snapshot){
    //         var feets = parseInt(snapshot.val().ft)
    //         console.log("feets= ",feets);
         
            
    //         var inches = parseInt(snapshot.val().inches)
    //         console.log("inches= ",inches);
    //         var heightMeters = (feets*0.3048) + (inches*0.0254)
    //         console.log(heightMeters);
            
    //         this.setState({
    //             heightMeters : heightMeters,
    //         },()=>{
    //             console.log("height in meters",this.state.heightMeters)
    //         })
            
    //     }.bind(this))
    // }

    UNSAFE_componentWillMount(){
        console.log("inside unmount");
        
        firebase.database().ref('profiles/'+ this.modified_email + '/height/').orderByChild('email').on("value", function (snapshot){
            var feets = parseInt(snapshot.val().ft)
            console.log("feets= ",feets);
         
            
            var inches = parseInt(snapshot.val().inches)
            console.log("inches= ",inches);
            var heightMeters = (feets*0.3048) + (inches*0.0254)
            console.log(heightMeters);
            
            this.setState({
                heightMeters : heightMeters,
            },()=>{
                console.log("height in meters",this.state.heightMeters)
            })
            
        }.bind(this))
    }

    FetchDataFromFirebase = () => {
        //five promises are defined which resolve when data is fetched from database,
        /* 1.limitToLast(1) is a function which fetch the last record for the particular mentioned field from database so as to display the latest reading to user
           2.one by one each promise resolve and then state is set for a particular element(this makes this current page load 5 time since 5 promise resolve setting state every time)
        */
        var reading1 = []
        var reading2 = []
        var reading3 = []
        var reading4 = []
        var reading5 = []

        /*NOTE: promises are resolved as soon as the you get the value you want, as in here promise are resolved inside the database query 
                as the value is returned.
                code works perfectly fine */

        var fetchGlucose = () => {
            return new Promise((resolve, reject) => {
                // var reading = []
                //"history-reading/"+emailModified+"/bloodGlucose
                firebase.database().ref("current-reading/" + this.modified_email + "/bloodGlucose").on("value", (snapshot) => {
                    // snapshot.forEach((data) => {
                    // console.log("The " + data.key + " score is " + data.val());
                    try {
                        reading1.push(snapshot.val().reading + "mg/dL");
                        reading1.push(snapshot.val().time)
                        // });
                        console.log("reading1= ", reading1);
                        /*To cross check if there is slow internet or slow fetching,
                       use this setTimeOut function and comment the code below it (if else statement) */
                        // setTimeout(() => {
                        //     if (reading1) {
                        //         resolve(reading1)
                        //     }
                        //     else {
                        //         reject("Not Found")
                        //     }
                        // },3000);
                        if (reading1) {
                            resolve(reading1)
                        }
                        else {
                            reject("Not Found")
                        }
                    } catch (error) {
                        console.log("inside catch");

                        reject("Not Found")
                    }


                });
            })
        }

        // Weight
        var fetchWeight = () => {
            return new Promise((resolve, reject) => {
                // var reading = []
                //"current-reading/"+emailModified+"/bloodGlucose
                firebase.database().ref("current-reading/" + this.modified_email + "/weight").on("value", (snapshot) => {
                    // snapshot.forEach((data) => {
                    // console.log("The " + data.key + " score is " + data.val());
                    try {
                        reading2.push(snapshot.val().reading + "Kg")
                        reading2.push(snapshot.val().time)
                        // });
                        console.log("reading2= ", reading2);
                        /*To cross check if there is slow internet or slow fetching,
                       use this setTimeOut function and comment the code below it (if else statement) */
                        // setTimeout(() => {
                        //     if (reading2) {
                        //         resolve(reading2)
                        //     }
                        //     else {
                        //         reject("Not Found")
                        //     }
                        // },3000);
                        if (reading2) {
                            resolve(reading2)
                        }
                        else {
                            reject("Not Found")
                        }

                    } catch (error) {
                        console.log("inside catch");

                        reject("Not Found")
                    }


                });

            })
        }

        // HeartRate
        var fetchHeartRate = () => {
            return new Promise((resolve, reject) => {
                // var reading = []
                //"current-reading/"+emailModified+"/bloodGlucose
                firebase.database().ref("current-reading/" + this.modified_email + "/bloodPressure/").on("value", (snapshot) => {
                    // snapshot.forEach((data) => {
                    // console.log("The " + data.key + " score is " + data.val());
                    try {
                        reading3.push(snapshot.val()['heartRate'] + "bpm")
                        reading3.push(snapshot.val().time)
                        // });
                        console.log("reading3= ", reading3);
                        /*To cross check if there is slow internet or slow fetching,
                       use this setTimeOut function and comment the code below it (if else statement) */
                        // setTimeout(() => {
                        //     if (reading3) {
                        //         resolve(reading3)
                        //     }
                        //     else {
                        //         reject("Not Found")
                        //     }
                        // },3000);
                        if (reading3) {
                            resolve(reading3)
                        }
                        else {
                            reject("Not Found")
                        }
                    } catch (error) {
                        console.log("inside catch");

                        reject("Not Found")
                    }


                });
            })
        }

        // Oxygen
        var fetchOxygen = () => {
            return new Promise((resolve, reject) => {
                // var reading = []
                //"current-reading/"+emailModified+"/bloodGlucose
                firebase.database().ref("current-reading/" + this.modified_email + "/pulseOx").on("value", (snapshot) => {
                    // snapshot.forEach((data) => {
                    // console.log("The " + data.key + " score is " + data.val());
                    try {
                        reading4.push(snapshot.val().reading + "%")
                        reading4.push(snapshot.val().time)
                        // });
                        console.log("reading4= ", reading4);
                        /*To cross check if there is slow internet or slow fetching,
                       use this setTimeOut function and comment the code below it (if else statement) */
                        // setTimeout(() => {
                        //     if (reading4) {
                        //         resolve(reading4)
                        //     }
                        //     else {
                        //         reject("Not Found")
                        //     }
                        // },3000);
                        if (reading4) {
                            resolve(reading4)
                        }
                        else {
                            reject("Not Found")
                        }

                    } catch (error) {
                        reject("not Found")
                    }


                });

            })
        }


        // BloodPressure
        var fetchBP = () => {
            return new Promise((resolve, reject) => {
                // var reading = []
                //"current-reading/"+emailModified+"/bloodGlucose
                firebase.database().ref("current-reading/" + this.modified_email + "/bloodPressure").on("value", (snapshot) => {
                    // snapshot.forEach((data) => {
                    // console.log("The " + data.key + " score is " + data.val());
                    try {
                        reading5.push(snapshot.val().diastolic + "mmHg")
                        reading5.push(snapshot.val().systolic + "mmHg")
                        reading5.push(snapshot.val().time)
                        // });
                        console.log("reading5= ", reading5);

                        /*To cross check if there is slow internet or slow fetching,
                          use this setTimeOut function and comment the code below it (if else statement) */
                        // setTimeout(() => {
                        //     if (reading5) {
                        //         resolve(reading5)
                        //     }
                        //     else {
                        //         reject("Not Found")
                        //     }
                        // },3000);
                        if (reading5) {
                            resolve(reading5)
                        }
                        else {
                            reject("Not Found")
                        }
                    } catch (error) {
                        console.log("inside catch");

                        reject("Not Found")
                    }

                });

            })

        }

        fetchGlucose().then((value) => {
            console.log("value= ", value);

            this.setState({
                bloodGlucose: value[0],
                Time_For_Glucose_reading: value[1],
            })
            console.log("state= ", this.state.bloodGlucose, this.state.Time_For_Glucose_reading)

        }).catch((err_msg) => {
            console.log(err_msg);
            this.setState({
                bloodGlucose: 'N/A',
                Time_For_Glucose_reading: 'N/A',
            })

        });

        fetchWeight().then((value) => {
            // bmi=value[0]/(this.state.heightMeters*this.state.heightMeters);
            console.log("inside weight");
            var v1=parseInt(value[0]);
            console.log("v1 = ",value[0]);
            
        var height=this.state.heightMeters
            console.log("height = ",this.state.heightMeters);
            
            var bmi=v1/(height*height);
            console.log("BMI=",bmi);
            
            // console.log(value,this.state.heightMeters,typeof(bmi));
            this.setState({
                weight: value[0],
                Time_For_Weight_reading: value[1],
                BMI:bmi.toFixed(2)
            })
            console.log(this.state.BMI,"bmi");
            

        }).catch((err_msg) => {
            console.log(err_msg);
            this.setState({
                weight: 'N/A',
                Time_For_Weight_reading: 'N/A',
                BMI:'N/A'
            })
        });

        fetchHeartRate().then((value) => {
            console.log(value);
            this.setState({
                HeartRate: value[0],
                Time_For_HeartRate_reading: value[1],
            })

        }).catch((err_msg) => {
            console.log(err_msg);
            this.setState({
                HeartRate: 'N/A',
                Time_For_HeartRate_reading: 'N/A',
            })
        });

        fetchOxygen().then((value) => {
            console.log(value);
            this.setState({
                oxygenSaturation: value[0],
                Time_For_oxygenSaturation_reading: value[1],
            })

        }).catch((err_msg) => {
            console.log(this.state, "oxygen");
            this.setState({
                oxygenSaturation: "N/A",
                Time_For_oxygenSaturation_reading: "N/A",
            })
            console.log(this.state, "oxygen");
        });

        fetchBP().then((value) => {
            console.log(value);
            this.setState({
                DiastolicBP: value[0],
                SystolicBP: value[1],
                Time_For_BP_reading: value[2]
            })

        }).catch((err_msg) => {
            console.log(err_msg);
            this.setState({
                DiastolicBP: 'N/A',
                SystolicBP: 'N/A',
                Time_For_BP_reading: 'N/A'
            })
        });
    }

    handleBackButton = () => {
        Alert.alert(
          'Exit App',
          'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          },], {
          cancelable: false
        }
        )
        return true;
      }
    componentDidMount() {
        this.FetchDataFromFirebase();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }



        render() {
            /* 1.This first console log is just to check when is data coming,since when the page loads for first three times(total 5 times it will load,reason mentioned earlier) it logs null for both*/
            // console.log(this.state.weight, this.state.DiastolicBP)
    
            /*1.this gets parameters from both LoginWithEmailScreen And Signup Screen 
              2.if form any of the screen nothing comes the the value of user(which sholud have been a object) is set to Anonymus by default*/
            // console.log("user from Redain SCreen=, ", this.user);
            // console.log("state= ", this.state);
    
            //if any of the state element is empty then insted of data to be displayed this if condition displays Activity Indicator there
            // return(null)
            
        firebase.database().ref("current-reading/" + this.modified_email  ).on("child_changed", (snapshot) => {
            console.log("child chnged", snapshot.val())
            this.FetchDataFromFirebase();

        })
            if (this.state.DiastolicBP != null &&
                this.state.HeartRate != null &&
                this.state.SystolicBP != null &&
                this.state.Time_For_BP_reading != null &&
                this.state.Time_For_Glucose_reading != null &&
                this.state.Time_For_Weight_reading != null &&
                this.state.Time_For_oxygenSaturation_reading != null &&
                this.state.bloodGlucose != null &&
                this.state.oxygenSaturation != null &&
                this.state.weight != null
            ) {
                if(Platform.OS == "android"){
                    return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#6F70AE' }}>
                            <View style={{ flex: 1, backgroundColor: '#DBE4EF'}}>
        
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
        
                            <Header props={this.props} title="Readings" />
                            <View style={{
                                flex: 0.2,
                                width: wp('100%'),
                                flexDirection: "row",
                                padding: hp('3%'),
                                // backgroundColor: '#A9BFCB',
                            }}>
                                <View style={{
                                    flex: 1,
                                    marginTop: hp('3%'), width: wp('100%')
                                }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold', fontFamily: 'serif' }}>Hello, {this.userName}</Text>
                                    <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
                                        You can checkout your latest readings below.
                                </Text>
                                </View>
                                {/* <View style={{
                                    flex: 0.5,
                                    height: hp('15%'),
                                }}>
                                    {/* <ImagePick /> */}
        
                                {/* </View>  */}
        
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <FlatList
                                       refreshing={this.state.refreshing}
                                       onRefresh={this._onRefresh}
                                    horizontal={false}
                                    data={[
                                        // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
                                        // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
                                        { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
                                        { key: 'BMI', val:this.state.BMI, date: this.state.Time_For_Weight_reading },
                                        { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
                                        { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
                                        { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
                                        { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
                                        { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }
        
                                    ]}
                                    renderItem={({ item }) =>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <View style={styles.box}>
                                                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1}>
                                                        {item.key}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'solid', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('3%') }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle2}>{item.val}</Text>
                                                </View>
                                                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3}>{item.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    numColumns={2}
                                />
                            </View>
                            </View>
                        </SafeAreaView>
                    );
                }
                else{
                    return (
                        <SafeAreaView style={{ flex: 1 ,backgroundColor:'#6F70AE'}}>
                            <View style={{ flex: 1, backgroundColor: '#DBE4EF' }}>
        
                            {/* <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            /> */}
        
                            <Header props={this.props} title="Readings" />
                            <View style={{
                                flex: 0.2,
                                width: wp('100%'),
                                flexDirection: "row",
                                padding: hp('3%'),
                                // backgroundColor: '#A9BFCB',
                            }}>
                                <View style={{
                                    flex: 1,
                                    marginTop: hp('3%'), width: wp('100%')
                                }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold',fontFamily:'TimesNewRomanPSMT'}}>Hello, {this.userName}</Text>
                                    <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
                                        You can checkout your latest readings below.
                                </Text>
                                </View>
                                {/* <View style={{
                                    flex: 0.5,
                                    height: hp('15%'),
                                }}>
                                    {/* <ImagePick /> */}
        
                                {/* </View>  */}
        
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <FlatList
                                       refreshing={this.state.refreshing}
                                       onRefresh={this._onRefresh}
                                    horizontal={false}
                                    data={[
                                        // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
                                        // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
                                        { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
                                        { key: 'BMI', val:this.state.BMI, date: this.state.Time_For_Weight_reading },
                                        { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
                                        { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
                                        { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
                                        { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
                                        { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }
        
                                    ]}
                                    renderItem={({ item }) =>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <View style={styles.boxIos}>
                                                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1Ios}>
                                                        {item.key}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'solid', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('3%') }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle2Ios}>{item.val}</Text>
                                                </View>
                                                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3Ios}>{item.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    numColumns={2}
                                />
                            </View>
                            </View>
                        </SafeAreaView>
                    );
                }
            }
            else {
                if(Platform.OS == "android"){
                return (
                    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#6F70AE'}}>
                            <View style={{ flex: 1, backgroundColor: '#DBE4EF' }}>
    
                        <Header props={this.props} title="Readings" />
                        <View style={{
                            flex: 0.2,
                            width: wp('100%'),
                            flexDirection: "row",
                            padding: hp('3%'),
                            // backgroundColor: '#A9BFCB',
                        }}>
    
                            <View style={{
                                flex: 1,
                                marginTop: hp('3%'), width: wp('100%')
                            }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold',fontFamily:'serif'}}>Hello, {this.userName}</Text>
                                <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
                                    You can checkout your latest readings below.
                            </Text>
                            </View>
                            {/* <View style={{
                                flex: 0.5,
                                height: hp('15%'),
                            }}>
                                {/* <ImagePick /> */}
    
                            {/* </View>  */}
    
                        </View>
                        <View style={{ flex: 0.8 }}>
    
                            <FlatList
                    
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
            
                                horizontal={false}
                                data={[
                                    // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
                                    // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
                                    { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
                                    { key: 'BMI', val:this.state.BMI, date: this.state.Time_For_Weight_reading },
                                    { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
                                    { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
                                    { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
                                    { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
                                    { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }
    
                                ]}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.box}>
                                            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1}>
                                                    {item.key}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'solid', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('4%') }}>
                                                <ActivityIndicator />
                                            </View>
                                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3}>{item.date}</Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                                numColumns={2}
                            />
                        </View>
                    </View>
                    </SafeAreaView>
                );
                            }else{
                                return (
                                    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#6F70AE'}}>
                            <View style={{ flex: 1, backgroundColor: '#DBE4EF' }}>
                                        <Header props={this.props} title="Readings" />
                                        <View style={{
                                            flex: 0.2,
                                            width: wp('100%'),
                                            flexDirection: "row",
                                            padding: hp('3%'),
                                            // backgroundColor: '#A9BFCB',
                                        }}>
                    
                                            <View style={{
                                                flex: 1,
                                                marginTop: hp('3%'), width: wp('100%')
                                            }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold',fontFamily:'TimesNewRomanPSMT'}}>Hello, {this.userName}</Text>
                                                <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
                                                    You can checkout your latest readings below.
                                            </Text>
                                            </View>
                                            {/* <View style={{
                                                flex: 0.5,
                                                height: hp('15%'),
                                            }}>
                                                {/* <ImagePick /> */}
                    
                                            {/* </View>  */}
                    
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                    
                                            <FlatList
                                    
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={this._onRefresh}
                            
                                                horizontal={false}
                                                data={[
                                                    // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
                                                    // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
                                                    { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
                                                    { key: 'BMI', val:this.state.BMI, date: this.state.Time_For_Weight_reading },
                                                    { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
                                                    { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
                                                    { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
                                                    { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
                                                    { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }
                    
                                                ]}
                                                renderItem={({ item }) =>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={styles.boxIos}>
                                                            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1Ios}>
                                                                    {item.key}
                                                                </Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'solid', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('4%') }}>
                                                                <ActivityIndicator />
                                                            </View>
                                                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3Ios}>{item.date}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                }
                                                numColumns={2}
                                            />
                                        </View>
                                    </View>
                                    </SafeAreaView>
                                );
                            }
            }
    
    
        }
    }
    
    const styles = StyleSheet.create({
        boxIos: {
            flex: 1, height: hp('25%'), backgroundColor: '#A9BFCB', marginLeft: hp('3%'), marginBottom: hp('5%'), marginTop: hp('5%'), marginRight: hp('3%'), borderRadius: hp('3%'), width: wp('40%'), shadowColor: 'grey',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 1
        },
        textstyle1Ios: {
            fontSize: hp('3%'), fontWeight: 'bold',fontFamily:'TimesNewRomanPSMT', textAlignVertical: "center", textAlign: "center", color: '#172D50', marginTop: hp("2%")
        },
        textstyle2Ios: {
            fontSize: hp('2%'), fontWeight: 'bold', fontFamily:'TimesNewRomanPSMT',textAlignVertical: "center", textAlign: "center", color: 'black'
        },
        textstyle3Ios: {
            fontSize: hp('2%'), fontWeight: 'bold', fontFamily:'TimesNewRomanPSMT',textAlignVertical: "center", textAlign: "center", color: '#172D50', marginBottom: hp("1%")
        },
        box: {
            flex: 1, height: hp('25%'), backgroundColor: '#A9BFCB', marginLeft: hp('3%'), marginBottom: hp('5%'), marginTop: hp('5%'), marginRight: hp('3%'), borderRadius: hp('3%'), width: wp('40%'), shadowColor: '#000',
            shadowOffset: { width: 0, height: hp('4%') },
            shadowOpacity: hp('0.8%'),
            shadowRadius: hp('4%'),
            elevation: 5
        },
        textstyle1: {
            fontSize: hp('3%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: '#172D50', marginTop: hp("2%")
        },
        textstyle2: {
            fontSize: hp('2%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: 'black'
        },
        textstyle3: {
            fontSize: hp('2%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: '#172D50', marginBottom: hp("1%")
        },
    })
    



// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// import ImagePick from '../Components/ImagePick';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import * as firebase from 'firebase'
// import Header from '../Components/Header'
// export default class ReadingScreen extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             weight: null,
//             Time_For_Weight_reading: null,
//             HeartRate: null,
//             Time_For_HeartRate_reading: null,
//             SystolicBP: null,
//             DiastolicBP: null,
//             Time_For_BP_reading: null,
//             Time_For_Glucose_reading: null,
//             bloodGlucose: null,
//             oxygenSaturation: null,
//             Time_For_oxygenSaturation_reading: null,
//             refreshing: true
//         };

//         this.user = this.props.navigation.getParam('user', 'Anonymus');

//         this.modified_email = ''
//         for (var i = 0; i < this.user.email.length; i++) {
//             if (this.user.email[i] === '.')
//                 this.modified_email = this.modified_email + ','
//             else
//                 this.modified_email = this.modified_email + this.user.email[i]
//         }

//         console.log("mod= ", this.modified_email);

//     }

//             refresh = () => {
//             return new Promise((resolve, reject) => {
//                 try {
//                     this.FetchDataFromFirebase()
//                     setTimeout(() => {
//                         resolve(true)
//                     }, 2000);
//                 } catch (error) {
//                     reject(false)
//                 }

//             })
//         }

//         _onRefresh =()=> {
//             console.log("onrefresh");
            
//             this.setState({ refreshing: true });
//             this.refresh().then(() => {

//                 this.setState({ refreshing: false });
//             }).catch(() => {
//                 console.log("Reerd"
//                 );
                
//             });
//         }


//     FetchDataFromFirebase = () => {
//         //five promises are defined which resolve when data is fetched from database,
//         /* 1.limitToLast(1) is a function which fetch the last record for the particular mentioned field from database so as to display the latest reading to user
//            2.one by one each promise resolve and then state is set for a particular element(this makes this current page load 5 time since 5 promise resolve setting state every time)
//         */
//         var reading1 = []
//         var reading2 = []
//         var reading3 = []
//         var reading4 = []
//         var reading5 = []

//         /*NOTE: promises are resolved as soon as the you get the value you want, as in here promise are resolved inside the database query 
//                 as the value is returned.
//                 code works perfectly fine */

//         var fetchGlucose = () => {
//             return new Promise((resolve, reject) => {
//                 // var reading = []
//                 //"history-reading/"+emailModified+"/bloodGlucose
//                 firebase.database().ref("current-reading/" + this.modified_email + "/bloodGlucose").on("value", (snapshot) => {
//                     // snapshot.forEach((data) => {
//                     // console.log("The " + data.key + " score is " + data.val());
//                     try {
//                         reading1.push(snapshot.val().reading + "mg/dL");
//                         reading1.push(snapshot.val().time)
//                         // });
//                         console.log("reading1= ", reading1);
//                         /*To cross check if there is slow internet or slow fetching,
//                        use this setTimeOut function and comment the code below it (if else statement) */
//                         // setTimeout(() => {
//                         //     if (reading1) {
//                         //         resolve(reading1)
//                         //     }
//                         //     else {
//                         //         reject("Not Found")
//                         //     }
//                         // },3000);
//                         if (reading1) {
//                             resolve(reading1)
//                         }
//                         else {
//                             reject("Not Found")
//                         }
//                     } catch (error) {
//                         console.log("inside catch");

//                         reject("Not Found")
//                     }


//                 });
//             })
//         }

//         // Weight
//         var fetchWeight = () => {
//             return new Promise((resolve, reject) => {
//                 // var reading = []
//                 //"current-reading/"+emailModified+"/bloodGlucose
//                 firebase.database().ref("current-reading/" + this.modified_email + "/weight").on("value", (snapshot) => {
//                     // snapshot.forEach((data) => {
//                     // console.log("The " + data.key + " score is " + data.val());
//                     try {
//                         reading2.push(snapshot.val().reading + "Kg")
//                         reading2.push(snapshot.val().time)
//                         // });
//                         console.log("reading2= ", reading2);
//                         /*To cross check if there is slow internet or slow fetching,
//                        use this setTimeOut function and comment the code below it (if else statement) */
//                         // setTimeout(() => {
//                         //     if (reading2) {
//                         //         resolve(reading2)
//                         //     }
//                         //     else {
//                         //         reject("Not Found")
//                         //     }
//                         // },3000);
//                         if (reading2) {
//                             resolve(reading2)
//                         }
//                         else {
//                             reject("Not Found")
//                         }

//                     } catch (error) {
//                         console.log("inside catch");

//                         reject("Not Found")
//                     }


//                 });

//             })
//         }

//         // HeartRate
//         var fetchHeartRate = () => {
//             return new Promise((resolve, reject) => {
//                 // var reading = []
//                 //"current-reading/"+emailModified+"/bloodGlucose
//                 firebase.database().ref("current-reading/" + this.modified_email + "/heartRate").on("value", (snapshot) => {
//                     // snapshot.forEach((data) => {
//                     // console.log("The " + data.key + " score is " + data.val());
//                     try {
//                         reading3.push(snapshot.val().reading + "bpm")
//                         reading3.push(snapshot.val().time)
//                         // });
//                         console.log("reading3= ", reading3);
//                         /*To cross check if there is slow internet or slow fetching,
//                        use this setTimeOut function and comment the code below it (if else statement) */
//                         // setTimeout(() => {
//                         //     if (reading3) {
//                         //         resolve(reading3)
//                         //     }
//                         //     else {
//                         //         reject("Not Found")
//                         //     }
//                         // },3000);
//                         if (reading3) {
//                             resolve(reading3)
//                         }
//                         else {
//                             reject("Not Found")
//                         }
//                     } catch (error) {
//                         console.log("inside catch");

//                         reject("Not Found")
//                     }


//                 });
//             })
//         }

//         // Oxygen
//         var fetchOxygen = () => {
//             return new Promise((resolve, reject) => {
//                 // var reading = []
//                 //"current-reading/"+emailModified+"/bloodGlucose
//                 firebase.database().ref("current-reading/" + this.modified_email + "/pulseOx").on("value", (snapshot) => {
//                     // snapshot.forEach((data) => {
//                     // console.log("The " + data.key + " score is " + data.val());
//                     try {
//                         reading4.push(snapshot.val().reading + "%")
//                         reading4.push(snapshot.val().time)
//                         // });
//                         console.log("reading4= ", reading4);
//                         /*To cross check if there is slow internet or slow fetching,
//                        use this setTimeOut function and comment the code below it (if else statement) */
//                         // setTimeout(() => {
//                         //     if (reading4) {
//                         //         resolve(reading4)
//                         //     }
//                         //     else {
//                         //         reject("Not Found")
//                         //     }
//                         // },3000);
//                         if (reading4) {
//                             resolve(reading4)
//                         }
//                         else {
//                             reject("Not Found")
//                         }

//                     } catch (error) {
//                         reject("not Found")
//                     }


//                 });

//             })
//         }


//         // BloodPressure
//         var fetchBP = () => {
//             return new Promise((resolve, reject) => {
//                 // var reading = []
//                 //"current-reading/"+emailModified+"/bloodGlucose
//                 firebase.database().ref("current-reading/" + this.modified_email + "/bloodPressure").on("value", (snapshot) => {
//                     // snapshot.forEach((data) => {
//                     // console.log("The " + data.key + " score is " + data.val());
//                     try {
//                         reading5.push(snapshot.val().diastolic + "mmHg")
//                         reading5.push(snapshot.val().systolic + "mmHg")
//                         reading5.push(snapshot.val().time)
//                         // });
//                         console.log("reading5= ", reading5);
    
//                         /*To cross check if there is slow internet or slow fetching,
//                           use this setTimeOut function and comment the code below it (if else statement) */
//                         // setTimeout(() => {
//                         //     if (reading5) {
//                         //         resolve(reading5)
//                         //     }
//                         //     else {
//                         //         reject("Not Found")
//                         //     }
//                         // },3000);
//                         if (reading5) {
//                             resolve(reading5)
//                         }
//                         else {
//                             reject("Not Found")
//                         }
//                     } catch (error) {
//                         console.log("inside catch");

//                         reject("Not Found")
//                     }
              
//                 });

//             })

//         }

//         fetchGlucose().then((value) => {
//             console.log("value= ", value);

//             this.setState({
//                 bloodGlucose: value[0],
//                 Time_For_Glucose_reading: value[1],
//             })
//             console.log("state= ", this.state.bloodGlucose, this.state.Time_For_Glucose_reading)

//         }).catch((err_msg) => {
//             console.log(err_msg);
//             this.setState({
//                 bloodGlucose: 'N/A',
//                 Time_For_Glucose_reading: 'N/A',
//             })

//         });

//         fetchWeight().then((value) => {
//             console.log(value);
//             this.setState({
//                 weight: value[0],
//                 Time_For_Weight_reading: value[1],
//             })

//         }).catch((err_msg) => {
//             console.log(err_msg);
//             this.setState({
//                 weight: 'N/A',
//                 Time_For_Weight_reading: 'N/A',
//             })
//         });

//         fetchHeartRate().then((value) => {
//             console.log(value);
//             this.setState({
//                 HeartRate: value[0],
//                 Time_For_HeartRate_reading: value[1],
//             })

//         }).catch((err_msg) => {
//             console.log(err_msg);
//             this.setState({
//                 HeartRate: 'N/A',
//                 Time_For_HeartRate_reading: 'N/A',
//             })
//         });

//         fetchOxygen().then((value) => {
//             console.log(value);
//             this.setState({
//                 oxygenSaturation: value[0],
//                 Time_For_oxygenSaturation_reading: value[1],
//             })

//         }).catch((err_msg) => {
//             console.log(this.state,"oxygen");
//             this.setState({
//                 oxygenSaturation:"N/A",
//                 Time_For_oxygenSaturation_reading:"N/A",
//             })
//             console.log(this.state,"oxygen");
//         });

//         fetchBP().then((value) => {
//             console.log(value);
//             this.setState({
//                 DiastolicBP: value[0],
//                 SystolicBP: value[1],
//                 Time_For_BP_reading: value[2]
//             })

//         }).catch((err_msg) => {
//             console.log(err_msg);
//             this.setState({
//                 DiastolicBP: 'N/A',
//                 SystolicBP: 'N/A',
//                 Time_For_BP_reading: 'N/A'
//             })
//         });
//     }

//     componentDidMount() {
//         this.FetchDataFromFirebase();
//     }


//     render() {
//         /* 1.This first console log is just to check when is data coming,since when the page loads for first three times(total 5 times it will load,reason mentioned earlier) it logs null for both*/
//         // console.log(this.state.weight, this.state.DiastolicBP)

//         /*1.this gets parameters from both LoginWithEmailScreen And Signup Screen 
//           2.if form any of the screen nothing comes the the value of user(which sholud have been a object) is set to Anonymus by default*/
//         console.log("user from Redain SCreen=, ", this.user);
//         console.log("state= ",this.state);
        
//         //if any of the state element is empty then insted of data to be displayed this if condition displays Activity Indicator there
//         // return(null)
//         if (this.state.DiastolicBP != null &&
//             this.state.HeartRate != null &&
//             this.state.SystolicBP != null &&
//             this.state.Time_For_BP_reading != null &&
//             this.state.Time_For_Glucose_reading != null &&
//             this.state.Time_For_Weight_reading != null &&
//             this.state.Time_For_oxygenSaturation_reading != null &&
//             this.state.bloodGlucose != null &&
//             this.state.oxygenSaturation != null &&
//             this.state.weight != null
//         ) {
//             return (
//                 <View style={{ flex: 1, backgroundColor: '#DBE4EF' }}>

//                     <Header props={this.props} title="Readings" />
//                     <View style={{
//                         flex: 0.2,
//                         width: wp('100%'),
//                         flexDirection: "row",
//                         padding: hp('3%'),
//                         // backgroundColor: '#A9BFCB',
//                     }}>
//                         <View style={{
//                             flex: 1,
//                             marginTop: hp('3%'), width: wp('100%')
//                         }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold', fontFamily: 'serif' }}>Hello, {this.user.displayName}</Text>
//                             <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
//                                 You can checkout your latest readings below.
//                         </Text>
//                         </View>
//                         {/* <View style={{
//                             flex: 0.5,
//                             height: hp('15%'),
//                         }}>
//                             {/* <ImagePick /> */}

//                         {/* </View>  */}

//                     </View>
//                     <View style={{ flex: 0.8 }}>
//                         <FlatList
//                             refreshing={this.state.refreshing}
//                             onRefresh={this._onRefresh}
//                             horizontal={false}
//                             data={[
//                                 // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
//                                 // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
//                                 { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
//                                 { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' },
//                                 { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
//                                 { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
//                                 { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
//                                 { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
//                                 { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }

//                             ]}
//                             renderItem={({ item }) =>
//                                 <View style={{ flex: 1, flexDirection: 'column' }}>
//                                     <View style={styles.box}>
//                                         <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
//                                             <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1}>
//                                                 {item.key}
//                                             </Text>
//                                         </View>
//                                         <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('3%') }}>
//                                             <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle2}>{item.val}</Text>
//                                         </View>
//                                         <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
//                                             <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3}>{item.date}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             }
//                             numColumns={2}
//                         />
//                     </View>
//                 </View>
//             );

//         }
//         else {

//             return (
//                 <View style={{ flex: 1, backgroundColor: '#DBE4EF' }}>

//                     <Header props={this.props} title="Readings" />
//                     <View style={{
//                         flex: 0.2,
//                         width: wp('100%'),
//                         flexDirection: "row",
//                         padding: hp('3%'),
//                         // backgroundColor: '#A9BFCB',
//                     }}>
//                         <View style={{
//                             flex: 1,
//                             marginTop: hp('3%'), width: wp('100%')
//                         }}><Text style={{ textAlign: "left", fontSize: hp('3.5%'), color: '#172D50', fontWeight: 'bold', fontFamily: 'serif' }}>Hello, {this.user.displayName}</Text>
//                             <Text style={{ marginTop: hp('5%'), fontSize: wp('4%'), color: '#172D50' }}>
//                                 You can checkout your latest readings below.
//                         </Text>
//                         </View>
//                         {/* <View style={{
//                             flex: 0.5,
//                             height: hp('15%'),
//                         }}>
//                             {/* <ImagePick /> */}

//                         {/* </View>  */}

//                     </View>
//                     <View style={{ flex: 0.8 }}>
//                         <FlatList
//                          refreshing={this.state.refreshing}
//                                                         onRefresh={this._onRefresh}
//                             horizontal={false}
//                             data={[
//                                 // { key: 'Weight', val: '78.6 Kg', date: 'Dec 9 12:28pm' }, { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' }, { key: 'Heart Rate', val: '86 bpm', date: 'Dec 9 12:28pm' }, { key: 'Systolic (BP)', val: '150 mmHg', date: 'Dec 9 12:28pm' },
//                                 // { key: 'Diastolic (BP)', val: '81 mmHg', date: 'Dec 9 12:28pm' }, { key: 'Glucose', val: '180 mg/Dl', date: 'Dec 9 12:28pm' }, { key: 'Oxygen Saturation', val: '98%', date: 'Dec 9 12:28pm' }
//                                 { key: 'Weight', val: this.state.weight, date: this.state.Time_For_Weight_reading },
//                                 { key: 'BMI', val: '26.3 Kg/m^2', date: 'Dec 9 12:28pm' },
//                                 { key: 'Heart Rate', val: this.state.HeartRate, date: this.state.Time_For_HeartRate_reading },
//                                 { key: 'Systolic (BP)', val: this.state.SystolicBP, date: this.state.Time_For_BP_reading },
//                                 { key: 'Diastolic (BP)', val: this.state.DiastolicBP, date: this.state.Time_For_BP_reading },
//                                 { key: 'Glucose', val: this.state.bloodGlucose, date: this.state.Time_For_Glucose_reading },
//                                 { key: 'Oxygen Saturation', val: this.state.oxygenSaturation, date: this.state.Time_For_oxygenSaturation_reading }

//                             ]}
//                             renderItem={({ item }) =>
//                                 <View style={{ flex: 1 }}>
//                                     <View style={styles.box}>
//                                         <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
//                                             <Text adjustsFontSizeToFit numberOfLines={2} style={styles.textstyle1}>
//                                                 {item.key}
//                                             </Text>
//                                         </View>
//                                         <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderColor: '#172D50', borderWidth: hp('0.5%'), margin: hp('4%') }}>
//                                             <ActivityIndicator />
//                                         </View>
//                                         <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
//                                             <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textstyle3}>{item.date}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             }
//                             numColumns={2}
//                         />
//                     </View>
//                 </View>
//             );
//         }


//     }
// }

// const styles = StyleSheet.create({
//     box: {
//         flex: 1, height: hp('25%'), backgroundColor: '#A9BFCB', marginLeft: hp('3%'), marginBottom: hp('5%'), marginTop: hp('5%'), marginRight: hp('3%'), borderRadius: hp('3%'), width: wp('40%'), shadowColor: '#000',
//         shadowOffset: { width: 0, height: hp('4%') },
//         shadowOpacity: hp('0.8%'),
//         shadowRadius: hp('4%'),
//         elevation: 5
//     },
//     textstyle1: {
//         fontSize: hp('3%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: '#172D50', marginTop: hp("2%")
//     },
//     textstyle2: {
//         fontSize: hp('2%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: 'black'
//     },
//     textstyle3: {
//         fontSize: hp('2%'), fontWeight: 'bold', fontFamily: 'serif', textAlignVertical: "center", textAlign: "center", color: '#172D50', marginBottom: hp("1%")
//     },
// })