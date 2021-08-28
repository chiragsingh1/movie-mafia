import SimpleBottomNavigation from "../BottomNav/BottomNav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import Header from "../Header/Header";
import Trending from "../Pages/Trending/Trending";
import Movies from "../Pages/Movies/Movies";
import Tv from "../Pages/Tv/Tv";
import Search from "../Pages/Search/Search";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/tv" component={Tv} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
