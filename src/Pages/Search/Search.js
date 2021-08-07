import { Button, createMuiTheme, Tab, Tabs, ThemeProvider } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/CustomPagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'

const Search = () => {
            const [type, settype] = useState(0);
            const [page, setpage] = useState(1);
            const [content, setcontent] = useState([]);
            const [numOfPages, setnumOfPages] = useState();
            const [searchText, setsearchText] = useState("");

            const fetchSearch = async () => {
              const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${
                  type ? 'tv' : 'movie'
                }?api_key=${
                  process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
              );
              setcontent(data.results);
              setnumOfPages(data.total_pages);
            }
            useEffect(() => {
              window.scroll(0,0);
              fetchSearch();
              // eslint-disable-next-line
            }, [page, type]);

    const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary:{
      main:'#fff',
    },
  },
});
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{ display: 'flex', margin: '15px 0' }}>
            <TextField
              style={{ flex: 1 }}
              className='searchbox'
              variant='filled'
              label='search'
              onChange={(e) => setsearchText(e.target.value)}
            />
            <Button
              variant='contained'
              onClick={fetchSearch}
              style={{ marginLeft: '10px' }}
            >
              <SearchIcon />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor='primary'
            textColor='primary'
            onChange={(e, newValue) => {
              settype(newValue)
              setpage(1)
            }}
          >
            <Tab label='Search Movies' style={{ width: '50%' }} />
            <Tab label='Search Series' style={{ width: '50%' }} />
          </Tabs>
        </ThemeProvider>
        <div class='trending'>
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? 'tv' : 'movie'}
                vote_average={c.vote_average}
              />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setpage={setpage} numOfPages={numOfPages} />
        )}
      </div>
    )
}

export default Search
