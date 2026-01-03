import { Play } from "lucide-react";
import Topsong_api from "../components/Hooks/Topsong_api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import ArtistCarousel from "../components/ui/Artistcomp";
import HomeLoader from "../components/ui/HomeLoader";

export default function Home() {
  const AlbumData = Topsong_api();
  const shortData = AlbumData?.data?.results || [];
  const navigate = useNavigate();

  if (!shortData.length) {
    return (
      <div className="p-10 text-muted-foreground">
        <HomeLoader />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 pb-32 bg-background text-foreground">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Top Albums</h2>
        </div>

        <Carousel className="w-full px-8" opts={{ align: "start" }}>
          <CarouselContent className="-ml-3">
            {shortData.map((song, i) => (
              <CarouselItem
                key={i}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div
                  onClick={() => navigate(`/playlist/${song.id}`)}
                  className="
                    group rounded-xl p-3 cursor-pointer
                    bg-card hover:bg-muted transition
                    border border-border
                  "
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <img
                      src={song.image?.[2]?.url}
                      alt={song.name}
                      draggable="false"
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="
                      absolute inset-0 flex items-center justify-center
                      bg-black/40 opacity-0
                      group-hover:opacity-100 transition
                    "
                    >
                      <div
                        className="
                        w-11 h-11 rounded-full
                        bg-neon-green
                        flex items-center justify-center
                        shadow-lg scale-90
                        group-hover:scale-100 transition
                      "
                      >
                        <Play
                          size={20}
                          className="text-black fill-black ml-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium truncate">{song.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    Album • JioSaavn
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0 bg-card border-border" />
          <CarouselNext className="right-0 bg-card border-border" />
        </Carousel>
      </section>

      <ArtistCarousel />
    </div>
  );
}
