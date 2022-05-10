import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  maincontainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    height: "100%",
  },
}));

interface InnerContentProps {
  children: React.ReactNode;
}

export const InnerContent: React.FC<InnerContentProps> = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.maincontainer}>{children}</Box>;
};
