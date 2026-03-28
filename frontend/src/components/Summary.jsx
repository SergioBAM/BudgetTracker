function Summary({transactions}) {
    const income = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div className="summary">
            <div className="summary-item">
                <p>Income</p>
                <p className="income">${income.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <p>Expenses</p>
                <p className="expense">${expenses.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <p>Balance</p>
                <p className="balance">${balance.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Summary;