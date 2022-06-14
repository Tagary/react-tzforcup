export interface ICurrencyfull {
    base: string;
    date: string;
    rates: ICurrency;
    timestamp: number;
}

interface ICurrency {
    RUB: number;
    USD:number;
    EUR: number;
}