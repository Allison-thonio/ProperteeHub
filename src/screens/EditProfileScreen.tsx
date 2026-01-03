
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ route, navigation }: Props) {
    const { currentName, currentImage, currentFirm, userRole } = route.params;

    const [name, setName] = useState(currentName);
    const [firm, setFirm] = useState(currentFirm || '');
    const [imageUri, setImageUri] = useState(currentImage);

    const handlePickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (result.assets && result.assets[0].uri) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        // In a real app, we would update the backend/context here
        Alert.alert("Success", "Profile updated locally (Mock)");
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>EDIT PROFILE</Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handlePickImage} style={styles.imageWrapper}>
                        <Image source={{ uri: imageUri }} style={styles.profilePic} />
                        <View style={styles.cameraIconContainer}>
                            <View style={styles.cameraIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePickImage}>
                        <Text style={styles.changePhotoText}>CHANGE PHOTO</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>FULL NAME</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                            placeholderTextColor="#888"
                        />
                    </View>

                    {userRole === 'seller' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>FIRM / BUSINESS NAME</Text>
                            <TextInput
                                style={styles.input}
                                value={firm}
                                onChangeText={setFirm}
                                placeholder="Enter firm name"
                                placeholderTextColor="#888"
                            />
                        </View>
                    )}

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            Your profile information is visible to other users on ProperteeHub to ensure transparency and trust.
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backBtn: {
        padding: 5,
    },
    backText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#888',
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1.5,
        color: '#000',
    },
    saveBtn: {
        padding: 5,
    },
    saveText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 1,
    },
    content: {
        padding: 30,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f8f8f8',
        borderWidth: 2,
        borderColor: '#000',
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#D4AF37',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    cameraIcon: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    changePhotoText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 1,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    infoBox: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 4,
        marginTop: 20,
    },
    infoText: {
        fontSize: 11,
        color: '#888',
        lineHeight: 18,
        textAlign: 'center',
        fontWeight: '600',
    }
});
