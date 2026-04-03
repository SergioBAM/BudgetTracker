import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTransactions } from '../services/api';
import Summary from '../components/Summary';
import TransactionList from '../components/TransactionList';
import useFetch from '../hooks/useFetch';

function Dashboard() {
    const { data: transactions, loading, error } = useFetch(getTransactions);   

    if (loading) return <p className='loading'>Loading...</p>;
    if (error) return <div className='error'>{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Budget Tracker</h1>
                <Link to="/transactions/add" className="btn">+ Add Transaction</Link>
            </div>

            <Summary transactions={transactions} />
            <TransactionList transactions={transactions} />
        </div>
    );
}

export default Dashboard;