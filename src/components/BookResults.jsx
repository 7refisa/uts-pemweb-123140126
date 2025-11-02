import React from "react";
import { Loader2, Check } from "lucide-react";

const BookResults = ({
  books,
  isLoading,
  error,
  onAdd,
  onDetails,
  readingListKeys,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg mt-6">
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return null; // Jangan tampilkan apa-apa jika belum ada hasil
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-pink-100 mt-6">
      <table className="w-full min-w-max text-left">
        {/* Header Tabel */}
        <thead className="border-b border-pink-200 bg-pink-50">
          <tr>
            <th className="p-4 text-sm font-semibold text-pink-700">Cover</th>
            <th className="p-4 text-sm font-semibold text-pink-700">Judul</th>
            <th className="p-4 text-sm font-semibold text-pink-700">Penulis</th>
            <th className="p-4 text-sm font-semibold text-pink-700">Tahun</th>
            <th className="p-4 text-sm font-semibold text-pink-700">Aksi</th>
          </tr>
        </thead>

        {/* Body Tabel */}
        <tbody>
          {books.map((book) => {
            const isInReadingList = readingListKeys.has(book.key);
            return (
              <tr
                key={book.key}
                className="border-b border-pink-100 hover:bg-pink-50 transition-colors"
              >
                <td className="p-4">
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
                <td className="p-4 font-medium text-pink-800">
                  <button
                    onClick={() => onDetails(book)}
                    className="hover:underline text-left"
                  >
                    {book.title}
                  </button>
                </td>
                <td className="p-4 text-sm text-pink-600">{book.authors}</td>
                <td className="p-4 text-sm text-pink-600">{book.year}</td>
                <td className="p-4">
                  <button
                    onClick={() => onAdd(book)}
                    disabled={isInReadingList}
                    className={`text-sm font-medium py-1 px-3 rounded-full transition-all ${
                      isInReadingList
                        ? "bg-green-100 text-green-700 flex items-center gap-1 cursor-not-allowed"
                        : "bg-pink-100 text-pink-700 hover:bg-pink-600 hover:text-white"
                    }`}
                  >
                    {isInReadingList ? <Check className="w-4 h-4" /> : "Add +"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookResults;
