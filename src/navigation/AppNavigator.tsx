
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import SellerRegistrationScreen from '../screens/auth/SellerRegistrationScreen';
import SellerDashboard from '../screens/seller/SellerDashboard';
import AddPropertyScreen from '../screens/seller/AddPropertyScreen';

// Types
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="RoleSelection"
            screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerTintColor: '#1a1a1a',
            }}
        >
            <Stack.Screen
                name="RoleSelection"
                component={RoleSelectionScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SellerRegister"
                component={SellerRegistrationScreen}
                options={{ title: 'Seller Sign Up' }}
            />
            <Stack.Screen
                name="SellerDashboard"
                component={SellerDashboard}
                options={{ title: 'My Dashboard', headerLeft: () => null }} // Clean header, no back button to login
            />
            <Stack.Screen
                name="AddProperty"
                component={AddPropertyScreen}
                options={{ title: 'List Property' }}
            />
        </Stack.Navigator>
    );
}
