
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

type Props = NativeStackScreenProps<RootStackParamList, 'ListingsManagement'>;

const MOCK_DATA = [
    { id: '1', title: 'Luxury 4 Bedroom Duplex', views: 450, status: 'Active', price: '₦120M' },
    { id: '2', title: 'Plot of Land (600sqm)', views: 234, status: 'Active', price: '₦45M' },
    { id: '3', title: 'Corner Piece Land', views: 120, status: 'Pending', price: '₦30M' },
];

export default function ListingsManagementScreen({ route, navigation }: Props) {
    const { colors, isDark } = useTheme();
    const { filter } = route.params;

    const renderItem = ({ item }: { item: typeof MOCK_DATA[0] }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
        >
            <View style={[styles.imagePlaceholder, { backgroundColor: colors.border }]} />
            <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.cardPrice, { color: colors.primary }]}>{item.price}</Text>
                <View style={styles.cardFooter}>
                    <View style={[styles.badge, item.status === 'Active' ? styles.activeBadge : styles.pendingBadge]}>
                        <Text style={styles.badgeText}>{item.status}</Text>
                    </View>
                    <Text style={styles.viewsText}>👁 {item.views} Views</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.backText, { color: colors.text }]}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{filter === 'views' ? 'View Statistics' : 'My Listings'}</Text>
                <View style={{ width: 30 }} />
            </View>

            <FlatList
                data={MOCK_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
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
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backText: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eee',
        overflow: 'hidden',
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#eaeaea',
    },
    cardInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#264653',
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    activeBadge: {
        backgroundColor: '#E8F5E9',
    },
    pendingBadge: {
        backgroundColor: '#FFF4E5',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    viewsText: {
        fontSize: 12,
        color: '#888',
    },
});
