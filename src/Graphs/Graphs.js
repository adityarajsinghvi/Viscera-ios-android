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
    Dimensions,Animated,Easing,ActivityIndicator,BackHandler,Alert,StatusBar,SafeAreaView
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'


// import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
// import {Icon} from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Oxygen from './Yearly/Oxygen';
import HeartRate from './Yearly/HeartRate'
import BloodGlucose from './Yearly/BloodGlucose'
import BloodPressure from './Yearly/BloodPressure'
import Weight from './Yearly/Weight'

import BloodGlucoseWeekly from './Weekly/BloodGlucoseWeekly'

import BloodPressureWeekly from './Weekly/BloodPressureWeekly'
import HeartRateWeekly from './Weekly/HeartRateWeekly'
import OxygenWeekly from './Weekly/OxygenWeekly'
import WeightWeekly from './Weekly/WeightWeekly'
import Header from '../Components/Header'
import ChartsMonth from '../ChartsMonth'
import BloodGlucoseMonthly from './Monthy/BloodGlucoseMonthly'
import HeartRateMonthly from './Monthy/HeartRateMonthly'
import OxygenMonthly from './Monthy/OxygenMonthly'
import WeightMonthly from './Monthy/WeightMonthly'
import BloodPressureMonthly from './Monthy/BloodPressureMonthly'
import BMIWeekly from './Weekly/BMIWeekly'
import BMIMonthly from './Monthy/BMIMonthly'
import BMIYearly from './Yearly/BMIYearly'
import BloodGlucoseDisplay from './BloodGlucoseDisplay'
import BloodPressureDisplay from './BloodPressureDisplay'
import BMIDisplay from './BMIDisplay'
import WeightDisplay from './WeightDisplay'
import HeartRateDisplay from './HeartRateDisplay'
import OxygenDisplay from './OxygenDisplay'

var { height, width } = Dimensions.get('window');




export default class GraphScreen extends React.Component{
    constructor(props){
        super(props)

          this.roatateValue = new Animated.Value(0) 
          this.email= this.props.navigation.getParam('email', 'Anonymus');
          console.log("kdjhfbgdjsckax" , this.email );
     this.SECTIONS=[
    {   
        id : 0,
        title : "Blood Glucose",
        content : <BloodGlucoseDisplay email={this.email} /> ,
        header : "Blood Glucose"
    },
    {
        id:1,
        title : "Blood Pressure",
        content : <BloodPressureDisplay email={this.email} /> ,

    },
    {
        id : 2,
        title : "Oxygen Saturation",
        content : <OxygenDisplay email={this.email} /> ,
        header : "kjbhg"
    },
    {
        id:3,
        title : "Heart Rate",
        content : <HeartRateDisplay email={this.email} /> ,

    },
    {
        id:4,
        title : "Weight" ,
        content : <WeightDisplay email={this.email} /> ,


    },
    {
        id:5,
        title : "BMI" ,
        content : <BMIDisplay email={this.email} /> ,

    }


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
  
        /eventListener for mobile backbutton/
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

        
      _renderSectionTitle = section => {
        return (
          <View>
            <Text>{section.title}</Text>
          </View>
        );
      };
    
      _renderHeader = (section,index) => {
        return (
            <View style={{width : wp('90%'),alignSelf:'center',flexDirection : 'row',justifyContent:'center',marginTop:hp('2%'),elevation:15,shadowOffset:{height:100,width:0},shadowColor:'black',shadowOpacity:1,backgroundColor:'#ABA8CB',borderRadius:10,shadowColor:'white',marginBottom:hp('2%'),height:hp('8%'),justifyContent:'center',alignItems:'center'}}>

                <View style={{width:wp('78%'),justifyContent:'center'}}>
                    <Text style={{marginLeft:wp('2%'),fontSize:20,color:'#694B64',fontWeight:'bold'}}>
                        {section.title}
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
    
    //   _renderContent = section => {
    //     return (
    //       <View style={{marginTop:hp('2%')}}>
    //           <View style = {{width:'80%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
    //                                                 <SegmentedControls
    //                     options={["Weekly" , "Monthly" , "Yearly"]}
    //                     onSelection={(selectedOption) => {
    //                         this.setState({ selectedOption: selectedOption })

    //                     }}
    //                     style = {{width : '80%'}}
    //                     backTint={'white'}
    //                     selectedTint={'#694B64'}
    //                     tint={'#ABA8CB'}

    //                     selectedOption={this.state.selectedOption}
    //                 />
    //           </View>

    //           <View style={{justifyContent:'center',alignItems:'center',elevation:10}}>

              
    //                 {
    //                     this.state.selectedOption == "Weekly" ?
    //                     section.contentWeekly :
    //                     this.state.selectedOption == "Yearly" ? 
    //                     section.contentYearly
    //                     :
    //                     this.state.selectedOption == "Monthly"?
    //                     section.contentMonthly
    //                     :
    //                     <View style={{justifyContent:'center',alignItems:'center',height:hp('10%')}}>
    //                         <Text style={{color:'#694B64'}}>
    //                             Please Select an option to view Graph.
    //                         </Text>
    //                     </View>
    //                 }
    //                 </View>
    //           {/* {section.content} */}
              
    //       </View>
    //     );
    //   };


    _renderContent = section => {
        return (
          <View style={{marginTop:hp('2%')}}>
              {section.content}
              </View>
        );
      };

      _updateSections = activeSections => {
        this.setState({ activeSections });
      };
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <View style={{flex:1,backgroundColor:'white'}}>
                {/* <StatusBar backgroundColor="#6F70AE" /> */}
                                <Header props={this.props} title="Trends" />  
                         <ScrollView style={{}}>
           <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
          <Accordion
          sections={this.SECTIONS}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          underlayColor="transparent"
        //   expandMultiple = {true}
          duration={1000}
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    list: {
        //paddingHorizontal: 5,
        // marginTop:hp('2%'),
        // color:"green",

        margin: hp('2%'),
        backgroundColor: "grey",
        width: wp('90%'),
        height: hp('15%'),
        borderRadius: wp('15%')
    },

    /******** card **************/
    card: {
        width: width,
        height: 450,
        // flexDirection: 'row',
        padding: 15,

        // justifyContent: 'center',
        // alignItems: 'center'
    },
    displayGraph: {
        width: wp('98%'),
        height: hp('50%')
    },
    f: {
        height: hp('7%'),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "green",
        borderRadius: wp('10%')


    },
    cardImage: {
        height: 70,
        width: 70,
    },
    box: {
        // marginTop: hp('2%'),

        backgroundColor: "green"

    },
    title_header: {
        fontSize: 32,
        // flex: 1,
        color: "black",
        fontWeight: 'bold',
        marginLeft: wp('20%'),
        marginTop: hp('4%')
        // justifyContent:"center",
        // alignContent:"center",
        // alignItems:"center"
    },
    title_subheader: {
        fontSize: 26,
        // flex: 1,
        color: "black",
        // fontWeight: 'bold',
        // marginLeft: 30,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    subTitle: {
        fontSize: 12,
        flex: 1,
        // color: "#FFFFFF",
    },
    icon: {
        height: 20,
        width: 20,
    },
    JustifyContent: {
        borderRadius: wp('10%'),
        backgroundColor: "yellow",
        margin: hp('1%'),
        width: wp('50%'),
        height: hp('7'),
        marginLeft: wp('25%')
    }
});