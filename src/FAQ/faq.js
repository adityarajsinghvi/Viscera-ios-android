import React, { Component } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Accordion from 'react-native-collapsible/Accordion';
import * as firebase from 'firebase'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,Animated,Easing,ActivityIndicator,BackHandler,Alert,
    SafeAreaView
} from 'react-native';
import FaqBG from './faqBloodGlucose'
import FaqBP from './faqBloodPressure'
import FaqOxygen from './faqOxygen'
import FaqBMI from './faqBMI'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'



export default class FAQ extends React.Component{
    constructor(props){
        super(props)

          this.roatateValue = new Animated.Value(0) 
     this.SECTIONS=[
        {
            id : 0,
            heading : "Blood Glucose",
            content : <FaqBG />
        },
        {
            id : 1,
            heading : "Blood Pressure",
            content : <FaqBP />
        },
        {
            id : 2,
            heading : "Oxygen Saturation",
            content : <FaqOxygen />
        },
        {
            id : 3,
            heading : "Body Mass Index",
            content : <FaqBMI />
        },
]
        }
        state = {
            activeSections: [],
            selectedOption : '',
            
          };

          
    StartRotate() {
        // this.setState({
        //     roatateValue : Animated.Value(0)
        // })
          this.roatateValue.setValue(0)
    
              Animated.timing(this.roatateValue,{
                  toValue : 1,
                  duration :1000,
                  easing : Easing.linear,
              }).start()
                
    
    

    }

    // componentDidMount(){

    //     // const email = this.props.navigation.state.param.email
        
    // }
      
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
  
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);}
  
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    render(){
        const rotateInterpolate = this.roatateValue.interpolate({
            inputRange : [0,1],
            outputRange : ["0deg", "-180deg"]
        })
        const animatedStyle = {
            transform : [{rotate : rotateInterpolate}]
        }


        _renderHeader = (section,index) => {
            return (
                <View style={{width : wp('90%'),alignSelf:'center',flexDirection : 'row',justifyContent:'center',marginTop:hp('2%'),elevation:15,shadowOffset:{height:100,width:0},shadowColor:'black',shadowOpacity:1,backgroundColor:'#ABA8CB',borderRadius:10,shadowColor:'white',marginBottom:hp('2%'),height:hp('8%'),justifyContent:'center',alignItems:'center'}}>
    
                    <View style={{width:wp('78%'),justifyContent:'center'}}>
                        <Text style={{marginLeft:wp('2%'),fontSize:20,color:'#694B64',fontWeight:'bold'}}>
                            {section.heading}
                        </Text>
                    </View>
    
                {
                    (this.state.activeSections.length == 0) ? 
                    <View style={{backgroundColor:'#E99572',height:hp('5%'), width:hp('5%'),borderRadius : 100,marginRight:wp('2%'),justifyContent:'center',alignItems:'center'}}>
                    <Icon name="keyboard-arrow-up" size = {hp('4.5%')} color="#694B64" />
                </View>
                :
    
                this.state.activeSections[0] != section.id ?
                <View style={{backgroundColor:'#E99572',height:hp('5%'), width:hp('5%'),borderRadius : 100,marginRight:wp('2%'),justifyContent:'center',alignItems:'center'}}>
                <Icon name="keyboard-arrow-up" size = {hp('4.5%')} color="#694B64" />
            </View>
            :
                <Animated.View style={{backgroundColor:'#6F70AE',height:hp('5%'), width:hp('5%'),borderRadius : 100,marginRight:wp('2%'),transform : [{rotate : rotateInterpolate}],justifyContent:'center',alignItems:'center'}}>
    
                <Icon name="keyboard-arrow-up" size = {hp('4.5%')} color="#FFF" />
            </Animated.View>
                }
    
    
    
              </View>
            );
          };

        //   _updateSections = activeSections => {
        //     this.setState({ activeSections });
        //   };

          _renderContent = section => {
              return(
                  <View style={{flex:1,marginHorizontal:wp('5%')}}>
                      {section.content}
                  </View>
              )
          }


        return(
          <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
          <View style={{flex:1,backgroundColor:'white'}}>
                                <Header props={this.props} title="FAQ" />  
                         <ScrollView style={{}}>
           <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
          <Accordion
          sections={this.SECTIONS}
          activeSections={this.state.activeSections}
          // renderSectionTitle={this._renderSectionTitle}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={(activeSections)=>{             this.setState({ activeSections });        }}
          underlayColor="transparent"
        //   expandMultiple = {true}
          duration={2000}
          onAnimationEnd = {this.StartRotate()}
          
        />
        {/* <FloatingButton /> */}
        </View>
        </ScrollView>
            </View>
            </SafeAreaView>
        )
    }
}