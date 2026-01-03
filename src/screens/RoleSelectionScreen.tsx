
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

            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>P</Text>
                </View>
                <Text style={styles.brandTitle}>PROPERTEEHUB</Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>WELCOME</Text>
                <Text style={styles.subtitle}>SELECT YOUR JOURNEY ON THE PLATFORM</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.roleBtnActive}
                    onPress={() => navigation.navigate('BuyerRegister')}
                >
                    <Text style={styles.roleBtnTextActive}>I AM A BUYER</Text>
                    <Text style={styles.roleBtnSubActive}>FIND THE PERFECT PROPERTY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.roleBtn}
                    onPress={() => navigation.navigate('SellerRegister')}
                >
                    <Text style={styles.roleBtnText}>I AM A SELLER</Text>
                    <Text style={styles.roleBtnSub}>LIST YOUR EXCLUSIVE PROPERTIES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.roleBtn}>
                    <Text style={styles.roleBtnText}>I AM AN INVESTOR</Text>
                    <Text style={styles.roleBtnSub}>EXPLORE HIGH-YIELD OPPORTUNITIES</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>ALREADY HAVE AN ACCOUNT?</Text>
                <TouchableOpacity>
                    <Text style={styles.loginText}> LOG IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logoCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoText: {
        color: '#D4AF37',
        fontSize: 30,
        fontWeight: '900',
    },
    brandTitle: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 4,
        color: '#000',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 10,
        color: '#888',
        fontWeight: '800',
        letterSpacing: 1,
    },
    content: {
        gap: 15,
    },
    roleBtn: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#eee',
    },
    roleBtnActive: {
        backgroundColor: '#000',
        padding: 24,
        borderRadius: 4,
    },
    roleBtnText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
        marginBottom: 5,
    },
    roleBtnTextActive: {
        fontSize: 14,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 1,
        marginBottom: 5,
    },
    roleBtnSub: {
        fontSize: 9,
        color: '#888',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    roleBtnSubActive: {
        fontSize: 9,
        color: '#D4AF37',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#888',
        letterSpacing: 1,
    },
    loginText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 1,
    },
});
