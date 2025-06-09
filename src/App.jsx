import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import AboutMe from "./AboutMe";

const categories = ["All", "Nature", "Urban", "People"];

const photos = [
  {
    src: "https://live.staticflickr.com/65535/54365756665_0bbec6434c_b.jpg",
    alt: "Tranquil River View Daylight",
    category: "Nature",
  },
  {
    src: "https://live.staticflickr.com/65535/54422286869_e8f768fa7e_b.jpg",
    alt: "Mountain Landscape",
    category: "Nature",
  },
  {
    src: "https://live.staticflickr.com/65535/54365756975_6c7a4b145d_b.jpg",
    alt: "Sunset Beach",
    category: "Nature",
  },
  {
    src: "https://live.staticflickr.com/65535/54365756700_7c69a3a3b7_b.jpg",
    alt: "City Skyline",
    category: "Urban",
  },
  {
    src: "https://live.staticflickr.com/65535/54365756814_21a8f58d19_b.jpg",
    alt: "Busy Street",
    category: "Urban",
  },
  {
    src: "https://live.staticflickr.com/65535/54365757025_2f6a4ca32a_b.jpg",
    alt: "Portrait of a Woman",
    category: "People",
  },
];

function Header({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    
    <header className="bg-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
    <Link to="/" className="text-3xl font-extrabold text-black dark:text-white flex items-center gap-4">
      <img
        src="src/Logo/GoldenLogo.png"
        alt="VedantFrames Logo"
        className="w-14 h-14 rounded-full shadow-lg border-4 border-yellow-400"
        draggable={false}
      />
      VedantFrames
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-6 items-center">
      <Link
        to="/"
        className={`hover:underline text-black dark:text-white ${
          location.pathname === "/" ? "font-semibold underline" : ""
        }`}
      >
        Gallery
      </Link>

      <Link
        to="/about"
        className={`hover:underline text-black dark:text-white ${
          location.pathname === "/about" ? "font-semibold underline" : ""
        }`}
      >
        About Me
      </Link>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded"
        aria-label="Toggle dark/light theme"
      >
        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
      </button>
    </nav>

    {/* Mobile Hamburger */}
    <div className="md:hidden flex items-center space-x-2">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded"
        aria-label="Toggle dark/light theme"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>

      <button
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="focus:outline-none"
      >
        <svg
          className="w-6 h-6 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile menu */}
  {menuOpen && (
    <nav className="md:hidden bg-white dark:bg-gray-900">
      <ul className="flex flex-col space-y-2 p-4">
        <li>
          <Link
            to="/"
            className={`block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white ${
              location.pathname === "/" ? "font-semibold underline" : ""
            }`}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white ${
              location.pathname === "/about" ? "font-semibold underline" : ""
            }`}
          >
            About Me
          </Link>
        </li>
      </ul>
    </nav>
  )}
</header>

  );
}

function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [orientations, setOrientations] = useState({});

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const handleImageLoad = (e, src) => {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    setOrientations((prev) => ({
      ...prev,
      [src]: w >= h ? "landscape" : "portrait",
    }));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!modalOpen) return;
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight")
        setCurrentIndex((i) => (i + 1) % filteredPhotos.length);
      if (e.key === "ArrowLeft")
        setCurrentIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, filteredPhotos]);

  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-gray-900 dark:text-white -mt-1 p-4">
      {/* Categories Filter */}
      <nav className="flex justify-center gap-4 my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-400 dark:border-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Photo grid */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {filteredPhotos.map((photo, idx) => {
          const orientation = orientations[photo.src] || "landscape";

          return (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={`w-full h-full object-cover rounded shadow cursor-pointer hover:scale-105 transition-transform
                ${
                  orientation === "portrait"
                    ? "row-span-2"
                    : "row-span-1"
                }
              `}
              onLoad={(e) => handleImageLoad(e, photo.src)}
              onClick={() => {
                setCurrentIndex(idx);
                setModalOpen(true);
              }}
              loading="lazy"
              draggable={false}
            />
          );
        })}
      </main>

      <footer className="text-center p-4 text-sm opacity-75 dark:opacity-50 border-t border-gray-300 dark:border-gray-700">
        © 2025 VedantFrames
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
            aria-label="Close modal"
          >
            &times;
          </button>

          <button
            className="absolute top-1/2 left-4 text-white text-4xl font-bold hover:text-gray-300 -translate-y-1/2 select-none"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
              );
            }}
            aria-label="Previous image"
          >
            &#8592;
          </button>

          <img
            src={filteredPhotos[currentIndex].src}
            alt={filteredPhotos[currentIndex].alt}
            className="max-w-full max-h-full rounded shadow-lg select-none"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            style={{ transition: "opacity 0.3s ease" }}
          />

          <button
            className="absolute top-1/2 right-4 text-white text-4xl font-bold hover:text-gray-300 -translate-y-1/2 select-none"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % filteredPhotos.length);
            }}
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");

  // Add theme class to html root for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <Router>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </Router>
  );
}
