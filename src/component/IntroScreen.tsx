// screens/IntroScreen.tsx
import React, { useEffect, useRef } from 'react';
import {View, Animated, StyleSheet, Image} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function IntroScreen() {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;
    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 4,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(800),
        ]).start(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'GiftCards' }],
            });
        });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Animated.View style={{ opacity, transform: [{ scale }] }}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ width: 120, height: 120, marginBottom: 16 }}
                ></Image>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});
