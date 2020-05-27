import 'react-native-gesture-handler';
import React, { useReducer } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
    StatusBar, TouchableOpacity,AsyncStorage,
} from 'react-native';
import { Container, Button, Content, Form, Item, Input, Label, Radio, Right, Header } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as firebase from 'firebase'
import LottieView from 'lottie-react-native';

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldLogin : false,
            user : null,
        }
    }



    componentDidMount() {
        setTimeout(() => {
            if(this.state.shouldLogin){
                this.props.navigation.navigate('ReadingScreen',{user:this.state.user})
                this.props.navigation.navigate('MainDrawer',{user:this.state.user})     
                   }
            else{
                this.props.navigation.navigate('Login')

            }
        }, 3000);
        // setTimeout(() => {
        //     if (this.state.isFetching===false) {
        //         this.props.navigation.navigate('ReadingScreen')
        //         this.props.navigation.navigate('MainDrawer')
        //     }
        //     else {
        //         this.props.navigation.navigate('Login')
        //     }
        // }, 3400);
    }

    UNSAFE_componentWillMount() {
        console.log('inside Component will mount of Splash')

        _retrieveData = async () => {
            console.log("inside RETRIVE DATA");
            
            try {
                const value = await AsyncStorage.getItem('viscera_user');
                console.log(value)
                const user_obj = JSON.parse(value)
                if (user_obj.status == 1) {
                    // We have data!!
                    firebase.auth().signInWithEmailAndPassword(user_obj.email, user_obj.password).then((user) => {
                        console.log("user signedin with data", user.user);
                        // this._storeData(email,password,1)
                        this.setState({
                            user : user.user,
                            shouldLogin : true
                        })
                        console.log("Navigating from Splash")
                    }).catch((error) => {

                    });

                }
                else {
                    this.setState({
                        shouldLogin : false
                    })
                }
            } catch (error) {

            }
        }
        _retrieveData();
    }
    render() {
        return (
            <LottieView source={require('./splash.json')} autoPlay loop style={{ backgroundColor: "#F3EDF0" }} />
        )
    }
}