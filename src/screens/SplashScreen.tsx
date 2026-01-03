
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideUpAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        console.log('SplashScreen checking mount...');
        // Run entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();

        // Navigate to Onboarding after 3 seconds
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                navigation.replace('Onboarding');
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <Animated.View style={[
                styles.content,
                {
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateY: slideUpAnim }
                    ]
                }
            ]}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>P</Text>
                </View>

                <Text style={[styles.brandTitle, { color: colors.text }]}>PROPERTEEHUB</Text>
                <View style={styles.divider} />
                <Text style={styles.tagline}>ELITE REAL ESTATE SOLUTIONS</Text>
            </Animated.View>

            <Animated.View style={[styles.bottomInfo, { opacity: fadeAnim }]}>
                <Text style={[styles.version, { color: colors.textSecondary, opacity: 0.5 }]}>VERSION 1.0.2</Text>
                <Text style={[styles.copyright, { color: colors.textSecondary, opacity: 0.3 }]}>© 2026 PROPERTEEHUB GLOBAL</Text>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D4AF37',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
        marginBottom: 25,
    },
    logoText: {
        fontSize: 50,
        fontWeight: '900',
        color: '#000',
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 6,
        marginBottom: 10,
    },
    divider: {
        width: 40,
        height: 2,
        backgroundColor: '#D4AF37',
        marginBottom: 15,
    },
    tagline: {
        fontSize: 10,
        fontWeight: '800',
        color: '#D4AF37',
        letterSpacing: 2,
    },
    bottomInfo: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    version: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 5,
    },
    copyright: {
        fontSize: 8,
        fontWeight: '600',
        letterSpacing: 1,
    }
});
