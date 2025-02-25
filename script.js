const cardContainer = document.getElementById('card-container');
const myLibrary = [];

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}
function addBookToLibrary(title, author, numPages, haveRead) {
    let newBook = new Book(title, author, numPages, haveRead);
    myLibrary.push(newBook);
}
function createCardElementFromBook(book){
    title = book.title; 
    author = book.author;
    pages = book.numPages;
    hasRead = book.hasRead;
    let checkedStr = hasRead ? ' checked' : '';
    const cardHTML = `
        <div class="card">
            <div class="card-inner">
            <div class="card-upper">
                <p class="card-book-title">${bookTitle}</p>
                <p class="card-book-author">by ${bookAuthor}</p>
                <p class="card-book-pages">${bookPages} pages</p>
            </div>
            <div class="card-lower">
                <p>read?</p>
                <input class="card-book-hasRead" type="checkbox"${checkedStr}>
            </div>
            </div>
        </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const newCard = tempDiv.firstElementChild;
    return newCard;
}
function addBookToPage(book){
    createCardElementFromBook(book)
    let newCard = createCardElementFromBook(book1);
    cardContainer.appendChild(newCard);
}
function addLibraryToPage(){
    for (let book of myLibrary) {
        addBookToPage(book);
    }
}

let bookTitle= 'myBook';
let bookAuthor= 'myAuthor';
let bookPages = 200;
let bookHasRead = false;
let book1 = new Book(bookTitle, bookAuthor, bookPages, 
    bookHasRead);
let book2 = new Book('book2', 'that guy', 300, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
addLibraryToPage();

// console.log(myLibrary);
// addBookToLibrary('book1','author1',101,false);
// console.log(myLibrary);
// addBookToLibrary('book2','author2',202,true);
// console.log(myLibrary);