import 'react-native-gesture-handler';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
    StatusBar, TouchableOpacity,BackHandler
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Container, Button, Content, Form, Item, Input, Label, Radio, Right} from 'native-base';
import { createSwitchNavigator, createAppContainer,NavigationActions,StackActions } from 'react-navigation';
import { SegmentedControls } from 'react-native-radio-buttons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as firebase from 'firebase'
import Header from '../Components/Header'

class First extends React.Component{
    state = {
        firstName : '',
        lastName : '',
        isFilled : true,
        message : 'Please, fill all details.',
        isFilledFirst : true,
        isFilledLast : true

    }
    handleBackButton = ()=>{
        this.props.navigation.navigate('Login')
        return true;
      }
      componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>

                <Header props={this.props} title = "Sign Up" type="back" route="Login" />

            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#F3EDF0'}}>
                    

                            <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>First Name</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.firstName}
                                    
                                    onChangeText={text =>{
                                        function hasNumber(text) {
                                            return /\d/.test(text);
                                          }
                                          var isValid = hasNumber(text)
                                        //   console.log(isValid)
                                          if(isValid){
                                              this.setState({
                                                  message : 'First Name can\'t contain Numbers. ',
                                                  isFilledFirst : false,
                                                  firstName : text
                                              })
                                          }else{
                                            this.setState({firstName:text,
                                            isFilledFirst : true
                                            })
                                          }
                                    }} />
                            </Item>
        <View style={{height:hp('3%')}}></View>
                            <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>Last Name</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.lastName}
                                    onChangeText={text =>{
                                        function hasNumber(text) {
                                            return /\d/.test(text);
                                          }
                                          var isValid = hasNumber(text)
                                        //   console.log(isValid)
                                          if(isValid){
                                              this.setState({
                                                  message : 'Last Name can\'t contain Numbers. ',
                                                  isFilledLast : false,
                                                  lastName : text
                                              })
                                          }else{
                                            this.setState({lastName:text,
                                            isFilledLast : true
                                            })
                                          }
                                    }} />
                            </Item>
                            {
                                this.state.isFilled && this.state.isFilledFirst && this.state.isFilledLast
                                 ?
                                <View style={{marginTop:hp('4%')}}>

                                </View>
                                :
                                <View style={{flexDirection:'row',marginTop : hp('4%'),justifyContent:'center',alignItems:'center'}}>
                                <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}}/>
                                <Text style={{color:'#E99572',marginLeft:wp('2%'),fontWeight:'bold'}}>
                                    {this.state.message}
                                </Text>
                                </View>
                            }
                            <TouchableOpacity onPress={()=>{
                                if(this.state.firstName.length == 0 || this.state.lastName.length == 0){
                                    this.setState({
                                        isFilled : false
                                    })
                                }else if(!this.state.isFilledFirst || !this.state.isFilledLast){
                                    this.setState({
                                        isFilled : false,
                                        message :"Name can\'t contain Numbers"
                                    })
                                }
                                else{
                                    // console.log("navigate to next");
                                    // console.log(this.state);
                                    const arr = []
                                    arr.push(this.state.firstName)
                                    arr.push(this.state.lastName)
                                    this.props.navigation.navigate('Second' , {data : arr})
                                    
                                }
                            }}>
                            <View style={{width:wp('30%'),backgroundColor:'#ABA8CB',height:hp('7%'),marginTop:hp('5%'),borderRadius:8,borderWidth:2,borderColor:'#6F70AE',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                                SUBMIT
                            </Text>
                            </View>                                
                            </TouchableOpacity>



            </View>
            </View>
            </SafeAreaView>
        )
    }
}

