import { useState } from "react";
import { Play } from "lucide-react";
import { Sidebar } from "../components/sidebar";
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
// import ArtistApi from "../components/Hooks/ArtistApi";
// import AlbumSongs from "../components/Hooks/AlbumSongs";

export default function Home() {
  const AlbumData = Topsong_api();
  const shortData = AlbumData?.data?.results || [];
  const navigate = useNavigate();

  if (!shortData.length) {
    return (
      <div className="p-8 ml-64">
        <Sidebar />
        <p>Loading Top Songs...</p>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 ml-64 select-none">
      <Sidebar />

      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold">Good evening</h1>
        <p className="text-muted-foreground text-sm">
          Ready to discover new music?
        </p>
      </div>

      {/* TOP SONGS */}
      <section className="mb-10">
        <h2 className="mb-4">Top Album</h2>

        <Carousel className="w-full px-10" opts={{ align: "start" }}>
          <CarouselContent className="-ml-3">
            {shortData.map((song, i) => (
              <CarouselItem
                key={i}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="group bg-card rounded-lg p-3 hover:bg-muted/50 transition cursor-pointer select-none">
                  <div
                    onClick={() => navigate(`/playlist/${song.id}`)}
                    className="relative aspect-square rounded-lg overflow-hidden mb-2"
                  >
                    <img
                      src={song.image?.[2]?.url}
                      alt={song.name}
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

                  <h4 className="truncate text-sm">{song.name}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </section>

      {/* ARTISTS */}
      <ArtistCarousel />
    </div>
  );
}
