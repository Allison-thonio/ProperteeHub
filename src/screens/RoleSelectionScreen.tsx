
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { StatusBar } from 'expo-status-bar';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RoleSelection'>;
};

export default function RoleSelectionScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Text style={styles.title}>ProperteeHub</Text>
                <Text style={styles.subtitle}>Choose your purpose</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('SellerRegister')}
                >
                    <Text style={styles.cardTitle}>I am a Seller</Text>
                    <Text style={styles.cardDescription}>List properties for sale, rent, or shortlet.</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('BuyerRegister')}
                >
                    <Text style={styles.cardTitle}>I am a Buyer / Renter</Text>
                    <Text style={styles.cardDescription}>Find your dream home or next investment.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>I am an Investor</Text>
                    <Text style={styles.cardDescription}>Explore high-value real estate opportunities.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7', // Off-white clean background
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    content: {
        gap: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#888',
        lineHeight: 20,
    },
});
