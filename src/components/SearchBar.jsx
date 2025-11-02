import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [limit, setLimit] = useState(10);
  const [publishYear, setPublishYear] = useState("");
  const [hasCover, setHasCover] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, searchType, limit, publishYear, hasCover });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border border-pink-100 space-y-4"
    >
      <h2 className="text-xl font-semibold text-pink-700 mb-4">Cari Buku</h2>

      {/* Input 1: Search Term (text) */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Judul, Penulis, atau Subjek..."
          required
          className="w-full pl-10 pr-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input 2: Search Type (select) */}
        <div>
          <label
            htmlFor="searchType"
            className="block text-sm font-medium text-pink-600 mb-1"
          >
            Tipe Pencarian
          </label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-2 rounded-md border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="title">Judul</option>
            <option value="author">Penulis</option>
            <option value="subject">Subjek</option>
          </select>
        </div>

        {/* Input 3: Limit (number) */}
        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-pink-600 mb-1"
          >
            Batas Hasil
          </label>
          <input
            type="number"
            id="limit"
            value={limit}
            min="5"
            max="50"
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      {/* Input 4: Publish Year (text) */}
      <div>
        <label
          htmlFor="publishYear"
          className="block text-sm font-medium text-pink-600 mb-1"
        >
          Tahun Terbit (Contoh: 2020)
        </label>
        <input
          type="text"
          id="publishYear"
          value={publishYear}
          placeholder="Opsional, misal: 2020"
          onChange={(e) => setPublishYear(e.target.value)}
          className="w-full p-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Input 5: Has Cover (checkbox) */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hasCover"
          checked={hasCover}
          onChange={(e) => setHasCover(e.target.checked)}
          className="h-4 w-4 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
        />
        <label htmlFor="hasCover" className="ml-2 block text-sm text-pink-700">
          Hanya tampilkan yang ada cover
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-pink-300"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mencari...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Cari
          </>
        )}
      </button>
    </form>
  );
};

export default SearchBar;
