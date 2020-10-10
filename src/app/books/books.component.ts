import { BooksService } from './../services/books.service';
import { Book } from './../models/book.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  title: string = "Loading your books...";
  books: Book[];
  bookSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.bookSubscription = this.booksService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;        
      }
    )

    setTimeout(
      () => {
        this.title = "Your books";
      }, 3000
    )

    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {    
    this.booksService.removeBook(book)
  }

  onViewBook(id: number) {    
    this.router.navigate(['/books', 'show', id])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.bookSubscription.unsubscribe();
  }

}
