import { memo, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetSchedulingsContent } from "@/domain/models";
import { makeStyles } from "@mui/styles";
import { IdentiteSchedule } from "@/presentation/components/schedule";

const useStyles = makeStyles((theme: Theme) => ({
  datewrapper: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  containerLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  containermain: {
    height: "100%",
    paddingTop: theme.spacing(1),
  },
  maincontainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
    width: "100%",
    gap: theme.spacing(2),
  },
  tablecontainer: {
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  fieldscontainer: {
    display: "flex",
    flexDirection: "column",
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
  fieldsheadercontainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    gap: theme.spacing(0.5),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
  },
  fieldsfieldscontainer: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  loadingcontainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface AgentRegisterQuerySchedulingReScheduleProps {
  open: boolean;
  setOpen(name: string): void;
  schedule: GetSchedulingsContent;
}

export const AgentRegisterQuerySchedulingReSchedule = memo(
  function AgentRegisterQuerySchedulingReSchedule({
    open,
    setOpen,
    schedule,
  }: AgentRegisterQuerySchedulingReScheduleProps) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedSchedule, setSelectedSchedule] = useState({});

    return (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen("reScheduleOpen")}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          REAGENDAMENTO - <strong>{schedule.nome}</strong>
        </DialogTitle>
        <DialogContent>
          <IdentiteSchedule
            uid={schedule.uid}
            selectedSchedule={setSelectedSchedule}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ marginRight: (theme) => theme.spacing(1.5) }}
            variant="contained"
            onClick={() => setOpen("reScheduleOpen")}
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
