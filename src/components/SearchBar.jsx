// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("q"); // 'q' (Semua), 'title', 'author'
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(10);
  const [hasCover, setHasCover] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({ query: query.trim(), type, year, limit, hasCover });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-pink-100">
      <h2 className="text-xl font-semibold text-pink-700 mb-4">Cari Buku</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Pencarian Utama */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Judul atau Penulis.."
            required
            className="w-full p-3 pl-10 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400"
            aria-hidden="true"
          />
        </div>

        {/* Opsi Pencarian (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipe Pencarian */}
          <div>
            <label
              htmlFor="searchType"
              className="block text-sm font-medium text-pink-600 mb-1"
            >
              Tipe Pencarian
            </label>
            <select
              id="searchType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded-md border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="q">Semua</option>
              <option value="title">Judul</option>
              <option value="author">Penulis</option>
            </select>
          </div>

          {/* Batas Hasil */}
          <div>
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-pink-600 mb-1"
            >
              Batas Hasil
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full p-2 rounded-md border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Filter Tambahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tahun Terbit */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-pink-600 mb-1"
            >
              Tahun Terbit (Contoh: 2020)
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Opsional, misal: 2020"
              min="1000"
              max={new Date().getFullYear()}
              className="w-full p-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Checkbox Hanya Cover */}
          <div className="flex items-end pb-2">
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                id="hasCover"
                checked={hasCover}
                onChange={(e) => setHasCover(e.target.checked)}
                className="h-5 w-5 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
              />
              <label htmlFor="hasCover" className="ml-2 text-sm text-pink-700">
                Hanya tampilkan yang ada cover
              </label>
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 p-3 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors disabled:bg-pink-300"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          <span>{isLoading ? "Mencari..." : "Cari"}</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
