namespace BudgetTracker.Api.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public TransactionType Type { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}

public enum TransactionType
{
    Income,
    Expense
}