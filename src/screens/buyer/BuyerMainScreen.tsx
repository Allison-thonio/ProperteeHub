
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import GlobalPropertyMap from '../../components/GlobalPropertyMap';

const { width } = Dimensions.get('window');

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'BuyerMain'>;
};

const CATEGORIES = ['All', 'House', 'Land', 'Shortlet', 'Commercial'];

const MOCK_PROPERTIES = [
    {
        id: '1',
        title: 'Modern 4-Bedroom Villa',
        price: '₦120,000,000',
        location: 'Lekki Phase 1, Lagos',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        type: 'House',
        coordinates: { latitude: 6.45, longitude: 3.45 }
    },
    {
        id: '2',
        title: 'Premium 600sqm Land',
        price: '₦45,000,000',
        location: 'Sangotedo, Ajah',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=2064&auto=format&fit=crop',
        type: 'Land',
        coordinates: { latitude: 6.47, longitude: 3.60 }
    },
    {
        id: '3',
        title: 'Serviced Apartment',
        price: '₦2,500,000 /yr',
        location: 'Ikeja Gra, Lagos',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        type: 'Shortlet',
        coordinates: { latitude: 6.60, longitude: 3.35 }
    }
];

export default function BuyerMainScreen({ navigation }: Props) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProperties, setFilteredProperties] = useState(MOCK_PROPERTIES);

    // Filter Logic
    React.useEffect(() => {
        let result = MOCK_PROPERTIES;

        // Category Filter
        if (activeCategory !== 'All') {
            result = result.filter(p => p.type === activeCategory);
        }

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.location.toLowerCase().includes(query)
            );
        }

        setFilteredProperties(result);
    }, [activeCategory, searchQuery]);

    const mapProperties = filteredProperties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        latitude: p.coordinates.latitude,
        longitude: p.coordinates.longitude
    }));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Find your dream</Text>
                        <Text style={styles.title}>Property</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileBtn}
                        onPress={() => navigation.navigate('ChatList')}
                    >
                        <Text style={{ fontSize: 22 }}>💬</Text>
                        <View style={styles.unreadDot} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            placeholder="Search location, title..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Home Map */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Explore on Map</Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <GlobalPropertyMap properties={mapProperties} height={180} />
                </View>

                {/* Popular Listings */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended for you</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.propertyScroll}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {filteredProperties.length > 0 ? filteredProperties.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.propertyCard}
                            onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
                        >
                            <Image source={{ uri: item.image }} style={styles.propertyImg} />
                            <View style={styles.priceBadge}>
                                <Text style={styles.priceBadgeText}>{item.price}</Text>
                            </View>
                            <Text style={styles.propTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.propLocation}>📍 {item.location}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={{ width: width - 40, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#888' }}>No properties found matching your search.</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Basic Bottom Nav Mock */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🔍</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>❤</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
            </View>
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
        paddingTop: 15,
    },
    greeting: {
        fontSize: 18,
        color: '#666',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    profileBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    unreadDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E76F51',
        borderWidth: 2,
        borderColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 25,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 55,
        fontSize: 16,
    },
    filterBtn: {
        width: 55,
        height: 55,
        backgroundColor: '#264653',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: 20,
        color: 'white',
    },
    categoriesScroll: {
        marginTop: 20,
        marginBottom: 10,
    },
    categoryChip: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: '#fafafa',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    categoryChipActive: {
        backgroundColor: '#E76F51',
        borderColor: '#E76F51',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    categoryTextActive: {
        color: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    seeAll: {
        color: '#E76F51',
        fontWeight: '600',
    },
    propertyScroll: {
        paddingBottom: 20,
    },
    propertyCard: {
        width: 250,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
    },
    propertyImg: {
        width: '100%',
        height: 180,
        backgroundColor: '#eee',
    },
    priceBadge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(255,255,255, 0.95)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    priceBadgeText: {
        fontWeight: '800',
        fontSize: 14,
        color: '#264653',
    },
    propTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        paddingHorizontal: 15,
        marginTop: 12,
    },
    propLocation: {
        fontSize: 13,
        color: '#888',
        paddingHorizontal: 15,
        paddingBottom: 20,
        marginTop: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
    },
    navItem: {
        padding: 10,
    },
    navIcon: {
        fontSize: 22,
    }
});
