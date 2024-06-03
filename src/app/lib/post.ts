interface newTask {
  name: String;
  time: string | null;
  urgency: String;
  setReload: () => void;
  closeModal: () => void;
}

export default function postData(props: newTask) {
  fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: props.name,
      time: props.time,
      urgency: props.urgency,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      props.setReload();
      props.closeModal();
    })
    .catch((error) => {
      console.error("Error creating task:", error);
    });
}
