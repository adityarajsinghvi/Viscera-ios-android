import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
// import LoginWithMobile from './src/LoginWithMobile';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import ForgotPassword from  './src/Login/ForgotPassword'
import ReadingScreen from './src/pages/ReadingScreen'
// import BasicDetailsAfterSignUp from './src/pages/BasicDetailsAfterSignUp'
import About from './src/About'
import GraphScreen from './src/Graphs/Graphs'
import { createDrawerNavigator } from 'react-navigation-drawer';
// import SwitchNav from './src/Login/signup'
import First from './src/Login/SignUp'
import DrawerComponent from './src/Components/Drawer'
import ProfileNew from './src/pages/Profile'
import Login from './src/Login/Login'
import Splash from './src/Login/Splash'
import FAQ from './src/FAQ/faq'
import ContactUs from './src/contactUs'
import TermOfUse from './src/termsOfUse'
import ChangePassword from './src/Login/changePassword'
import db from './src/config'

const MainDrawerNav = createDrawerNavigator({

    ReadingScreen :{
    screen : ReadingScreen
  },
  GraphScreen :{
    screen : GraphScreen
  },
  About :{
    screen : About
  },
  Profile : {
    screen : ProfileNew
  },
  Faq :{
    screen : FAQ
  },
  contact:{
    screen : ContactUs
  },
  terms : {
    screen:TermOfUse
  },
  ChangePassword : {screen : ChangePassword}



},{
  contentComponent : DrawerComponent
})



const AppStackNav = createSwitchNavigator({
  //this is the switch navigator from signup.js
  Splash : Splash,
  Login :Login,

  Profile : ProfileNew , 
  signuptest : First,
  MainDrawer : MainDrawerNav,
  Graphs:{
    screen:GraphScreen,
},
forgotpassword:{ screen: ForgotPassword},
  ChangePassword : {screen : ChangePassword}

}
)


const AppContainer = createAppContainer(AppStackNav);


export default class App extends Component {
  render() {
    console.log('inside render')
      return(
        <AppContainer />

      )
  }
}

