
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import SellerRegistrationScreen from '../screens/auth/SellerRegistrationScreen';
import SellerDashboard from '../screens/seller/SellerDashboard';
import AddPropertyScreen from '../screens/seller/AddPropertyScreen';
import ChatListScreen from '../screens/messages/ChatListScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import SellerProfileScreen from '../screens/seller/SellerProfileScreen';
import PropertyDetailsScreen from '../screens/seller/PropertyDetailsScreen';
import ListingsManagementScreen from '../screens/seller/ListingsManagementScreen';
import InquiriesListScreen from '../screens/seller/InquiriesListScreen';
import BuyerRegistrationScreen from '../screens/buyer/BuyerRegistrationScreen';
import BuyerMainScreen from '../screens/buyer/BuyerMainScreen';
import BuyerProfileScreen from '../screens/buyer/BuyerProfileScreen';
import SavedPropertiesScreen from '../screens/buyer/SavedPropertiesScreen';

// Types
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="RoleSelection"
            screenOptions={{
                headerShown: true,
                headerBackTitle: '',
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
            <Stack.Screen
                name="ChatList"
                component={ChatListScreen}
                options={{ title: 'Messages' }}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SellerProfile"
                component={SellerProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PropertyDetails"
                component={PropertyDetailsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ListingsManagement"
                component={ListingsManagementScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InquiriesList"
                component={InquiriesListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BuyerRegister"
                component={BuyerRegistrationScreen}
                options={{ title: 'Buyer Sign Up' }}
            />
            <Stack.Screen
                name="BuyerMain"
                component={BuyerMainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BuyerProfile"
                component={BuyerProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SavedProperties"
                component={SavedPropertiesScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
