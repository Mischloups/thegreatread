document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');
  const chooserBtn = document.getElementById('chooser-btn');
  const bookTitle = document.getElementById('book-title');
  const newBookInput = document.getElementById('new-book');
  const addNewBookBtn = document.getElementById('add-new-book');
  const bookList = document.getElementById('book-list');

  // Create loader element
  const loader = document.createElement('div');
  loader.classList.add('loader');
  document.body.appendChild(loader);

  let books = JSON.parse(localStorage.getItem('books')) || [];

  // Open modal
  addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    renderBookList();
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Add new book
  addNewBookBtn.addEventListener('click', () => {
    const newBook = newBookInput.value.trim();
    if (newBook) {
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
      newBookInput.value = '';
      renderBookList();
    }
  });

  // Choose a random book
  chooserBtn.addEventListener('click', () => {
    if (books.length === 0) {
      bookTitle.textContent = 'Add a book first!';
      bookTitle.style.opacity = 1;
    } else {
      // Show loader
      loader.style.display = 'block';
      bookTitle.style.opacity = 0;

      // Random delay between 1 and 3 seconds
      const delay = 1000 + Math.random() * 2000;

      setTimeout(() => {
        // Hide loader
        loader.style.display = 'none';
        const randomBook = books[Math.floor(Math.random() * books.length)];
        bookTitle.textContent = randomBook;
        bookTitle.style.opacity = 1;
      }, delay);
    }
  });

  // Render book list
  function renderBookList() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${book}
        <button data-index="${index}">×</button>
      `;
      bookList.appendChild(li);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('#book-list li button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        renderBookList();
      });
    });
  }
});