import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from './Components/Header'
// import AppLayout from '../Layouts/AppLayout'

export default class About extends Component {
    state = {
        UserName: '',
        Password: '',
    };

    about_vission = "Our goal is to establish and set up health care kiosks in cities and rural areas throughout India and provide easy access to every one to monitor their vitals and empower them with tools that would enable them to take control of their health."
    about_mission = "We have a great team with strong leadership that believes in core values such as providing quality care at fraction of cost, protecting privacy of the customer by securing the data that we collect and bringing values to all stackholders with innovating ideas and solutions."

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>
        <Header props={this.props} title="About" />
        <View style={{flex:1,alignItems:'center'}}>
            
            <View style={styles.card_vission}>
                <Text style={styles.size} >{this.about_vission}</Text>
            </View>

            <View style={{height:1,backgroundColor:'grey',width:wp('20%'),marginTop:hp('5%')}}>

            </View>

            <View style={{...styles.card_mission,marginTop : hp('5%')}}>
                <Text style={styles.size}>{this.about_mission}</Text>
            </View>
        </View>
            <View style={styles.footer}>
                <Image source={require('../asset/viscera.jpeg')} style={styles.ImageRightBottom} />
            </View>

        </View>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: wp('2%'),
        backgroundColor: 'white'
    },

    card_vission: {
        width: wp('90%'),
        marginLeft: wp('3%'),
        marginTop : hp('5%')
        // flex:0.4
    },

    card_mission: {
        width: wp('90%'),
        marginLeft: wp('3%'),
        // flex:0.4,
        marginTop : hp('5%'),
        marginTop:2,

    },
    size:{
        fontSize: hp('2.5%'),             
        marginTop :18
    },

    footer:{
        flex:0.2,
        
        // bottom:0
      },

      ImageRightBottom:{
        position:'absolute',
        backgroundColor:'white',
        height:80,
        width:80,
        right:0,
        resizeMode:'contain',
      },
    Body: {
        // backgroundColor:'pink',
        position: 'absolute',
        width: wp('100%'),
        top: hp('22%'),
        height: hp('100%'),
        // flex:0.2,
    },


    //style for user input view ... not implemented yet... 
    // UserInput:{
    //   width:wp('100%'),
    //   position:'absolute'
    // }
});