const express = require('express');
const app = express();
const port = 3001;

const transactions = [
    {id: 't_01', customer: 'Rose Roberts', amount: 84},
    {id: 't_02', customer: 'Chris Cook', amount: 30},
    {id: 't_03', customer: 'Mary Martin', amount: 42},
    {id: 't_04', customer: 'Susan Smith', amount: 26},
    {id: 't_05', customer: 'Rose Roberts', amount: -84},
    {id: 't_06', customer: 'Rose Roberts', amount: 48},
    {id: 't_07', customer: 'Susan Smith', amount: 104},
    {id: 't_08', customer: 'Larry Lewis', amount: 140},
    {id: 't_09', customer: 'Mary Martin', amount: 10},
    {id: 't_10', customer: 'Chris Cook', amount: 60},
    {id: 't_11', customer: 'Susan Smith', amount: -26},
    {id: 't_12', customer: 'Larry Lewis', amount: -140},
    {id: 't_13', customer: 'Rose Roberts', amount: 26},
    {id: 't_14', customer: 'Ryan Roberts', amount: 44}
];

// MW
app.use(express.json());

// API
app.get('/transactions', (req, res) => {
    res.json(transactions);
});

app.get('/total-spending', (req, res) => {
    const totalSpending = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.customer]) {
            acc[transaction.customer] = 0;
        }
        acc[transaction.customer] += transaction.amount;
        return acc;
    }, {});

    res.json(totalSpending);
});

app.get('/top-customer', (req, res) => {
    const totalSpending = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.customer]) {
            acc[transaction.customer] = 0;
        }
        acc[transaction.customer] += transaction.amount;
        return acc;
    }, {});

    const topCustomer = Object.keys(totalSpending).reduce((a, b) => totalSpending[a] > totalSpending[b] ? a : b);
    res.json({ topCustomer, amount: totalSpending[topCustomer] });
});

app.get('/filter-customer', (req, res) => {
    const { name } = req.query;
    const filteredTransactions = transactions.filter(transaction => transaction.customer.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredTransactions);
});


// Start the Server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
