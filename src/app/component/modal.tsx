import { Button, Radio, Label, Modal, TextInput } from "flowbite-react";
import TimePickerComponent from "./_timepicker";
import moment from "moment";
import { useState } from "react";
import postData from "../lib/post";

interface Props {
  openModal: boolean;
  onCloseModal: () => void;
  setReload: () => void;
}

type Value = moment.Moment | null;

export default function ModalComponent(props: Props) {
  const [dateTime, setDateTime] = useState<Value>(moment());
  const [nameTask, setNameTask] = useState("");
  const [urgency, setUrgency] = useState("Urgent");

  return (
    <div className="w-1/2 h-auto">
      <Modal
        dismissible
        show={props.openModal}
        size="sm"
        onClose={props.onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add To Do List
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="task-name" value="Name of Task " />
              </div>
              <TextInput
                id="task-name"
                onChange={(e) => setNameTask(e.target.value)}
                placeholder="name of task"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="time-picker" value="Date" />
              </div>
              <TimePickerComponent
                dateTimeValue={dateTime}
                onChange={(value) => setDateTime(value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Radio
                  id="radio-urgent"
                  onChange={(e) => setUrgency(e.target.value)}
                  name="status"
                  value="Urgent"
                  defaultChecked
                />
                <Label htmlFor="radio-urgent">Urgent</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="radio-not-urgent"
                  onChange={(e) => setUrgency(e.target.value)}
                  name="status"
                  value="Not Urgent"
                />
                <Label htmlFor="radio-not-urgent">Not Urgent</Label>
              </div>
            </div>
            <div className="w-full">
              <Button
                onClick={() =>
                  postData({
                    name: nameTask,
                    time: dateTime ? dateTime.toISOString() : null,
                    urgency: urgency,
                    setReload: props.setReload,
                    closeModal: props.onCloseModal,
                  })
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
