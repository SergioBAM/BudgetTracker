import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, createTransaction } from '../services/api';
import useFetch from '../hooks/useFetch';

function AddTransaction() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const { data: categories, loading, error } = useFetch(getCategories);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setSaveError(null);
        const form = e.target;
        try {
            await createTransaction({
                description: form.description.value,
                amount: parseFloat(form.amount.value),
                type: parseInt(form.type.value),
                categoryId: parseInt(form.categoryId.value),
                date: new Date(form.date.value).toISOString()
            });
            navigate('/');
        } catch (err) {
            setSaveError(err.message);
            setSaving(false);
        }
    }

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Add Transaction</h1>
            </div>
            <div className="card" style={{ maxWidth: '500px' }}>
                {saveError && <div className="error">{saveError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input name="description" type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input name="amount" type="number" step="0.01" required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" defaultValue="1">
                            <option value="0">Income</option>
                            <option value="1">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="categoryId" required>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input name="date" type="date"
                            defaultValue={new Date().toISOString().slice(0, 10)} required />
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
