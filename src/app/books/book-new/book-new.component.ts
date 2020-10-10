import { Book } from './../../models/book.model';
import { BooksService } from './../../services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as faker from "faker";

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private booksService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    var title = faker.name.title()
    var author = faker.name.firstName()
    var synopsis = faker.lorem.paragraph()

    this.bookForm = this.formBuilder.group({
      title: [title, [Validators.required]],
      author: [author, [Validators.required]],
      synopsis: synopsis,
    })
  }

  onSaveBook() {
    const { title, author, synopsis } = this.bookForm.value;

    const newBook = new Book(title, author)
    newBook.synopsis = synopsis;

    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books'])
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file)
      .then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
