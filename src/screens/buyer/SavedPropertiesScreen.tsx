
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedProperties'>;

export default function SavedPropertiesScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />
            <View style={[styles.header, { borderBottomColor: colors.text }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={[styles.backLabel, { color: colors.text }]}>BACK</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>SAVED PROPERTIES</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>NO SAVED PROPERTIES</Text>
                    <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>Properties you like will appear here for quick access.</Text>
                    <TouchableOpacity
                        style={[styles.exploreBtn, { backgroundColor: colors.text }]}
                        onPress={() => navigation.navigate('BuyerMain')}
                    >
                        <Text style={[styles.exploreBtnText, { color: colors.background }]}>EXPLORE NOW</Text>
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
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 30,
        fontWeight: '600',
    },
    exploreBtn: {
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 4,
    },
    exploreBtnText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
