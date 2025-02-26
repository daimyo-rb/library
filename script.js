const cardContainer = document.getElementById('card-container');
const addBookModal = document.getElementById("addBookModal");
const addBookBtn = document.getElementsByClassName("add-book-btn")[0];
const closeModalBtn = document.getElementById("closeModalBtn");
const addBookForm = document.getElementById("form-add-book");
let counter = 0;

const myLibrary = [];

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.id = counter;
    counter += 1;
}
function addBookToLibrary(book){
    myLibrary.push(book);
}
function createCardElementFromBook(book){
    let title = book.title; 
    let author = book.author;
    let numPages = book.numPages;
    let haveRead = book.haveRead;
    let id = book.id
    let checkedStr = haveRead ? ' checked' : '';
    const cardHTML = `
        <div class="card" data-id=${id}>
            <span class="delete-card-btn" data-id=${id}>&times;</span>
            <div class="card-inner">
                <div class="card-upper">
                    <p class="card-book-title">${title}</p>
                    <p class="card-book-author">by ${author}</p>
                    <p class="card-book-pages">${numPages} pages</p>
                </div>
                <div class="card-lower">
                    <p>read?</p>
                    <input class="card-book-hasRead" type="checkbox"${checkedStr} data-id=${id}>
                </div>
            </div>
        </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const newCard = tempDiv.firstElementChild;
    // console.log(newCard);
    return newCard;
}
function addBookToPage(book){
    let newCard = createCardElementFromBook(book);
    let closeBtn = newCard.getElementsByClassName('delete-card-btn')[0];
    closeBtn.addEventListener('click', (event) => {
        deleteBook(closeBtn.getAttribute('data-id'));
    });
    let checkbox = newCard.getElementsByClassName('card-book-hasRead')[0];
    checkbox.addEventListener('click', (event) => {
        toggleHaveRead(newCard.id);
    });
    cardContainer.appendChild(newCard);
}
function addLibraryToPage(){
    for (let book of myLibrary) {
        addBookToPage(book);
    }
}
function openAddBookModal(){
    addBookModal.style.display = 'block';
}
function closeAddBookModal(){
    addBookModal.style.display = 'none';
}
function handleFormSubmission() {
    const formData = new FormData(addBookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const numPages = formData.get('numPages');
    let haveRead = (formData.get('haveRead') === "true") ? true : false;
    closeAddBookModal();
    addBookForm.reset();
    const newBook = new Book(title, author, numPages, haveRead);
    addBookToLibrary(newBook);
    addBookToPage(newBook);

}
function configureModalEventListeners() {
    addBookBtn.addEventListener('click', () => {
        openAddBookModal();
    });
    closeModalBtn.addEventListener('click', () => {
        closeAddBookModal();
    });
    window.addEventListener('click', (event) => {
        if (event.target === addBookModal) {
            closeAddBookModal();
        }
    });
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission();
    });
}
function removeBookCardFromPage(id){
    for (let child of cardContainer.children) {
        if (id == child.getAttribute('data-id')) child.remove();
    }
}
function removeBookFromLibrary(id){
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            i--;
        }
    }
}
function deleteBook(id){
    removeBookCardFromPage(id);
    removeBookFromLibrary(id);
}
function toggleHaveRead(id) {
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].id == id) {
            myLibrary[i].haveRead = !myLibrary[i].haveRead;
        }
    }
}
configureModalEventListeners();

let bookTitle= 'myBook';
let bookAuthor= 'myAuthor';
let bookPages = 200;
let bookHaveRead = false;
let book1 = new Book(bookTitle, bookAuthor, bookPages, 
    bookHaveRead);
// console.log(book1);
let book2 = new Book('book2', 'that guy', 300, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(new Book('title', 'author', 123, false));
// addBookToLibrary(book2);
// addBookToLibrary(book2);
// addBookToLibrary(book2);
// addBookToLibrary(book2);
// // addBookToLibrary(book2);
// addBookToLibrary(book2);
addLibraryToPage();