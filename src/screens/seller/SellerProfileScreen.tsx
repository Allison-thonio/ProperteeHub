
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SellerProfile'>;

export default function SellerProfileScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Profile</Text>
                    <TouchableOpacity>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=264653&color=fff' }}
                    />
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.businessName}>Propertee Realtors Ltd</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Verified Seller</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Properties</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>3y</Text>
                        <Text style={styles.statLabel}>On Platform</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Contact Information</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>john@propertee.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoValue}>+234 812 345 6789</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Office</Text>
                        <Text style={styles.infoValue}>Lekki Phase 1, Lagos</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
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
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    backText: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editText: {
        color: '#E76F51',
        fontWeight: '600',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#264653',
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    businessName: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    badge: {
        backgroundColor: '#2A9D8F',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginHorizontal: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#264653',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    infoSection: {
        padding: 20,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    logoutButton: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff4d4d',
    },
    logoutText: {
        color: '#ff4d4d',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
