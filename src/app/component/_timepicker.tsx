import moment from "moment";
import { useState } from "react";

interface Props {
  dateTimeValue: moment.Moment | null;
  onChange: (value: moment.Moment | null) => void;
}

export default function TimePickerComponent(props: Props) {
  const [date, setDate] = useState<moment.Moment | null>(props.dateTimeValue);

  const handleDateChange = (newDate: Date) => {
    setDate(moment(newDate));
    props.onChange(moment(newDate));
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={date ? date.format("yyyy-MM-DDTHH:mm") : ""}
        required
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
    </div>
  );
}
