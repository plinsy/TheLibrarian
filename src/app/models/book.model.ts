export class Book {

    id: number;
    photo: string;
    synopsis: string;

    constructor(public title: string, public author: string){
        
    }

    bgImg() {
        return `background-image: url(${this.photo})`
    }
}