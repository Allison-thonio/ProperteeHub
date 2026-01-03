
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

type Props = NativeStackScreenProps<RootStackParamList, 'InquiriesList'>;

const MOCK_INQUIRIES = [
    {
        id: '1',
        userName: 'Mr. John Investor',
        property: 'Luxury 4 Bedroom Duplex',
        time: '2 hours ago',
        message: 'I am interested in this property. Is it negotiable?',
        avatar: 'https://ui-avatars.com/api/?name=John+Investor&background=0D8ABC&color=fff',
    },
    {
        id: '2',
        userName: 'Sarah Smith',
        property: 'Plot of Land (600sqm)',
        time: '5 hours ago',
        message: 'Can I pay in installments?',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=E76F51&color=fff',
    }
];

export default function InquiriesListScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.backText, { color: colors.text }]}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Recent Inquiries</Text>
                <View style={{ width: 30 }} />
            </View>

            <FlatList
                data={MOCK_INQUIRIES}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => navigation.navigate('ChatScreen', { userId: item.id, userName: item.userName, propertyTitle: item.property })}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={styles.info}>
                            <View style={styles.topRow}>
                                <Text style={[styles.userName, { color: colors.text }]}>{item.userName}</Text>
                                <Text style={[styles.time, { color: colors.textSecondary }]}>{item.time}</Text>
                            </View>
                            <Text style={[styles.propertyText, { color: colors.primary }]}>Re: {item.property}</Text>
                            <Text numberOfLines={1} style={[styles.messageSnippet, { color: colors.textSecondary }]}>{item.message}</Text>
                        </View>
                    </TouchableOpacity>
                )}
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
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    propertyText: {
        fontSize: 13,
        color: '#264653',
        fontWeight: '600',
        marginBottom: 4,
    },
    messageSnippet: {
        fontSize: 14,
        color: '#666',
    },
});
