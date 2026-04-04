import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransaction {
  private api = inject(ApiService);
  private router = inject(Router);

  categories = toSignal(this.api.getCategories(), { initialValue: []});

  saving = signal(false);
  error = signal<string | null>(null);

  form = {
    description: '',
    amount: null as number | null,
    type: 1,
    categoryId: null as number | null,
    date: new Date().toISOString().slice(0,10)
  };

  save() {
    console.log('saved called', this.form);

    if (!this.form.amount || !this.form.categoryId) {
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    this.api.createTransaction({
      description: this.form.description,
      amount: this.form.amount,
      type: this.form.type,
      categoryId: this.form.categoryId!,
      date: new Date(this.form.date).toISOString()
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        console.log('error', err);
        this.error.set(err.message);
        this.saving.set(false);
      }
    });

  }   
}
