
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
import { useTheme } from '../context/ThemeContext';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RoleSelection'>;
};

export default function RoleSelectionScreen({ navigation }: Props) {
    const { colors, toggleTheme, isDark } = useTheme();

    // Animation refs
    const slideAnimLogo = React.useRef(new Animated.Value(-width)).current;
    const slideAnimHeader = React.useRef(new Animated.Value(-width)).current;
    const slideAnimButtons = React.useRef(new Animated.Value(-width)).current;
    const fadeAnimHero = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.stagger(100, [
            Animated.timing(fadeAnimHero, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnimLogo, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnimHeader, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnimButtons, {
                toValue: 0,
                tension: 15,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleNavigation = (screen: keyof RootStackParamList) => {
        Animated.timing(slideAnimButtons, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate(screen as any);
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <Animated.View style={[styles.topSection, { opacity: fadeAnimHero }]}>
                <Image
                    source={require('../../assets/onboarding/Relaxing at home-amico.png')}
                    style={styles.heroImage}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
                    <Text style={[styles.themeToggleText, { color: colors.primary }]}>
                        {isDark ? 'LIGHT MODE' : 'DARK MODE'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.logoContainer, { transform: [{ translateX: slideAnimLogo }] }]}>
                <View style={[styles.logoCircle, { backgroundColor: colors.text }]}>
                    <Text style={[styles.logoText, { color: colors.primary }]}>P</Text>
                </View>
                <Text style={[styles.brandTitle, { color: colors.text }]}>PROPERTEEHUB</Text>
            </Animated.View>

            <Animated.View style={[styles.header, { transform: [{ translateX: slideAnimHeader }] }]}>
                <Text style={[styles.title, { color: colors.text }]}>WELCOME</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>SELECT YOUR JOURNEY ON THE PLATFORM</Text>
            </Animated.View>

            <Animated.View style={[styles.content, { transform: [{ translateX: slideAnimButtons }] }]}>
                <TouchableOpacity
                    style={[styles.roleBtnActive, { backgroundColor: colors.text }]}
                    onPress={() => handleNavigation('BuyerRegister')}
                >
                    <Text style={[styles.roleBtnTextActive, { color: colors.background }]}>I AM A BUYER</Text>
                    <Text style={[styles.roleBtnSubActive, { color: colors.primary }]}>FIND THE PERFECT PROPERTY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => handleNavigation('SellerRegister')}
                >
                    <Text style={[styles.roleBtnText, { color: colors.text }]}>I AM A SELLER</Text>
                    <Text style={[styles.roleBtnSub, { color: colors.textSecondary }]}>LIST YOUR EXCLUSIVE PROPERTIES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.roleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.roleBtnText, { color: colors.text }]}>I AM AN INVESTOR</Text>
                    <Text style={[styles.roleBtnSub, { color: colors.textSecondary }]}>EXPLORE HIGH-YIELD OPPORTUNITIES</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>ALREADY HAVE AN ACCOUNT?</Text>
                <TouchableOpacity>
                    <Text style={[styles.loginText, { color: colors.primary }]}> LOG IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    topSection: {
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    themeToggle: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5,
    },
    themeToggleText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoText: {
        fontSize: 24,
        fontWeight: '900',
    },
    brandTitle: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 3,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    content: {
        gap: 12,
    },
    roleBtn: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 1,
    },
    roleBtnActive: {
        padding: 20,
        borderRadius: 4,
    },
    roleBtnText: {
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    roleBtnTextActive: {
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    roleBtnSub: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    roleBtnSubActive: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    loginText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
