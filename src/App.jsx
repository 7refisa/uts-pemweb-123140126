import React, { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, Library } from "lucide-react";
import { APP_CONFIG } from "./config";
import SearchBar from "./components/SearchBar";
import BookResults from "./components/BookResults";
import ReadingList from "./components/ReadingList";
import BookDetailModal from "./components/BookDetailModal";

export default function App() {
  const [view, setView] = useState("search"); // 'search' or 'list'
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBookKey, setSelectedBookKey] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState("");

  // Memuat reading list dari localStorage
  useEffect(() => {
    try {
      const storedList = localStorage.getItem(APP_CONFIG.localStorageKey);
      if (storedList) {
        setReadingList(JSON.parse(storedList));
      }
    } catch (err) {
      console.error("Gagal memuat reading list:", err);
    }
  }, []); // Dependency array kosong, berjalan sekali saat mount

  // Menyimpan reading list ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        APP_CONFIG.localStorageKey,
        JSON.stringify(readingList)
      );
    } catch (err) {
      console.error("Gagal menyimpan reading list:", err);
    }
  }, [readingList]); // Berjalan setiap kali state `readingList` berubah

  const handleSearch = useCallback(async (searchParams) => {
    const { searchTerm, searchType, limit, publishYear, hasCover } =
      searchParams;

    setIsLoading(true);
    setError(null);
    setBooks([]);

    let query = `${searchType}:"${searchTerm}"`;
    if (publishYear) {
      query += ` AND first_publish_year:[* TO ${publishYear}]`;
    }

    const url = `${APP_CONFIG.apiBaseUrl}/search.json?q=${query}&limit=${limit}`;

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Gagal mengambil data. Coba lagi nanti.");

      const data = await response.json();

      let transformedBooks = data.docs.map((book) => ({
        key: book.key,
        title: book.title,
        authors: book.author_name
          ? book.author_name.join(", ")
          : "Unknown Author",
        year: book.first_publish_year || "N/A",
        coverUrl: book.cover_i
          ? `${APP_CONFIG.coverBaseUrl}/${book.cover_i}-M.jpg`
          : `https://placehold.co/56x80/fbeff2/ec4899?text=N/A`,
        hasCover: !!book.cover_i,
        subjects: book.subject_facet || null, // Simpan subjects untuk filter
      }));

      // Filter client-side untuk checkbox 'hasCover'
      if (hasCover) {
        transformedBooks = transformedBooks.filter((book) => book.hasCover);
      }

      setBooks(transformedBooks);
      if (transformedBooks.length === 0) {
        setError("Tidak ada hasil yang cocok dengan kriteria Anda.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Menambah buku ke reading list
  const addToReadingList = (bookToAdd) => {
    if (!readingList.find((book) => book.key === bookToAdd.key)) {
      setReadingList((prevList) => [...prevList, bookToAdd]);
    }
  };

  //Menghapus buku dari reading list
  const removeFromReadingList = (bookKey) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.key !== bookKey)
    );
  };

  const showBookDetails = (book) => {
    setSelectedBookKey(book.key);
  };

  const closeBookDetails = () => {
    setSelectedBookKey(null);
  };

  // Set untuk cek cepat buku di reading list
  const readingListKeys = new Set(readingList.map((book) => book.key));

  // Ambil semua subjek unik dari reading list untuk filter
  const allSubjects = [
    ...new Set(
      readingList.flatMap((book) => book.subjects || []).filter(Boolean)
    ),
  ].sort();

  // Logika filter untuk reading list
  const filteredReadingList = readingList.filter(
    (book) =>
      !subjectFilter || (book.subjects && book.subjects.includes(subjectFilter))
  );

  return (
    <div className="min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-pink-100 sticky top-0 z-30">
        <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-pink-600 mb-2 sm:mb-0">
            <BookOpen className="w-8 h-8" />
            <span>Perpustakaan Digital</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("search")}
              className={`flex items-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                view === "search"
                  ? "bg-pink-600 text-white shadow-sm"
                  : "bg-white text-pink-600 hover:bg-pink-50"
              }`}
            >
              <Search className="w-5 h-5" />
              Cari Buku
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                view === "list"
                  ? "bg-pink-600 text-white shadow-sm"
                  : "bg-white text-pink-600 hover:bg-pink-50"
              }`}
            >
              <Library className="w-5 h-5" />
              Reading List
              <span className="bg-pink-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {readingList.length}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        {/* Conditional Rendering */}
        {view === "search" && (
          <section>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <BookResults
              books={books}
              isLoading={isLoading}
              error={error}
              onAdd={addToReadingList}
              onDetails={showBookDetails}
              readingListKeys={readingListKeys}
            />
          </section>
        )}

        {view === "list" && (
          <section>
            <ReadingList
              books={filteredReadingList}
              onRemove={removeFromReadingList}
              onDetails={showBookDetails}
              onFilter={setSubjectFilter}
              allSubjects={allSubjects}
              currentFilter={subjectFilter}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 mt-8 border-t border-pink-100">
        <p className="text-sm text-pink-500">
          Dibuat dengan React & <span className="text-pink-400">♥</span>. Data
          dari Open Library API.
        </p>
      </footer>

      {/* Modal (Conditional Rendering) */}
      {selectedBookKey && (
        <BookDetailModal bookKey={selectedBookKey} onClose={closeBookDetails} />
      )}
    </div>
  );
}
