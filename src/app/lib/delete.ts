export default function deleteData(id: number, deleteRow: () => void) {
  fetch(`/api/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      deleteRow();
    })
    .catch((error) => {
      console.error("Error creating task:", error);
    });
}
