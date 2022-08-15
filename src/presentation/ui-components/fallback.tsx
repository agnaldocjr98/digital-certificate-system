import { Box } from "@mui/material";
import { Loader } from "../components/loader";

export function FallBack() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height={"100vh"}
    >
      <Loader />
    </Box>
  );
}
