import React from 'react';
import {
    View,
    Text, TouchableOpacity, KeyboardAvoidingView, ScrollView,BackHandler,Alert,SafeAreaView

} from 'react-native';
import * as firebase from 'firebase'
import { Container, Button, Content, Form, Item, Input, Label, Radio, Right} from 'native-base';
import { SegmentedControls } from 'react-native-radio-buttons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from '../Components/Header'
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class ProfileNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: 'Fetching data',
            lastName: 'Fetching data',
            date: 'Fetching data',
            gender: 'Fetching data',
            heightFeet: 'Fetching data',
            heightInches: 'Fetching data',
            phone: 'Fetching data',
            email: 'Fetching data',
            isEditable: false,
            message: 'Please, fill all details.',
            isFilled: true,
            createTime:'',
            dob : '',
    
        }
        var curr_user=firebase.auth().currentUser
        // var curr_user={email:'aman123445@gmail.com'}
        // console.log("curr= ",curr_user.email);
        var modified_email=''
    
        for (var i=0;i<curr_user.email.length;i++){
            if(curr_user.email[i]==='.')
                modified_email=modified_email+','
            else
                modified_email=modified_email+curr_user.email[i]
        }
        var readProfileDetails = new Promise((resolve,reject)=>{
            firebase.database().ref("profiles/"+modified_email).on("value",(snapshot)=>{
                // console.log("value=  ",snapshot.val());
                
                if(snapshot.val())
                    resolve(snapshot.val())
                else    
                    reject("no records")
            })
        })

        readProfileDetails.then((details)=>{
            // console.log("in then",details)
            var date = new Date()
            var month = date.getMonth()
            // var month = 10
            if(month < 9){
                month = parseInt(month) + 1
                month = month.toString()
                month = 0+month
                // console.log("month is ", month)
            }else{
                month = parseInt(month)
                month  = month + 1
                month = month.toString()
                // console.log("month is",month)
            }
            var createDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
            // console.log("createDate", createDate)
            this.setState({
                firstName:details.firstName ? details.firstName : 'N/A',
                lastName:details.lastName ? details.lastName : 'N/A',
                date:details.dob ? details.dob : 'N/A',
                email:details.email ? details.email : 'N/A',
                gender:details.gender ? details.gender : 'N/A',
                phone:details.phone ? details.phone.toString() : 'N/A',
                heightFeet:details.height.ft ? details.height.ft.toString() : 'N/A',
                heightInches:details.height.inches ? details.height.inches.toString() : 'N/A',
                createTime:details.createTime,
                loading:false,
                dob : details.dob ? details.dob : '',
                date : details.dob ? details.dob : ''

            })
            // console.log("state",this.state)
        }).catch(err => console.log(err))
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
  
      componentDidMount() 
      {
        console.disableYellowBox = true; 
  
        /eventListener for mobile backbutton/
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);}
  
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      
  
    render() {
        if (this.state.isEditable) {
            return (
                <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>
                    <Header props={this.props} title="Profile" />
                    <ScrollView style={{flex:1}}>
                    <KeyboardAvoidingView enabled behavior="padding" style={{flex:1}}>
                        <View style={{height:hp("100%")}}>
                        <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}}>
                            <Item floatingLabel style={{ width: wp('80%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64' ,paddingTop:hp("2%")}}>First Name</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.firstName}

                                    onChangeText={text => {
                                        this.setState({ firstName: text })
                                    }} />
                            </Item>
                        </View>
                        <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}}>
                            <Item floatingLabel style={{ width: wp('80%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Last Name</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.lastName}
                                    onChangeText={text => {
                                        this.setState({ lastName: text })
                                    }} />
                            </Item>
                        </View>
                        <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center"}}>
                        <DatePicker
                        style={{ width:wp('45%'),borderRadius:8,borderColor:'#6F70AE' }}
                        date= "05/05/2016"
                        mode="date"
                        placeholder="Select Date of Birth"
                        format="DD-MM-YYYY"
                        minDate="01-01-1950"
                        maxDate="01-01-2025"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        color='#694B64'
                        duration={800}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,

                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth:2,
                                borderColor:'#6F70AE',
                                borderRadius:8
                            },
                            datePicker:{
                                backgroundColor:'#6F70AE',   
                            },
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            this.setState({ dob : date })
                            // console.log(this.state);

                        }}
                    /></View>
                    <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}}>
                        <View style={{ width: wp('80%')}}>
                            <SegmentedControls
                                options={["Male", "Female", "Other"]}
                                onSelection={(selectedOption) => {
                                    this.setState({ gender: selectedOption })
                                    // console.log(this.state.selectedOption);

                                }}
                                backTint={'white'}
                                selectedTint={'#694B64'}
                                tint={'#ABA8CB'}

                                selectedOption={this.state.gender}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' ,flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}} >
                            <Item floatingLabel style={{ width: wp('35%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Height in Feet</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={String(this.state.heightFeet)}
                                    // disabled
                                    onChangeText={text => {
                                        if(Number(text)<7){
                                            this.setState({ heightFeet: text })
                                        }
                                        else{
                                            alert("Height must be less than 7 feets")
                                        }
                                        
                                    }} />
                            </Item>
                            <View style={{ width: wp('10%') }}>

                            </View>
                            <Item floatingLabel style={{ width: wp('35%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Height in Inches</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={String(this.state.heightInches)}
                                    // disabled
                                    onChangeText={text => {
                                        if(Number(text)<=12){
                                        this.setState({ heightInches: text })}
                                        else{
                                            alert("Height must be less than 7 feets")
                                        }
                                    }} />
                            </Item>
                        </View>
                        {/* <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}}>
                            <Item floatingLabel style={{ width: wp('80%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Phone Number</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.phone}
                                    // disabled
                                    onChangeText={text => {
                                        this.setState({ phone: text })
                                    }} />
                            </Item>
                        </View> */}
                        <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center",marginBottom:hp("2%")}}>
                            <Item floatingLabel style={{ width: wp('80%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Phone Number</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={String(this.state.phone)}
                                    keyboardType = "number-pad"
                                    // disabled
                                    onChangeText={text => {
                                        this.setState({ phone: text })
                                    }} />
                            </Item>
                        </View>
                        <View style={{flex:0.1,width:wp("100%"),justifyContent:'center',alignItems:"center"}}>
                            <Item floatingLabel style={{ width: wp('80%')}} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Email</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.email}
                                    disabled
                                    onChangeText={text => {
                                        this.setState({ email: text })
                                    }} />
                            </Item>      
                        </View>
                        {
                            this.state.isFilled ?
                                <View style={{ marginTop: hp('4%') }}>

                                </View>
                                :
                                <View style={{ flexDirection: 'row', marginTop: hp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}} />
                                    <Text style={{ color: '#E99572', marginLeft: wp('2%'), fontWeight: 'bold' }}>
                                        {this.state.message}
                                </Text>
                                </View>
                        }
                       <View style={{flex:0.1,width:wp("100%"),alignItems:"center"}}>
                        <TouchableOpacity
                            style={{ width: wp("80%"), height:hp("6%"),backgroundColor: "#ABA8CB", borderWidth: 2, borderColor: '#694B64', borderRadius: 16,justifyContent:'center',alignItems:"center"}}

                            onPress={() => {
                                if (this.state.firstName.length == 0 || this.state.lastName.length == 0 || this.state.date.length == 0 || this.state.gender.length == 0 || this.state.phone.length == 0 || this.state.email.length == 0 || this.state.heightFeet.length == 0 || this.state.heightInches.length == 0) {
                                    this.setState({
                                        isFilled: false,
                                        message : 'Please fill all details correctly.'
                                    })
                                } else if (this.state.phone.length != 10) {
                                    this.setState({
                                        isFilled: false,
                                        message: 'Phone Number should be of 10 digits'
                                    })
                                } else {
                                    // AMAN yaha pe firebase ka kaam hoga, profile Updation ka
                                    var curr_user=firebase.auth().currentUser
                                    // var curr_user={email:'aman123445@gmail.com'}
                                    // console.log("curr= ",curr_user.createdAt);
                                    var modified_email=''
                                
                                    for (var i=0;i<curr_user.email.length;i++){
                                        if(curr_user.email[i]==='.')
                                            modified_email=modified_email+','
                                        else
                                            modified_email=modified_email+curr_user.email[i]
                                    }

                                    var date = new Date()
                                    var month = date.getMonth()
                                    // var month = 10
                                    if(month < 9){
                                        month = parseInt(month) + 1
                                        month = month.toString()
                                        month = 0+month
                                        // console.log("month is ", month)
                                    }else{
                                        month = parseInt(month)
                                        month  = month + 1
                                        month = month.toString()
                                        // console.log("month is",month)
                                    }
                                    var createDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
                                    // console.log("createDate", createDate)
                                    
                                    firebase.database().ref('profiles/'+modified_email).set({
                                        firstName:this.state.firstName,
                                        lastName:this.state.lastName,
                                        email:this.state.email,
                                        gender:this.state.gender.toLowerCase(),
                                        createTime:createDate,
                                        phone:String(this.state.phone),
                                        updateTime:createDate,
                                        dob:this.state.dob,
                                        height:{
                                            ft:String(this.state.heightFeet),
                                            inches:String(this.state.heightInches)
                                        }
                                      }).then((data) => {
                                        var date = new Date()
                                        var month = date.getMonth()
                                        // var month = 10
                                        if(month < 9){
                                            month = parseInt(month) + 1
                                            month = month.toString()
                                            month = 0+month
                                            // console.log("month is ", month)
                                        }else{
                                            month = parseInt(month)
                                            month  = month + 1
                                            month = month.toString()
                                            // console.log("month is",month)
                                        }
                                        var createDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
                                        // console.log("createDate", createDate)
                                        firebase.database().ref('users/'+modified_email+"/").set({
                                            firstName:this.state.firstName,
                                            lastName:this.state.lastName,
                                            email:this.state.email,
                                            gender:this.state.gender.toLowerCase(),
                                            createTime:this.state.createTime,
                                            phone:this.state.phone,
                                            updateTime: createDate,
                                            dob:this.state.dob,
                                            height:{
                                                ft:this.state.heightFeet,
                                                inches:this.state.heightInches
                                            }
                                        })
                                      })
                                
                                    this.setState({
                                        isEditable: false,
                                        date : this.state.dob
                                    })
                                }

                            }}

                        >
                            <Text style={{ fontSize: 22, color: "#FFF" }}>Save Changes</Text>

                        </TouchableOpacity>
                    </View>
                    </View>
                    </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                </SafeAreaView>
            )
        } else {

            return (
                <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>
                    <Header props={this.props} title="Profile" />
                    <View style={{ alignItems: 'center', marginTop: hp('3%') }}>
                        <Item floatingLabel style={{ width: wp('80%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64' }}>First Name</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.firstName}
                                disabled
                                onChangeText={text => {
                                    this.setState({ firstName: text })
                                }} />
                        </Item>

                        <Item floatingLabel style={{ width: wp('80%'), marginTop: hp('3%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Last Name</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.lastName}
                                disabled
                                onChangeText={text => {
                                    this.setState({ lastName: text })
                                }} />
                        </Item>

                        <Item floatingLabel style={{ width: wp('80%'), marginTop: hp('3%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Date of Birth</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.date}
                                disabled
                                onChangeText={text => {
                                    this.setState({ date: text })
                                }} />
                        </Item>
                        <Item floatingLabel style={{ width: wp('80%'), marginTop: hp('3%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Gender</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.gender}
                                disabled
                                onChangeText={text => {
                                    this.setState({ gender: text })
                                }} />
                        </Item>

                        <View style={{ flexDirection: 'row' }} >
                            <Item floatingLabel style={{ width: wp('35%'), marginTop: hp('3%') }} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Height in Feet</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.heightFeet}
                                    disabled
                                    onChangeText={text => {
                                        this.setState({ heightFeet: text })
                                    }} />
                            </Item>
                            <View style={{ width: wp('10%') }}>

                            </View>
                            <Item floatingLabel style={{ width: wp('35%'), marginTop: hp('3%') }} >
                                <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Height in Inches</Label>
                                <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                    value={this.state.heightInches}
                                    disabled
                                    onChangeText={text => {
                                        this.setState({ heightInches: text })
                                    }} />
                            </Item>
                        </View>
                        <Item floatingLabel style={{ width: wp('80%'), marginTop: hp('3%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Phone Number</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.phone}
                                disabled
                                onChangeText={text => {
                                    this.setState({ phone: text })
                                }} />
                        </Item>
                        <Item floatingLabel style={{ width: wp('80%'), marginTop: hp('3%') }} >
                            <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Email</Label>
                            <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                value={this.state.email}
                                disabled
                                onChangeText={text => {
                                    this.setState({ email: text })
                                }} />
                        </Item>

                        <TouchableOpacity onPress={ ()=>{this.props.navigation.navigate('ChangePassword')}}>
                        <View style={{ width: wp("80%"), height: hp('7%'), backgroundColor: "#ABA8CB", marginTop: hp('3%'), borderWidth: 2, borderColor: '#694B64', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, color: "#FFF" }}>Change Password</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isEditable: true
                                })

                            }}
                            style={{ backgroundColor: '#ABA8CB', height: hp('7%'), width: hp('7%'), justifyContent: 'center', alignItems: 'center', borderRadius: 100, position: 'absolute', bottom: wp('-18%'), right: wp('8%'), borderColor: '#694B64', borderWidth: 2 }}
                        >

                            <MaterialIconsI name="edit" size={hp('4%')} color="#FFF" style={{}} />
                        </TouchableOpacity>
                    </View>
                </View>
                </SafeAreaView>
            )
        }
    }
}