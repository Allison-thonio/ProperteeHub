
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalPropertyMap from '../../components/GlobalPropertyMap'; // Import the Map


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

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <View style={[styles.badge, { backgroundColor: '#FFF4E5' }]}>
                        <Text style={{ color: '#FF9500', fontSize: 12, fontWeight: '700' }}>🟡 Verifying</Text>
                    </View>
                );
            case 'active':
                return (
                    <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
                        <Text style={{ color: '#2E7D32', fontSize: 12, fontWeight: '700' }}>🟢 Active</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, John 👋</Text>
                    <Text style={styles.subtitle}>Propertee Realtors Ltd</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.messageBtn}
                        onPress={() => navigation.navigate('ChatList')}
                    >
                        <Text style={{ fontSize: 20 }}>💬</Text>
                        <View style={styles.badgeDot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SellerProfile')}>
                        <Image
                            style={styles.profilePic}
                            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=264653&color=fff' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stats Card */}
            <View style={styles.statsCard}>
                <TouchableOpacity
                    style={styles.statItem}
                    onPress={() => navigation.navigate('ListingsManagement', { filter: 'active' })}
                >
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Active listings</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.statItem}
                    onPress={() => navigation.navigate('ListingsManagement', { filter: 'views' })}
                >
                    <Text style={styles.statNumber}>45</Text>
                    <Text style={styles.statLabel}>Views (Today)</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.statItem}
                    onPress={() => navigation.navigate('InquiriesList')}
                >
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Inquiries</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Map</Text>
            </View>

            {/* Map Widget */}
            <View style={{ paddingHorizontal: 20 }}>
                <GlobalPropertyMap properties={MAP_PROPERTIES} height={200} />
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Properties</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ListingsManagement', {})}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {MOCK_PROPERTIES.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.propertyCard}
                        onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
                    >
                        <View style={styles.cardImagePlaceholder} />
                        <View style={styles.cardContent}>
                            <View style={styles.cardTop}>
                                {renderStatusBadge(item.status)}
                                <Text style={styles.price}>{item.price}</Text>
                            </View>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardLocation}>📍 {item.location}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddProperty')}
                activeOpacity={0.8}
            >
                <Text style={styles.fabIcon}>+</Text>
                <Text style={styles.fabText}>List Property</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#eee',
        marginLeft: 15,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageBtn: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        position: 'relative',
    },
    badgeDot: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E76F51',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#264653',
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 30,
        shadowColor: '#264653',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
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
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    seeAll: {
        color: '#E76F51',
        fontWeight: '600',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    propertyCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
    },
    cardImagePlaceholder: {
        height: 140,
        backgroundColor: '#eaeaea',
    },
    cardContent: {
        padding: 16,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#264653',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cardLocation: {
        fontSize: 13,
        color: '#888',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#E76F51',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 50,
        shadowColor: '#E76F51',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    fabIcon: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
        marginRight: 8,
        marginTop: -2,
    },
    fabText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
