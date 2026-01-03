
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ChatList'>;
};

// Mock Data for conversations
const MOCK_CHATS = [
    {
        id: '1',
        userId: 'user_001',
        userName: 'Mr. John Investor',
        userAvatar: 'https://ui-avatars.com/api/?name=John+Investor&background=0D8ABC&color=fff',
        lastMessage: 'Is the property in Lekki still available?',
        time: '2m ago',
        unread: 2,
        propertyContext: 'Luxury 4 Bedroom Duplex'
    },
    {
        id: '2',
        userId: 'user_002',
        userName: 'Sarah Buyer',
        userAvatar: 'https://ui-avatars.com/api/?name=Sarah+Buyer&background=E76F51&color=fff',
        lastMessage: 'Can we schedule a viewing for Saturday?',
        time: '1h ago',
        unread: 0,
        propertyContext: 'Plot of Land (600sqm)'
    },
    {
        id: '3',
        userId: 'user_003',
        userName: 'Propertee Support',
        userAvatar: 'https://ui-avatars.com/api/?name=Support&background=333&color=fff',
        lastMessage: 'Your listing "Duplex in Ajah" has been approved!',
        time: '1d ago',
        unread: 0,
        propertyContext: 'System Notification'
    }
];

export default function ChatListScreen({ navigation }: Props) {

    const renderItem = ({ item }: { item: typeof MOCK_CHATS[0] }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', {
                userId: item.userId,
                userName: item.userName,
                propertyTitle: item.propertyContext
            })}
        >
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />

            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>

                <Text numberOfLines={1} style={[
                    styles.lastMessage,
                    item.unread > 0 && styles.lastMessageUnread
                ]}>
                    {item.lastMessage}
                </Text>

                {item.propertyContext && (
                    <Text style={styles.contextLabel} numberOfLines={1}>
                        📌 {item.propertyContext}
                    </Text>
                )}
            </View>

            {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
            </View>

            <FlatList
                data={MOCK_CHATS}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    listContent: {
        paddingBottom: 20,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eee',
    },
    chatContent: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    lastMessageUnread: {
        color: '#1a1a1a',
        fontWeight: '600',
    },
    contextLabel: {
        fontSize: 11,
        color: '#264653',
        backgroundColor: '#f0f8ff',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    unreadBadge: {
        backgroundColor: '#E76F51',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    unreadText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 82, // align with text start
    },
});
