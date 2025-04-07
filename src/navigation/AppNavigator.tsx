import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftCardsScreen from "../screens/GiftCardsScreen";
import AddGiftCardScreen from "../screens/AddGiftCardScreen";
import EditGiftCardScreen from "../screens/EditGiftCardScreen";

export type RootStackParamList = {
    GiftCards: undefined;
    AddGiftCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="GiftCards" >
            {/*<Stack.Screen name="Intro" component={IntroScreen}  />*/}
            <Stack.Screen name="GiftCards" component={GiftCardsScreen} />
            <Stack.Screen name="AddGiftCard" component={AddGiftCardScreen} options={{ title: 'Add Gift Card' }} />
            <Stack.Screen name="EditGiftCard" component={EditGiftCardScreen} />
        </Stack.Navigator>
    );
}
