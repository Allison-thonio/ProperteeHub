
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'BuyerProfile'>;

export default function BuyerProfileScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backLabel}>BACK</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>MY PROFILE</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {
                        currentName: 'Alice Johnson',
                        currentImage: 'https://ui-avatars.com/api/?name=Alice+Buyer&background=000&color=fff',
                        userRole: 'buyer'
                    })}>
                        <Text style={styles.editLabel}>EDIT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: 'https://ui-avatars.com/api/?name=Alice+Buyer&background=000&color=fff' }}
                    />
                    <Text style={styles.name}>Alice Johnson</Text>
                    <Text style={styles.userRole}>Premium Buyer</Text>
                    <View style={styles.goldBadge}>
                        <Text style={styles.goldBadgeText}>GOLD MEMBER</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>SAVED</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>2</Text>
                        <Text style={styles.statLabel}>TOURS</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>8</Text>
                        <Text style={styles.statLabel}>CHATS</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>PERSONAL INFORMATION</Text>
                        <Text style={styles.arrowLabel}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>NOTIFICATIONS</Text>
                        <Text style={styles.arrowLabel}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>PRIVACY & SECURITY</Text>
                        <Text style={styles.arrowLabel}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>HELP & SUPPORT</Text>
                        <Text style={styles.arrowLabel}>›</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.navigate('Welcome')}
                >
                    <Text style={styles.logoutText}>LOG OUT</Text>
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
    userRole: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
        fontWeight: '600',
    },
    goldBadge: {
        backgroundColor: '#D4AF37',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 2,
        marginTop: 15,
    },
    goldBadgeText: {
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
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },
    arrowLabel: {
        fontSize: 18,
        color: '#888',
        fontWeight: '300',
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
