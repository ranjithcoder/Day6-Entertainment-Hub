import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect } from "react";

const Genres = ({ 
          type,
          genres,
          selectedgenres,
          setselectedgenres,
          setgenres,
          setpage}) => {

    const handleAdd = (genre) => {
      setselectedgenres([...selectedgenres,genre]);
      setgenres(genres.filter((g) => g.id !== genre.id));
      setpage(1);
    }
    
    const handleDel = (genre) => {
          setgenres([...genres, genre])
          setselectedgenres(selectedgenres.filter((g) => g.id !== genre.id))
          setpage(1)
        }

    const fetchGenres = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setgenres(data.genres);
    }
    useEffect(() => {
      fetchGenres()
      return () => {
        setgenres({})
      }
      // eslint-disable-next-line
    }, []);

    return (
      <div style={{ padding: '10px 0' }}>
        {selectedgenres &&
          selectedgenres.map((genre) => (
            <Chip
              style={{ margin: 3 }}
              label={genre.name}
              key={genre.id}
              clickable
              size='small'
              color='primary'
              onDelete={() => handleDel(genre)}
            />
          ))}
        {genres &&
          genres.map((genre) => (
            <Chip
              style={{ margin: 3 }}
              label={genre.name}
              key={genre.id}
              clickable
              size='small'
              onClick={() => handleAdd(genre)}
            />
          ))}
      </div>
    )
}

export default Genres
