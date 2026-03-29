import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Summary from "../components/Summary";
import TransactionList from "../components/TransactionList";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5062/api/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, []);

    return (
        <div>
            <div className="page-header">
                <h1>Budget Tracker</h1>
                <Link to="/transactions/add" className="btn">Add Transactions</Link>
            </div>
            <Summary transactions={transactions} />
            <TransactionList transactions={transactions} />
        </div>
    );
}

export default Dashboard;