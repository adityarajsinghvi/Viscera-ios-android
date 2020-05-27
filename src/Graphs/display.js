import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
    Animated
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import BloodGlucose from './Yearly/BloodGlucose'
import BloodGlucoseWeekly from './Weekly/BloodGlucoseWeekly'
var { height, width } = Dimensions.get('window');

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
class Menu1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, title: "Blood Glucose", color: "#FF4500", image: "https://img.icons8.com/color/70/000000/name.png" },
                { id: 2, title: "Blood Pressure", color: "#87CEEB", image: "https://img.icons8.com/office/70/000000/home-page.png" },
                { id: 3, title: "Heart Rate", color: "#4682B4", image: "https://img.icons8.com/color/70/000000/two-hearts.png" },
                { id: 4, title: "Oxygen", color: "#6A5ACD", image: "https://img.icons8.com/color/70/000000/family.png" },
                { id: 5, title: "Weight", color: "#FF69B4", image: "https://img.icons8.com/color/70/000000/groups.png" },
            ],
            animationValueBloodGlucose: new Animated.Value(150),
            animationValueBloodPressure: new Animated.Value(150),
            animationValueHeartRate: new Animated.Value(150),
            animationValueOxygen: new Animated.Value(150),
            animationValueWeight: new Animated.Value(150),
            viewStateBloodGlucose: true,
            viewStateBloodPressure: true,
            viewStateHeartRate: true,
            viewStateOxygen: true,
            viewStateWeight: true
        };
    }


    toggleAnimationBloodGlucose = () => {

        if (this.state.viewStateBloodGlucose == true) {
            Animated.spring(this.state.animationValueBloodGlucose, {
                toValue: 450,
                timing: 1
            }).start(() => {
                this.setState({ viewStateBloodGlucose: false })
            });
        }
        else {
            Animated.spring(this.state.animationValueBloodGlucose, {
                toValue: 150,
                timing: 50
            }).start(this.setState({ viewStateBloodGlucose: true })
            );
        }
    }

    toggleAnimationBloodPressure = () => {

        if (this.state.viewStateBloodPressure == true) {
            Animated.spring(this.state.animationValueBloodPressure, {
                toValue: 450,
                timing: 10
            }).start(() => {
                this.setState({ viewStateBloodPressure: false })
            });
        }
        else {
            Animated.spring(this.state.animationValueBloodPressure, {
                toValue: 150,
                timing: 10
            }).start(this.setState({ viewStateBloodPressure: true })
            );
        }
    }

    toggleAnimationHeartRate = () => {

        if (this.state.viewStateHeartRate == true) {
            Animated.spring(this.state.animationValueHeartRate, {
                toValue: 450,
                timing: 10
            }).start(() => {
                this.setState({ viewStateHeartRate: false })
            });
        }
        else {
            Animated.spring(this.state.animationValueHeartRate, {
                toValue: 150,
                timing: 10
            }).start(this.setState({ viewStateHeartRate: true })
            );
        }
    }

    toggleAnimationOxygen = () => {

        if (this.state.viewStateOxygen == true) {
            Animated.spring(this.state.animationValueOxygen, {
                toValue: 450,
                timing: 10
            }).start(() => {
                this.setState({ viewStateOxygen: false })
            });
        }
        else {
            Animated.spring(this.state.animationValueOxygen, {
                toValue: 150,
                timing: 10
            }).start(this.setState({ viewStateOxygen: true })
            );
        }
    }

    toggleAnimationWeight = () => {

        if (this.state.viewStateWeight == true) {
            Animated.spring(this.state.animationValueWeight, {
                toValue: 450,
                timing: 10
            }).start(() => {
                this.setState({ viewStateWeight: false })
            });
        }
        else {
            Animated.spring(this.state.animationValueWeight, {
                toValue: 150,
                timing: 10
            }).start(this.setState({ viewStateWeight: true })
            );
        }
    }


    GraphForBloodGlucose = () => {

    }
    GraphForBloodPressure = () => {
        this.props.navigation.navigate();
    }
    GraphForHeartRate = () => {
        this.props.navigation.navigate();
    }
    GraphForOxygen = () => {
        this.props.navigation.navigate();
    }
    GraphForWeight = () => {
        this.props.navigation.navigate();
    }


    render() {

        const animatedStyleBloodGlucose = {
            width: this.state.animationValueBloodGlucose,
            height: this.state.animationValueBloodGlucose
        }

        const animatedStyleBloodPressure = {
            width: this.state.animationValueBloodPressure,
            height: this.state.animationValueBloodPressure
        }

        const animatedStyleHeartRate = {
            width: this.state.animationValueHeartRate,
            height: this.state.animationValueHeartRate
        }

        const animatedStyleWeight = {
            width: this.state.animationValueWeight,
            height: this.state.animationValueWeight
        }

        const animatedStyleOxygen = {
            width: this.state.animationValueOxygen,
            height: this.state.animationValueOxygen
        }


        return (
            <ScrollView style={styles.container}>

                <Animated.View style={animatedStyleBloodGlucose}>
                    <TouchableWithoutFeedback onPress={() => { this.toggleAnimationBloodGlucose() }}>
                        <View style={[styles.card, { backgroundColor: "#000000" }]}>
                            {/* <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/color/70/000000/name.png" }} /> */}
                            <Text style={styles.title}>Blood Glucose</Text>
                            {/* <View style={{}}>

                        </View> */}
                            <ScrollView horizontal={true} >
                                <BloodGlucose />
                                <BloodGlucoseWeekly />

                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>

                {/* <Animated.View style={animatedStyleBloodPressure}>
                    <TouchableWithoutFeedback style={[styles.card, { backgroundColor: "#87CEEB" }]} onPress={() => { this.toggleAnimationBloodPressure() }} >
                        <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/office/70/000000/home-page.png" }} />
                        <Text style={styles.title}>Blood Pressure</Text>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={animatedStyleHeartRate}>
                    <TouchableWithoutFeedback style={[styles.card, { backgroundColor: "#4682B4" }]} onPress={() => { this.toggleAnimationHeartRate() }} >
                        <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/color/70/000000/two-hearts.png" }} />
                        <Text style={styles.title}>Heart Rate</Text>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={animatedStyleOxygen}>
                    <TouchableWithoutFeedback style={[styles.card, { backgroundColor: "#6A5ACD" }]} onPress={() => { this.toggleAnimationOxygen() }} >
                        <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/color/70/000000/family.png" }} />
                        <Text style={styles.title}>Oxygen</Text>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={animatedStyleWeight}>
                    <TouchableWithoutFeedback style={[styles.card, { backgroundColor: "#FF69B4" }]} onPress={() => { this.toggleAnimationWeight() }}>
                        <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/color/70/000000/groups.png" }} />
                        <Text style={styles.title}>Weight</Text>
                    </TouchableWithoutFeedback>
                </Animated.View> */}

            </ScrollView>
        )
    }




}

class Bloodglucose1 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    jfh
                </Text>
            </View>
        )
    }

}



const SwitchNavigator = createSwitchNavigator({
    Menu1: Menu1,
    Bloodglucose1: Bloodglucose1,
    //   
})
const SwitchNav = createAppContainer(SwitchNavigator);



export default class Menu extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SwitchNav />
            </View>
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
        backgroundColor: "#E6E6E6",
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
    cardImage: {
        height: 70,
        width: 70,
    },
    title: {
        fontSize: 28,
        // flex: 1,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft: 80
    },
    subTitle: {
        fontSize: 12,
        flex: 1,
        color: "#FFFFFF",
    },
    icon: {
        height: 20,
        width: 20,
    }
});
