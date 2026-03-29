const BASE_URL = 'http://localhost:5062/api';
const myHeaders = new Headers({
    'Content-Type': 'application/json'
});

// ── Categories ──────────────────────────────────────────
export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function createCategory(category) {
    const res = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
}

// ── Transactions ─────────────────────────────────────────
export async function getTransactions() {
    const res = await fetch(`${BASE_URL}/transactions`);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
}

export async function getTransaction(id) {
    const res = await fetch(`${BASE_URL}/transactions/${id}`);
    if (!res.ok) throw new Error('Failed to fetch transaction');
    return res.json();
}

export async function createTransaction(transaction) {
    const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(transaction)
    });
    if (!res.ok) throw new Error('Failed to create transaction');
    return res.json();
}

export async function updateTransaction(id, transaction) {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(transaction)
    });
    if (!res.ok) throw new Error('Failed to update transaction');
}

export async function deleteTransaction(id) {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete transaction');
}