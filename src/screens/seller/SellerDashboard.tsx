
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalPropertyMap from '../../components/GlobalPropertyMap';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SellerDashboard'>;
};

// Mock data to visualize the dashboard
const MOCK_PROPERTIES = [
    {
        id: '1',
        title: 'Luxury 4 Bedroom Duplex',
        price: '₦120,000,000',
        location: 'Lekki Phase 1, Lagos',
        status: 'pending', // pending, active, sold
        image: null,
        coordinates: { latitude: 6.4500, longitude: 3.4500 },
    },
    {
        id: '2',
        title: 'Plot of Land (600sqm)',
        price: '₦45,000,000',
        location: 'Sangotedo, Ajah',
        status: 'active',
        image: null,
        coordinates: { latitude: 6.4700, longitude: 3.6000 },
    }
];

// Adapter for the map component
const MAP_PROPERTIES = MOCK_PROPERTIES.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    latitude: p.coordinates.latitude,
    longitude: p.coordinates.longitude
}));

export default function SellerDashboard({ navigation }: Props) {
    const { colors, isDark } = useTheme();

    // Animation refs
    const slideAnim = React.useRef(new Animated.Value(-width)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <View style={[styles.badge, { backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8', borderColor: '#D4AF37', borderWidth: 1 }]}>
                        <Text style={{ color: '#D4AF37', fontSize: 10, fontWeight: '900' }}>VERIFYING</Text>
                    </View>
                );
            case 'active':
                return (
                    <View style={[styles.badge, { backgroundColor: colors.text }]}>
                        <Text style={{ color: colors.background, fontSize: 10, fontWeight: '900' }}>ACTIVE</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>PROPERTEEHUB</Text>
                        <Text style={[styles.subtitle, { color: colors.text }]}>OFFICIAL PARTNER</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={[styles.messageBtn, { backgroundColor: colors.background, borderColor: colors.text }]}
                            onPress={() => navigation.navigate('ChatList')}
                        >
                            <Text style={[styles.messageBtnText, { color: colors.text }]}>MESSAGES</Text>
                            <View style={styles.badgeDot} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SellerProfile')}>
                            <Image
                                style={[styles.profilePic, { borderColor: colors.text }]}
                                source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=000&color=fff' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Card */}
                <View style={[styles.statsCard, { backgroundColor: colors.text }]}>
                    <TouchableOpacity
                        style={styles.statItem}
                        onPress={() => navigation.navigate('ListingsManagement', { filter: 'active' })}
                    >
                        <Text style={[styles.statNumber, { color: colors.background }]}>12</Text>
                        <Text style={[styles.statLabel, { color: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }]}>ACTIVE</Text>
                    </TouchableOpacity>
                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }]} />
                    <TouchableOpacity
                        style={styles.statItem}
                        onPress={() => navigation.navigate('ListingsManagement', { filter: 'views' })}
                    >
                        <Text style={[styles.statNumber, { color: colors.background }]}>45</Text>
                        <Text style={[styles.statLabel, { color: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }]}>VIEWS</Text>
                    </TouchableOpacity>
                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }]} />
                    <TouchableOpacity
                        style={styles.statItem}
                        onPress={() => navigation.navigate('InquiriesList')}
                    >
                        <Text style={[styles.statNumber, { color: colors.background }]}>3</Text>
                        <Text style={[styles.statLabel, { color: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }]}>INQUIRIES</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>REAL ESTATE MAP</Text>
                </View>

                {/* Map Widget */}
                <View style={{ paddingHorizontal: 20 }}>
                    <GlobalPropertyMap properties={MAP_PROPERTIES} height={200} userRole="seller" />
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>MY LISTINGS</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ListingsManagement', {})}>
                        <Text style={styles.seeAll}>SEE ALL</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.listContainer}>
                    {MOCK_PROPERTIES.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.propertyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id, userRole: 'seller' })}
                        >
                            <View style={styles.cardImagePlaceholder} />
                            <View style={styles.cardContent}>
                                <View style={styles.cardTop}>
                                    {renderStatusBadge(item.status)}
                                    <Text style={[styles.price, { color: colors.text }]}>{item.price}</Text>
                                </View>
                                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                                <Text style={[styles.cardLocation, { color: colors.textSecondary }]}>{item.location.toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddProperty')}
                activeOpacity={0.8}
            >
                <Text style={styles.fabText}>ADD LISTING</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 10,
        color: '#000',
        fontWeight: '900',
        letterSpacing: 1,
    },
    profilePic: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 15,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 5,
        position: 'relative',
    },
    messageBtnText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#000',
    },
    badgeDot: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D4AF37',
        borderWidth: 1,
        borderColor: '#fff',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#000',
        marginHorizontal: 20,
        borderRadius: 4,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white',
    },
    statLabel: {
        fontSize: 9,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 6,
        fontWeight: '900',
        letterSpacing: 1,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: '100%',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    seeAll: {
        color: '#D4AF37',
        fontWeight: '900',
        fontSize: 12,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    propertyCard: {
        backgroundColor: 'white',
        borderRadius: 4,
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardImagePlaceholder: {
        height: 140,
        backgroundColor: '#f8f8f8',
    },
    cardContent: {
        padding: 15,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
    },
    price: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000',
        marginBottom: 4,
    },
    cardLocation: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#D4AF37',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    fabText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
