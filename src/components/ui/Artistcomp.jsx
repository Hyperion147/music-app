import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ArtistApi from "../Hooks/ArtistApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ArtistCarousel() {
  const artistData = ArtistApi();
  console.log(artistData);
  const artists = artistData?.data?.results || [];
  const navigate = useNavigate();

  if (!artists.length) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4">Popular Artists</h2>

      <Carousel className="w-full px-10" opts={{ align: "start" }}>
        <CarouselContent className="-ml-3">
          {artists.map((artist, i) => (
            <CarouselItem
              key={i}
              className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div
                onClick={() => navigate(`/artist/${artist.id}`)}
                className="group bg-card rounded-lg p-3 hover:bg-muted/50 transition cursor-pointer select-none"
              >
                <div className="relative aspect-square rounded-full overflow-hidden mb-2">
                  <img
                    src={artist.image?.[2]?.url}
                    alt={artist.name}
                    draggable="false"
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-9 h-9 rounded-full bg-[#00ff88] flex items-center justify-center">
                      <Play
                        size={18}
                        className="text-black fill-black ml-0.5"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="truncate text-sm text-center">{artist.name}</h4>
                <p className="text-xs text-muted-foreground text-center">
                  Artist
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </section>
  );
}
