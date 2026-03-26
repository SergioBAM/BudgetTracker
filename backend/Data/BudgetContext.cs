using BudgetTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Api.Data;

public class BudgetContext : DbContext
{
    public BudgetContext(DbContextOptions<BudgetContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed some starter categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Salary",      Colour = "#22c55e" },
            new Category { Id = 2, Name = "Groceries",   Colour = "#f97316" },
            new Category { Id = 3, Name = "Utilities",   Colour = "#3b82f6" },
            new Category { Id = 4, Name = "Transport",   Colour = "#a855f7" },
            new Category { Id = 5, Name = "Eating Out",  Colour = "#ec4899" }
        );
    }
}