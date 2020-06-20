import React, { Component } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Accordion from 'react-native-collapsible/Accordion';

import { db } from '../config';
import * as firebase from 'firebase'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,Animated,Easing,ActivityIndicator,BackHandler,Alert,
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import BloodPressure from './Yearly/BloodPressure'
import BloodPressureWeekly from './Weekly/BloodPressureWeekly'
import BloodPressureMonthly from './Monthy/BloodPressureMonthly'


export default class BloodPressureDisplay extends React.Component{
    state = {
        selectedOption : '',
        
      };
    render(){
        return(
        <View>
                      <View style={{marginTop:hp('2%')}}>
              <View style = {{width:'80%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                                                    <SegmentedControls
                        options={["Weekly" , "Monthly" , "Yearly"]}
                        onSelection={(selectedOption) => {
                            this.setState({ selectedOption: selectedOption })

                        }}
                        style = {{width : '80%'}}
                        backTint={'white'}
                        selectedTint={'#694B64'}
                        tint={'#ABA8CB'}

                        selectedOption={this.state.selectedOption}
                    />
              </View>

              <View style={{justifyContent:'center',alignItems:'center',elevation:10}}>

              
                    {
                        this.state.selectedOption == "Weekly" ?
                        <BloodPressureWeekly email = {this.props.email} /> :
                        this.state.selectedOption == "Yearly" ? 
                        <BloodPressure email = {this.props.email} />
                        :
                        this.state.selectedOption == "Monthly"?
                        <BloodPressureMonthly email = {this.props.email} />
                        :
                        <View style={{justifyContent:'center',alignItems:'center',height:hp('10%'),marginTop:hp('3%')}}>
                            <Text style={{color:'#694B64'}}>
                                Please Select an option to view Graph.
                            </Text>
                        </View>
                    }
                    </View>
              {/* {section.content} */}
              
          </View>
        </View>
        )
    }
}