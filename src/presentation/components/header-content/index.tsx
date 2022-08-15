import React from "react";
import {
  Button,
  Paper,
  SvgIconTypeMap,
  Theme,
  Typography,
  Box,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import Text from "../text";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      height: "75px",
    },
  },
  containerPaper: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(1),
      padding: theme.spacing(2),
      flexDirection: "column",
    },
  },
}));

interface HeaderContentProps {
  text: string;
  subtext: string;
  labelButton?: string;
  onClickButton?(): void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  text,
  subtext,
  labelButton,
  onClickButton,
}: HeaderContentProps) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Box className={classes.containerPaper}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant="h4" component="div" gutterBottom>
            {text}
          </Typography>
          <Text color="secondary">{subtext}</Text>
        </Box>

        {!!labelButton && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.success.dark,
                color: "#fff",
              }}
              onClick={onClickButton}
            >
              {labelButton}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
