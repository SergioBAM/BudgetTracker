import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTransactions } from '../services/api';
import Summary from '../components/Summary';
import TransactionList from '../components/TransactionList';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTransactions()
            .then(setTransactions)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

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