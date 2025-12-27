import { useEffect, useState } from "react";

export default function useArtistsApi() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setArtists([]); // Clear existing artists
        console.log("Fetching artists from API...");

        // Helper function to extract image URL
        const extractImageUrl = (item) => {
          if (!item || !item.image) return null;

          if (Array.isArray(item.image)) {
            // If image is an array, try to get the highest quality
            return (
              item.image[item.image.length - 1]?.link ||
              item.image[item.image.length - 1]?.url ||
              item.image[2]?.link ||
              item.image[1]?.link ||
              item.image[0]?.link ||
              item.image[2]?.url ||
              item.image[1]?.url ||
              item.image[0]?.url
            );
          } else if (typeof item.image === "string") {
            // If image is a direct string URL
            return item.image;
          } else if (item.image.link || item.image.url) {
            // If image is an object with link or url property
            return item.image.link || item.image.url;
          }

          return null;
        };

        // Popular artists to search for with music-themed fallback images
        const artistsData = [
          {
            name: "Arijit Singh",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Arijit+Singh&size=300&background=00ff88&color=000&font-size=0.4",
            followers: 2500000,
          },
          {
            name: "Shreya Ghoshal",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Shreya+Ghoshal&size=300&background=ff6b6b&color=fff&font-size=0.4",
            followers: 1800000,
          },
          {
            name: "A.R. Rahman",
            fallbackImage:
              "https://ui-avatars.com/api/?name=A.R.+Rahman&size=300&background=4ecdc4&color=000&font-size=0.4",
            followers: 3200000,
          },
          {
            name: "Lata Mangeshkar",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Lata+Mangeshkar&size=300&background=45b7d1&color=fff&font-size=0.4",
            followers: 5000000,
          },
          {
            name: "Kishore Kumar",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Kishore+Kumar&size=300&background=f9ca24&color=000&font-size=0.4",
            followers: 4200000,
          },
          {
            name: "Rahat Fateh Ali Khan",
            fallbackImage: "/images/rahat-fateh-ali-khan.jpg",
            followers: 1500000,
          },
          {
            name: "Sunidhi Chauhan",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Sunidhi+Chauhan&size=300&background=fd79a8&color=fff&font-size=0.4",
            followers: 1200000,
          },
          {
            name: "Sonu Nigam",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Sonu+Nigam&size=300&background=a29bfe&color=fff&font-size=0.4",
            followers: 1900000,
          },
        ];

        const artistPromises = artistsData.map(async (artistData) => {
          try {
            const artistName = artistData.name;

            const songResponse = await fetch(
              `https://music-services.onrender.com/api/search/songs?query=${encodeURIComponent(artistName)}&limit=8`,
            );
            const songDataResponse = await songResponse.json();

            console.log(`Song search for ${artistName}:`, songDataResponse);

            let songs = [];
            if (songDataResponse.success && songDataResponse.data?.results) {
              songs = songDataResponse.data.results;
            } else if (songDataResponse.results) {
              songs = songDataResponse.results;
            } else if (Array.isArray(songDataResponse)) {
              songs = songDataResponse;
            }

            if (songs && songs.length > 0) {
              // Filter songs to get ones that actually match the artist
              const artistSongs = songs.filter((song) => {
                const songArtists = song.primaryArtists || song.artist || "";
                const artistsArray = song.artists?.primary || [];

                return (
                  songArtists
                    .toLowerCase()
                    .includes(artistName.toLowerCase()) ||
                  artistsArray.some(
                    (artist) =>
                      artist.name &&
                      artist.name
                        .toLowerCase()
                        .includes(artistName.toLowerCase()),
                  )
                );
              });

              // Use filtered songs if available, otherwise use all songs
              const finalSongs =
                artistSongs.length > 0
                  ? artistSongs.slice(0, 8)
                  : songs.slice(0, 8);

              // Try to get artist image from the API first
              let artistImage = null;

              // Special case for Rahat Fateh Ali Khan - always use local image
              if (artistName === "Rahat Fateh Ali Khan") {
                artistImage = "/images/rahat-fateh-ali-khan.jpg";
              } else {
                // Look for artist-specific images in the song data
                for (const song of finalSongs) {
                  if (song.artists?.primary) {
                    for (const artist of song.artists.primary) {
                      if (
                        artist.name &&
                        artist.name
                          .toLowerCase()
                          .includes(artistName.toLowerCase()) &&
                        artist.image
                      ) {
                        artistImage = extractImageUrl(artist);
                        if (artistImage) break;
                      }
                    }
                    if (artistImage) break;
                  }
                }
              }

              // If no artist image found, use fallback
              if (!artistImage) {
                artistImage = artistData.fallbackImage;
              }

              console.log(`Final image URL for ${artistName}:`, artistImage);

              return {
                id: artistName.replace(/\s+/g, "-").toLowerCase(),
                name: artistName,
                image: artistImage,
                songs: finalSongs,
                followers: artistData.followers, // Use static follower count
              };
            }
          } catch (error) {
            console.error(`Error fetching data for ${artistData.name}:`, error);
          }
          return null;
        });

        const artistResults = await Promise.all(artistPromises);
        console.log("Final artist results:", artistResults);
        setArtists(artistResults.filter((artist) => artist !== null));
      } catch (err) {
        setError(err.message);
        console.error("Artist API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
}
