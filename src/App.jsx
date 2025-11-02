// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, Library } from "lucide-react";
import { APP_CONFIG } from "./config";
import SearchBar from "./components/SearchBar";
import BookResults from "./components/BookResults";
import ReadingList from "./components/ReadingList";
import BookDetailModal from "./components/BookDetailModal";

export default function App() {
  const [view, setView] = useState("search");
  const [books, setBooks] = useState([]);

  const [readingList, setReadingList] = useState(() => {
    try {
      const items = localStorage.getItem(APP_CONFIG.localStorageKey);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Gagal memuat reading list dari localStorage:", error);
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        APP_CONFIG.localStorageKey,
        JSON.stringify(readingList)
      );
    } catch (error) {
      console.error("Gagal menyimpan reading list ke localStorage:", error);
    }
  }, [readingList]);

  const handleSearch = useCallback(async (searchParams) => {
    setIsLoading(true);
    setError(null);
    setBooks([]);
    try {
      const results = await APP_CONFIG.searchBooks(searchParams);
      setBooks(results);
      if (results.length === 0) {
        setError("Buku tidak ditemukan. Coba kata kunci lain.");
      }
    } catch (err) {
      console.error("Error saat mencari buku:", err);
      setError(err.message || "Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddToList = useCallback(
    (book) => {
      if (!readingList.find((item) => item.key === book.key)) {
        const bookToAdd = {
          ...book,
          subjects: book.subjects || [],
        };
        setReadingList((prevList) => [...prevList, bookToAdd]);
      } else {
        console.warn("Buku sudah ada di reading list.");
      }
    },
    [readingList]
  );

  const handleRemoveFromList = useCallback((bookKey) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.key !== bookKey)
    );
  }, []);

  const handleShowDetails = useCallback(
    async (book) => {
      setIsLoading(true);
      setError(null);

      const existingBookInList = readingList.find(
        (item) => item.key === book.key
      );
      const hasDetails = existingBookInList && existingBookInList.description;

      setSelectedBook(existingBookInList || book);

      if (hasDetails) {
        setIsLoading(false);
        return;
      }

      try {
        const details = await APP_CONFIG.getBookDetails(book.key);

        const updatedBook = {
          ...book,
          description: details.description,
          subjects: details.subjects,
        };

        setSelectedBook(updatedBook);

        setReadingList((prevList) =>
          prevList.map((item) => (item.key === book.key ? updatedBook : item))
        );
      } catch (err) {
        console.error("Error saat mengambil detail buku:", err);
        setError(
          err.message || "Gagal mengambil detail buku. Coba lagi nanti."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [readingList]
  );

  const handleCloseDetails = useCallback(() => {
    setSelectedBook(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm border-b border-pink-200 sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-pink-600" />
            <h1 className="text-2xl font-bold text-pink-700 hidden sm:block">
              Perpustakaan Digital
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("search")}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 ${
                view === "search"
                  ? "bg-pink-600 text-white shadow-md"
                  : "text-pink-600 hover:bg-pink-100"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Cari Buku</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 relative ${
                view === "list"
                  ? "bg-pink-600 text-white shadow-md"
                  : "text-pink-600 hover:bg-pink-100"
              }`}
            >
              <Library className="w-5 h-5" />
              <span className="font-medium">Reading List</span>
              {readingList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {readingList.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {view === "search" && (
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && !isLoading && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}
            <BookResults
              books={books}
              onAdd={handleAddToList}
              onDetails={handleShowDetails}
              readingList={readingList}
              isLoading={isLoading}
            />
          </div>
        )}

        {view === "list" && (
          <ReadingList
            readingList={readingList}
            onRemove={handleRemoveFromList}
            onDetails={handleShowDetails}
            titleFilter={titleFilter}
            onFilterChange={setTitleFilter}
          />
        )}
      </main>

      <footer className="text-center py-6 text-pink-500 text-sm">
        Dibuat dengan React & ♥️ Data dari Open Library API.
      </footer>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={handleCloseDetails}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}
