import React from "react";
import { Button, Paper, Theme, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import Text from "@/presentation/ui-components/color-text";

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
  containerTypography: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  const isLargeThan600 = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Box className={classes.containerPaper}>
        <Box className={classes.containerTypography}>
          <Typography variant="h4" component="div" gutterBottom>
            {text}
          </Typography>
          <Text color="secondary">{subtext}</Text>
        </Box>

        {onClickButton && (
          <Box className={classes.containerButton}>
            <Button variant="contained" onClick={onClickButton}>
              {labelButton}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
