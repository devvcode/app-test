function BookCover({ category, title }) {
  const tone = category === "Programming"
    ? "cover-purple"
    : category === "Computer Science"
      ? "cover-blue"
      : "cover-amber";

  return <span className={"book-cover " + tone}>{title.charAt(0).toUpperCase()}</span>;
}

export default function BookTable({ books, onCheckout, onReturn, onRemove }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>BOOK DETAILS</th>
            <th>CATEGORY</th>
            <th>STATUS</th>
            <th>ISSUED TO / DUE</th>
            <th className="actions-heading">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <div className="book-cell">
                  <BookCover category={book.category} title={book.title} />
                  <div className="book-info">
                    <strong>{book.title}</strong>
                    <small>{book.author} · ISBN {book.isbn}</small>
                  </div>
                </div>
              </td>
              <td><span className="category-pill">{book.category}</span></td>
              <td>
                <span className={"status-pill " + (book.status === "Available" ? "available" : "borrowed")}>
                  <span />{book.status}
                </span>
              </td>
              <td>
                {book.status === "Borrowed" ? (
                  <div className="borrower">
                    <strong>{book.borrower}</strong>
                    <small>Due {book.dueDate || "Not set"}</small>
                  </div>
                ) : <span className="muted-dash">—</span>}
              </td>
              <td>
                <div className="row-actions">
                  {book.status === "Available" ? (
                    <button className="table-action checkout" onClick={() => onCheckout(book)} type="button">Check out</button>
                  ) : (
                    <button className="table-action return" onClick={() => onReturn(book)} type="button">Return</button>
                  )}
                  <button aria-label={"Remove " + book.title} className="delete-action" onClick={() => onRemove(book)} title="Remove book" type="button">×</button>
                </div>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="5">
                <div className="empty-state">
                  <strong>No books found</strong>
                  <span>Try changing your search or filters.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}