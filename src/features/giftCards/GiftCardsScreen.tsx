import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text, FAB, Card, IconButton, Searchbar, SegmentedButtons, Chip, Surface } from 'react-native-paper';
import { useGiftCards } from './GiftCardContext';
import { GiftCardStatus,GiftCardFilterStatus } from './types';
import { useNavigation } from '@react-navigation/native';
import { commonStyles as styles } from '../../styles/commonStyles';
import { formatCurrency } from "../../utils";

export default function GiftCardsScreen() {
    const { cards, deleteCard } = useGiftCards();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'balance'>('name');
    const [statusFilter, setStatusFilter] = useState<GiftCardFilterStatus>('All');
    const navigation = useNavigation();
    const statusOptions: GiftCardFilterStatus[] = ['All', 'New', 'Open', 'Archived'];

    const filtered = useMemo(() => {
        return cards
            .filter(c => statusFilter === 'All' ? true : c.status === statusFilter)
            .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => sortBy === 'name'
                ? a.name.localeCompare(b.name)
                : b.balance - a.balance);
    }, [cards, query, sortBy, statusFilter]);

    const totalBalance = filtered.reduce((sum, card) => sum + card.balance, 0);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search by name"
                value={query}
                onChangeText={setQuery}
                style={styles.searchBar}
            />

            <SegmentedButtons
                value={sortBy}
                onValueChange={(v) => setSortBy(v as 'name' | 'balance')}
                buttons={[
                    { value: 'name', label: 'Name', icon: 'sort-alphabetical-ascending' },
                    { value: 'balance', label: 'Balance', icon: 'sort-numeric-descending' },
                ]}
                style={styles.segmented}
            />
            <Text variant="titleLarge" style={styles.total}>Total: {formatCurrency(totalBalance)}</Text>
            <View style={styles.chipContainer}>
                {statusOptions.map((status) => (
                    <Chip
                        key={status}
                        mode={'outlined'}
                        selected={statusFilter === status}
                        onPress={() => setStatusFilter(status)}
                        style={styles.chip}
                    >
                        {status}
                    </Chip>
                ))}
            </View>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <Card
                        mode="elevated"
                        style={styles.card} // Removed background color styling
                        onPress={() => navigation.navigate('EditGiftCard', { card: item })}
                    >
                        <Card.Title
                            title={<Text variant={'titleMedium'}>{item.name}</Text>}
                            subtitle={`${formatCurrency(item.balance)} • ${item.status}`}
                            right={(props) => (
                                <IconButton
                                    {...props}
                                    icon="delete-outline"
                                    onPress={() => deleteCard(item.id)}
                                />
                            )}
                        />
                    </Card>
                )}
            />

            <FAB
                icon="plus"
                onPress={() => navigation.navigate('AddGiftCard')}
                style={styles.fab}
            />
        </View>
    );
}