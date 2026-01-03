
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
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

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
    const { colors, isDark } = useTheme();
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>ProperteeHub</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.messageBtn, { backgroundColor: colors.text }]}
                        onPress={() => navigation.navigate('ChatList')}
                    >
                        <Text style={[styles.btnText, { color: colors.background }]}>MESSAGES</Text>
                        <View style={styles.unreadDot} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.text }]}>
                        <Text style={[styles.searchLabel, { color: colors.text }]}>SEARCH</Text>
                        <TextInput
                            placeholder="Location, price, type..."
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.searchInput, { color: colors.text }]}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.card, borderColor: colors.text }]}>
                        <Text style={[styles.filterBtnText, { color: colors.text }]}>FILTER</Text>
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
                            style={[
                                styles.categoryChip,
                                { borderColor: colors.border, backgroundColor: colors.card },
                                activeCategory === cat && [styles.categoryChipActive, { backgroundColor: colors.text, borderColor: colors.text }]
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                { color: colors.textSecondary },
                                activeCategory === cat && [styles.categoryTextActive, { color: colors.background }]
                            ]}>
                                {cat.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Home Map */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>MAP VIEW</Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <GlobalPropertyMap properties={mapProperties} height={180} userRole="buyer" />
                </View>

                {/* Popular Listings */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>RECOMMENDED</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>SEE ALL</Text>
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
                            style={[styles.propertyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id, userRole: 'buyer' })}
                        >
                            <Image source={{ uri: item.image }} style={styles.propertyImg} />
                            <View style={styles.priceBadge}>
                                <Text style={styles.priceBadgeText}>{item.price}</Text>
                            </View>
                            <Text style={[styles.propTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                            <Text style={[styles.propLocation, { color: colors.textSecondary }]}>{item.location.toUpperCase()}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={{ width: width - 40, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.textSecondary }}>No matches found</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Basic Bottom Nav Mock */}
            <View style={[styles.bottomNav, { backgroundColor: colors.background, borderTopColor: colors.text }]}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('BuyerMain')}>
                    <Text style={[styles.navLabelActive, { color: colors.text }]}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SavedProperties')}>
                    <Text style={[styles.navLabel, { color: colors.textSecondary }]}>SAVED</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('BuyerProfile')}>
                    <Text style={[styles.navLabel, { color: colors.textSecondary }]}>PROFILE</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    greeting: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D4AF37',
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
    },
    messageBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 4,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
    },
    unreadDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D4AF37',
        borderWidth: 1,
        borderColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 25,
        gap: 10,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    searchLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 45,
        fontSize: 14,
        color: '#000',
    },
    filterBtn: {
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBtnText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#000',
    },
    categoriesScroll: {
        marginTop: 20,
        marginBottom: 10,
    },
    categoryChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    categoryChipActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '800',
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
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    seeAll: {
        color: '#D4AF37',
        fontWeight: '700',
        fontSize: 12,
    },
    propertyScroll: {
        paddingBottom: 20,
    },
    propertyCard: {
        width: 250,
        marginRight: 15,
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    propertyImg: {
        width: '100%',
        height: 160,
        backgroundColor: '#f5f5f5',
    },
    priceBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#D4AF37',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
    },
    priceBadgeText: {
        fontWeight: '900',
        fontSize: 12,
        color: '#fff',
    },
    propTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000',
        paddingHorizontal: 12,
        marginTop: 10,
    },
    propLocation: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
        paddingHorizontal: 12,
        paddingBottom: 15,
        marginTop: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#000',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#888',
    },
    navLabelActive: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
    },
});
