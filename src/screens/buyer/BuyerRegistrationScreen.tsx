
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'BuyerRegister'>;
};

export default function BuyerRegistrationScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleRegister = () => {
        if (!formData.fullName || !formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        setLoading(true);
        // Simulation of firebase interaction
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Welcome!',
                'Verification email sent. You can now explore properties.',
                [{ text: 'Start Exploring', onPress: () => navigation.navigate('BuyerMain') }]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Find Your Home</Text>
                    <Text style={styles.subtitle}>Create an account to browse and save properties.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Alice Johnson"
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="alice@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up as Buyer</Text>}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('RoleSelection')}
                >
                    <Text style={styles.loginLinkText}>Already have an account? <Text style={styles.bold}>Log In</Text></Text>
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
    scrollContent: {
        padding: 24,
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#444',
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 18,
        borderRadius: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    registerButton: {
        backgroundColor: '#E76F51',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#E76F51',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginLinkText: {
        color: '#666',
        fontSize: 14,
    },
    bold: {
        color: '#E76F51',
        fontWeight: 'bold',
    }
});
