import { BooksService } from './../../services/books.service';
import { Book } from './../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-show',
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.scss']
})
export class BookShowComponent implements OnInit {

  book: Book;

  constructor(private router: Router, private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    
    this.booksService.getSingleBook(+id)
      .then(
        (book: Book) => {          
          this.book = book
        }
      )
  }

  onBack() {
    this.router.navigate(['/books'])
  }

}
