import { useEffect, useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Card from "../../Card/Card";
import CustomPagination from "../../CustomPagination/CustomPagination";

const {
  TextField,
  createTheme,
  ThemeProvider,
  Button,
  Tabs,
  Tab,
} = require("@material-ui/core");

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/${
      type ? "tv" : "movie"
    }?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=true`;

    const { data } = await axios.get(url);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <span className="pageTitle">Search 🔍</span>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0px" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ marginBottom: 50 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found :(</h2> : <h2>No Movie Found :(</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
