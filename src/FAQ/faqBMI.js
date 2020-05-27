import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Header from '../Components/Header'
// import AppLayout from '../Layouts/AppLayout'


export default class FaqBMI extends Component {
    state = {
        showBG: false,
        showBP: false,
        showBMI: false,
        showOxygen: false
    };


    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* <Header props={this.props} title="Faq" /> */}
                <View>

                    <Text>Body Mass Index (BMI)</Text>

                    <Text style={{ fontWeight: "bold", margin: wp('5%'), fontSize: wp('6%') }}>What is the waist circumference?</Text>
                    <Text style={{ marginLeft: wp("6%"), marginRight: wp("5%"), fontSize: wp('4%') }}>
                    Waist circumference is the distance around your natural waist (at the iliac crest – or hip bone).
                     If your BMI is between 25-35 kg/m²,
                    your goal for waist circumference is less than 40 inches if you're a man and less than 35 inches if you're a woman.
                    </Text>
                    <Text style={{ fontWeight: "bold", margin: wp('5%'), fontSize: wp('6%') }}>
                    What is the body mass index (BMI)?
                    </Text>
                    <Text style={styles.innerText}>
                    BMI is an indicator of the amount of body fat for most people. It is used as a screening tool to 
                    identify whether an adult is at a healthy weight in kilograms is divided by height in meters squared
                    (kg/m²). In studies by the National Center for Health Statistics,
                    </Text>

                    <Text style={styles.innerPoints}>1.)BMI values less than 18.5 kg/m² are considered underweight.</Text>
  					<Text style={styles.innerPoints}>2.)BMI values from 18.5 kg/m² to 24.9 kg/m² are healthy.</Text>
  					<Text style={styles.innerPoints}>3.)Overweight is defined as a body mass index of 25.0 to less than 30.0 kg/m². 
                          People with BMIs in this range have an increased risk of type 2 diabetes, hypertension, 
                          and cardiovascular disease.</Text>
  					<Text style={styles.innerPoints}>4.)Obesity is defined as a BMI of 30.0 kg/m² or greater. People with BMIs of 30 kg/m² or 
                          more are at higher risk of cardiovascular diseases.</Text>
  					<Text style={styles.innerPoints}>5.)Extreme obesity is defined as a BMI of 40 kg/m² or greater.</Text>
  					
                    <Text style={styles.innerText}>
                    Some well-trained people with dense muscle mass may have a high BMI score but very little body fat.
                    For them, the waist circumference, the skinfold thickness or more direct methods of measuring body fat 
                    may be more useful measures than BMI.
  				
                    </Text>                    
                    <Text style={styles.QuestionStyle}>
                    How do you find your BMI risk level?
                    </Text>
                    <Text style={styles.innerText}>1.)Use a weight scale on a hard, flat, uncarpeted surface. Wear very Textttle clothing and no shoes.</Text>
  						<Text style={styles.innerText}>2.)Weigh yourself to the nearest pound.</Text>
  						<Text style={styles.innerText}>3.)With your eyes facing forward and your heels together, stand very straight against a wall. Your buttocks, 
                          shoulders and the back of your head should be touching the wall.</Text>
  						<Text style={styles.innerText}>4.)Mark your height at the highest point of your head. Then measure your height in feet and 
                          inches to the nearest 1/4 inch. Also figure your height in inches only.</Text>

                        <Text style={styles.innerText}>
                        Find your height in feet and inches in the first column of the Body Mass Index Risk Levels table. The ranges of weight that correspond to minimal risk, moderate risk (overweight) and high risk (obese) are shown in the three columns for each height.
  							
                        </Text>
                          <View style={{width:wp('90%'),marginLeft:wp('3%'),marginTop:wp('4%')}}>
                            <Table borderStyle={{borderWidth: 1,borderColor:"white"}}>
                            <Row data={["Height","Minimal risk (BMI under 25)","Moderate risk (BMI 25–29.9) Overweight","High risk (BMI 30 and above) Obese"]} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.Headertext}/>
                            <TableWrapper style={styles.wrapper}>
                                 <Rows data={[
                                                 ["4'10\" ","118 lbs. or less","119–142 lbs.","143 lbs. or more"],
                                                 ["4'11\"","123 or less","124–147","148 or more"],
                                                 ["5'0\" ","127 or less","128–152","153 or more"],
                                                 ["5'1\"","131 or less ","132–157 ","158 or more "],
                                                 ["5'2\"","135 or less ","136–163 ","164 or more "],
                                                 ["5'3\"","140 or less ","141–168 ","169 or more "],
                                                 ["5'4\" ","144 or less ","145–173 ","174 or more "],
                                                 ["5'5\"","149 or less ","150–179 ","180 or more "],
                                                 ["5'6\"","154 or less ","155–185 ","186 or more "],
                                                 ["5'7\"","158 or less ","159–190 ","191 or more "],
                                                 ["5'8\"","163 or less ","164–196 ","197 or more "],
                                                 ["5'9\"","168 or less ","169–202 ","203 or more "],
                                                 ["5'10\"","173 or less ","174–208","209 or more "],
                                                 ["5'11\"","178 or less ","179–214 ","215 or more "],
                                                 ["6'0\" ","183 or less ","184–220 ","221 or more "],
                                                 ["6'1\" ","188 or less ","189–226 ","227 or more "],
                                                 ["6'2\" ","193 or less ","194–232 ","233 or more "],
                                                 ["6'3\" ","199 or less ","200–239 ","240 or more "],
                                                 ["6'4\" ","204 or less ","205–245 ","246 or more "],
                                ]} flexArr={[1, 1, 1,1]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                            </Table>
                            </View>
                    <Text style={{fontWeight:"bold", marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
                        To calculate your exact BMI value, multiply your weight in pounds by 703, 
                        divide by your height in inches, then divide again by your height in inches.</Text>
                    <Text style={styles.innerText}>
                
                    (Adapted from Obesity Education Initiative: Clinical Guidelines on the Identification, Evaluation, 
                    and Treatment of Overweight and Obesity in Adults, National Institutes of Health, National Heart, 
                    Lung, and Blood Institute, Obesity Research 1998, 6 Suppl 2:51S-209S)
  						
                    </Text>
                   

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    QuestionStyle:{
        marginLeft:wp("6%"),
        marginRight:wp("5%"),
        marginTop:wp('3%'),
        fontSize:wp('4.5%'),
        fontWeight:"bold"
    },
    innerText:{
        marginLeft:wp("6%"),
        marginRight:wp("5%"),
        marginTop:wp('1%'),
        fontSize:wp('3.7%')
    },
    innerPoints:{
        marginLeft:wp("10%"),
        marginRight:wp("5%"),
        marginTop:wp('1%'),
        fontSize:wp('3.7%')
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: hp("9%"),  backgroundColor: '#fff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#fff' },
    row: {  height: hp("7%")  },
    Headertext: { textAlign: 'center',fontWeight:"bold"},
    text: { textAlign: 'center'}
});