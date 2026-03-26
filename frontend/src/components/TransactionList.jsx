function TransactionList({transactions}) {
    return (
        <div>
            <h2>Transactions</h2>
        {transactions.length === 0
            ? <p>No transactions yet.</p>
            : <ul>
                {transactions.map(t => (
                <li key={t.id}>{t.description} - ${t.amount}</li>
                ))}
            </ul>
            }        
        </div>
    );
}

export default TransactionList;