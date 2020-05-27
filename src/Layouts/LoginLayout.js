import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,Image
} from 'react-native';


import { db } from '../config';
import * as firebase from 'firebase'



export default class LoginLayout extends Component {
    render() {
      return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Image source={require('../../asset/viscera.jpeg')} style={styles.ImageLeftTop}/>
                  <View style={{position:'absolute',left:200,top:60}}>
                      <Text style={{fontSize:36,fontFamily:'Cambo'}}>
                        VISCERA
                      </Text>
                      <Text style={{fontSize:18}}>
                        some tag line 
                      </Text>
                  </View>
              </View>
              <View style={{flex:0.7}}></View>
              <View style={styles.footer}>
                <Image source={require('../../asset/viscera.jpeg')} style={styles.ImageRightBottom}/>
              </View>
        </View>
   
      );
    }
  }
  
  const styles = StyleSheet.create({
    body:{
      flex:1,
    },
    header:{
      flex:0.2
    },
    footer:{
      flex:0.1
    },
    ImageLeftTop:{
      position:'absolute',
      left:0,
      height:140,
      width:140,
      resizeMode:'contain',
  },
  ImageRightBottom:{
    position:'absolute',
    backgroundColor:'white',
    height:80,
    width:80,
    right:0,
    resizeMode:'contain',
  }
  });