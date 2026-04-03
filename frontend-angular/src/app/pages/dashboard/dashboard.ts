import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private api = inject(ApiService);

  transactions = toSignal(this.api.getTransactions(), { initialValue: []});

  income = () => this.transactions()
    .filter(t => t.type === 'Income')
    .reduce((sum, t)=> sum + t.amount, 0);

  expenses = () => this.transactions()
    .filter(t => t.type === 'Expense')
    .reduce((sum, t)=> sum + t.amount, 0);

    balance = () => this.income() + this.expenses();
}
