import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { Circle } from "react-native-svg";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const STEP_TOTAL = 50,
    HUNDRED = 100;
 
export default class CircularProgressBar extends PureComponent {
    state = {
        fill: 0,
        percentage: 0
    }
    // calculate steps percentage
    calcualate_step_percentage = steps => {
        let totalsteps = STEP_TOTAL;
        let percentage = Number((steps / STEP_TOTAL) * HUNDRED);
        let final_steps_percemntage = percentage === HUNDRED ?
            percentage :
            percentage.toFixed(1);
        // svg graph width percentage calculations
        let roundedpercentage = Math.round(final_steps_percemntage, 2),
            fill_Value = this.state.fill !== roundedpercentage ? (this.setState({
                fill: roundedpercentage,
                percentage: final_steps_percemntage
            })) : {
                    percentage: final_steps_percemntage
                };
    };
    render() {
        const { steps } = this.props;
        let steppercentage = this.calcualate_step_percentage(steps); // step percentage
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Daily goal {STEP_TOTAL} steps!</Text>
                <AnimatedCircularProgress
                    arcSweepAngle={240}
                    rotation={240}
                    lineCap="round"
                    tintColorSecondary="#00e0ff"
                    size={210}
                    width={5}
                    fill={this.state.fill}
                    tintColor="#ff0000"
                    padding={10}
                    renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                    backgroundColor="#FFEB3B">
                    {
                        (fill) => (
                            <Text style={styles.fontpercentage}>
                                {this.state.percentage}%
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>

            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    fontpercentage: {
        fontSize: 50,
        marginTop: -40

    },
    headerText: {
        marginBottom: 20
    }
})
