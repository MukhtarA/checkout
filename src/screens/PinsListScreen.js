import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import MapView, {Marker, AnimatedRegion, Callout} from 'react-native-maps';
import { FontAwesome, Feather, Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {tips} from "../constants";

const PinsListScreen = (props) => {


    return (
        <SafeAreaView style={styles.container}>
            {tips.map((item) =>
                <View style={styles.calloutView} >
                    <View>
                        <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.title}</Text>
                        <Text style={{ fontWeight: '300', fontSize: 14 }}>{item.description}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: 'row', marginTop: 5, alignContent: "center", alignItems: 'center'
                    }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.color, marginRight: 5 }} />
                        <Text
                            style={{
                                fontWeight: '400',
                                fontSize: 14,
                                textAlign: "center",
                            }}>
                            {item.tag}
                        </Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: '#c7c7c7',
        borderBottomWidth: 1
    }
});

export default PinsListScreen;
