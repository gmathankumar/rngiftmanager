import React from 'react';
import {View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import {GiftCard} from "../screens";
import {formatCurrency} from "../utils";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    EditGiftCard: { card: GiftCard };
    // Add other screens as needed
};

type GiftCardNavigationProp = StackNavigationProp<RootStackParamList>;

type GiftCardProps = {
    item: GiftCard;
    onDelete: (id: string) => void;
    navigation: GiftCardNavigationProp;
};

const getStatusColor = (status:String) => {
    switch (status) {
        case 'New': return '#4CAF50'; // Green
        case 'Open': return '#2196F3'; // Blue
        case 'Archived': return '#9E9E9E'; // Grey
        default: return '#9E9E9E';
    }
};

const GiftCard: React.FC<GiftCardProps> = ({ item, onDelete, navigation }) => {
    // Determine if balance is empty or very low
    const isEmptyOrLow = item.balance <= 0;
    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            layout={LinearTransition.springify()}
        >
            <Card
                mode="elevated"
                style={{
                    marginHorizontal: 16,
                    marginVertical: 8,
                    borderRadius: 12,
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                }}
                onPress={() => navigation.navigate('EditGiftCard', { card: item })}
            >
                <Card.Title
                    title={<Text variant="titleMedium" style={{ fontWeight: '600' }}>{item.name}</Text>}
                    subtitle={
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Text style={isEmptyOrLow ? { color: '#BDBDBD', fontStyle: 'italic' } : {}}>
                                {formatCurrency(item.balance)}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                                <View
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: getStatusColor(item.status),
                                        marginRight: 4
                                    }}
                                />
                                <Text>{item.status}</Text>
                            </View>
                        </View>
                    }
                    right={(props) => (
                        <IconButton
                            {...props}
                            icon="delete-outline"
                            onPress={() => onDelete(item.id)}
                        />
                    )}
                    titleStyle={{ marginBottom: 4 }}
                    subtitleStyle={{ marginTop: 4 }}
                />
            </Card>
        </Animated.View>
    );
};

export default GiftCard;
