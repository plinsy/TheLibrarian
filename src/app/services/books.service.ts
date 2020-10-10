import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
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
        firebase.database().ref('/books/' + id).once('value')
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
    // remove its photo
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo)
      storageRef.delete()
        .then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);            
          }
        ) 
    }

    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true
        }
      }
    )
    
    // remove book from books
    this.books = this.books.filter(
      (book, bookIndex) => {
        return bookIndex !== bookIndexToRemove
      }
    )
    
    // console.log(this.books);

    this.saveBooks()
    this.emitBooks()
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement ! : ');
            console.log(error);
            reject();            
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        )
      }
    )
  }
}
