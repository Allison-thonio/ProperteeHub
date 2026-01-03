
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import GlobalPropertyMap from '../../components/GlobalPropertyMap';

type Props = NativeStackScreenProps<RootStackParamList, 'PropertyDetails'>;

const { width } = Dimensions.get('window');

// Enhanced Mock Data for Buyers
const PROPERTY_DATA = {
    '1': {
        id: '1',
        title: 'Modern 4-Bedroom Villa',
        price: '₦120,000,000',
        location: 'Lekki Phase 1, Lagos',
        type: 'House',
        description: 'Experience luxury living in this architectural masterpiece. This villa features state-of-the-art finishes, a private cinema, and an infinity pool overlooking the lagoon.',
        amenities: ['Private Pool', 'Gym', 'Cinema', 'Automatic Gate', 'Secured Estate'],
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071'],
        seller: {
            id: 'seller_1',
            name: 'John Doe',
            firm: 'Propertee Realtors Ltd',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=264653&color=fff'
        },
        coordinates: { latitude: 6.45, longitude: 3.45 }
    },
    '2': {
        id: '2',
        title: 'Premium 600sqm Land',
        price: '₦45,000,000',
        location: 'Sangotedo, Ajah',
        type: 'Land',
        description: 'High-yield investment opportunity. This plot of land is located in a fast-appreciating zone with ongoing infrastructure development.',
        amenities: ['Dry Land', 'Perimeter Fencing', 'Electricity', 'Cleared Site'],
        images: ['https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=2064'],
        seller: {
            id: 'seller_1',
            name: 'John Doe',
            firm: 'Propertee Realtors Ltd',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=264653&color=fff'
        },
        coordinates: { latitude: 6.47, longitude: 3.60 }
    }
};

export default function PropertyDetailsScreen({ route, navigation }: Props) {
    const { propertyId } = route.params;
    const prop = PROPERTY_DATA[propertyId as keyof typeof PROPERTY_DATA] || PROPERTY_DATA['1'];

    const handleShare = async () => {
        try {
            await Share.share({ message: `Check out this property on ProperteeHub: ${prop.title} in ${prop.location}` });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Gallery */}
                <View style={styles.galleryContainer}>
                    <Image source={{ uri: prop.images[0] }} style={styles.mainImage} />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                        <Text style={styles.navLabel}>BACK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBtn, styles.shareBtn]} onPress={handleShare}>
                        <Text style={styles.navLabel}>SHARE</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={styles.typeLabel}>{prop.type.toUpperCase()}</Text>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>VERIFIED</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{prop.title}</Text>
                    <Text style={styles.location}>{prop.location.toUpperCase()}</Text>
                    <Text style={styles.price}>{prop.price}</Text>

                    <View style={styles.divider} />

                    {/* Seller Card */}
                    <Text style={styles.sectionTitle}>LISTING AGENT</Text>
                    <TouchableOpacity
                        style={styles.sellerCard}
                        onPress={() => navigation.navigate('SellerProfile')}
                    >
                        <Image source={{ uri: prop.seller.avatar }} style={styles.sellerAvatar} />
                        <View style={styles.sellerInfo}>
                            <Text style={styles.sellerName}>{prop.seller.name}</Text>
                            <Text style={styles.sellerFirm}>{prop.seller.firm}</Text>
                        </View>
                        <Text style={styles.viewProfile}>VIEW PAGE</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.description}>{prop.description}</Text>

                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesGrid}>
                        {prop.amenities.map((item, index) => (
                            <View key={index} style={styles.amenityChip}>
                                <Text style={styles.amenityText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Location Map */}
                    <Text style={styles.sectionTitle}>Location on Map</Text>
                    <GlobalPropertyMap
                        properties={[{ id: prop.id, title: prop.title, latitude: prop.coordinates.latitude, longitude: prop.coordinates.longitude, price: prop.price }]}
                        height={200}
                    />

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Booking/Contact Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.cartBtn}>
                    <Text style={styles.cartBtnText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => navigation.navigate('ChatScreen', {
                        userId: prop.seller.id,
                        userName: prop.seller.name,
                        propertyTitle: prop.title
                    })}
                >
                    <Text style={styles.contactBtnTextMain}>CONTACT SELLER</Text>
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
    galleryContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    iconBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    shareBtn: {
        left: 'auto',
        right: 20,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
    },
    content: {
        padding: 24,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    typeLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 1,
    },
    verifiedBadge: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#000',
    },
    verifiedText: {
        color: '#000',
        fontSize: 9,
        fontWeight: '900',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#000',
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        color: '#888',
        fontWeight: '700',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    price: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 20,
    },
    sellerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#eee',
    },
    sellerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    sellerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    sellerName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000',
    },
    sellerFirm: {
        fontSize: 13,
        color: '#666',
    },
    viewProfile: {
        color: '#D4AF37',
        fontWeight: '900',
        fontSize: 11,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        marginBottom: 15,
        letterSpacing: 1,
    },
    description: {
        fontSize: 15,
        color: '#444',
        lineHeight: 24,
        marginBottom: 20,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    amenityChip: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#eee',
    },
    amenityText: {
        fontSize: 10,
        color: '#000',
        fontWeight: '800',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartBtn: {
        width: 80,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cartBtnText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
    },
    contactBtn: {
        flex: 1,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactBtnTextMain: {
        color: 'white',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
