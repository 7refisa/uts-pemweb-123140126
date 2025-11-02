import React, { useState, useEffect, useCallback } from "react";
import { X, Loader2 } from "lucide-react";
import { APP_CONFIG } from "../config";

const BookDetailModal = ({ bookKey, onClose }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk fetch data detail
  useEffect(() => {
    if (!bookKey) return;

    const fetchBookDetails = async (key) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${APP_CONFIG.apiBaseUrl}${key}.json`);
        if (!response.ok) throw new Error("Gagal mengambil detail buku.");

        const data = await response.json();

        // Data Transformation
        let desc = "Tidak ada deskripsi.";
        if (typeof data.description === "string") {
          desc = data.description;
        } else if (
          data.description &&
          typeof data.description.value === "string"
        ) {
          desc = data.description.value;
        }

        // Ambil detail author
        let authorNames = ["Unknown Author"];
        if (data.authors && data.authors.length > 0) {
          try {
            const authorKey = data.authors[0].author.key;
            const authorRes = await fetch(
              `${APP_CONFIG.apiBaseUrl}${authorKey}.json`
            );
            if (authorRes.ok) {
              const authorData = await authorRes.json();
              authorNames = [authorData.name];
            }
          } catch (authError) {
            console.warn("Gagal fetch author details:", authError);
          }
        }

        setDetails({
          title: data.title,
          authors: authorNames.join(", "),
          year: data.first_publish_date,
          coverUrl: data.covers
            ? `${APP_CONFIG.coverBaseUrl}/${data.covers[0]}-M.jpg`
            : `https://placehold.co/128x192/fbeff2/ec4899?text=N/A`,
          description: desc
            .split("\n")
            .filter((line) => !line.startsWith("---") && line.trim() !== "")[0],
          subjects: data.subjects
            ? data.subjects.slice(0, 10)
            : ["Tidak ada subjek"], // Ambil maks 10 subjek
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails(bookKey);
  }, [bookKey]);

  const { title, authors, year, coverUrl, description, subjects } =
    details || {};

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-center p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-pink-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-pink-700">Detail Buku</h2>
          <button
            onClick={onClose}
            className="text-pink-400 hover:text-pink-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        {isLoading && (
          <div className="h-64 flex justify-center items-center">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
          </div>
        )}
        {error && (
          <div className="p-5 text-red-600 bg-red-100 m-5 rounded-lg">
            {error}
          </div>
        )}
        {details && !isLoading && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={coverUrl}
                alt={`Cover ${title}`}
                className="w-32 h-48 object-cover rounded shadow-md flex-shrink-0 mx-auto md:mx-0"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/128x192/fbeff2/ec4899?text=N/A")
                }
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-pink-800">{title}</h3>
                <p className="text-lg text-pink-600">{authors}</p>
                <p className="text-md text-pink-500 mb-4">{year}</p>

                {/* Description */}
                <h4 className="font-semibold text-pink-700 mt-4 mb-1">
                  Deskripsi
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed max-h-40 overflow-y-auto pr-2">
                  {description}
                </p>

                {/* Subject */}
                <h4 className="font-semibold text-pink-700 mt-4 mb-1">
                  Subjek
                </h4>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailModal;
