import { useState, useEffect } from "react";
import axios from "axios";
import { Search, FolderOpenDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toastContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { showError } = useToast();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(
          `https://saavn.sumit.co/api/search/albums?query=${query}&page=0&limit=5`,
        )
        .then((res) => setResults(res.data.data.results))
        .catch(console.error);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      showError("Enter song or album name!");
      return;
    }
    navigate(`/Serch/${query}`);
    setQuery("");
    setResults([]);
  };

  const suggestionClick = (name) => {
    navigate(`/Serch/${name}`);
    setQuery("");
    setResults([]);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
      >
        <Search className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you want to listen to?"
        className="
          w-full h-12 pl-12 pr-12 rounded-xl
          bg-muted text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-ring
          transition
        "
      />

      <button
        type="button"
        onClick={() => navigate("/search")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
      >
        <FolderOpenDot className="w-6 h-6" />
      </button>

      {results.length > 0 && (
        <div
          className="
            absolute top-14 w-full z-50
            bg-card border border-border
            rounded-xl shadow-lg overflow-hidden
          "
        >
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => suggestionClick(item.name)}
              className="
                flex items-center gap-3 px-4 py-2
                cursor-pointer hover:bg-muted
                transition
              "
            >
              <img
                src={item.image?.[1]?.url}
                alt={item.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="text-sm font-medium truncate">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
