import { useState } from "react";
import useSearchApi from "../components/Hooks/useSearchApi";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";

const categories = [
  { title: "Punjabi", gradient: "from-red-500 to-yellow-600" },
  { title: "Hindi", gradient: "from-orange-500 to-green-600" },
  { title: "Party", gradient: "from-lime-500 to-emerald-700" },
  { title: "Dance", gradient: "from-green-500 to-teal-700" },
  { title: "Workout", gradient: "from-emerald-500 to-blue-700" },
];

export default function SearchPage() {
  const [categorie, setCategorie] = useState(null);
  const navigate = useNavigate();

  const searchData = useSearchApi(categorie);
  console.log(searchData, categorie);

  const handleClick = (t) => {
    setCategorie(t);
    navigate(`/category/${t}`);
  };

  return (
    <div className="p-6 md:p-10 bg-background text-foreground">
      <section>
        <h2 className="mb-5 text-xl font-semibold">Browse Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div
              key={item.title}
              onClick={() => handleClick(item.title)}
              className={`
                group relative aspect-square cursor-pointer
                rounded-2xl overflow-hidden
                bg-linear-to-br ${item.gradient}
                transition transform hover:scale-[1.04]
                shadow-md hover:shadow-xl
              `}
            >
              <div
                className="
                absolute inset-0 bg-black/20
                group-hover:bg-black/30 transition
              "
              />

              <div className="relative z-10 h-full flex items-end p-4">
                <h3 className="text-white text-lg font-semibold tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
