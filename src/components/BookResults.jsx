// src/components/BookResults.jsx
import React from "react";
import { Eye, Plus, Loader2 } from "lucide-react";

const BookResults = ({ books, onAdd, onDetails, readingList, isLoading }) => {
  if (isLoading && books.length === 0) {
    return (
      <div className="text-center py-10 text-pink-600">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        <p className="mt-2 text-lg">Mencari buku...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  const readingListKeys = new Set(readingList.map((book) => book.key));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-pink-100 overflow-x-auto">
      <h2 className="text-xl font-semibold text-pink-700 mb-4">
        Hasil Pencarian
      </h2>
      <div className="min-w-full">
        <table className="w-full table-auto text-left">
          <thead className="bg-pink-100 text-pink-800">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Judul</th>
              <th className="p-3">Penulis</th>
              <th className="p-3">Tahun</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const isInList = readingListKeys.has(book.key);
              return (
                <tr
                  key={book.key}
                  className="border-b border-pink-100 hover:bg-pink-50"
                >
                  <td className="p-2">
                    <img
                      src={book.coverUrl}
                      alt={`Cover ${book.title}`}
                      className="h-20 w-14 object-cover rounded shadow"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/56x80/fbeff2/ec4899?text=N/A")
                      }
                    />
                  </td>
                  <td className="p-2 font-medium text-pink-900">
                    {book.title}
                  </td>
                  <td className="p-2 text-pink-700">{book.authors}</td>
                  <td className="p-2 text-pink-700">{book.year}</td>
                  <td className="p-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => onDetails(book)}
                        title="Lihat Detail"
                        className="p-2 bg-white border border-pink-300 text-pink-600 rounded-md hover:bg-pink-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAdd(book)}
                        disabled={isInList}
                        title={
                          isInList
                            ? "Sudah ada di Reading List"
                            : "Tambah ke Reading List"
                        }
                        className={`p-2 rounded-md transition-colors ${
                          isInList
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-pink-600 text-white hover:bg-pink-700"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookResults;
