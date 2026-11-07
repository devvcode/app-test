import { useState } from "react";

export default function BorrowDialog({ book, onClose, onConfirm }) {
  const [studentName, setStudentName] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!book) return null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!studentName.trim() || !dueDate) return;
    onConfirm({ borrower: studentName.trim(), dueDate });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="borrow-dialog-title"
        aria-modal="true"
        className="borrow-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">BOOK CHECKOUT</span>
            <h2 id="borrow-dialog-title">Issue this book</h2>
            <p className="dialog-book-title">{book.title}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <form className="dialog-form" onSubmit={handleSubmit}>
          <label>
            Student name
            <input autoFocus onChange={(event) => setStudentName(event.target.value)} placeholder="Enter student's full name" required value={studentName} />
          </label>
          <label>
            Return due date
            <input min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDueDate(event.target.value)} required type="date" value={dueDate} />
          </label>
          <div className="form-actions">
            <button className="secondary-button" onClick={onClose} type="button">Cancel</button>
            <button className="primary-button" type="submit">Confirm checkout</button>
          </div>
        </form>
      </section>
    </div>
  );
}