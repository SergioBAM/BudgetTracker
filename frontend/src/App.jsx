import { useState, useEffect } from "react";
import CategoryList from "./components/CategoryList";
import TransactionList from "./components/TransactionList";

function App() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5062/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch('http://localhost:5062/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  return (
    <div>
      <h1>Budget Tracker</h1>      

      <CategoryList categories={categories} />
      <TransactionList transactions={transactions} />
    </div>
  )
}

export default App;