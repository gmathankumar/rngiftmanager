import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, SegmentedButtons, Snackbar } from 'react-native-paper';
import { useGiftCards } from './GiftCardContext';
import uuid from 'react-native-uuid';
import { GiftCardStatus } from './types';
import { useNavigation } from '@react-navigation/native';
import { commonStyles as styles } from '../../styles/commonStyles';

export default function AddGiftCardScreen() {
    const { addCard } = useGiftCards();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState<GiftCardStatus>('New');

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const isValid = name.trim() !== '' && !isNaN(parseFloat(balance)) && parseFloat(balance) >= 0;

    const showError = (msg: string) => {
        setSnackbarMsg(msg);
        setIsSuccess(false);
        setSnackbarVisible(true);
    };

    const handleAdd = () => {
        if (!isValid) {
            showError('Please fill out the form correctly.');
            return;
        }

        addCard({
            id: uuid.v4() as string,
            name: name.trim(),
            balance: parseFloat(balance),
            notes: notes.trim() || undefined,
            status,
        });

        setSnackbarMsg('Gift card added successfully.');
        setIsSuccess(true);
        setSnackbarVisible(true);
    };

    useEffect(() => {
        if (isSuccess && !snackbarVisible) {
            navigation.goBack(); // Navigate only after snackbar closes
        }
    }, [snackbarVisible]);

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
                onPress={handleAdd}
                disabled={!isValid}
            >
                Add Gift Card
            </Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
                action={{ label: 'OK', onPress: () => setSnackbarVisible(false) }}
            >
                {snackbarMsg}
            </Snackbar>
        </View>
    );
}