class Second extends React.Component{
    state={
        firstName : this.props.navigation.state.params.data[0],
        lastName : this.props.navigation.state.params.data[1],
        date : '',
        selectedOption : '',
        heightFeet : '',
        heightInches : '',
        phone : '',
        isSecondFilled : true,
        message : 'Please, Fill all details.',
        isFilledHeightFeet : true,
        isFilledHeightInches : true,

    }
    handleBackButton = ()=>{
        this.props.navigation.navigate('First')
        return true;
      }
      componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // console.log(this.state.isSecondFilled , this.state.isFilledHeightFeet,this.state.isFilledHeightInches)
      }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>

                <Header props={this.props} title = "Sign Up" type="back" route="First" />

            
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, margin: 6,color : '#694B64' }}>
                        Date of Birth:
                </Text>
                    <DatePicker
                        style={{ width:wp('45%'),borderRadius:8,borderColor:'#6F70AE' }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Select Date of Birth"
                        // format="YYYY-MM-DD"
                        // minDate="1990-05-01"
                        // maxDate="2025-06-01"
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
                            this.setState({ date: date })
                            // console.log(this.state);

                        }}
                    />
                </View>
                <View style={{ width: "80%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center',marginTop:hp('5%') }}>
                    <Text style={{ fontSize: 20,color:'#694B64' }}>
                        Gender:
                    </Text>
                    <View style={{ height: hp('2%') }}>

                    </View>
                    <SegmentedControls
                        options={["Male", "Female", "Other"]}
                        onSelection={(selectedOption) => {
                            this.setState({ selectedOption : selectedOption })
                            // console.log(this.state.selectedOption);
                            
                        }}
                        backTint={'white'}
                        selectedTint={'#694B64'}
                        tint={'#ABA8CB'}

                        selectedOption={this.state.selectedOption}
                    />
                </View>

                        <View style={{marginTop:hp('5%')}}></View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, marginLeft: wp('3%'),color : '#694B64' }}>
                        Height:
                        </Text>
                    <View style={{ width: wp('8%') }}></View>
                    <View style={{ width: "25%" }}>
                        <Item floatingLabel>
                            <Label style={{ padding: 10,color:'#694B64' }}>Feets</Label>
                            <Input style={{ padding: 15, borderBottomWidth: 2, borderBottomColor: '#6F70AE' }}
                                value={this.state.heightFeet}
                                keyboardType="numeric"
                                placeholder="feets"
                                placeholderTextColor="black"
                                onChangeText={text => {
                                    this.setState({ heightFeet: text })
                                    // console.log((Number(this.state.heightFeet)))
                                    if( Number(text) > 7){
                                        this.setState({
                                            isFilledHeightFeet : false,
                                            message : 'Height can\'t be greater than 7 Feets.'
                                        })
                                    }else{
                                        this.setState({
                                            isFilledHeightFeet : true,
                                            message : 'Please, Fill all details.'
                                        })
                                    }

                                }}
                            />
                        </Item>
                    </View>
                    {/* 2nd inches text box starts here */}
                    <View style={{ width: wp('8%') }}></View>
                    <View style={{ width: "25%" }}>
                        <Item floatingLabel>
                            <Label style={{ padding: 10,color : '#694B64' }}>Inches</Label>
                            <Input style={{ padding: 15, borderBottomWidth: 2, borderBottomColor: '#6F70AE' }}
                                value={this.state.heightInches}
                                keyboardType="numeric"
                                placeholder="inches"
                                placeholderTextColor="black"
                                onChangeText={text => {
                                    this.setState({ heightInches: text })
                                    if(Number(text) >= 12){
                                        this.setState({
                                            isFilledHeightInches : false,
                                            message : 'Inches should be less than 12'
                                        })
                                    }else{
                                        this.setState({
                                            isFilledHeightInches : true,
                                            message : 'Please, Fill all details.'
                                        })
                                    }

                                }}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{marginTop:hp('5%')}}>

                </View>

                <View style={{marginTop : hp('3%')}}>
                    {/* <Text style={{fontSize : 20,color : '#694B64'}}>Phone Number:</Text> */}
                <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>Phone Number</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.phone}
                                    keyboardType = "numeric"
                                    onChangeText={text =>{
                                        this.setState({phone:text})
                                    }} />
                            </Item>
                </View>
                {
                                this.state.isSecondFilled && this.state.isFilledHeightFeet && this.state.isFilledHeightInches
                                
                                ?
                                                                
                                <View style={{marginTop:hp('4%')}}>

                                </View>
                                :
                                <View style={{flexDirection:'row',marginTop : hp('4%'),justifyContent:'center',alignItems:'center'}}>
                                <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}}/>
                                <Text style={{color:'#E99572',marginLeft:wp('2%'),fontWeight:'bold'}}>
                                    {this.state.message}
                                </Text>
                                </View>
                            }
                            <TouchableOpacity onPress={()=>{
                                this.setState({isSecondFilled : true})
                                // console.log(this.state )

                                if(this.state.date.length == 0 || this.state.heightFeet.length==0 || this.state.heightInches.length==0 || this.state.selectedOption.length == 0 || this.state.phone.length == 0 ){
                                    this.setState({
                                        isSecondFilled : false,
                                        message : 'Please, Fill all details.'
                                    })
                                }else if(this.state.phone.length !=10){
                                    this.setState({
                                        isSecondFilled : false,
                                        message : "Please Enter a valid 10 digit Phone Number."
                                    })
                                }else{
                                    if(this.state.isFilledHeightInches && this.state.isFilledHeightFeet){
                                        // console.log(this.state);
                                        const arr = []
                                        arr.push(this.state.firstName)
                                        arr.push(this.state.lastName)
                                        arr.push(this.state.date)
                                        arr.push(this.state.selectedOption)
                                        arr.push(this.state.heightFeet)
                                        arr.push(this.state.heightInches)
                                        arr.push(this.state.phone)
                                        this.props.navigation.navigate('Third' , {data : arr})
    
                                        // console.log("navigating to 3");
                                    }else{
                                        this.setState({
                                            isSecondFilled : false
                                        })
                                    }

                                    
                                }
                            }}>
                            <View style={{width:wp('30%'),backgroundColor:'#ABA8CB',height:hp('7%'),marginTop:hp('5%'),borderRadius:8,borderWidth:2,borderColor:'#6F70AE',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                                SUBMIT
                            </Text>
                            </View>                                
                            </TouchableOpacity>

                            </View>
            </View>
            </SafeAreaView>
        )
    }
}


