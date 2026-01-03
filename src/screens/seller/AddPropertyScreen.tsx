
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as ImagePicker from 'react-native-image-picker';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'AddProperty'>;
};

const PROPERTY_TYPES = ['Land', 'House', 'Apartment', 'Commercial', 'Shortlet'];
const { width } = Dimensions.get('window');

export default function AddPropertyScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [propertyDetails, setPropertyDetails] = useState({
        title: '',
        price: '',
        location: '',
        description: '',
        type: 'Land',
    });

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 5,
            quality: 0.8,
        });

        if (result.assets) {
            const newImages = result.assets.map(asset => asset.uri).filter(uri => uri !== undefined) as string[];
            setImages([...images, ...newImages]);
        }
    };

    const submitForVerification = () => {
        if (!propertyDetails.title || !propertyDetails.price) {
            Alert.alert('Missing Info', 'Please provide at least a title and price.');
            return;
        }

        setLoading(true);

        // Simulate Network/AI processing
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Listing Submitted',
                'Our AI is analyzing your documents and listing details. \n\nStatus: \n🟡 Pending Verification (Review 24h)',
                [
                    {
                        text: 'Return to Dashboard',
                        onPress: () => navigation.navigate('SellerDashboard')
                    }
                ]
            );
        }, 2500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ExpoStatusBar style="auto" />
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>New Listing</Text>
                <Text style={styles.headerStep}>Step 1 of 2</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Images Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Property Photos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
                        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImages}>
                            <Text style={styles.addPhotoIcon}>+</Text>
                            <Text style={styles.addPhotoText}>Add Photos</Text>
                        </TouchableOpacity>
                        {images.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={styles.propertyThumb} />
                        ))}
                    </ScrollView>
                </View>

                {/* Property Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Property Type</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeContainer}>
                        {PROPERTY_TYPES.map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.typeChip,
                                    propertyDetails.type === type && styles.typeChipActive
                                ]}
                                onPress={() => setPropertyDetails({ ...propertyDetails, type })}
                            >
                                <Text style={[
                                    styles.typeText,
                                    propertyDetails.type === type && styles.typeTextActive
                                ]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Details Form */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 500sqm Land in Banana Island"
                        value={propertyDetails.title}
                        onChangeText={(t) => setPropertyDetails({ ...propertyDetails, title: t })}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                        <Text style={styles.label}>Price (₦)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="50,000,000"
                            keyboardType="numeric"
                            value={propertyDetails.price}
                            onChangeText={(t) => setPropertyDetails({ ...propertyDetails, price: t })}
                        />
                    </View>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Size (Optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 600sqm"
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="City, State, or Address"
                        value={propertyDetails.location}
                        onChangeText={(t) => setPropertyDetails({ ...propertyDetails, location: t })}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Tell us about the property details, topography, title check, etc."
                        multiline
                        value={propertyDetails.description}
                        onChangeText={(t) => setPropertyDetails({ ...propertyDetails, description: t })}
                    />
                </View>

                {/* Documents Section */}
                <View style={styles.docSection}>
                    <View style={styles.docHeader}>
                        <Text style={styles.docTitle}>⚠ Verification Required</Text>
                    </View>
                    <Text style={styles.docText}>
                        Our AI Verification System scans all documents for authenticity to prevent fraud.
                    </Text>

                    <TouchableOpacity style={styles.docUploadBtn}>
                        <Text style={styles.docUploadText}>📄 Upload Deed / C of O</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.docUploadBtn}>
                        <Text style={styles.docUploadText}>📄 Upload Survey Plan</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={submitForVerification}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.actionButtonText}>Submit Listing</Text>}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBar: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    headerStep: {
        fontSize: 14,
        color: '#888',
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#333',
    },
    photoScroll: {
        flexDirection: 'row',
    },
    addPhotoButton: {
        width: 100,
        height: 100,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    addPhotoIcon: {
        fontSize: 32,
        color: '#888',
        marginBottom: 4,
    },
    addPhotoText: {
        fontSize: 12,
        color: '#666',
    },
    propertyThumb: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    typeContainer: {
        flexDirection: 'row',
    },
    typeChip: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    typeChipActive: {
        backgroundColor: '#264653',
        borderColor: '#264653',
    },
    typeText: {
        color: '#666',
        fontWeight: '600',
    },
    typeTextActive: {
        color: '#fff',
    },
    formGroup: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#121212',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    docSection: {
        backgroundColor: '#FFF8F0',
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#FFEAC9',
    },
    docHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    docTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#B5651D',
    },
    docText: {
        fontSize: 13,
        color: '#886',
        marginBottom: 16,
        lineHeight: 20,
    },
    docUploadBtn: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#EBD0B3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    docUploadText: {
        color: '#B5651D',
        fontWeight: '600',
        fontSize: 14,
    },
    actionButton: {
        backgroundColor: '#E76F51',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#E76F51',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 40,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
});
