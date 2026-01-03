
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

type Message = {
    id: string;
    text: string;
    sender: 'me' | 'them';
    time: string;
};

export default function ChatScreen({ route, navigation }: Props) {
    const { userName, propertyTitle } = route.params;
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    // Mock Messages
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello, is this property still available?', sender: 'them', time: '10:00 AM' },
        { id: '2', text: 'Yes, it is! Are you interested in a viewing?', sender: 'me', time: '10:05 AM' },
        { id: '3', text: 'Can we schedule a viewing for Saturday?', sender: 'them', time: '10:15 AM' },
    ]);

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    useEffect(() => {
        // Scroll to bottom on new message
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, [messages]);

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageBubble,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'me' ? styles.myMessageText : styles.theirMessageText
            ]}>{item.text}</Text>
            <Text style={[
                styles.timeText,
                item.sender === 'me' ? styles.myTimeText : styles.theirTimeText
            ]}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerName}>{userName}</Text>
                    {propertyTitle && (
                        <Text style={styles.headerContext}>{propertyTitle}</Text>
                    )}
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex1}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.listContent}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText && styles.sendButtonDisabled]}
                        onPress={sendMessage}
                        disabled={!inputText}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    flex1: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
        padding: 8,
    },
    backText: {
        fontSize: 24,
        color: '#264653',
    },
    headerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    headerContext: {
        fontSize: 12,
        color: '#2A9D8F',
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
        gap: 12,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 4,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#264653',
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    messageText: {
        fontSize: 16,
        marginBottom: 4,
    },
    myMessageText: {
        color: 'white',
    },
    theirMessageText: {
        color: '#333',
    },
    timeText: {
        fontSize: 10,
        alignSelf: 'flex-end',
    },
    myTimeText: {
        color: 'rgba(255,255,255,0.6)',
    },
    theirTimeText: {
        color: '#999',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    sendButton: {
        backgroundColor: '#2A9D8F',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: '700',
    },
});
