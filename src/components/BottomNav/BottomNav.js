import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#353535",
    zIndex: 100,
    color: "#FFF5E7",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{
          color: "white",
        }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{
          color: "white",
        }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{
          color: "white",
        }}
        label="TV"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{
          color: "white",
        }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
