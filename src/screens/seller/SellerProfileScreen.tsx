
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

type Props = NativeStackScreenProps<RootStackParamList, 'SellerProfile'>;

export default function SellerProfileScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.header, { borderBottomColor: colors.text }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={[styles.backLabel, { color: colors.text }]}>BACK</Text>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>AGENT PROFILE</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {
                        currentName: 'John Doe',
                        currentImage: 'https://ui-avatars.com/api/?name=John+Doe&background=000&color=fff',
                        currentFirm: 'PROPERTEE REALTORS LTD',
                        userRole: 'seller'
                    })}>
                        <Text style={styles.editLabel}>EDIT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        style={[styles.profilePic, { borderColor: colors.text }]}
                        source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=000&color=fff' }}
                    />
                    <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
                    <Text style={[styles.businessName, { color: colors.textSecondary }]}>PROPERTEE REALTORS LTD</Text>
                    <View style={[styles.badge, { backgroundColor: colors.text }]}>
                        <Text style={[styles.badgeText, { color: colors.background }]}>VERIFIED AGENT</Text>
                    </View>
                </View>

                <View style={[styles.statsContainer, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
                    <View style={styles.statBox}>
                        <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>LISTINGS</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statValue, { color: colors.text }]}>4.8</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>RATING</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statValue, { color: colors.text }]}>3Y</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>YEARS</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={[styles.sectionLabel, { color: colors.text }]}>CONTACT DETAILS</Text>
                    <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>EMAIL</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>john@propertee.com</Text>
                    </View>
                    <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>PHONE</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>+234 812 345 6789</Text>
                    </View>
                    <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>OFFICE</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>LEKKI PHASE 1, LAGOS</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.logoutButton, { borderColor: colors.text }]}
                    onPress={() => navigation.navigate('Welcome')}
                >
                    <Text style={[styles.logoutText, { color: colors.text }]}>LOG OUT</Text>
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
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    backButton: {
        padding: 5,
    },
    backLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    editLabel: {
        color: '#D4AF37',
        fontWeight: '900',
        fontSize: 10,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#000',
    },
    name: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 0.5,
    },
    businessName: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    badge: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 2,
        marginTop: 15,
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#f0f0f0',
        borderBottomColor: '#f0f0f0',
        marginHorizontal: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000',
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: '#888',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    infoSection: {
        padding: 20,
        marginTop: 10,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    infoLabel: {
        fontSize: 10,
        color: '#888',
        fontWeight: '800',
    },
    infoValue: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
    },
    logoutButton: {
        marginHorizontal: 20,
        marginTop: 30,
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    logoutText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 12,
        letterSpacing: 1,
    },
});
