import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Header from './Components/Header'
// import AppLayout from '../Layouts/AppLayout'


export default class TermOfUse extends Component {
    state = {
        showBG: false,
        showBP: false,
        showBMI: false,
        showOxygen: false
    };


    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:"#6F70AE"}}>
            <ScrollView style={{ flex: 1 ,backgroundColor:'white'}}>
                <Header props={this.props} title="Terms of Use" />
                <View>
                    <Text style={styles.QuestionStyle}>
                    Terms of Use
                    </Text>
                    <Text style={styles.innerText}>
                    Please review the following terms and conditions before using this website. These terms and conditions, which may be modified from time to time, apply to all visitors to, or users of, this website.
			   </Text>
                   	
                     <Text style={styles.QuestionStyle}>
                     Your General Use
                      </Text>
                    <Text style={styles.innerText}>
                    Your use of the website confirms your acceptance of these terms and conditions and your agreement to be bound by them. If you do not accept these terms and conditions, do not use this website. In the event of a violation of these terms and conditions, this website reserves the right to seek all remedies available by law and in equity. We may terminate your access or use of this website at any time, for any reason or no reason and without prior notice to you. We may at any time and from time to time revise these terms and conditions by updating this posting. You should visit this page from time to time to review the then current terms and conditions because they are binding on you. Your use of this website following any such revisions constitutes your agreement to follow and be bound by the terms as revised.
				 </Text>

                    <Text style={styles.QuestionStyle}>
                    Our Products
                    </Text>
                    <Text style={styles.innerText}>
                    All features, specifications, products and prices of products and services described on this website are subject to change at any time without notice. From time to time there may be information on the website that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, and availability. We make no representation as to the completeness, accuracy, or currency of any information on this website. We reserve the right to make changes in information about price, description, or availability without notice. We reserve the right, without prior notice, to limit the order quantity on any product and/or refuse service to any customer. We have made every effort to display as accurately as possible the colors of our products that appear on the website; however, the actual color you will see will depend on your computer, and we cannot guarantee that your computer will accurately display our colors. The inclusion of any products or services on this website does not imply or warrant that these products or services will be available over the Internet or in each of our stores at any particular time.
				</Text>

                    <Text style={styles.QuestionStyle}>
                    Disclaimer
                     </Text>
                    <Text style={styles.innerText}>
                    Our products are built by a third-party manufacturer. To preview our product(s) you can place a sample order.
				</Text>

                    <Text style={styles.QuestionStyle}>
                    Comments and other Communications
                    </Text>
                    <Text style={styles.innerText}>
                    All comments, feedback, suggestions, ideas, and other communications submitted or offered to this website in connection with your use of this website shall be and remain the property of this website. This website shall be free to use any ideas, concepts, know-how, or techniques contained in any communication you send to us for any purpose whatsoever including, but not limited to, developing, manufacturing and marketing products using such information. Any personally identifiable information you provide to this website shall be subject to the website’s Privacy Policy.
			 </Text>

                    <Text style={styles.QuestionStyle}>
                    Your Account</Text>
                    <Text style={styles.innerText}>
                    You may choose to register with us through our website and create an account. If you do, you can access your account by providing an email address and password. You are responsible for maintaining the confidentiality of your access information and for controlling access to your account and your computer. You agree to accept responsibility for all activities that occur under your account. We may terminate your account at any time, for any reason or no reason and without prior notice to you.
			    </Text>

                    <Text style={styles.QuestionStyle}>
                    Linking</Text>
                     <Text style={styles.innerText}>
                     Links may be established from this website to one or more external websites or resources operated by third parties (the “Third Party Sites”). In addition, certain Third Party Sites also may provide links to the website. None of these links should be deemed to imply that this website endorses the Third Party Sites or any content therein. This website does not control and is not responsible or liable for any Third Party Sites or any content, advertising, products, or other materials on or available from such Third Party Sites. Access to any Third Party Sites is at your own risk and this website will have no liability arising out of or related to such websites and/or their content or for any damages or loss caused or alleged to be caused by or in connection with any purchase, use of or reliance on any such content, goods, or services available on or through any such Third Party Site.
				</Text >
                <Text style={styles.QuestionStyle}>    
                Limitation of Liability   
                </Text>    
                <Text style={styles.innerText}>
                In no event will this website be liable to any party for any direct, indirect, incidental, special, consequential or punitive damages for use of this site or any other linked website, including, without limitation, loss profits or revenues, costs, of replacement, business interruptions, loss of data or damages resulting from use of or reliance on the information present, even if this website is expressly advised about the possibility of such damages. In some jurisdictions, limitations of liability are not permitted. In such jurisdictions, the foregoing limitations on liability may not apply to you.
				</Text > 


                </View>
            </ScrollView>
            </SafeAreaView>
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
 
});