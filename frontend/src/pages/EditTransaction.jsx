import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories, getTransaction, updateTransaction } from '../services/api';

function EditTransaction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('1');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        Promise.all([getCategories(), getTransaction(id)])
            .then(([cats, transaction]) => {
                setCategories(cats);
                setDescription(transaction.description);
                setAmount(transaction.amount);
                setType(transaction.type === 'Income' ? '0' : '1');
                setCategoryId(transaction.category.id);
                setDate(transaction.date.slice(0, 10));
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await updateTransaction(id, {
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
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Edit Transaction</h1>
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
                            {saving ? 'Saving...' : 'Update Transaction'}
                        </button>
                        <button type="button" className="btn-secondary"
                            onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTransaction;