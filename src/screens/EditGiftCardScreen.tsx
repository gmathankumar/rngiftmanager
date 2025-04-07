import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useGiftCards } from '../contexts/GiftCardContext';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { GiftCard, GiftCardStatus } from './';
import { commonStyles as styles } from '../styles/commonStyles';

type ParamList = {
    EditGiftCard: { card: GiftCard };
};

export default function EditGiftCardScreen() {
    const { params } = useRoute<RouteProp<ParamList, 'EditGiftCard'>>();
    const { editCard } = useGiftCards();
    const navigation = useNavigation();
    const [name, setName] = useState(params.card.name);
    const [balance, setBalance] = useState(String(params.card.balance));
    const [notes, setNotes] = useState(params.card.notes ?? '');
    const [status, setStatus] = useState<GiftCardStatus>(params.card.status);

    const handleEdit = () => {
        editCard({
            ...params.card,
            name,
            balance: parseFloat(balance),
            notes: notes.trim() || undefined,
            status,
        });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Balance"
                value={balance}
                onChangeText={setBalance}
                keyboardType="decimal-pad"
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Notes (optional)"
                value={notes}
                onChangeText={setNotes}
                style={[styles.input, styles.textarea]}
                mode="outlined"
                multiline
                numberOfLines={3}
            />

            <SegmentedButtons
                style={styles.segmented}
                value={status}
                onValueChange={(v) => setStatus(v as GiftCardStatus)}
                buttons={['New', 'Open', 'Archived'].map(s => ({
                    label: s,
                    value: s,
                }))}
            />

            <Button
                mode="outlined"
                onPress={handleEdit}
                style={styles.button}
            >
                Save Changes
            </Button>
        </View>
    );
}