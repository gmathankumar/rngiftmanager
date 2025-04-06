import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftCardsScreen from '../features/giftCards/GiftCardsScreen';
import AddGiftCardScreen from '../features/giftCards/AddGiftCardScreen';
import EditGiftCardScreen from "../features/giftCards/EditGiftCardScreen";
import IntroScreen from "../component/IntroScreen";

export type RootStackParamList = {
    GiftCards: undefined;
    AddGiftCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Intro" >
            <Stack.Screen name="Intro" component={IntroScreen} screenOptions={{ headerShown: false }} />
            <Stack.Screen name="GiftCards" component={GiftCardsScreen} />
            <Stack.Screen name="AddGiftCard" component={AddGiftCardScreen} options={{ title: 'Add Gift Card' }} />
            <Stack.Screen name="EditGiftCard" component={EditGiftCardScreen} />
        </Stack.Navigator>
    );
}
