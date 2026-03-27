using BudgetTracker.Api.Data;
using BudgetTracker.Api.Models;
using BudgetTracker.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly BudgetContext _db;

    public TransactionsController(BudgetContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await _db.Transactions
            .Include(t => t.Category)
            .OrderByDescending(t => t.Date)
            .Select(item => new TransactionDto
            {
                Id = item.Id,
                Description = item.Description,
                Amount = item.Amount,
                Date = item.Date,
                Type = item.Type.ToString(),
                Category = new CategoryDto
                {
                    Id = item.Category.Id,
                    Name = item.Category.Name,
                    Colour = item.Category.Colour
                }
            })
            .ToListAsync();

        return Ok(transactions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var t = await _db.Transactions
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (t is null)
        {
            return NotFound();
        }

        return Ok(new TransactionDto
        {
            Id = t.Id,
            Description = t.Description,
            Amount = t.Amount,
            Date = t.Date,
            Type = t.Type.ToString(),
            Category = new CategoryDto
            {
                Id = t.Category.Id,
                Name = t.Category.Name,
                Colour = t.Category.Colour
            }
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTransactionDto dto)
    {
        var transaction = new Transaction
        {
            Description = dto.Description,
            Amount = dto.Amount,
            Date = dto.Date,
            Type = (TransactionType)dto.Type,
            CategoryId = dto.CategoryId
        };

        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CreateTransactionDto dto)
    {
        var transaction = await _db.Transactions.FindAsync(id);
        if (transaction is null)
        {
            return NotFound();
        }

        transaction.Description = dto.Description;
        transaction.Amount = dto.Amount;
        transaction.Date = dto.Date;
        transaction.Type = (TransactionType)dto.Type;
        transaction.CategoryId = dto.CategoryId;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var transaction = await _db.Transactions.FindAsync(id);
        if (transaction is null)
        {
            return NotFound();
        }
        
        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}