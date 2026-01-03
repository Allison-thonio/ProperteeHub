
import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
};

const DEFAULT_REGION = {
    latitude: 6.5244, // Lagos
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function GlobalPropertyMap({ properties, height = 250 }: Props) {
    const mapRef = useRef<MapView>(null);

    const openGoogleMaps = () => {
        // Open nearby location search in Google Maps App
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${DEFAULT_REGION.latitude},${DEFAULT_REGION.longitude}`;
        const label = 'Properties Near Me';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load maps", err));
        }
    };

    return (
        <View style={[styles.container, { height }]}>
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
                        title={prop.title}
                        description={prop.price}
                    >
                        <View style={styles.markerContainer}>
                            <View style={styles.markerBubble}>
                                <Text style={styles.markerText}>{prop.price}</Text>
                            </View>
                            <View style={styles.markerArrow} />
                        </View>
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity style={styles.expandButton} onPress={openGoogleMaps}>
                <Text style={styles.expandText}>Open in Maps ↗</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerBubble: {
        backgroundColor: '#264653',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    markerText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    markerArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 0,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#264653',
        marginBottom: -5,
    },
    expandButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    expandText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#264653',
    },
});
