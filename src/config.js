// src/config.js
export const APP_CONFIG = {
  localStorageKey: "digit6_readingList",
  apiBaseUrl: "https://openlibrary.org",
  coverBaseUrl: "https://covers.openlibrary.org/b/id",

  /**
   * Mengambil URL cover buku
   */
  getCoverUrl: (coverId, size = "M") => {
    if (!coverId) {
      return `https://placehold.co/128x192/fbeff2/ec4899?text=N/A`;
    }
    return `${APP_CONFIG.coverBaseUrl}/${coverId}-${size}.jpg`;
  },

  /**
   * Mencari buku berdasarkan parameter
   */
  searchBooks: async ({
    query,
    type = "q",
    year,
    limit = 10,
    hasCover = true,
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.append(type, query);
    searchParams.append("limit", limit);

    if (year) {
      searchParams.append("q", `first_publish_year:${year}`);
    }

    const url = `${
      APP_CONFIG.apiBaseUrl
    }/search.json?${searchParams.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let formattedDocs = data.docs.map((doc) => ({
        key: doc.key,
        title: doc.title,
        authors: doc.author_name ? doc.author_name.join(", ") : "N/A",
        year: doc.first_publish_year || "N/A",
        coverId: doc.cover_i,
        coverUrl: APP_CONFIG.getCoverUrl(doc.cover_i, "M"),
        subjects: doc.subject ? doc.subject.slice(0, 5) : [],
      }));

      if (hasCover) {
        formattedDocs = formattedDocs.filter((doc) => doc.coverId);
      }

      return formattedDocs;
    } catch (error) {
      console.error("Error saat searchBooks:", error);
      throw new Error("Gagal mengambil data dari Open Library API.");
    }
  },

  /**
   * Mengambil detail buku (deskripsi & subjek)
   */
  getBookDetails: async (bookKey) => {
    const url = `${APP_CONFIG.apiBaseUrl}${bookKey}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let description = "Deskripsi tidak tersedia.";
      if (typeof data.description === "string") {
        description = data.description;
      } else if (
        data.description &&
        typeof data.description.value === "string"
      ) {
        description = data.description.value;
      }

      const subjects = data.subjects ? data.subjects.slice(0, 10) : [];

      return {
        description,
        subjects,
      };
    } catch (error) {
      console.error("Error saat getBookDetails:", error);
      throw new Error("Gagal mengambil detail buku.");
    }
  },
};
