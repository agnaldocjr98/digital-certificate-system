import { useState } from "react";
import {
  Dialog,
  Box,
  useMediaQuery,
  Theme,
  DialogContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetSchedulingsContent } from "@/domain/models";
import { IdentiteSchedule } from "@/presentation/components/schedule";
import { HeaderModal } from "@/presentation/components/header-modal";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface RescheduleProps {
  open: boolean;
  setOpen(name: string): void;
  schedule: GetSchedulingsContent;
}

export const Reschedule = ({ open, setOpen, schedule }: RescheduleProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedSchedule, setSelectedSchedule] = useState({});

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      aria-labelledby="modal-reschedule"
      onClose={() => setOpen("reScheduleOpen")}
    >
      <Box
        sx={{
          paddingX: (theme) => theme.spacing(4),
          paddingBottom: (theme) => theme.spacing(4),
        }}
      >
        <HeaderModal
          id="modal-reschedule"
          title="Cliente"
          subtitle={schedule.nome}
          SideIcon={<AssignmentIndIcon fontSize="large" />}
        />

        <Box>
          <IdentiteSchedule
            uid={schedule.uid}
            selectedSchedule={setSelectedSchedule}
            locally={schedule.ehpresencial}
          />
        </Box>
      </Box>
    </Dialog>
  );
};
