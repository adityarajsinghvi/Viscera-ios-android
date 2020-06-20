import React from 'react';
import {
    View,
    Text,TouchableOpacity,KeyboardAvoidingView,ScrollView,Image,Alert,AsyncStorage,BackHandler,

} from 'react-native';
import * as firebase from 'firebase'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Headline,  TextInput,  Card, Caption, Button, Subheading} from "react-native-paper";


export default class Login extends React.Component {
    state = {
        email: '',
        password :'',
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

      /eventListener for mobile backbutton/
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);}

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

  _storeData = async (email , password , status) => {
    let user_obj = {
      email : email ,
      password : password,
      status : status
    }
    // console.log("INSIDE STORE DATA",user_obj);
    
    try {
      await AsyncStorage.setItem('viscera_user', JSON.stringify(user_obj));
    } catch (error) {
      // Error saving data
      // console.log(error)
      await AsyncStorage.setItem('viscera_user', JSOn.stringify({
        email : '',
        password :'',
        status : 0
      }))
    }
  };
    signIn = (item, item1) => {
        var email = item
        var password = item1
        // console.log(email);
        // console.log(password);
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
          // console.log("user signedin with data", user.user);
          this._storeData(email,password,1)
          // console.log("Navigating from login")
          this.props.navigation.navigate('ReadingScreen',{ user: user.user })
          this.props.navigation.navigate('MainDrawer',{ user: user.user })
    
        }).catch((error) => {
          // Handle Errors here.
          // console.log(error)
          // x=String(error)
          Alert.alert(String(error))
          // ...
        });
      }
    render(){
        return(
              <View style={{flex:1}}>
                <KeyboardAvoidingView style = {{flex:1}} enabled behavior="height">
                <View style={{justifyContent:'center',alignItems:'center',flex:0.3,alignItems:'center'}}>
                    <Image
                    source ={require('../../asset/logo.png')}
                    />
                </View>
                <View style={{width:wp('100%'),alignItems:'center',justifyContent:'center',flex:0.3}}>
                <TextInput label="Enter Email" mode="outlined" theme={{colors:{primary:"#694B64",secondary:'red'}}}
                 onChangeText={text=>{
                  var emailLower = text.toLowerCase()
                  this.setState({email : emailLower})}} 
                  value={this.state.email} style={{width : wp('80%')}} />
                <TextInput label="Enter Password" mode="outlined" theme={{colors:{primary:"#694B64"},fonts: { thin: 'Open Sans' } }} onChangeText={text=>this.setState({password : text})} value={this.state.password} style={{width : wp('80%'),marginTop:hp('4%')}} 
                secureTextEntry = {true}/>
                </View>
                <View style={{flex:0.1,width:wp("100%"),alignItems:'center',paddingTop:hp("3%")}}>
                <View style={{width:wp('30%'),backgroundColor : '#694B64',borderRadius:10,justifyContent:'center',alignItems:'center',elevation:6,height : hp('5.5%')}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.signIn(this.state.email,this.state.password)
                    }}
                    >
                    <Text style={{fontSize:22,color:"#FFF"}}>
                        LOGIN
                    </Text>                        
                    </TouchableOpacity>

                </View>
                </View>
                <View style={{width : wp('100%'),flexDirection:'row',justifyContent:"space-evenly",flex:0.1}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('signuptest')}}>
                    <Text style={{color:'#694B64',fontSize : 18}}>
                        Create Account
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('forgotpassword')}}>
                    <Text style={{color:'#694B64',fontSize : 18}}>
                        Forgot Password
                    </Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
                </View>
        )
    }
}