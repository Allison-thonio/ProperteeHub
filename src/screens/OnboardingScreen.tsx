
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'DISCOVER YOUR SPACE',
        description: 'Explore the finest real estate opportunities tailored to your premium lifestyle.',
        image: require('../../assets/onboarding/House bookshelves-rafiki.png'),
    },
    {
        id: '2',
        title: 'SEAMLESS TRANSACTIONS',
        description: 'Legal simplified. We handle the paperwork so you can focus on your new home.',
        image: require('../../assets/onboarding/Building permit-pana.png'),
    },
    {
        id: '3',
        title: 'LUXURY LIVING',
        description: 'From home cinemas to infinity pools, find amenities that define modern comfort.',
        image: require('../../assets/onboarding/Home cinema-pana.png'),
    },
    {
        id: '4',
        title: 'KNOWLEDGE IS POWER',
        description: 'Expert insights and market trends to guide your next big investment.',
        image: require('../../assets/onboarding/House bookshelves-amico.png'),
    },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
    const { colors, theme, isDark } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const goToNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('RoleSelection');
        }
    };

    const skip = () => {
        navigation.replace('RoleSelection');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <TouchableOpacity style={styles.skipBtn} onPress={skip}>
                <Text style={[styles.skipText, { color: colors.textSecondary }]}>SKIP</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={ONBOARDING_DATA}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                        <View style={styles.textContainer}>
                            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                            <Text style={[styles.description, { color: colors.textSecondary }]}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.indicatorContainer}>
                    {ONBOARDING_DATA.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                { backgroundColor: currentIndex === index ? colors.primary : colors.border },
                                currentIndex === index && styles.indicatorActive
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.nextBtn, { backgroundColor: colors.text }]}
                    onPress={goToNext}
                >
                    <Text style={[styles.nextBtnText, { color: colors.background }]}>
                        {currentIndex === ONBOARDING_DATA.length - 1 ? 'GET STARTED' : 'NEXT'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    skipBtn: {
        position: 'absolute',
        top: 60,
        right: 30,
        zIndex: 10,
    },
    skipText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#888',
        letterSpacing: 1,
    },
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center',
        letterSpacing: 1.5,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    indicator: {
        height: 3,
        width: 20,
        borderRadius: 2,
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: '#D4AF37',
        width: 30,
    },
    indicatorInactive: {
        backgroundColor: '#eee',
    },
    nextBtn: {
        backgroundColor: '#000',
        paddingVertical: 18,
        paddingHorizontal: 60,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
    },
    nextBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
    },
});
