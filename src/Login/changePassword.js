import React from 'react';
import {
    View,
    Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, BackHandler, Alert,SafeAreaView

} from 'react-native';
import * as firebase from 'firebase'
import { Container, Button, Content, Form, Item, Input, Label, Radio, Right } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CurrentPass: '',
            NewPass:'',
            RetypePass:'',
            isEditable: false,
            message: 'Please, fill all details.',
            isFilled: true,
            createTime: '',
            isPassword : true,
            isConfirmPassword : true

        }
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
        console.disableYellowBox = true;

        /eventListener for mobile backbutton/
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    Logout = async ()=>{ 
    
    await AsyncStorage.removeItem('viscera_user')

    }
    updatePassword = () => {
        // console.log("insidde update password",firebase.auth().currentUser);
        
        const emailCred = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.state.CurrentPass);
        firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
                // User successfully reauthenticated.
                 firebase.auth().currentUser.updatePassword(this.state.NewPass);
                 this.Logout()
                 this.props.navigation.navigate("Profile")
            })
            .catch((error)=> {
                // Handle error.
                console.log(error)
                alert("please check you current password.")
                this.setState({
                    CurrentPass : '',
                    NewPass : '',
                    RetypePass : ''
                })
            });

    }

    render() {
            return (
                <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>
                    <Header props={this.props} title="Change Password"  type="back"  route="Profile"/>
                   
                        <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
                            <View style={{ height: hp("100%"),marginTop:hp('2%') }}>

                                <View style={{ flex: 0.1, width: wp("100%"), justifyContent: 'center', alignItems: "center", marginBottom: hp("2%") }}>
                                    <Item floatingLabel style={{ width: wp('80%') }} >
                                        <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Current Password</Label>
                                        <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                            value={this.state.CurrentPass}
                                            secureTextEntry={true}
                                            onChangeText={text => {
                                                this.setState({ CurrentPass: text })
                                            }} />
                                    </Item>
                                </View>

                                <View style={{ flex: 0.1, width: wp("100%"), justifyContent: 'center', alignItems: "center", marginBottom: hp("2%") }}>
                                    <Item floatingLabel style={{ width: wp('80%') }} >
                                        <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>New-Password</Label>
                                        <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                            value={this.state.NewPass}
                                            secureTextEntry={true}
                                            onChangeText={text => {
                                                this.setState({ NewPass: text })
                                                var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                                                if (text.match(re)) {
                                                    this.setState({
                                                        isPassword: true,
                                                        isFilled : true,
                                                        message: 'Please Fill all details.'
                                                    })
                                                } else {
                                                    this.setState({
                                                        isPassword: false,
                                                        isFilled : true ,
                                                        message: 'Your Password must contain a special character, a number, a capital alphabet and must be 6 characters long.'
                                                    })
                                                }
                                            }} />
                                    </Item>
                                </View>

                                <View style={{ flex: 0.1, width: wp("100%"), justifyContent: 'center', alignItems: "center", marginBottom: hp("2%") }}>
                                    <Item floatingLabel style={{ width: wp('80%') }} >
                                        <Label style={{ padding: 10, width: wp('80%'), color: '#694B64', }}>Retype New-Password</Label>
                                        <Input style={{ borderBottomWidth: 2, borderBottomColor: '#6F70AE', color: '#694B64' }}
                                            value={this.state.RetypePass}
                                            secureTextEntry={true}
                                            onChangeText={text => {
                                                this.setState({ RetypePass: text })
                                                var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                                                if (text.match(re)) {
                                                    this.setState({
                                                        isConfirmPassword: true,
                                                        isFilled : true,
                                                        message: 'Please Fill all details.'
                                                    })
                                                } else {
                                                    this.setState({
                                                        isConfirmPassword: false,
                                                        isFilled : true,
                                                        message: 'Your Password must contain a special character, a number, a capital alphabet and must be 6 characters long.'
                                                    })
                                                }
                                            }} />
                                    </Item>
                                </View>

                                {/* {
                                    this.state.isPassword && this.state.isConfirmPassword ?
                                        <View style={{ marginTop: hp('4%') }}>

                                        </View>
                                        :
                                        <View style={{ flexDirection: 'row', marginTop: hp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}} />
                                            <Text style={{ color: '#E99572', marginLeft: wp('2%'), fontWeight: 'bold' }}>
                                                {this.state.message}
                                </Text>
                                        </View>
                                } */}
                                {
                                    this.state.isPassword && this.state.isConfirmPassword && this.state.isFilled ?
                                    <View style={{ marginTop: hp('4%') }}>

                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', marginTop: hp('4%'), justifyContent: 'center', alignItems: 'center',width : '90%',alignSelf:'center' }}>
                                        <Icon name="alert-circle" size={hp('3%')} color="#E99572" style={{}} />
                                        <Text style={{ color: '#E99572', marginLeft: wp('2%'), fontWeight: 'bold' }}>
                                            {this.state.message}
                                    </Text>
                                    </View>
                                }
                                <View style={{ flex: 0.1, width: wp("100%"), alignItems: "center",marginTop:hp('3%') }}>
                                    <TouchableOpacity
                                        style={{ width: wp("80%"), height: hp("6%"), backgroundColor: "#ABA8CB", borderWidth: 2, borderColor: '#694B64', borderRadius: 16, justifyContent: 'center', alignItems: "center" }}

                                        onPress={() => {
                                            if (!this.state.isPassword || !this.state.isConfirmPassword ) {

                                                this.setState({
                                                    isFilled: false,
                                                    message : 'Please fill all textboxes.'
                                                })
                                            }else if(this.state.NewPass.length == 0 || this.state.RetypePass.length == 0){
                                                this.setState({
                                                    isFilled: false,
                                                    message : 'Please fill all textboxes.'
                                                })
                                            }else if(this.state.NewPass != this.state.RetypePass){
                                                this.setState({
                                                    isFilled : false,
                                                    message : 'Both passwords should match.'
                                                })
                                            }
                                            else{
                                                this.updatePassword()

                                            }

                                        }}

                                    >
                                        <Text style={{ fontSize: 22, color: "#FFF" }}>Change Password</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                   
                </View>
                </SafeAreaView>
            )
        
    }
}