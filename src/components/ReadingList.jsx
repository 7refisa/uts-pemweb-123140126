// src/components/ReadingList.jsx
import React from "react";
import { Search, Library, Eye, Trash2 } from "lucide-react";

const ReadingList = ({
  readingList,
  onRemove,
  onDetails,
  titleFilter,
  onFilterChange,
}) => {
  const filteredBooks = readingList.filter((book) => {
    if (!titleFilter) {
      return true;
    }
    return book.title.toLowerCase().includes(titleFilter.toLowerCase());
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-pink-100">
      <h2 className="text-xl font-semibold text-pink-700 mb-4">
        Reading List Anda
      </h2>

      <div className="mb-6">
        <label
          htmlFor="titleFilter"
          className="block text-sm font-medium text-pink-600 mb-1"
        >
          Filter berdasarkan Judul
        </label>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            id="titleFilter"
            value={titleFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Cari judul di reading list..."
            className="w-full p-2 pl-8 rounded-md border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Search className="w-4 h-4 text-pink-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.key}
              className="bg-pink-50 border border-pink-100 rounded-lg shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={book.coverUrl}
                  alt={`Cover ${book.title}`}
                  className="h-40 w-28 object-cover rounded shadow-md mx-auto mb-4"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/112x160/fbeff2/ec4899?text=N/A")
                  }
                />
                <h3 className="font-semibold text-pink-800 text-center">
                  {book.title}
                </h3>
                <p className="text-sm text-pink-600 text-center truncate">
                  {book.authors}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onDetails(book)}
                  title="Lihat Detail (dan muat subjek)"
                  className="flex-1 flex justify-center items-center gap-1 text-sm bg-white border border-pink-300 text-pink-600 py-1 px-2 rounded-md hover:bg-pink-100 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Details
                </button>
                <button
                  onClick={() => onRemove(book.key)}
                  title="Hapus dari List"
                  className="flex-1 flex justify-center items-center gap-1 text-sm bg-pink-600 text-white py-1 px-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4">
          <Library className="w-12 h-12 text-pink-300 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-pink-700">
            {titleFilter ? "Tidak Ada Buku" : "Reading List Anda Masih Kosong"}
          </h3>
          <p className="mt-1 text-sm text-pink-500">
            {titleFilter
              ? "Tidak ada buku yang cocok dengan filter judul ini."
              : "Cari buku dan tambahkan ke sini untuk dibaca nanti."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadingList;
