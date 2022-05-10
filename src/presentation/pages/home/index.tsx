import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: `calc(100vh - ${theme.header.height})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));
export const Home: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.container}></div>;
};
