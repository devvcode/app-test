import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import StatCard from "./components/StatCard.jsx";
import BookForm from "./components/BookForm.jsx";
import BookTable from "./components/BookTable.jsx";
import BorrowDialog from "./components/BorrowDialog.jsx";
import Toast from "./components/Toast.jsx";
import { loadBooks, saveBooks } from "./utils/bookStorage.js";

const ALL_BOOKS = "All books";

export default function App() {
  const [books, setBooks] = useState(loadBooks);
  const [activeView, setActiveView] = useState("Overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showBookForm, setShowBookForm] = useState(false);
  const [borrowTarget, setBorrowTarget] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeoutId = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const stats = useMemo(() => ({
    total: books.length,
    available: books.filter((book) => book.status === "Available").length,
    borrowed: books.filter((book) => book.status === "Borrowed").length,
    categories: new Set(books.map((book) => book.category)).size
  }), [books]);

  const categories = useMemo(
    () => ["All categories", ...new Set(books.map((book) => book.category))],
    [books]
  );

  const visibleBooks = useMemo(() => {
    const statusFilter = activeView === "Borrowed books"
      ? "Borrowed"
      : activeView === "Available books"
        ? "Available"
        : ALL_BOOKS;

    return books.filter((book) => {
      const searchText = [book.title, book.author, book.isbn].join(" ").toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase().trim());
      const matchesStatus = statusFilter === ALL_BOOKS || book.status === statusFilter;
      const matchesCategory = category === "All categories" || book.category === category;

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [books, activeView, query, category]);

  function notify(message) {
    setNotice(message);
  }

  function handleNavigate(view) {
    setActiveView(view);
    setQuery("");
    setCategory("All categories");
  }

  function handleAddBook(newBook) {
    setBooks((currentBooks) => [newBook, ...currentBooks]);
    setShowBookForm(false);
    notify("Book added to your library.");
  }

  function handleCheckout({ borrower, dueDate }) {
    const title = borrowTarget?.title;
    setBooks((currentBooks) => currentBooks.map((book) => (
      book.id === borrowTarget.id
        ? { ...book, status: "Borrowed", borrower, dueDate }
        : book
    )));
    setBorrowTarget(null);
    notify(title + " checked out to " + borrower + ".");
  }

  function handleReturn(book) {
    setBooks((currentBooks) => currentBooks.map((item) => (
      item.id === book.id
        ? { ...item, status: "Available", borrower: "", dueDate: "" }
        : item
    )));
    notify(book.title + " has been returned.");
  }

  function handleRemove(book) {
    const confirmed = window.confirm('Remove "' + book.title + '" from the library?');
    if (!confirmed) return;

    setBooks((currentBooks) => currentBooks.filter((item) => item.id !== book.id));
    notify("Book removed from the catalogue.");
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      <main className="main-content">
        <Topbar />

        <section className="page-heading">
          <div>
            <div className="eyebrow">STUDENT LIBRARY MANAGEMENT</div>
            <h1>{activeView === "Overview" ? "Library overview" : activeView}</h1>
            <p className="subtitle">
              Manage your collection, keep track of checkouts, and help students find their next read.
            </p>
          </div>
          <button className="primary-button" onClick={() => setShowBookForm((open) => !open)} type="button">
            <span aria-hidden="true">＋</span> Add a book
          </button>
        </section>

        <section aria-label="Library statistics" className="stats-grid">
          <StatCard caption="In your collection" icon="▤" label="Total books" tone="purple" value={stats.total} />
          <StatCard caption="Ready to borrow" icon="✓" label="Available now" tone="green" value={stats.available} />
          <StatCard caption="With students" icon="↗" label="Currently borrowed" tone="orange" value={stats.borrowed} />
          <StatCard caption="Across your library" icon="▦" label="Categories" tone="blue" value={stats.categories} />
        </section>

        {showBookForm && (
          <BookForm onCancel={() => setShowBookForm(false)} onSave={handleAddBook} />
        )}

        <section className="catalogue-section">
          <div className="section-title-row">
            <div>
              <h2>{activeView === "Overview" ? "Book catalogue" : activeView}</h2>
              <p>Browse and manage books in your collection.</p>
            </div>
            <span className="result-count">{visibleBooks.length} books</span>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, author or ISBN..."
                value={query}
              />
            </label>
            <select
              aria-label="Filter by category"
              className="filter-select"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <BookTable
            books={visibleBooks}
            onCheckout={setBorrowTarget}
            onRemove={handleRemove}
            onReturn={handleReturn}
          />

          <div className="table-footer">
            <span>Showing <strong>{visibleBooks.length}</strong> of <strong>{books.length}</strong> books</span>
            <span>Changes save automatically · Browser localStorage</span>
          </div>
        </section>

        <footer className="page-footer">
          <span>Campus Library <b>·</b> Student Library Management</span>
          <span>React + Vite mini project</span>
        </footer>
      </main>

      {borrowTarget && (
        <BorrowDialog
          book={borrowTarget}
          onClose={() => setBorrowTarget(null)}
          onConfirm={handleCheckout}
        />
      )}
      <Toast message={notice} />
    </div>
  );
}