import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,TouchableOpacity,
    ScrollView
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Header from '../Components/Header'
// import AppLayout from '../Layouts/AppLayout'


export default class FaqBG extends Component {
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

                    <Text>Blood Glucose</Text>

                    <Text style={{ fontWeight: "bold", margin: wp('5%'), fontSize: wp('6%') }}>What are blood glucose levels?</Text>
                    <Text style={{ marginLeft: wp("6%"), marginRight: wp("5%"), fontSize: wp('4%') }}>
                        Blood sugar levels are literally the amount of glucose in the blood, sometimes called the serum glucose level. 
                        Usually, this amount is expressed as millimoles per litre (mmol/l) and stay stable amongst people without diabetes at around</Text>
                    <Text style={{ marginLeft: wp("6%"), fontWeight: "bold" }}>4-8mmol/L.</Text>
                    <Text style={{ marginLeft: wp("6%"), marginRight: wp("5%"), fontSize: wp('4%'), marginTop: wp('1%') }}>
                        Spikes in blood sugar will occur following meals, and levels will usually be at their lowest in the early mornings.
                        When it comes to people with diabetes, blood sugar fluctuates more widely.
                    </Text>
                    <Text style={styles.QuestionStyle}>
                        Why do blood glucose levels need to be controlled?
                    </Text>
                    <Text style={styles.innerText}>
                    High levels of glucose present in the blood over a sustained period of time end up damaging the blood vessels. 
                    Although this does not sound too serious, the list of resultant complications is.
                    </Text>
                    <Text style={styles.innerText}>
                    Poorly controlled blood glucose levels can increase your chances of developing diabetes complications 
                    including nephropathy, neuropathy, retinopathy and cardiovascular diseases.
                    </Text>
                    <Text style={styles.innerText}>
                    The time-scale for the development of these complications is usually years, 
                    but be aware that type 2 diabetes is often not diagnosed until a relatively late stage.
                    </Text>
                    
                    <Text style={styles.QuestionStyle}>
                    How do I find out what my blood glucose levels are?
                    </Text>
                    <Text style={styles.innerText}>
                    You can use home testing kits, although before doing so read our guide to blood glucose monitors.
                    </Text>
                    <Text style={styles.innerText}>
                    Measure levels by putting a drop of blood on a strip and placing it into a BGM (blood glucose meter). 
                    Prick your finger with a specially designed lancet to draw blood.
                    </Text>

                    <Text style={styles.QuestionStyle}>
                    How often should I test my blood glucose levels?
                    </Text>
                    <Text style={styles.innerText}>
                    There’s no hard and fast rule about how often one should test as different people will have different regimes.
  					
                    </Text>
                    <Text style={styles.innerText}>
                    The simplest answer is to test as many times as it takes to feel confident about your blood glucose control, 
                    however, not everyone may be happy testing several time per day and some may not be prescribed as much blood test 
                    strips as they’d like.
  					
                    </Text>
                    <Text style={styles.innerText}>
                    It is advisable to test either side of meals, once before eating and again after the meal to gauge 
                    how different meals affect your sugar levels.
                    </Text>

                    <Text style={styles.innerText}>
                    It is a good idea to test before and after sleep until you have a good idea of whether your sugar levels are rising, 
                    falling or staying put over night.
                    </Text>

                    <Text style={styles.QuestionStyle}>
                    How accurate are blood glucose meters?
                    </Text>
                    <Text style={styles.innerText}>
                    Blood glucose monitors are allowed to have up to 20% error in accuracy.
  					Meter companies recognise the importance of an accurate meter and there is a certain amount of competition
                     to produce the most accurate blood glucose meter.
  					Different meters may also vary compared with each other as a result of environmental conditions, such as heat, low temperatures or humidity.
  					One of the best ways to ensure accurate blood test results is to wash and dry your hands 
                      (or alternate site) before testing as unwashed hands can sometimes make a marked difference to the reading.
                    </Text>

                    <Text style={styles.QuestionStyle}>
                    How does blood glucose testing help to control diabetes?
                    </Text>
                    <Text style={styles.innerText}>
                    Blood glucose testing can help to control diabetes in a number of ways:
                    </Text>
                    <Text style={styles.innerPoints}>1.)Informing food choices and portion quantities</Text>
  					<Text style={styles.innerPoints}>2.)Assisting medication dosing decisions</Text>
  					<Text style={styles.innerPoints}>3.)Identifying periods of high or low blood glucose levels</Text>
                    <Text style={{marginLeft:wp("6%"),marginRight:wp("5%"),marginTop:wp('1%'),fontSize:wp('3.9%')}}>In turn, this can lead to:</Text>
  					<Text style={styles.innerPoints}>1.)A reduction in HbA1c (improved long-term glycemic control)</Text>
  					<Text style={styles.innerPoints}>2.)A lower risk of serious diabetic complications</Text>
  					<Text style={styles.innerPoints}>3.)Reduced depressive symptoms</Text>
  					<Text style={styles.innerPoints}>4.)Improved confidence in self-management of diabetes</Text>
  			
                    <Text style={styles.QuestionStyle}>
                    What are the disadvantages of blood glucose testing?
                    </Text>
                    <Text style={styles.innerText}>
                    Disadvantages of blood glucose testing may include:
                    </Text>
  						<Text  style={styles.innerPoints}>
                            1.)Pain when pricking fingers
                        </Text>
  						<Text  style={styles.innerPoints}>
                            2.)Cost of blood glucose testing supplies - if these need to be self-funded
                        </Text>
  						<Text  style={styles.innerPoints}>
                            3.)Anxiety if no education has been provided on how to interpret and act on the glucose results
                        </Text>

                        <Text style={styles.QuestionStyle}>
                            Who is blood glucose testing suitable for?
                        </Text>
                        <Text style={styles.innerText}>
                        Many people with diabetes benefit from blood glucose testing if they are provided with education on how to interpret 
                        their results and take appropriate action to improve their control.
                        </Text>
                        <Text style={styles.innerText}>
                        All people who take insulin should regularly test their blood glucose levels and people on certain tablets, 
                        such as sulfonylureas, should also test their blood glucose levels to identify any periods of low blood glucose levels.
                        </Text>
                        <Text style={styles.innerText}>
                        People on other medications that do not cause hypoglycemia may not need to test their blood glucose levels, 
                        however, many people will wish to check their blood sugar levels in order to help them make decisions to maintain 
                        and improve their diabetes control.
                        </Text >
                        <Text style={styles.QuestionStyle}>Should I test my blood glucose levels?</Text>
  				        <Text style={styles.innerText}>
                      Attitudes to blood glucose testing can vary quite considerably. Some people with diabetes,
                       particularly those that have not received any education on managing their diabetes, find that blood glucose 
                       testing is not helpful and only contributes to anxiety.
                       </Text>
                        <Text style={styles.innerText}>
  					   However, other people, particularly those that are aware of how to interpret results and take appropriate action, 
                       find blood glucose testing to be vital to their diabetes management.
                       </Text>
                       <Text style={styles.innerText}>
  					    Some people with type 2 diabetes on non-insulin medication regimes may find it difficult to be prescribed blood glucose 
                      testing equipment.
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
    }
});