class Third extends React.Component{
    state={
        firstName : this.props.navigation.state.params.data[0],
        lastName : this.props.navigation.state.params.data[1],
        date : this.props.navigation.state.params.data[2],
        selectedOption : this.props.navigation.state.params.data[3],
        heightFeet : this.props.navigation.state.params.data[4],
        heightInches : this.props.navigation.state.params.data[5],
        phone : this.props.navigation.state.params.data[6],
        email: '',
        password: '',
        confirmPassword: '',
        isThird: true,
        message : 'Please, fill all details.',
        isPassword : true,
        isConfirmPassword : true,
    }
    handleBackButton = ()=>{
        this.props.navigation.navigate('First')
        return true;
      }
      componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>

                         <Header props={this.props} title = "Sign Up" type="back" route="First" />

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>Email</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.email}
                                    // keyboardType = "numeric"
                                    onChangeText={text =>{
                                        // console.log(this.state);
                                        var emailLower = text.toLowerCase()
                                        // console.log(emailLower)
                                        this.setState({email:emailLower})
                                    }} />
                            </Item>
                            <View style={{marginTop:hp('4%')}}>

                            </View>
                            <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>Password</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.password}
                                    secureTextEntry = {true}
                                    // keyboardType = "numeric"
                                    onChangeText={text =>{
                                        this.setState({password:text})
                                        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                                        if( text.match(re) ){
                                            // console.log("OKAY")
                                            this.setState({
                                                isPassword : true,
                                                message : 'Please Fill all details.'
                                            })
                                        }else{
                                            this.setState({
                                                isPassword : false,
                                                message : 'Your Password must contain a special character, a number, a capital alphabet and must be 6 characters long.'
                                            })
                                        }
                                    }} />
                            </Item>
                            <View style={{marginTop:hp('4%')}}>

                            </View>
                            <Item floatingLabel style={{width:wp('80%')}}>
                                <Label style={{ padding: 10,width:wp('80%'),color:'#694B64' }}>Confirm Password</Label>
                                <Input style={{  borderBottomWidth: 2, borderBottomColor: '#6F70AE',color:'#694B64' }}
                                    value={this.state.confirmPassword}
                                    secureTextEntry = {true}
                                    // keyboardType = "numeric"
                                    onChangeText={text =>{
                                        this.setState({confirmPassword:text})
                                        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                                        if( text.match(re) ){
                                            this.setState({
                                                isConfirmPassword : true,
                                                message : 'Please, Fill all details.'
                                            })
                                        }else{
                                            this.setState({
                                                isConfirmPassword : false,
                                                message : 'Your Password must contain a special character, a number, a capital alphabet and must be 6 characters long.'
                                            })
                                        }
                                    }} />
                            </Item>
                            {
                                this.state.isThird && this.state.isPassword && this.state.isConfirmPassword ?
                                <View style={{marginTop:hp('4%')}}>

                                </View>
                                :
                                <View style={{flexDirection:'row',marginTop : hp('4%'),justifyContent:'center',alignItems:'center',width : wp('90%')}}>
                                <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}}/>
                                <Text style={{color:'#E99572',marginLeft:wp('2%'),fontWeight:'bold'}}>
                                    {this.state.message}
                                </Text>
                                </View>
                            }
                            <TouchableOpacity onPress={()=>{
                                if(this.state.email.length == 0 || this.state.password.length == 0 || this.state.confirmPassword.length ==0){
                                    this.setState({
                                        isThird : false
                                    })
                                }else if(this.state.password != this.state.confirmPassword){
                                    this.setState({
                                        isThird : false,
                                        message : 'Password and Confirm Password do not match'
                                    })
                                }else if(!this.state.isPassword || !this.state.isConfirmPassword){
                                    this.setState({
                                        isThird : false,
                                        message : 'Your Password must contain a special character, a number, a capital alphabet and must be 6 characters long.'
                                    })
                                }
                                else{

                                    var modified_email = ''

                                    var email=this.state.email
        
                                     var password=this.state.password
                                    for (var i=0;i<this.state.email.length;i++){
                                        if(email[i]==='.')
                                            modified_email=modified_email+','
                                        else
                                            modified_email=modified_email+email[i]
                                    }    
                                    // console.log(modified_email);
                                     
                                    firebase.auth().createUserWithEmailAndPassword(email,password)
                                    .then((userCredentials)=>{
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

                                        if(userCredentials.user){
                                            // console.log("usercred= ",userCredentials);
                                            // console.log("usercred.user= ",userCredentials.user);
                                          userCredentials.user.updateProfile({
                                            displayName: this.state.firstName + ' ' + this.state.lastName
                                          }).then((s)=> {
                                            this.state.current_user = firebase.auth().currentUser;
                                            // console.log(this.state.current_user)
                                            // time=String(new Date(this.state.current_user.createdAt))
                                            firebase.database().ref('users/'+modified_email+"/").set({
                                                firstName:this.state.firstName,
                                                lastName:this.state.lastName,
                                                createTime:createDate,
                                                email:this.state.email,
                                                gender:this.state.selectedOption.toLowerCase(),
                                                phone:String(this.state.phone),
                                                updateTime:createDate,
                                                dob:this.state.date,
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
                                                firebase.database().ref('profiles/'+modified_email).set({
                                                    firstName:this.state.firstName,
                                                    lastName:this.state.lastName,
                                                    createTime:createDate,
                                                    email:modified_email,
                                                    gender:this.state.selectedOption.toLowerCase(),
                                                    phone:String(this.state.phone),
                                                    updateTime:createDate,
                                                    dob:this.state.date,
                                                    height:{
                                                        ft:String(this.state.heightFeet),
                                                        inches:String(this.state.heightInches)
                                                    }
                                                  }).then((data) => {
                                                      // console.log(data)
                                                  })
                                            })
        
                                    
                                            this.props.navigation.navigate('ReadingScreen' , {user:userCredentials.user})
                                            this.props.navigation.navigate('MainDrawer' , {user:userCredentials.user})
                                          })
                                        }
                                    })
                                    .catch(function(error) {
                                      // alert(error.message);
                                    //   console.log("Error in firebase ",error);
                                      Alert.alert(String(error.message))
                                      
                                    });
                                // }


         
                                }
                            }}>
                            <View style={{width:wp('30%'),backgroundColor:'#ABA8CB',height:hp('7%'),marginTop:hp('5%'),borderRadius:8,borderWidth:2,borderColor:'#6F70AE',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                                SUBMIT
                            </Text>
                            </View>                                
                            </TouchableOpacity>

            </View>
            </View>
            </SafeAreaView>
        )
    }
}


const SignUpTestNav = createSwitchNavigator({
    First: First,
    Second: Second,
    Third: Third,

}, {
    initialRouteName: 'First',
})
const SwitchNavTest = createAppContainer(SignUpTestNav);

export default SwitchNavTest