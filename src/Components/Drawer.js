import React, { useReducer } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Image,
  ToastAndroid,TouchableOpacity,AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createAppContainer,createSwitchNavigator,NavigationActions } from 'react-navigation';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



class DrawerComponent extends React.Component{
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })
    Logout = async ()=>{ 
        console.log("Logout")
    await AsyncStorage.removeItem('viscera_user')
    }
    render(){
        return(
        <View style={{flex:1}}>
            {/* <DrawerItems {...this.props} /> */}
            <View style={{height:hp('25%'),backgroundColor:'#6F70AE',justifyContent:'center',alignItems:'center'}}>
                <View style={{justifyContent:'center',alignSelf:'center',flexDirection:'row'}}>
                    {/* <Image source={require('../assets/ProfileIcon2White.png')} style={{height:wp('25%'),width:wp('25%')}}/> */}
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        {/* <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:22,fontWeight:'bold',color:'white',flexWrap : 'wrap'}} numberOfLines={3}>
                                {this.props.nameuser}
                             </Text>
                        </View>
                        <View style={{flex:1,justifyContent:'flex-end',flexWrap:'wrap'}}>
                            <Text style={{color:'white'}} numberOfLines={3}>
                                +91-{this.props.phonenumberuser}
                             </Text>
                        </View> */}
                        {/* <View style={{height:hp('15%'),width:hp('15%')}}> */}
                            <Image source = {require('../../asset/logo.png')} />
                        {/* </View> */}
                    </View>
                </View>
            </View>
            <View>

                <ScrollView>

            <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 0;
                                this.props.navigation.closeDrawer()
                                this.props.navigation.navigate('ReadingScreen');                                    
                }}>
               <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('3%')}}>
                    {/* <Image source={require('../assets/HomeBlack.png')} style={{justifyContent:'center',height:hp("2.5%"),width:hp("2.5%")}} /> */}
                    <Icon name = "home" size = {hp('3.5%')} color="#444" />
                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Home
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>


                    <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 0;
                                this.props.navigation.closeDrawer()
                                const { navigation } = this.props;
                                const user = navigation.getParam('user', 'Anonymus');
                                var modified_email = ''
                                // var email = user.email
                                for (var i=0;i< user.email.length;i++){
                                    if(user.email[i]==='.')
                                        modified_email=modified_email+','
                                    else
                                        modified_email=modified_email+user.email[i]
                                }   
                                this.props.navigation.navigate('GraphScreen',{email:modified_email});                                    
                }}>                               
                
               <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('3%')}}>
                    {/* <Image source={require('../assets/HomeBlack.png')} style={{justifyContent:'center',height:hp("2.5%"),width:hp("2.5%")}} /> */}
                    <Icon name = "trending-up" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Trends
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>



                <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 0;
                                this.props.navigation.closeDrawer()
                                this.props.navigation.navigate('Profile');                                    
                }}>
               <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('3%')}}>
                    {/* <Image source={require('../assets/HomeBlack.png')} style={{justifyContent:'center',height:hp("2.5%"),width:hp("2.5%")}} /> */}
                    <Icon name = "account-badge" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Profile
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>




                <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 0;
                                this.props.navigation.navigate('About');                                    
                }}>
               <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('4%')}}>
                    {/* <Image source={require('../assets/About.png')} style={{justifyContent:'center'}} /> */}
                    <Icon name = "clipboard-text" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        About
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>

                <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 0;
                                this.props.navigation.navigate('terms');                                    
                }}>
               <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('4%')}}>
                    {/* <Image source={require('../assets/About.png')} style={{justifyContent:'center'}} /> */}
                    <Icon name = "alpha-t-box" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Terms of use
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>

                <TouchableOpacity onPress={()=>{
                                global.currentScreenIndex = 2;
                                this.props.navigation.navigate('Faq');                   
                }}>
                <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('4%')}}>
                    {/* <Image source={require('../assets/Help.png')} style={{justifyContent:'center'}} /> */}
                    <Icon name = "help-box" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        FAQ
                    </Text>
                </View>                    
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>

                <TouchableOpacity onPress={()=>{
                    // ToastAndroid.show("Going to Share Screen",600)
                    this.props.navigation.closeDrawer()
                    const { navigation } = this.props;
                    const user = navigation.getParam('user', 'Anonymus');
                    var modified_email = ''
                    // var email = user.email
                    for (var i=0;i< user.email.length;i++){
                        if(user.email[i]==='.')
                            modified_email=modified_email+','
                        else
                            modified_email=modified_email+user.email[i]
                    }   
                    this.props.navigation.navigate('contact',{email:modified_email});                    
                }}>
                <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('4%')}}>
                    {/* <Image source={require('../assets/Share.png')} style={{justifyContent:'center'}} /> */}
                    <Icon name = "contacts" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Contact Us
                    </Text>
                </View>                    
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>

                <TouchableOpacity onPress={()=>{

                          this.Logout()
                        this.props.navigation.navigate("Login")
                          
                    
                    ToastAndroid.show("Logging Out...",600)
                }}>
                <View style={{flexDirection:'row',alignItems:'center',height:hp('8%'),marginLeft:wp('4%')}}>
                    {/* <Image source={require('../assets/Logout.png')} style={{justifyContent:'center'}} /> */}
                    <Icon name = "logout" size = {hp('3.5%')} color="#444" />

                    <Text style={{marginLeft:wp('3%'),fontSize:22}}>
                        Log Out
                    </Text>
                </View>                    
                </TouchableOpacity>

                <View style={{height:1,width:'100%',backgroundColor:'black',opacity:.2}}>

                </View>
                </ScrollView>

            </View>

        </View>
        )
    }
}
  
  export default DrawerComponent