// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {GiftCardProvider} from "./src/features/giftCards/GiftCardContext";
import AppNavigator from "./src/navigation/AppNavigator";
import {generatedColor} from "./src/styles/commonStyles"; // your navigation file


const theme = {
    ...DefaultTheme,
    colors: generatedColor.colors// Copy it from the color codes scheme and then use it here
};
export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <GiftCardProvider>
                    <AppNavigator />
                </GiftCardProvider>
            </NavigationContainer>
        </PaperProvider>
    );
}
