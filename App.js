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
import { createStackNavigator } from 'react-navigation-stack'

import ForgotPassword from  './src/Login/ForgotPassword'
import ReadingScreen from './src/pages/ReadingScreen'
// import BasicDetailsAfterSignUp from './src/pages/BasicDetailsAfterSignUp'
import About from './src/About'
import GraphScreen from './src/Graphs/Graphs'
import BloodGlucose from './src/Graphs/Yearly/BloodGlucose'
import BloodPressure from './src/Graphs/Yearly/BloodPressure'
import Weight from './src/Graphs/Yearly/Weight'
import Oxygen from './src/Graphs/Yearly/Oxygen';
import HeartRate from './src/Graphs/Yearly/HeartRate'
import BloodGlucoseWeekly from './src/Graphs/Weekly/BloodGlucoseWeekly'
import BloodPressureWeekly from './src/Graphs/Weekly/BloodPressureWeekly'
import HeartRateWeekly from './src/Graphs/Weekly/HeartRateWeekly'
import OxygenWeekly from './src/Graphs/Weekly/OxygenWeekly'
import WeightWeekly from './src/Graphs/Weekly/WeightWeekly'
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


// const AppSwitchNav = createSwitchNavigator({
//   First: First,
//   Second: Second,
//   Third: Third,
//   Final: Final,
  
// }, {
//   initialRouteName: 'First',
// })


// const AppStackNavigator=createStackNavigator({
//   main:{
//     screen:AppStackNav
//   },
//   domain:{
//     screen:AppSwitchNav
//   }

// })



// const switchAuthenticateNav = createSwitchNavigator({
//   LoginWithEmail : LoginWithEmail,
//   SignUp : SwitchNav,
//   ForgotPassword : ForgotPassword,
//   MainDrawer : MainDrawerNav,

// })

const AppContainer = createAppContainer(AppStackNav);


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = { isLoggedIn: false };
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('viscera_user');
        console.log(value)
        const user_obj = JSON.parse(value)
        if (user_obj.status == 1) {
          // We have data!!
          firebase.auth().signInWithEmailAndPassword(user_obj.email, user_obj.password).then((user) => {
            console.log("user signedin with data", user.user);
            this._storeData(email,password,1)
            console.log("Navigating from login")
      
            //to reset the stack and make top of the stack to rading screen,
            /*once someone successfully logs in, you would like to prevent them to go back to 
            login/signup screen. */
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   key: null, // <-- this
            //   actions: [NavigationActions.navigate({ routeName: "ReadingScreen", params: { user: user.user } })]
            // })
            // Alert.alert("wait for few sec");
            // this.props.navigation.dispatch(resetAction)
            this.props.navigation.navigate('MainDrawer',{ user: user.user })
          }).catch((error) => {
            // Handle Errors here.
            // console.log(error)
            this.props.navigation.navigate('LoginWithEmail')
            // x=String(error)
            // Alert.alert(String(error))
            // ...
          });
          // console.log(value);
          // this.setState({
          //   loggedInStatus: value,
          // })
        }
      } catch (error) {
        // this.setState({
        //   loggedInStatus: false,
        // }) 

      }
    }
    // _retrieveData();

    _removeItemValue = async () => {
      try {
        await AsyncStorage.removeItem('loggedInStatus');
        console.log('true');
      }
      catch (exception) {
        return false;
      }
    }
    // _removeItemValue();
   }

  ActivityIndicator=()=>{
    setTimeout(() => {
    
  },5);
}

  render() {
    console.log('inside render')
      return(
        <AppContainer />
        // <BloodGlucoseMonthly />
        // <FAQ />
      )
  }
}





// //This is an example code for NavigationDrawer//
// import React, { Component } from 'react';
// //import react in our code.
// import { View, Image, TouchableOpacity } from 'react-native';
// // import all basic components

// //For React Navigation 3+
// //import {
// //  createStackNavigator,
// //  createDrawerNavigator,
// //  createAppContainer,
// //} from 'react-navigation';

// //For React Navigation 4+
// import {createAppContainer} from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer';
// import {createStackNavigator} from 'react-navigation-stack';
// import Screen1 from './pages/Screen1';
// import Screen2 from './pages/Screen2';
// import Screen3 from './pages/Screen3';

// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           {/*Donute Button Image */}
//           <Image
//             source={require('./image/drawer.png')}
//             style={{ width: 25, height: 25, marginLeft: 5 }}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: Screen1,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 1',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 2',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Screen3 will be indexed here
//   Third: {
//     screen: Screen3,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const DrawerNavigatorExample = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: FirstActivity_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 1',
//     },
//   },
//   Screen2: {
//     //Title
//     screen: Screen2_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 2',
//     },
//   },
//   Screen3: {
//     //Title
//     screen: Screen3_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 3',
//     },
//   },
// });

// export default createAppContainer(DrawerNavigatorExample);/**
