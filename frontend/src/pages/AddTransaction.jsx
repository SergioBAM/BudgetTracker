import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, createTransaction } from '../services/api';

function AddTransaction() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('1');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await createTransaction({
                description,
                amount: parseFloat(amount),
                type: parseInt(type),
                categoryId: parseInt(categoryId),
                date: new Date(date).toISOString()
            });
            navigate('/');
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    }

    if (loading) return <p className="loading">Loading...</p>;

    return (
        <div>
            <div className="page-header">
                <h1>Add Transaction</h1>
            </div>
            <div className="card" style={{ maxWidth: '500px' }}>

                {error && <div className="error">{error}</div>}
                
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
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Transaction'}
                        </button>
                        <button type="button" className="btn-secondary"
                            onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransaction;