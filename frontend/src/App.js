import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [totalSpending, setTotalSpending] = useState({});
    const [topCustomer, setTopCustomer] = useState({});
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data));

        fetch('http://localhost:3001/total-spending')
            .then(response => response.json())
            .then(data => setTotalSpending(data));

        fetch('http://localhost:3001/top-customer')
            .then(response => response.json())
            .then(data => setTopCustomer(data));

        const savedFilter = localStorage.getItem('filter');
        if (savedFilter) {
            setFilter(savedFilter);
            fetch(`http://localhost:3001/filter-customer?name=${savedFilter}`)
                .then(response => response.json())
                .then(data => setTransactions(data));
        }
       
    }, []);

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
        localStorage.setItem('filter', newFilter);
        fetch(`http://localhost:3001/filter-customer?name=${newFilter}`)
            .then(response => response.json())
            .then(data => setTransactions(data));
    };

    return (
        <div className="container">
            <h1>Transactions</h1>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter by customer name"
            />
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.customer}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <h2>Total Spending per Customer</h2>
            <ul>
                {Object.keys(totalSpending).map((customer) => (
                    <li key={customer}>
                        {customer}: ${totalSpending[customer]}
                    </li>
                ))}
            </ul>
            <h2>Top Customer</h2>
            <p>
                {topCustomer.topCustomer}: ${topCustomer.amount}
            </p>
        </div>
    );
}

export default App;
