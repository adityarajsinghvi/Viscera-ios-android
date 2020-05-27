import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Header from '../Components/Header'
// import AppLayout from '../Layouts/AppLayout'


export default class FaqOxygen extends Component {
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

                    <Text>Oxygen Saturation</Text>

                 
                    <Text style={styles.QuestionStyle}>
                    How accurate is the oximeter and is the accuracy claim backed by evidence, e.g., studies and published papers?
                    </Text>
                    <Text style={styles.innerText}>
                        Nonin Medical's finger pulse oximeters have clinically proven accuracy in the widest range of situations confirmed by the following research:	
                    </Text>
                    <Text style={styles.innerPoints}>1.)Severinghaus JW. SpO2 Accuracy of PureSAT® Signal Processing Technology. University of California at San Francisco Hypoxia Research Laboratory</Text>
	  				<Text style={styles.innerPoints}>2.)Bickler PE, Feiner JR and Severinghaus JW. Effects of skin pigmentation on pulse oximeter accuracy in low saturations. Anesthesia 2005 102(4):715-9</Text>
	  				<Text style={styles.innerPoints}>3.)Mcnab AJ, Smith M, Phillips N and Smart P. Oximeter reliability in a subzero environment. Aviat Space Environ Med 1996 67(11):1053-6</Text>
					<Text style={styles.innerPoints}>4.)Homes, S. and SJ Peffers. 2009. PCRS-UK Opinion Sheet No. 28: Pulse Oximetry in Primary Care. www.pcrs-uk.org</Text>  						
                    <Text style={styles.innerPoints}>5.)Schermer T, et al. 2009. Pulse oximetry in family practice: indications and clinical observations in patients with COPD. Fam Pract 26(6):524-31</Text>
	  				<Text style={styles.innerPoints}>6.)Neuman MR. 1987. Pulse oximetry: physical principles, technical realization and present limitations. Adv Exp Med Biol 220:135-44</Text>
	  					
                     <Text style={styles.QuestionStyle}>
                     Will the oximeter work on a variety of patients? Does your oximeter specifically claim accuracy for patients with low circulation or dark skin tones?
                    </Text>
                    <Text style={styles.innerText}>
                    Yes. Only Nonin Medical uses PureSAT® pulse-by-pulse filtering to provide proven accuracy in situations that are challenging such as light-to-dark skinned patients, good to low perfusion and more.
	  				 </Text>

                    <Text style={styles.QuestionStyle}>
                    Will one device work on a variety of finger sizes, including very small fingers up to large fingers, or will I need to buy a specific sized oximeter?</Text>
                    <Text style={styles.innerText}>
                    Yes, with Nonin Medical's finger pulse oximeters, one device will work for a wide range of patients. They automatically adjust to each patient quickly and accurately and accommodate a wide range of finger thicknesses: 8 mm to 25.4 mm (0.3" to 1.0").
	  				 </Text>

                    <Text style={styles.QuestionStyle}>
                    Who offers the best warranty and has the best reputation for excellent customer service? </Text>
                    <Text style={styles.innerText}>
                    Nonin Medical's GO2 brand of finger pulse oximeters offers a 2-year warranty. Ask us how we compare. At Nonin Medical, we take pride in our superior customer support.
	  				</Text>

                    <Text style={styles.QuestionStyle}>
                    Where is the oximeter manufactured, and who will I call if I have a problem with my oximeter?</Text>
                    <Text style={styles.innerText}>
                    Nonin Medical's finger pulse oximeters are made in the USA at Nonin Medical's headquarter and manufacturing facility in Plymouth, Minnesota, with customer support centers in North America and Europe.
	  				 </Text>

                    <Text style={styles.QuestionStyle}>
                    How long can I expect to use the oximeter? (If a device does not last, a lower upfront cost can result in higher costs due to multiple replacements.) </Text>
                    <Text style={styles.innerText}>
                    The durability and reliability of Nonin Medical's finger pulse oximeters are unmatched. In fact, you will regularly see 10-year-old Nonin Medical products used in the marketplace. Nonin Medical's finger pulse oximeters protect against dropping and water spills and allow for thousands of uses in the most demanding environments.
	  			     </Text>

                    <Text style={styles.QuestionStyle}>
                    Does the oximeter introduce lead or other hazardous materials into the environment? Does it comply with international lead free and/or hazardous materials standards?  </Text>
                    <Text style={styles.innerText}>
                    Nonin Medical's finger pulse oximeters are tested to be lead free, and are RoHS compliant (Restriction of the Use of Certain Hazardous Substances in Electrical and Electronic Equipment Regulations).
	  				</Text >
                    <Text style={styles.innerText}>
                    An independent test lab analyzed the lead content in several finger pulse oximeters and showed that imports from two leading Chinese manufacturers contained "lead-rich components". Nonin Medical's products proved lead free.	
                    </Text>

                    <Text style={styles.innerText}>
                    At Nonin, we are dedicated to providing the highest quality products available at a great value. Nonin will be here long after the sale and our knowledgeable customer service representatives are always available to answer your questions.
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