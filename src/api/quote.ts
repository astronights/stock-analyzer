import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    symbol: String,
    displayName: String,
    currency: String,
    bookValue: Number,
    fiftyDayAverage: Number,
    fiftyDayAverageChange: Number,
    fiftyDayAverageChangePercent: Number,
    twoHundredDayAverage: Number,
    twoHundredDayAverageChange: Number,
    twoHundredDayAverageChangePercent: Number,
    marketCap: Number,
    forwardPE: Number,
    priceToBook: Number,
    regularMarketTime: Date,
    regularMarketPrice: Number,
    regularMarketDayHigh: Number,
    regularMarketDayLow: Number,
    regularMarketVolume: Number,
    bidSize: Number,
    askSize: Number,
});

const getModel = () => {
    return mongoose.model('Quote', quoteSchema);
}

const QuoteModel = mongoose.models.Quote || getModel();

export default QuoteModel;
