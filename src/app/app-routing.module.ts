import { BookNewComponent } from './books/book-new/book-new.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { BooksComponent } from './books/books.component';
import { BookShowComponent } from './books/book-show/book-show.component';

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/new', component: BookNewComponent },
  { path: 'books/show/:id', component: BookShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
