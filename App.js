// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor

function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

  list.appendChild(row);
};

//Show Alert
UI.prototype.showAlert = function (msg, className) {
  const div = document.createElement("div");

  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Event Listeniners
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  //Validate
  if (title === "" || author === "") {
    //Error Alert
    ui.showAlert("Please add a Title and an Author.", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    // Sucessfully added
    ui.showAlert("Book sucessfully added", "success");

    //Clear fielts
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener to delete books
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Your book has been removed", "success");

  e.preventDefault();
});
