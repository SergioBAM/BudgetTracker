import { useState, useEffect, useCallback } from "react";
import CategoryList from "./components/CategoryList";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Summary from "./components/Summary";

function App() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = useCallback(() => {
    fetch('http://localhost:5062/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5062/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));    

    loadTransactions();
  }, [loadTransactions]);

  return (
    <div>
      <h1>Budget Tracker</h1>      
      <Summary
        transactions={transactions} />
        
      <TransactionForm
        categories={categories}
        onTransactionAdded={loadTransactions} />
      
      <TransactionList transactions={transactions} />
      <CategoryList categories={categories} />
    </div>
  )
}

export default App;