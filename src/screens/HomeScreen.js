import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';
import MapView, {Marker, AnimatedRegion, Callout} from 'react-native-maps';
import { FontAwesome, FontAwesome5, Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {tips} from "../constants";

const HomeScreen = ({ navigation }) => {
    const [mainMarker, setMainMarker] = useState({ latitude: 43.238949,
        longitude: 76.889709})
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isAppleMap, setIsAppleMap] = useState(false)

    const _map = useRef(null);

    const zoomToMyLocation = () => {
        _map.current.animateCamera(
            {
                center: {
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                },
                pitch: 2,
                heading: 20,
                zoom: 60,
                altitude: 100
            },
            5000
        );
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={{
                    latitude: 43.238949,
                    longitude: 76.889709,
                }}
                style={styles.map}
                showsUserLocation={true}
                provider={isAppleMap && "google"}
            >
                {tips.map((item) =>
                    <Marker key={item.title} image={item.tag === 'coffee' ? require('../assets/icons/coffeeIcon.png') : require('../assets/icons/coffeeIcon.png')} coordinate={item.coordinate}>
                        <Callout onPress={() => navigation.navigate('List', { name: 'Jane' })} tooltip>
                            <View style={styles.calloutView} >
                                <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.title}</Text>
                                <Text style={{ fontWeight: '300', fontSize: 14 }}>{item.description}</Text>
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
                        </Callout>
                    </Marker>
                )}
            </MapView>
            <View style={styles.header}>
                <FontAwesome5 onPress={() => navigation.navigate('Run')}
                                        name="running" size={24} color="black" />
                <Text>Checkout</Text>
                <MaterialCommunityIcons onPress={() => navigation.navigate('List')}
                                        name="animation" size={24} color="black" />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={zoomToMyLocation}>
                    <Octicons name="plus" size={22} color="blue" />
                </Pressable>
                <Pressable onPress={zoomToMyLocation}>
                    <Entypo name="minus" size={22} color="blue" />
                </Pressable>
                <Pressable onPress={zoomToMyLocation}>
                    <FontAwesome name="location-arrow" size={22} color="blue" />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        paddingHorizontal: 10,
        bottom: 100,
        right: 30,
        position: "absolute",
        width: 40,
        height: 120,
        borderRadius: 50,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    header: {
        width: Dimensions.get('window').width - 120,
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        top: 55,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 100
    },
    calloutView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-between",
    }
});

export default HomeScreen;
