
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PropertyDetails'>;

const { width } = Dimensions.get('window');

// Mock detailed data
const PROPERTY_DATA = {
    '1': {
        title: 'Luxury 4 Bedroom Duplex',
        price: '₦120,000,000',
        location: 'Lekki Phase 1, Lagos',
        type: 'House',
        status: 'Pending Verification',
        description: 'Beautifully designed 4 bedroom duplex with modern amenities. Located in a secured estate with 24/7 power supply and industrial water treatment plant.',
        amenities: ['24/7 Power', 'Swimming Pool', 'CCTV', 'Modern Kitchen', 'Secured Estate'],
        documents: ['Certificate of Occupancy', 'Survey Plan', 'Deed of Assignment'],
    },
    '2': {
        title: 'Plot of Land (600sqm)',
        price: '₦45,000,000',
        location: 'Sangotedo, Ajah',
        type: 'Land',
        status: 'Active',
        description: 'Dry land located in a fast-developing area. Perfect for residential or investment purposes. Good topography and access road.',
        amenities: ['Dry Land', 'Good Road Access', 'Electric Supply', 'Gate House'],
        documents: ['Governor Consent', 'Registered Survey'],
    }
};

export default function PropertyDetailsScreen({ route, navigation }: Props) {
    const { propertyId } = route.params;
    const property = PROPERTY_DATA[propertyId as keyof typeof PROPERTY_DATA] || PROPERTY_DATA['1'];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView>
                {/* Placeholder for Image Slider */}
                <View style={styles.imagePlaceholder}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View style={[styles.badge, property.status === 'Active' ? styles.badgeActive : styles.badgePending]}>
                            <Text style={styles.badgeText}>{property.status}</Text>
                        </View>
                        <Text style={styles.typeText}>{property.type}</Text>
                    </View>

                    <Text style={styles.title}>{property.title}</Text>
                    <Text style={styles.price}>{property.price}</Text>
                    <Text style={styles.location}>📍 {property.location}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{property.description}</Text>

                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesContainer}>
                        {property.amenities.map((item, index) => (
                            <View key={index} style={styles.amenityItem}>
                                <Text style={styles.amenityText}>✓ {item}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.docSection}>
                        <Text style={styles.sectionTitle}>Verification Documents</Text>
                        {property.documents.map((doc, index) => (
                            <View key={index} style={styles.docItem}>
                                <Text style={styles.docIcon}>📄</Text>
                                <Text style={styles.docName}>{doc}</Text>
                                <Text style={styles.docStatus}>Verified</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Listing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Deactivate</Text>
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
    imagePlaceholder: {
        width: width,
        height: 250,
        backgroundColor: '#eaeaea',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 10,
    },
    badgeActive: {
        backgroundColor: '#E8F5E9',
    },
    badgePending: {
        backgroundColor: '#FFF4E5',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    typeText: {
        color: '#666',
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: '800',
        color: '#264653',
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        marginBottom: 24,
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
    },
    amenityItem: {
        width: '50%',
        marginBottom: 10,
    },
    amenityText: {
        fontSize: 14,
        color: '#444',
    },
    docSection: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 100,
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    docIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    docName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    docStatus: {
        fontSize: 12,
        color: '#2A9D8F',
        fontWeight: 'bold',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    editButton: {
        flex: 2,
        backgroundColor: '#264653',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#fee',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff4d4d',
    },
    deleteButtonText: {
        color: '#ff4d4d',
        fontWeight: 'bold',
    },
});
