import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  colour: string;
}

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: 'Income' | 'Expense';
    category: Category;
}

export interface CreateTransaction {
    description: string;
    amount: number;
    date: string;
    type: number;
    categoryId: number;
}

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:5062/api';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // Transactions:
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  getTransaction(id: number): Observable<Transaction> {
        return this.http.get<Transaction>(`${this.baseUrl}/transactions/${id}`);
  }

  createTransaction(transaction: CreateTransaction): Observable<number> {
      return this.http.post<number>(`${this.baseUrl}/transactions`, transaction);
  }

  updateTransaction(id: number, transaction: CreateTransaction): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/transactions/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/transactions/${id}`);
  }
}
