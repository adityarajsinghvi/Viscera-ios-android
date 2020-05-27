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

// import Header from '../Components/Header'
// import AppLayout from '../Layouts/AppLayout'
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: hp("9%"),  backgroundColor: '#fff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#fff' },
    row: {  height: hp("7%")  },
    Headertext: { textAlign: 'center',fontWeight:"bold"},
    text: { textAlign: 'center'}
  });
  
export default class FaqBP extends Component {
    state = {
        showBG:false,
        showBP:false,
        showBMI:false,
        showOxygen:false
    };

   
    render() {
        return (
            <ScrollView style={{flex:1}}>
        {/* <Header props={this.props} title="Faq" /> */}
        <View>

        <Text>Blood Pressure</Text>
        
        <Text style={{fontWeight:"bold",margin:wp('5%'),fontSize:wp('6%')}}>What is Blood Pressure?</Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('4%')}}>
            In the most basic sense, blood pressure is a way of measuring how much force 
            is being exerted on the walls of your blood vessels (artery) as blood flows through them.
		</Text>


        <Text style={{fontWeight:"bold",marginTop:wp('3%'),marginLeft:wp('6%'),textDecorationLine:"underline",fontSize:wp('4.5%')}}>
        Systolic
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('4%')}}>
        Is the top number. It represents the pressure as your heart contracts to pump blood to the body.
        </Text>
        <Text style={{fontWeight:"bold",marginTop:wp('3%'),marginLeft:wp('6%'),textDecorationLine:"underline",fontSize:wp('4.5%')}}>
        Diastolic
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('4%')}}>
        Is the bottom number. It represents the pressure between beats, when your heart relaxes.
        </Text>


        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('4%'),fontSize:wp('4%')}}>
        The following shows the different stages of hypertension (also known as high blood pressure).
        </Text>
        <View style={{width:wp('90%'),marginLeft:wp('3%'),marginTop:wp('4%')}}>
        <Table borderStyle={{borderWidth: 1,borderColor:"white"}}>
          <Row data={[" ","Systolic Blood Pressure","Diastolic Blood Pressure"]} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.Headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={["Normal","Hypertension"]} style={styles.title} heightArr={[hp("7%"),hp("7%")]} textStyle={styles.Headertext}/>
            <Rows data={[
                ["less than to equal to 134","less than to equal to 84"],
                ["greater than 135","greater than 85"]
            ]} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
        </View>



        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('4%'),fontSize:wp('4%')}}>
        In terms of taking action based on your blood pressure readings, 
        this should always be discussed and decided on between you and your doctor. 
        You should never self-diagnose or adjust your medication if not prescribed by your doctor.
        </Text>

        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
        What is more important the Systolic or Diastolic reading?
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
        Both readings are important. One measures your blood pressure during a heart contraction 
        and the other measures blood pressure between heart contractions. For your particular situation, 
        you should discuss both measurement results with your doctor.
        </Text>

        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}} >
        Is it normal for my blood pressure to vary?
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
        Yes, it is quite normal for people’s blood pressure to change throughout the day and night, 
        or in different settings where you may measure your blood pressure. Many things, such as stress levels, 
        food or drink intake, activity levels, even time of day can all affect a person’s blood pressure reading 
        at any given time. In fact, there are published studies that show a given person’s blood pressure can change 
        by up to 20mm within a day, based on activity levels, food/drink intake, stress, etc. This is why it is important 
        to take your blood pressure on a regular basis, and review the overall trend of your blood pressure readings with your doctor.
        </Text>

        <Text  style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
        What can I do to help better manage my blood pressure?
        </Text>
        <Text style={{marginLeft:wp("6%"),marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
        Managing your blood pressure doesn’t have to take a lot of work. In fact, small improvements to your lifestyle can help.
        </Text>

        
        <Text style={{marginLeft:wp("6%"),marginTop:wp('1%'),fontSize:wp('3.9%'),fontWeight:"500",textDecorationLine:"underline"}}>
        Exercise:
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('3.7%'),flexWrap:"wrap"}}> 
        Just be a little more active. Walk instead of drive; take the stairs instead of the elevator, etc.	
        </Text>
    

        
        <Text style={{marginLeft:wp("6%"),marginTop:wp('2%'),fontSize:wp('3.9%'),fontWeight:"500",textDecorationLine:"underline"}}>
        Eat Smart:
        </Text>
        <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('3.7%')}}>
        Try to find low-fat, low-sodium substituted that also taste great. 
        Potassium found in bananas and carrots is nature’s best medicine for your heart.	
        </Text>

    

        
        <Text style={{marginLeft:wp("6%"),marginTop:wp('2%'),fontSize:wp('3.9%'),fontWeight:"500",textDecorationLine:"underline"}}>
        Kick the Habits:
            </Text>
            <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('3.7%')}}>
             Minimize your alcohol and cigarette intake.
            </Text>

    

        
        <Text style={{marginLeft:wp("6%"),marginTop:wp('2%'),fontSize:wp('3.9%'),fontWeight:"500",textDecorationLine:"underline"}}>
        Stifle Your Stress:
            </Text>
            <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('3.7%')}}>
            Stress is a normal part of life. But too much can increase the risk of heart disease. Relax by doing things you enjoy (yoga, gardening, walking, etc.) and your heart can beznefit.
			
            </Text>

    

        
        <Text style={{marginLeft:wp("6%"),marginTop:wp('2%'),fontSize:wp('3.9%'),fontWeight:"500",textDecorationLine:"underline"}}>
        Monitor Your Blood Pressure at Home:
            </Text>
            <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),fontSize:wp('3.7%')}}>
            Monitoring your blood pressure at home on a regular basis provides you and your doctor with the information to best manage your blood pressure.
		
            </Text>

    <Text  style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
        My Blood Pressure is not responding to the medications my doctor prescribe. What should i do ?
    </Text>

<Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
You should contact your doctor and discuss the situation. Only your doctor is qualified to diagnose and prescribe medication, or make changes to medications in managing blood pressure.
		
</Text>
 
 <Text  style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 Are the readings different between an upper arm blood pressure monitor and a wrist blood pressure monitor?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
It is quite possible that your readings may be different from your upper arm to your wrist as blood pressure 
varies throughout the human body. All blood pressure monitors, whether upper arm or wrist, are validated in the same manner
and have the same accuracy specifications. In terms of which type of blood pressure monitor is best for you, we recommend that you
discuss this with your doctor, based on your individual needs.
			
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4%')}}>
 Blood pressure monitors are clinically proven accurate. They are clinically validated to be within the following:
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('3.7%')}}>
 Blood pressure: within +/- 3 mgHg or 2 percent
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('3.7%')}}>
 Pulse: within +/- 5 percent of reading.
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4%')}}>
 This meets or exceeds the AAMI (Association of Medical Instrumentation) standards. To understand the accuracy levels of 
 other manufacturer’s blood pressure monitors, you need to contact them. It is always important to investigate accuracy and ease
of use before purchasing a home blood pressure monitor.			
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 Will I see differences between my readings at home compared to readings in my doctor's office?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Yes, you will see some differences. This is normal and can occur for many reasons. Some of the more common reasons are:
				
 </Text>
 <View style={{flexDirection:"column",width:wp('95%')}}>
    <Text style={{marginLeft:wp("6%"),marginRight:wp("2%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>1.)A person’s blood pressure varies throughout the day, so at any given moment your blood pressure can change.</Text>
	<Text style={{marginLeft:wp("6%"),marginRight:wp("2%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>2.)In terms of the amount of change; there are published studies that show a given person’s blood pressure can change by up to 20 mm within a day, based on activity levels, food/drink intake, stress, etc.</Text>
	<Text style={{marginLeft:wp("6%"),marginRight:wp("2%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>3.)You may have a condition known as “White Coat Hypertension.” This is a condition in which a blood person’s blood pressure rises above its usual level when it is measured in a doctor’s office or clinical setting.</Text>
	<Text style={{marginLeft:wp("6%"),marginRight:wp("2%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>4.)You may have a condition known as “Masked Hypertension.” This is a situation in which a person’s blood pressure falls below its usual level when it measure in a doctor’s office or clinical setting.</Text>
 </View>

 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 What are the common causes of getting blood pressure readings that are inaccurate?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 It is quite normal for people’s blood pressure to change throughout the day and night, 
 or in different settings where you may take your blood pressure. Many things, such as stress levels, 
 food or drink intake, activity levels, even time of day can all affect a person’s blood pressure 
 reading at any given time. So, it is possible that you may just be seeing normal fluctuations in blood pressure. 
 However, below are some common situations that can lead to inconsistent or inaccurate readings:
				
 </Text>
 <Text style={{marginLeft:wp("10%"),marginRight:wp("5%"),marginTop:wp('1.5%'),fontSize:wp('4%'),fontWeight:"500",textDecorationLine:"underline"}}>
 1.)Using the wrong cuff size for your arm
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Just because the cuff may fit around your arm does not mean it is the right size cuff for you. The correct cuff size is directly related to the circumference of your arm. To get accurate readings, it is important that you are using the correct sized arm cuff. To determine your arm size, use a cloth tape measure and place midway between your elbow and your shoulder around the circumference of your upper arm. Wrap the tape measure evenly around your arm. Do not pull the tape tight. Note the precise measurement in inches.
					
 </Text>
 <Text style={{marginLeft:wp("10%"),marginRight:wp("5%"),marginTop:wp('1.5%'),fontSize:wp('4%'),fontWeight:"500",textDecorationLine:"underline"}}>
 2.)Not using the cuff correctly
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Make sure you are wrapping the cuff around your arm in the correct position. After wrapping the cuff around your arm, check the location of the brachial artery marker. The air tube should run down the center of your arm. The cuff should not be wrapped too tight or too loose. 
Look at the instruction manual for the monitor to get more detailed instructions on the specific cuff included with your unit.
				
 </Text>
 <Text style={{marginLeft:wp("10%"),marginRight:wp("5%"),marginTop:wp('1.5%'),fontSize:wp('4%'),fontWeight:"500",textDecorationLine:"underline"}}>
 3.)Activities right before taking a measurement
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Avoid eating, drinking alcohol or caffeinated beverages, smoking, exercising and bathing for 30 minutes prior to taking a measurement. It is also best to rest for 15 minutes before starting the measurement. Avoid taking a measurement during stressful times. Take the measurement in a quiet place.					
 </Text>

 <Text style={{marginLeft:wp("10%"),marginRight:wp("5%"),marginTop:wp('1.5%'),fontSize:wp('4%'),fontWeight:"500",textDecorationLine:"underline"}}>
 4.)Incorrect body position or moving too much
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Sit in a chair with your feet flat on the floor. Rest your arm on a table with your palm facing upward.
  The cuff should be level with your heart. Do not talk or move during the measurement.			
 </Text>
 
 <Text style={{marginLeft:wp("10%"),marginRight:wp("5%"),marginTop:wp('1.5%'),fontSize:wp('4%'),fontWeight:"500",textDecorationLine:"underline"}}>
 5.)Timing of taking measurements
 </Text>
 <Text style={{marginLeft:wp("12%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Try to take readings at the same general times each day (for example, once in the morning and once at night) for comparison purposes.
					
 </Text>

 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
     Are there differences between taking a blood pressure reading on the right arm vs. left arm?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Blood pressure measurement values vary from the left arm to the right arm. 
 The average is generally within 10 mmHg (millimeters of mercury) for most individuals. 
 Blood pressure monitors are generally designed for use on the left arm. 
 You should talk to your doctor before using the right arm to take a measurement.
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 Why is my wrist blood pressure monitor giving high readings?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 The most common cause of high readings when using a wrist blood pressure monitor is
  because the user does not have the wrist monitor at heart level. When using a wrist monitor, 
  pleas ensure the device is at heart level when taking a reading. Also note that there may be 
  actual differences between your blood pressure at the upper arm site and the wrist site.
		
 </Text>

 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 Does the size of the cuff matter?
 </Text>

 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Yes, it is very important to use the appropriate size cuff for your arm in order to get accurate 
 measurement results when using your home blood pressure monitor. If you use the wrong sized cuff, 
 you will likely experience inaccurate readings, inconsistent readings and error messages from the device.
			
 </Text>

 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('3%'),fontSize:wp('4.5%'),fontWeight:"bold"}}>
 Can I take a blood pressure reading measurement during exercise?
 </Text>
 <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.7%')}}>
 Blood pressure monitors are NOT intended for use during exercise or activity. 
 We recommend that you avoid eating, drinking alcohol or caffeinated beverages, smoking, bathing and exercising 
 for at least 30 minutes before taking a measurement. It is also best to rest for 15 minutes before starting the measurement.
			
 </Text>
</View>
        </ScrollView>
        )
    }
}