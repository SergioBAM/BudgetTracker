namespace BudgetTracker.Api.Models;

public class Category
{
    public int Id {get; set;}
    public string Name {get;set;} = string.Empty;
    public string Colour {get;set;} = "#000000";
    public ICollection<Transaction> Transactions {get; set;} = [];
}