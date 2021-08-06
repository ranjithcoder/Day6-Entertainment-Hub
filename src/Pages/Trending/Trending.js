import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css'
const Trending = () => {
    const [page, setpage] = useState(1)
    const [content, setcontent] = useState([]);
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      setcontent(data.results);
    };
    useEffect(() => {
      fetchTrending()
      // eslint-disable-next-line
    }, [page])
    return (
      <div>
        <div className='pagetitle'>Trending</div>
        <div class='trending'>
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))}
        </div>
        <CustomPagination setpage={setpage}/>
      </div>
    )
}

export default Trending
