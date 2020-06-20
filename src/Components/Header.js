import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator,Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
// import Icon from 'react-native-vector-icons'
import { Icon } from 'react-native-elements'
export default class Header extends React.Component {
    render() {
        return (
            <View style={{ height: hp("7%"), width: "100%", flexDirection: 'row', backgroundColor: '#6F70AE', justifyContent: 'center',alignItems:'center' }}>

                        {
                            this.props.type=="back"
                            ?
                            <TouchableOpacity onPress={()=>{
                                
                                this.props.props.navigation.navigate(this.props.route)
                            }}
                            style={{height:hp('4.5%'),width:wp('7%'),marginLeft:10,position:'absolute',left:0}}
                            >
                                <View>
                            <Image
                            source={require('../../asset/back.png')}
                            style={{position:'absolute',top:10,left:0}}
                            />
                            </View>
                             </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>{
                                this.props.props.navigation.toggleDrawer()
                            }}
                            style={{height:hp('4.5%'),width:wp('7%'),marginLeft:10,position:'absolute',left:0}}
                            >
                                <View>
                            <Image
                            source={require('../../asset/hamwhitepng.png')}
                            style={{height:hp('4.5%'),width:wp('7%'),position:'absolute',top:0,left:0}}
                            /> 
                            </View>
                             </TouchableOpacity>                        
                        }

                <View>
                    <Text style={{fontSize:28,color:'white'}}>{this.props.title}</Text>
                </View>
                <View>
                </View>
            </View>
        )
    }
}