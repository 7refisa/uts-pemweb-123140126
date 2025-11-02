// src/components/BookDetailModal.jsx
import React from "react";
import { X, Loader2 } from "lucide-react";

const BookDetailModal = ({ book, onClose, isLoading, error }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-pink-100">
          <h2 className="text-xl font-semibold text-pink-700">Detail Buku</h2>
          <button
            onClick={onClose}
            className="text-pink-400 hover:text-pink-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {isLoading && !book.description && (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {(!isLoading || book.description) && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-1/3 text-center">
                <img
                  src={book.coverUrl}
                  alt={`Cover ${book.title}`}
                  className="h-56 w-auto object-cover rounded shadow-md mx-auto mb-4"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/150x224/fbeff2/ec4899?text=N/A")
                  }
                />
                <h3 className="font-bold text-lg text-pink-800">
                  {book.title}
                </h3>
                <p className="text-md text-pink-600">{book.authors}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Tahun Terbit: {book.year}
                </p>
              </div>
              <div className="flex-grow md:w-2/3">
                <h4 className="font-semibold text-pink-700 border-b border-pink-100 pb-1 mb-2">
                  Deskripsi
                </h4>
                <p className="text-sm text-gray-700 prose max-w-none">
                  {book.description ||
                    (isLoading ? "Memuat..." : "Deskripsi tidak tersedia.")}
                </p>

                <h4 className="font-semibold text-pink-700 border-b border-pink-100 pb-1 mb-2 mt-6">
                  Subjek
                </h4>
                {book.subjects && book.subjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    {isLoading ? "Memuat..." : "Subjek tidak tersedia."}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
