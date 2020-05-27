import React, { Component, Fragment } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    // TextInput,
    Alert,
    Image,
    Dimensions,
    Platform,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { db } from '../config';
import { Headline,  TextInput,  Card, Caption, Button, Subheading} from "react-native-paper";

import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Components/Header'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
        };
    }

    // componentDidMount(){

    //     /*this function is still not used, basic idea behind it was to store the email of user at the time of login in AsyncStorange 
    //       and then during forgot password cross verify the email  */
    //     (async()=>{
    //         try{
    //            const email = await AsyncStorage.getItem('email');
    //            console.log("Email from forgot password",email);
               
    //         }catch(error){

    //         }
    //     })();
    // }

    /* function to send password reset link to user to reset the password */
    handlePasswordReset = async () => {
        const email=this.state.email
        firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
          console.log("user form forgot password",user);
          
        alert('Please check your email for Password reset link.')
      }).catch(function (e) {
        console.log(e)
        Alert.alert(String(e))
      })
      }
    
      render() {
        return (
          <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>

            <Header props={this.props} title="" type="back" route="Login" />
            
            <View style={{marginLeft:wp('4%'),marginTop:hp('20%')}}>
              <Text style={{color:'#694B64',fontWeight:'bold',fontSize:26}}>
                Forgot Password?
              </Text>
              <Text style={{marginTop:hp('5%'),fontSize:20}}>
                Please Enter your Email to proceed.
              </Text>
              </View>
              <TextInput label="Enter Email" mode="outlined" theme={{colors:{primary:"#694B64",secondary:'red'}}} onChangeText={text=>this.setState({email : text})} value={this.state.email} style={{width : wp('80%'),marginTop:hp('5%'),alignSelf:"center"}} />
              <View style={{width:wp('30%'),backgroundColor : '#694B64',marginTop : hp('5%'),height : hp('5.5%'),borderRadius:10,justifyContent:'center',alignItems:'center',elevation:6,alignSelf:'center'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        // this.signIn(this.state.email,this.state.password)
                        this.handlePasswordReset(this.state.email)
                    }}
                    >
                    <Text style={{fontSize:22,color:"#FFF"}}>
                        LOGIN
                    </Text>                        
                    </TouchableOpacity>

                </View>
          </View>
          </SafeAreaView>

        )
      }
    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
    },
    buttonContainer: {
      margin: 25
    }
  })