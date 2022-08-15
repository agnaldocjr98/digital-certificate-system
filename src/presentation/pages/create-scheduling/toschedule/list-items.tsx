import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";

interface HeaderListSchedulingProps {
  client: string;
  schedule: string;
  dates: string[];
  hours: string[];
}

export function HeaderListScheduling({
  client,
  schedule,
  dates,
  hours,
}: HeaderListSchedulingProps) {
  function CompIntervals(internalDates: string[], internalHours: string[]) {
    return (
      <Typography>
        <Stack direction="column">
          <span>
            {internalDates[0]} - <strong> {internalHours[0]}</strong>
          </span>{" "}
          <span>
            {internalDates[1]} - <strong> {internalHours[1]}</strong>
          </span>{" "}
        </Stack>
      </Typography>
    );
  }
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Cliente
            </Typography>
          }
          secondary={client}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Agenda
            </Typography>
          }
          secondary={schedule}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EventNoteIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Intervalo
            </Typography>
          }
          secondary={CompIntervals(dates, hours)}
        />
      </ListItem>
    </List>
  );
}
