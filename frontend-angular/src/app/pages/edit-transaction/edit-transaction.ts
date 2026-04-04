import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService, Category } from '../../services/api';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-transaction.html',
  styleUrl: './edit-transaction.css',
})
export class EditTransaction {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);

  saving = signal(false);
  error = signal<string | null>(null);
  loading = signal(true);

  categories = signal<Category[]>([]);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    type: new FormControl(''),
    categoryId: new FormControl<number | null>(null, Validators.required),
    date: new FormControl('', Validators.required)
  });

  constructor() {    
    console.log(`loading record ${this.id}`);

    forkJoin({
      categories: this.api.getCategories(),
      transaction: this.api.getTransaction(this.id)
    }).subscribe({
      next:({categories, transaction}) => {
          this.loading.set(false);
          
          this.categories.set(categories);

          this.form.patchValue({
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.type,
            categoryId: transaction.category.id,
            date: transaction.date.slice(0,10)
          });          
      },
      error: err => {
        console.log(err);
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  save() {
    console.log('saving', this.form.value);

    this.saving.set(true);
    this.error.set(null);    

    this.api.updateTransaction(this.id, {
        description: this.form.value.description!,
        amount: this.form.value.amount!,
        categoryId: this.form.value.categoryId!,
        type: Number(this.form.value.type === 'Income' ? 0 : 1),
        date: new Date(this.form.value.date!).toISOString()
      }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.log('error', err);
          this.error.set(err.message);
          this.saving.set(false);
        }
      });
  }

  isInvalid(field:string): boolean {
      const control = this.form.get(field);
      return !!(control?.invalid && control?.touched);
  }
}
