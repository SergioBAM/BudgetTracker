import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Summary from "../components/Summary";
import TransactionList from "../components/TransactionList";
import { getTransactions } from "../services/api";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions()
            .then(setTransactions);
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