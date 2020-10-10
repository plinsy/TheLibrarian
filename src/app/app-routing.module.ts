import { BookNewComponent } from './books/book-new/book-new.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { BooksComponent } from './books/books.component';
import { BookShowComponent } from './books/book-show/book-show.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BooksComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookNewComponent },
  { path: 'books/show/:id', canActivate: [AuthGuardService], component: BookShowComponent },

  { path: '', redirectTo: "books", pathMatch: "full" },
  { path: '**', redirectTo: "books" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
