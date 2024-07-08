'use server';

// import { Clue } from '../types';
import yahooFinance from 'yahoo-finance2';
import { connectDB } from './DBAPI';
import QuoteModel from './quote';

export const getQuote = async (): Promise<number> => {

    const result = await yahooFinance.quote('AAPL');
    // return Promise.resolve(result);
}
