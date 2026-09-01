let  myLibrary=[];

const form = document.querySelector("form");
const libraryContainer = document.querySelector("#library");
const bookCount = document.querySelector("#book-count");
const bookRead = document.querySelector("#read-count");


form.addEventListener("submit", (e) => {
    const title = document.querySelector("#title").value;
    const author= document.querySelector("#author").value;
    const pages= document.querySelector("#pages").value;

    e.preventDefault();
    addBookToLibrary(title,author,pages);
    display();
    clearForm();
  
});

function Book(title,author,pages) {
    this.title=title;
    this.author=author;
    this.pages=pages;

    this.read = false;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead =function(){
    this.read=!this.read
}

function clearForm(){
    form.reset();
}
function addBookToLibrary(title,author,pages) {
    const book= new Book(title,author, pages);
    myLibrary.push(book);
    
}

function display() {
    libraryContainer.textContent="";

    if(myLibrary.length===0){
        const emptyState =document.createElement("div");
        emptyState.classList.add("empty-state");
        emptyState.textContent="No books yet. Add one!";
        libraryContainer.appendChild(emptyState);
    }
    else{
        myLibrary.forEach((book) => {
            
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            const title = document.createElement("h3");
            const author= document.createElement("p");
            const pages= document.createElement("p");

            const readButton =document.createElement("button");
            readButton.classList.add("read-btn");
            readButton.textContent= book.read ? "Finished ✓" : "To read";
            readButton.addEventListener("click",function(){
                book.toggleRead();
                display();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent="Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click",()=>{
                const index = myLibrary.findIndex((slot)=> slot.id === book.id);
                myLibrary.splice(index,1);
                display();
            });

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("book-actions");

            title.textContent=book.title;
            author.textContent=book.author;
            pages.textContent=`${book.pages} pages`;

            buttonContainer.appendChild(readButton);
            buttonContainer.appendChild(deleteBtn);
            
            bookCard.appendChild(title);
            bookCard.appendChild(author);
            bookCard.appendChild(pages);
            bookCard.appendChild(buttonContainer);

            libraryContainer.appendChild(bookCard);
        });
    }
    bookCount.textContent=myLibrary.length;
    bookRead.textContent=myLibrary.filter(b => b.read).length;
}

    

const DefaultBooks= [
    new Book("One Piece", "Eiichiro Oda", 1000),
    new Book("Naruto", "Masashi Kishimoto", 750),
    new Book("Bleach", "Tite Kubo", 686),
];
myLibrary.push(...DefaultBooks);
display();
