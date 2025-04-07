export type GiftCardStatus = 'New' | 'Open' | 'Archived';
export type GiftCardFilterStatus = GiftCardStatus | 'All'

export type GiftCard = {
    id: string;
    name: string;
    balance: number;
    status: GiftCardStatus;
    notes?: string;
};
