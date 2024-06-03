export default function finishedData(id: number, setFinished: () => void) {
  fetch(`/api/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urgency: "Finished",
    }),
  })
    .then((response) => response.json())
    .then(() => {
      setFinished();
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
}
