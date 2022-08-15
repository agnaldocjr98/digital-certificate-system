import { DialogTitle, IconButton, Stack, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogProps {
  id: string;
  title: string;
  subtitle: string;
  SideIcon: React.ReactElement;
}

export const HeaderModal = (props: DialogProps) => {
  const { title, subtitle, SideIcon, ...other } = props;

  return (
    <Stack
      id="dialog-details-identite"
      direction="row"
      display="flex"
      alignItems="center"
      spacing={2}
      paddingY={4}
    >
      {SideIcon}
      <Box display="flex" flexDirection="column">
        <span>{title}</span>
        <strong>{subtitle}</strong>
      </Box>
    </Stack>
  );
};
