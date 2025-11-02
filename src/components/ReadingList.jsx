import React from "react";

const ReadingList = ({
  books,
  onRemove,
  onDetails,
  onFilter,
  allSubjects,
  currentFilter,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-pink-100">
      <h2 className="text-xl font-semibold text-pink-700 mb-4">
        Reading List Anda
      </h2>

      {/* Filter berdasarkan subject */}
      <div className="mb-4">
        <label
          htmlFor="subjectFilter"
          className="block text-sm font-medium text-pink-600 mb-1"
        >
          Filter berdasarkan Subjek
        </label>
        <select
          id="subjectFilter"
          value={currentFilter}
          onChange={(e) => onFilter(e.target.value)}
          disabled={allSubjects.length === 0}
          className="w-full md:w-1/3 p-2 rounded-md border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-50"
        >
          <option value="">Semua Subjek</option>
          {allSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {allSubjects.length === 0 && books.length > 0 && (
          <p className="text-xs text-pink-400 mt-1">
            Data subjek tidak tersedia di buku-buku ini.
          </p>
        )}
      </div>

      {books.length === 0 ? (
        <p className="text-pink-500 text-center py-4">
          {currentFilter
            ? "Tidak ada buku yang cocok dengan filter ini."
            : "Reading list Anda masih kosong."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
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
                  className="flex-1 text-sm bg-white border border-pink-300 text-pink-600 py-1 px-2 rounded-md hover:bg-pink-100 transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => onRemove(book.key)}
                  className="flex-1 text-sm bg-pink-600 text-white py-1 px-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
