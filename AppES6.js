class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
      `;

    list.appendChild(row);
  }

  showAlert(msg, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//local Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static dispalyBooks() {
    const books = Storage.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBooks(book) {
    const books = Storage.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Storage.getBooks();

    books.forEach(function (book, index) {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener("DOMContentLoaded", Storage.dispalyBooks);

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
    Storage.addBooks(book);

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

  //Remove from Local Storage
  Storage.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );

  ui.showAlert("Your book has been removed", "success");

  e.preventDefault();
});
