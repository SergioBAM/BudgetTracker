function TransactionList({ transactions }) {
    if (transactions.length === 0) {
        return <div className="card"><p>No transactions yet.</p></div>;
    }

    return (
        <div className="card">
            <h2>Transactions</h2>
            {transactions.map(t => (
                <div key={t.id} className="transaction-item">
                    <div className="transaction-meta">
                        <span className="transaction-description">{t.description}</span>
                        <span className="transaction-detail">
                            <span
                                className="category-badge"
                                style={{ backgroundColor: t.category?.colour }}>
                                {t.category?.name}
                            </span>
                            {t.date?.slice(0, 10)}
                        </span>
                    </div>
                    <span
                        className={`transaction-amount ${t.type === 'Income' ? 'income' : 'expense'}`}>
                        {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;