import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, FAB, Card, IconButton, Searchbar, SegmentedButtons, Chip,  Snackbar } from 'react-native-paper';
import { useGiftCards } from '../contexts/GiftCardContext';
import {GiftCardFilterStatus, GiftCard as GiftCardType, GiftCard} from './';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';
import { formatCurrency } from "../utils";
import Animated, {FadeIn, FadeOut, LinearTransition} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GiftCardsScreen() {
    const { cards, deleteCard } = useGiftCards();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'balance'>('name');
    const [statusFilter, setStatusFilter] = useState<GiftCardFilterStatus>('All');
    const navigation = useNavigation();
    const statusOptions: GiftCardFilterStatus[] = ['All', 'New', 'Open', 'Archived'];

    // For delete confirmation
    const [deleteSnackbarVisible, setDeleteSnackbarVisible] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<GiftCardType | null>(null);

    const filtered = useMemo(() => {
        return cards
            .filter(c => statusFilter === 'All' ? true : c.status === statusFilter)
            .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => sortBy === 'name'
                ? a.name.localeCompare(b.name)
                : b.balance - a.balance);
    }, [cards, query, sortBy, statusFilter]);

    const totalBalance = filtered.reduce((sum:number, card:GiftCard) => sum + card.balance, 0);

    const handleDelete = (card: GiftCardType) => {
        setCardToDelete(card);
        setDeleteSnackbarVisible(true);
    };

    const confirmDelete = () => {
        if (cardToDelete) {
            deleteCard(cardToDelete.id);
        }
        setDeleteSnackbarVisible(false);
        setCardToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteSnackbarVisible(false);
        setCardToDelete(null);
    };

    // Empty state component
    const EmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <MaterialCommunityIcons name="credit-card-outline" size={80} color="#BDBDBD" />
            <Text style={styles.emptyStateTitle}>No Gift Cards Yet</Text>
            <Text style={styles.emptyStateText}>Add your first gift card by tapping the + button below</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            <Searchbar
                placeholder="Search by name"
                value={query}
                onChangeText={setQuery}
                style={commonStyles.searchBar}
            />

            <SegmentedButtons
                value={sortBy}
                onValueChange={(v) => setSortBy(v as 'name' | 'balance')}
                buttons={[
                    { value: 'name', label: 'Name', icon: 'sort-alphabetical-ascending' },
                    { value: 'balance', label: 'Balance', icon: 'sort-numeric-descending' },
                ]}
                style={commonStyles.segmented}
            />

            {filtered.length > 0 && (
                <Text variant="titleLarge" style={commonStyles.total}>Total: {formatCurrency(totalBalance)}</Text>
            )}

            <View style={commonStyles.chipContainer}>
                {statusOptions.map((status) => (
                    <Chip
                        key={status}
                        mode={statusFilter === status ? 'flat' : 'outlined'}
                        selected={statusFilter === status}
                        onPress={() => setStatusFilter(status)}
                        style={commonStyles.chip}>
                        {status}
                    </Chip>
                ))}
            </View>

            {filtered.length === 0 && cards.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }) => (
                        <Animated.View
                            entering={FadeIn.duration(300)}
                            exiting={FadeOut.duration(300)}
                            layout={LinearTransition.springify()}
                        >
                            <Card
                                mode="elevated"
                                style={styles.card}
                                onPress={() => navigation.navigate('EditGiftCard', { card: item })}
                            >
                                <Card.Title
                                    title={<Text variant={'titleMedium'}>{item.name}</Text>}
                                    subtitle={
                                        <View style={styles.subtitleContainer}>
                                            <Text>{formatCurrency(item.balance)}</Text>
                                            <View style={styles.statusContainer}>
                                                <View
                                                    style={[
                                                        styles.statusIndicator,
                                                        { backgroundColor: getStatusColor(item.status) }
                                                    ]}
                                                />
                                                <Text>{item.status}</Text>
                                            </View>
                                        </View>
                                    }
                                    right={(props) => (
                                        <IconButton
                                            {...props}
                                            icon="delete-outline"
                                            onPress={() => handleDelete(item)}
                                        />
                                    )}
                                />
                            </Card>
                        </Animated.View>
                    )}
                />
            )}

            <FAB
                icon="plus"
                onPress={() => navigation.navigate('AddGiftCard')}
                style={commonStyles.fab}
            />

            <Snackbar
                visible={deleteSnackbarVisible}
                onDismiss={cancelDelete}
                action={{
                    label: 'Undo',
                    onPress: cancelDelete,
                }}
                duration={3000}
                onIconPress={confirmDelete}
                icon={'delete'}
            >
                {cardToDelete ? `Delete ${cardToDelete.name} card?` : 'Delete this card?'}
            </Snackbar>
        </View>
    );
}

// Helper function to get status colors
const getStatusColor = (status: string) => {
    switch (status) {
        case 'New': return '#4CAF50'; // Green
        case 'Open': return '#2196F3'; // Blue
        case 'Archived': return '#9E9E9E'; // Grey
        default: return '#9E9E9E';
    }
};

// Additional styles
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#757575',
    },
    emptyStateButton: {
        marginTop: 16,
    },
});