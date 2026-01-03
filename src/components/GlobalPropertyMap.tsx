
import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';

type PropertyLocation = {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
    price: string;
};

type Props = {
    properties: PropertyLocation[];
    height?: number;
    userRole?: 'seller' | 'buyer' | 'investor';
};

const DEFAULT_REGION = {
    latitude: 6.5244, // Lagos
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function GlobalPropertyMap({ properties, height = 250, userRole }: Props) {
    const { colors, isDark } = useTheme();
    const mapRef = useRef<MapView>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const openGoogleMaps = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${DEFAULT_REGION.latitude},${DEFAULT_REGION.longitude}`;
        const label = 'Properties';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load maps", err));
        }
    };

    return (
        <View style={[styles.container, { height, borderColor: colors.border }]}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={DEFAULT_REGION}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {properties.map(prop => (
                    <Marker
                        key={prop.id}
                        coordinate={{ latitude: prop.latitude, longitude: prop.longitude }}
                        onPress={() => navigation.navigate('PropertyDetails', { propertyId: prop.id, userRole })}
                    >
                        <View style={styles.markerContainer}>
                            <View style={[styles.markerBubble, { backgroundColor: colors.text, borderColor: colors.background }]}>
                                <Text style={[styles.markerText, { color: colors.background }]}>{prop.price}</Text>
                            </View>
                            <View style={[styles.markerArrow, { borderTopColor: colors.text }]} />
                        </View>
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity style={[styles.expandButton, { backgroundColor: colors.background, borderColor: colors.text }]} onPress={openGoogleMaps}>
                <Text style={[styles.expandText, { color: colors.text }]}>OPEN IN MAPS</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerBubble: {
        backgroundColor: '#000',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    markerText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    markerArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 0,
        borderTopWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#000',
        marginBottom: -3,
    },
    expandButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    expandText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },
});

