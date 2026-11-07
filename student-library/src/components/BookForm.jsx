import { useState } from "react";

const initialForm = { title: "", author: "", category: "Programming", isbn: "" };

export default function BookForm({ onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      id: "book-" + Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      isbn: form.isbn.trim() || "Not provided",
      status: "Available",
      borrower: "",
      dueDate: ""
    });
    setForm(initialForm);
  }

  return (
    <section className="form-panel">
      <div className="section-heading">
        <div>
          <h2>Add a new book</h2>
          <p>Enter the book details to add it to the catalogue.</p>
        </div>
        <button className="icon-button" type="button" onClick={onCancel} aria-label="Close form">×</button>
      </div>

      <form className="book-form" onSubmit={handleSubmit}>
        <label>
          Book title
          <input autoFocus name="title" onChange={updateField} placeholder="e.g. The Lean Startup" required value={form.title} />
        </label>
        <label>
          Author
          <input name="author" onChange={updateField} placeholder="Author name" required value={form.author} />
        </label>
        <label>
          Category
          <select name="category" onChange={updateField} value={form.category}>
            <option>Programming</option>
            <option>Computer Science</option>
            <option>Personal Growth</option>
            <option>Literature</option>
            <option>Science</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          ISBN <span className="optional">(optional)</span>
          <input name="isbn" onChange={updateField} placeholder="ISBN number" value={form.isbn} />
        </label>
        <div className="form-actions">
          <button className="secondary-button" onClick={onCancel} type="button">Cancel</button>
          <button className="primary-button" type="submit">Save book</button>
        </div>
      </form>
    </section>
  );
}