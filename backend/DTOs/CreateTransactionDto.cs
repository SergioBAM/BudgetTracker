namespace BudgetTracker.Api.DTOs;

public class CreateTransactionDto
{
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int Type { get; set; }
    public int CategoryId { get; set; }
}