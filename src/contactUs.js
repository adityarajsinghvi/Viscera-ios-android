import React, { Component } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Accordion from 'react-native-collapsible/Accordion';
import * as firebase from 'firebase'
import {
    StyleSheet,
    Text,
    View, Picker,
    ScrollView,
    Dimensions, Animated, Easing, ActivityIndicator, BackHandler, Alert,TextInput,TouchableOpacity,ToastAndroid,SafeAreaView,KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from './Components/Header'


export default class ContactUs extends React.Component {
    state={
        picker1 : '',
        picker2 : '',
        desc : '',
        message : 'Please fill all details',
        iswarning : false
    }    
        check = ()=>{
            var date = new Date().toUTCString()
            console.log(date)
            if(this.state.picker2.length == 0)
            {
                this.setState({
                    message : 'Please select an issue from the list.',
                    iswarning : true
                })
            }else if(this.state.desc.length == 0)
            {
                this.setState({
                    message : 'Please Fill the Description.',
                    iswarning:true
                })
            }else{
                this.setState({ iswarning : false})
                console.log(this.props.navigation.state.params.email)
                ToastAndroid.show("Feedback Submitted!",800)
            }
        }
    render() {
        const Data = [
            "",'Kiosk is closed','Unable to schedule for visit','Kiosk is unmanned','Unable to sign in to app','Unable to take readings','App is not functional','Current readings are not displayed','Incorrect readings are shown'
        ]

        return (
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
                <KeyboardAvoidingView style={{flex:1}} enabled behavior="height">
            <ScrollView style={{flex:1,backgroundColor:'white'}}>
                <Header props={this.props} title="Contact Us" />
                <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: hp('3%') }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: wp('50%') }}>
                            <Text style={{ color: "#444", fontSize: wp('6%') }}>
                                Which Kiosk location the issue occurred?
                            </Text>
                        </View>
                        <View style={{ width: wp('50%'),alignItems:'center',justifyContent:'center'}}>
                            <Picker
                                selectedValue={this.state.picker1}
                                style={{  width: wp('45%')}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ picker1 : itemValue })}
                            >
                                <Picker.Item label="Select Location" value="Select Location" />
                                <Picker.Item label="Not Applicable" value="Not Applicable" />
                            </Picker>
                        </View>

                    </View>
                    <View style={{flexDirection:'row', marginTop:hp('3%')}}>
                        <View style={{width:wp('50%')}}>
                            <Text style={{fontSize:wp('6%'),color:'#444'}}>
                                Choose the problem from the list
                            </Text>
                        </View>

                        <View style={{ width: wp('50%'),alignItems:'center',justifyContent:'center'}}>
                            <Picker
                                selectedValue={this.state.picker2}
                                style={{  width: wp('45%')}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ picker2 : itemValue })}
                            >
                                {
                                    Data.map((item) =>{
                                        return <Picker.Item label={item} value={item} />
                                    })
                                }
                            </Picker>
                        </View>

                    </View>
                    <TextInput style={{borderBottomColor:'#444', borderBottomWidth:2,marginTop:hp('4%')}}
                    placeholder="Describe your issue/feedback in detail"
                    onChangeText={(text)=>{this.setState({desc:text})}}
                    />
                </View>
                {
                    this.state.iswarning ?
                    <Text style={{marginTop:hp('3%'),alignSelf:'center',fontSize:18,color:'red'}}>
                        {this.state.message}
                    </Text>
                    :
                    <Text style={{marginTop : hp('3%')}}>

                    </Text>
                }
                <TouchableOpacity onPress={
                    ()=>{this.check()}
                }>
                <View style={{height:hp('7%'),width:wp('35%'),backgroundColor:'#444',alignSelf:'center',marginTop:hp('3%'),borderRadius:8,justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:wp('6%'),color:'#FFF'}}>
                         Submit
                     </Text>
                </View>                    
                </TouchableOpacity>

            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}