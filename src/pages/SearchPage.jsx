import { useState } from "react";
import { Search } from "lucide-react";
import useSearchApi from "../components/Hooks/useSearchApi"; // updated import
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Punjabi", gradient: "from-red-500 to-yellow-600" },
  { title: "Hindi", gradient: "from-orange-500 to-green-600" },
  { title: "Party", gradient: "from-lime-500 to-emerald-700" },
  { title: "Dance", gradient: "from-green-500 to-teal-700" },
  { title: "Workout", gradient: "from-emerald-500 to-blue-700" },
  { title: "Classical", gradient: "from-cyan-500 to-indigo-700" },
  { title: "R&B", gradient: "from-blue-500 to-purple-700" },
  { title: "Country", gradient: "from-indigo-500 to-pink-700" },
  { title: "Indie", gradient: "from-purple-500 to-red-700" },
  { title: "Metal", gradient: "from-pink-500 to-orange-700" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [categorie, setCategorie] = useState(null);
  const navigate = useNavigate();

  const searchData = useSearchApi(categorie);
  console.log(searchData, categorie);

  const handleClick = (t) => {
    setCategorie(t);
    navigate(`/category/${t}`);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <div className="relative mx-auto max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-md bg-muted border-0 outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((item) => (
            <div
              onClick={() => handleClick(item.title)}
              key={item.title}
              className={`aspect-square rounded-xl p-4 md:p-6 cursor-pointer hover:scale-105 transition-transform bg-linear-to-br ${item.gradient}`}
            >
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
