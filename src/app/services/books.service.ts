import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: any[];
  bookSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks()
  }

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : []

        this.emitBooks()
      })
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books' + id).once('value')
          .then(
            (data: DataSnapshot) => {
              resolve(data.val())
            },
            (error) => {
              reject(error)
            }
          )
      }
    )
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook)
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true
        }
      }
    )
    // remove book from books
    this.books.slice(bookIndexToRemove, 1)
    this.saveBooks()
    this.emitBooks()
  }
}
