
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SellerRegister'>;
};

export default function SellerRegistrationScreen({ navigation }: Props) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        businessName: '',
        isBusiness: false,
    });

    const handleRegister = () => {
        // Validate inputs
        if (!formData.fullName || !formData.email || !formData.phone) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }

        if (formData.isBusiness && !formData.businessName) {
            Alert.alert('Missing Business Name', 'Please enter your business or firm name.');
            return;
        }

        // Mock Email Verification Logic
        Alert.alert(
            'Verify Your Email',
            `We have sent a verification email to ${formData.email}. Please verify your account to proceed inside the app.`,
            [
                {
                    text: 'I have verified',
                    onPress: () => {
                        // Navigate to Dashboard
                        navigation.navigate('SellerDashboard');
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Seller Registration</Text>
                    <Text style={styles.subtitle}>Start listing your properties today.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+1 234 567 8900"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        />
                    </View>

                    <View style={styles.switchGroup}>
                        <Text style={styles.label}>Are you a Business/Firm?</Text>
                        <Switch
                            value={formData.isBusiness}
                            onValueChange={(val) => setFormData({ ...formData, isBusiness: val })}
                            trackColor={{ false: '#767577', true: '#2a9d8f' }}
                        />
                    </View>

                    {formData.isBusiness && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Business Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Propertee Realtors Ltd"
                                value={formData.businessName}
                                onChangeText={(text) => setFormData({ ...formData, businessName: text })}
                            />
                        </View>
                    )}

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Create Seller Account</Text>
                    </TouchableOpacity>
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
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 30,
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#264653',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    switchGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    registerButton: {
        backgroundColor: '#2a9d8f',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#2a9d8f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
