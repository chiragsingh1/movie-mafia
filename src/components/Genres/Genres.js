import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    const { data } = await axios.get(url);

    setGenres(data.genres);
  };

  // console.log(genres);

  // add selected genres and remove them from genres array
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  // add unselected genres to the genres array and remove from selected genres array
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); //unmounting the component
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            color="secondary"
            style={{
              margin: "5px",
            }}
            key={genre.id}
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            variant="outlined"
            label={genre.name}
            style={{
              margin: "5px",
              color: "rgb(255, 245, 231)",
              border: "1.5px solid black",
            }}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
