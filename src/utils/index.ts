export const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(val);
