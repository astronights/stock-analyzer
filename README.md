# Stock Analyzer

A simple TypeScript app that pulls live stock prices (on a minute basis!) given tickers for analyses and predictive modelling.

## Technology

The project is created with the following stack:

- TypeScript
- Express

If you would like to run the project yourself, please edit the `src/data/assets.txt` file and run the following:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see live logs.

On a daily basis, logs are moved to the `archive` directory.

The `prices` directory has stock ticker details in the `.csv` format during market hours. At the end of eaxh trading day, a `.parquet` is summarised for each stock.
