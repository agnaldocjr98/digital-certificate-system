import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
export function BooleanCircle({ success }: { success: boolean }) {
  return (
    <CircleRoundedIcon
      fontSize="small"
      sx={{
        color: success ? "success.dark" : "error.dark",
      }}
    />
  );
}
