import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTransaction } from './pages/add-transaction/add-transaction';
import { EditTransaction } from './pages/edit-transaction/edit-transaction';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'transactions/add', component: AddTransaction},
    { path: 'transactions/:id', component: EditTransaction}
];
