class Book {
    constructor(title, author, numPages, haveRead, id) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
        this.id = id;
    }
}

class Library {
    constructor () {
        this.counter = 0;
        this.bookArray = [];
    }
    addBookToLibrary(book){
        book.id = this.counter;
        this.counter += 1;
        this.bookArray.push(book);
    }
    removeBookFromLibrary(id){
        for (let i = 0; i < this.bookArray.length; i++){
            if (this.bookArray[i].id == id) {
                this.bookArray.splice(i, 1);
                i--;
            }
        }
    }
    toggleHaveRead(id) {
        for (let i = 0; i < this.bookArray.length; i++){
            if (this.bookArray[i].id == id) {
                this.bookArray[i].haveRead = !this.bookArray[i].haveRead;
            }
        }
    }
}

class LibraryScreenRenderer {
    cardContainer = document.getElementById('card-container');
    addBookModal = document.getElementById("addBookModal");
    addBookBtn = document.getElementsByClassName("add-book-btn")[0];
    closeModalBtn = document.getElementById("closeModalBtn");
    addBookForm = document.getElementById("form-add-book");
    formBookName = document.getElementById("form-book-name");
    formAuthorName = document.getElementById("form-author-name");
    formNumPages = document.getElementById("form-num-pages");
    constructor (library) {
        this.library = new Library();
        this.configureModalEventListeners();
    }
    createCardElementFromBook(book){
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
    addBookToPage(book){
        let newCard = this.createCardElementFromBook(book);
        let closeBtn = newCard.getElementsByClassName('delete-card-btn')[0];
        closeBtn.addEventListener('click', (event) => {
            this.deleteBook(closeBtn.dataset.id);
        });
        let checkbox = newCard.getElementsByClassName('card-book-hasRead')[0];
        checkbox.addEventListener('click', (event) => {
            this.library.toggleHaveRead(newCard.dataset.id);
        });
        this.cardContainer.appendChild(newCard);
    }
    addLibraryToPage(){
        for (let book of this.library.bookArray) {
            this.addBookToPage(book);
        }
    }
    removeBookCardFromPage(id){
        for (let child of this.cardContainer.children) {
            if (id == child.getAttribute('data-id')) child.remove();
        }
    }
    deleteBook(id){
        this.removeBookCardFromPage(id);
        this.library.removeBookFromLibrary(id);
    }
    openAddBookModal(){
        this.addBookModal.style.display = 'block';
    }
    closeAddBookModal(){
        this.addBookModal.style.display = 'none';
    }    
    handleFormSubmission() {
        const formData = new FormData(this.addBookForm);
        const title = formData.get('title');
        const author = formData.get('author');
        const numPages = formData.get('numPages');
        let haveRead = (formData.get('haveRead') === "true") ? true : false;
        this.closeAddBookModal();
        this.addBookForm.reset();
        const newBook = new Book(title, author, numPages, haveRead);
        this.library.addBookToLibrary(newBook);
        this.addBookToPage(newBook);
    }
    configureOpenCloseModalEventListeners() {
        this.addBookBtn.addEventListener('click', () => {
            this.openAddBookModal();
        });
        this.closeModalBtn.addEventListener('click', () => {
            this.closeAddBookModal();
        });
        window.addEventListener('click', (event) => {
            if (event.target === this.addBookModal) {
                this.closeAddBookModal();
            }
        });
    }
    configureBookNameValidation() {
        this.formBookName.addEventListener('input', (event) => {
            const maxBookNameLength = 100;
            this.formBookName.setCustomValidity("");
            if (this.formBookName.value.length > maxBookNameLength) {
                this.formBookName.setCustomValidity(
                    `Max length ${maxBookNameLength} characters (${this.formBookName.value.length} entered)`
                );
            }
        });
    }
    configureAuthorNameValidation() {
        this.formAuthorName.addEventListener('input', (event) => {
            const maxAuthorNameLength = 100
            this.formAuthorName.setCustomValidity("");
            if (this.formAuthorName.value.length > maxAuthorNameLength) {
                this.formAuthorName.setCustomValidity(
                    `Max length ${maxAuthorNameLength} characters (${this.formAuthorName.value.length} entered)`
                );
            }
        });
    }
    configureNumPagesValidation() {
        this.formNumPages.addEventListener('input', (event) => {
            this.formNumPages.setCustomValidity("");
            if (this.formNumPages.value < 0) {
                this.formNumPages.setCustomValidity(
                    'Enter Value > 0'
                );
            }
        });
    }
    configureModalFormValidationEventListeners() {
        this.configureBookNameValidation();
        this.configureAuthorNameValidation();
        this.configureNumPagesValidation();
    }
    configureSubmitEventListener() {
        this.addBookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmission();
        });
    }
    configureModalEventListeners() {
        this.configureOpenCloseModalEventListeners();
        this.configureModalFormValidationEventListeners();
        this.configureSubmitEventListener();
    }
}

let bookTitle= 'myBook';
let bookAuthor= 'myAuthor';
let bookPages = 200;
let bookHaveRead = false;
let book1 = new Book(bookTitle, bookAuthor, bookPages, bookHaveRead);
let book2 = new Book('book2', 'that guy', 300, false);

let libraryRender = new LibraryScreenRenderer();
libraryRender.library.addBookToLibrary(book1);
libraryRender.library.addBookToLibrary(book2);
libraryRender.library.addBookToLibrary(new Book('title', 'author', 123, false));
libraryRender.addLibraryToPage();