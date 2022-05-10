import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import frLocale from "date-fns/locale/pt-BR";

const style = {};

interface MyDatePickerProps {
  label: string;
  name: string;
  value: Date | null;
  setvalue?: (value: Date | null, name: string) => void;
  size?: "small" | "medium";
  readOnly?: boolean;
}

export const MyDatePicker: React.FC<MyDatePickerProps> = ({
  label,
  name,
  value,
  setvalue,
  size = "small",
  readOnly = false,
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <DateTimePicker
        label={label}
        value={value}
        readOnly={readOnly}
        onChange={(newValue) => {
          setvalue(newValue, name);
        }}
        renderInput={(params) => (
          <TextField {...params} size={size} style={style} />
        )}
        {...rest}
      />
    </LocalizationProvider>
  );
};
