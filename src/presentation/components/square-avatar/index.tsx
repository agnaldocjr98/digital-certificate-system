import { Avatar } from "@mui/material";

interface SquareAvatarProps {
  children: React.ReactNode;
  width: number;
  height: number;
  backgroundColor: string[];
  color: string;
}

export const SquareAvatar = ({
  children,
  width = 28,
  height = 28,
  backgroundColor = ["primary", "dark"],
  color = "#FFF",
}: Partial<SquareAvatarProps>) => {
  return (
    <Avatar
      variant="rounded"
      sx={{
        width: width,
        height: height,
        backgroundColor: (theme) =>
          theme.palette[backgroundColor[0]][backgroundColor[1]],
        color: color,
      }}
    >
      {children}
    </Avatar>
  );
};
