import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories, getTransaction, updateTransaction } from '../services/api';
import useFetch from '../hooks/useFetch';

function EditTransaction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const { data: categories, loading: loadingCats, error: errorCats } = useFetch(getCategories);
    const { data: transaction, loading: loadingTx, error: errorTx } = useFetch(
        () => getTransaction(id), [id]
    );

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setSaveError(null);
        const form = e.target;
        try {
            await updateTransaction(id, {
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

    if (loadingCats || loadingTx) return <p className="loading">Loading...</p>;
    if (errorCats || errorTx) return <div className="error">{errorCats || errorTx}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Edit Transaction</h1>
            </div>
            <div className="card" style={{ maxWidth: '500px' }}>
                {saveError && <div className="error">{saveError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input name="description" type="text"
                            defaultValue={transaction.description} required />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input name="amount" type="number" step="0.01"
                            defaultValue={transaction.amount} required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type"
                            defaultValue={transaction.type === 'Income' ? '0' : '1'}>
                            <option value="0">Income</option>
                            <option value="1">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="categoryId" defaultValue={transaction.category.id} required>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input name="date" type="date"
                            defaultValue={transaction.date.slice(0, 10)} required />
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