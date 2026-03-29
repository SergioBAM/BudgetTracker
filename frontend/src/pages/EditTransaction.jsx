import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditTransaction() {
    const { id } = useParams();  // grabs the :id from the URL
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('1');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // load categories and the existing transaction in parallel
        Promise.all([
            fetch('http://localhost:5062/api/categories').then(r => r.json()),
            fetch(`http://localhost:5062/api/transactions/${id}`).then(r => r.json())
        ]).then(([cats, transaction]) => {
            setCategories(cats);
            setDescription(transaction.description);
            setAmount(transaction.amount);
            setType(transaction.type === 'Income' ? '0' : '1');
            setCategoryId(transaction.category.id);
            setDate(transaction.date.slice(0, 10));
        });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const transaction = {
            description,
            amount: parseFloat(amount),
            type: parseInt(type),
            categoryId: parseInt(categoryId),
            date: new Date(date).toISOString()
        };

        fetch(`http://localhost:5062/api/transactions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        })
        .then(() => navigate('/'));
    }

    return (
        <div>
            <div className="page-header">
                <h1>Edit Transaction</h1>
            </div>
            <div className="card" style={{ maxWidth: '500px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" value={description}
                            onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number" step="0.01" value={amount}
                            onChange={e => setAmount(e.target.value)} required />
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
                        <select value={categoryId}
                            onChange={e => setCategoryId(e.target.value)} required>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" value={date}
                            onChange={e => setDate(e.target.value)} required />
                    </div>
                    <div className="btn-group">
                        <button type="submit">Update Transaction</button>
                        <button type="button" className="btn-secondary"
                            onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTransaction;