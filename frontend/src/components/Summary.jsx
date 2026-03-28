function Summary({transactions}) {
    const income = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div>
            <h2>Summary</h2>
            <p>Income: ${income.toFixed(2)}</p>
            <p>Expenses: ${expenses.toFixed(2)}</p>
            <p>Balance: ${balance.toFixed(2)}</p>
        </div>
    );
}

export default Summary;