import { useState } from "react";

function TransactionForm({categories, onTransactionAdded}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('1'); // 1=expense, 0=income.
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));

    function handleSubmit(e) {
        e.preventDefault();

        const transaction = {
            description,
            amount: parseFloat(amount),
            type: parseInt(type),
            categoryId: parseInt(categoryId),
            date: new Date(date).toISOString()
        };

        fetch('http://localhost:5062/api/transactions', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(transaction)
        })
        .then(res => res.json())
        .then(() => {
            onTransactionAdded(); // notify callback.
            // reset
            setDescription('');
            setAmount('');
            setCategoryId('');
        });
    }

    return (
        <div className="card"> 
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required />
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="0">Income</option>
                        <option value="1">Expense</option>
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Category</label>
                    <select
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default TransactionForm;