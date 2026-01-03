
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
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'BuyerRegister'>;
};

export default function BuyerRegistrationScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme();
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Find Your Home</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Create an account to browse and save properties.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>FULL NAME</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                            placeholder="Alice Johnson"
                            placeholderTextColor={colors.textSecondary}
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>EMAIL ADDRESS</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                            placeholder="alice@example.com"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>PASSWORD</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSecondary}
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.registerButton, { backgroundColor: colors.text }]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={[styles.buttonText, { color: colors.background }]}>SIGN UP AS BUYER</Text>}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('RoleSelection')}
                >
                    <Text style={[styles.loginLinkText, { color: colors.textSecondary }]}>Already have an account? <Text style={[styles.bold, { color: colors.primary }]}>Log In</Text></Text>
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
