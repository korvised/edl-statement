import { format, isValid } from "date-fns";

function DateFormat({
  date,
  format: fmt = "dd/MM/yyyy",
  ...props
}: {
  date: Date | string;
  format?: string;
}) {
  return (
    <span {...props}>
      {isValid(new Date(date)) ? format(new Date(date), fmt) : "--"}
    </span>
  );
}

export default DateFormat;
