import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftCard } from '../screens';

const GiftCardContext = createContext<any>(null);

const reducer = (state: GiftCard[], action: any): GiftCard[] => {
    switch (action.type) {
        case 'SET_CARDS':
            return action.payload;
        case 'ADD_CARD':
            return [...state, action.payload];
        case 'EDIT_CARD':
            return state.map(c => c.id === action.payload.id ? action.payload : c);
        case 'DELETE_CARD':
            return state.filter(c => c.id !== action.payload);
        default:
            return state;
    }
};

export const GiftCardProvider = ({ children }: { children: React.ReactNode }) => {
    const [cards, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        AsyncStorage.getItem('gift_cards').then(json => {
            if (json) dispatch({ type: 'SET_CARDS', payload: JSON.parse(json) });
        });
    }, []);

    const persist = (data: GiftCard[]) => AsyncStorage.setItem('gift_cards', JSON.stringify(data));

    const addCard = (card: GiftCard) => {
        dispatch({ type: 'ADD_CARD', payload: card });
        persist([...cards, card]);
    };

    const editCard = (card: GiftCard) => {
        const updated = cards.map(c => c.id === card.id ? card : c);
        dispatch({ type: 'EDIT_CARD', payload: card });
        persist(updated);
    };

    const deleteCard = (id: string) => {
        const updated = cards.filter(c => c.id !== id);
        dispatch({ type: 'DELETE_CARD', payload: id });
        persist(updated);
    };

    return (
        <GiftCardContext.Provider value={{ cards, addCard, editCard, deleteCard }}>
            {children}
        </GiftCardContext.Provider>
    );
};

export const useGiftCards = () => useContext(GiftCardContext);