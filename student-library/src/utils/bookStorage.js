import { seedBooks } from "../data/seedBooks.js";

const STORAGE_KEY = "student-library:books:v1";

export function loadBooks() {
  try {
    const savedBooks = window.localStorage.getItem(STORAGE_KEY);
    if (!savedBooks) return seedBooks;
    const parsedBooks = JSON.parse(savedBooks);
    return Array.isArray(parsedBooks) ? parsedBooks : seedBooks;
  } catch (error) {
    console.error("Could not read the saved library catalogue:", error);
    return seedBooks;
  }
}

export function saveBooks(books) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return true;
  } catch (error) {
    console.error("Could not save the library catalogue:", error);
    return false;
  }
}