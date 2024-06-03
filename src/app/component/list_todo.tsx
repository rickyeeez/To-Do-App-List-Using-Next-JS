import moment from "moment";
import { useState, useEffect } from "react";
import deleteData from "../lib/delete";
import finishedData from "../lib/update";

interface Props {
  showAll: boolean;
  title: string;
  data: any;
}

export default function TodoListComponent({ showAll, title, data }: Props) {
  const [open, setOpen] = useState(false);
  const [dataArray, setDataArray] = useState(data);

  useEffect(() => {
    setOpen(showAll);
  }, [showAll]);

  const deleteRow = (id: number) => {
    setDataArray((prevData: any[]) =>
      prevData.filter((item) => item.id !== id)
    );
  };

  const markAsFinished = (id: number) => {
    finishedData(id, () => {
      setDataArray((prevData: any[]) =>
        prevData.map((item) =>
          item.id === id ? { ...item, urgency: "Finished" } : item
        )
      );
    });
  };

  return (
    <div
      key={title}
      className={`px-4 flex flex-col mb-4 ${
        dataArray.length === 0 ? "hidden" : ""
      } `}
    >
      <div className="header mb-4 border-b border-gray-200 pb-2 grid grid-cols-3 lg:grid-cols-2">
        <div className="flex items-center col-span-2 lg:col-span-1">
          <h3 className="lg:text-lg text-sm font-semibold">{title} </h3>
          <span className="inline-flex h-6 items-center bg-green-100 text-green-800 ms-2 text-xs font-medium  px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>{" "}
            {
              dataArray.filter(
                (item: { urgency: string }) => item.urgency === "Finished"
              ).length
            }{" "}
            / {dataArray.length}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setOpen((open) => !open);
            }}
            className="flex justify-center items-center px-2.5 py-1.5 bg-blue-600 rounded-lg lg:rounded-full text-white text-sm hover:bg-blue-600/90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 lg:me-2"
            >
              <path
                fillRule="evenodd"
                d="M9.47 15.28a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06L10 13.69 6.28 9.97a.75.75 0 0 0-1.06 1.06l4.25 4.25ZM5.22 6.03l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L10 8.69 6.28 4.97a.75.75 0 0 0-1.06 1.06Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="hidden lg:flex">Show List</p>
          </button>
        </div>
      </div>

      <div
        className={`grid h-full ps-0 lg:ps-12   ${
          open
            ? "grid-rows-[1fr] opacity-100 pointer-events-auto transition-all duration-300 ease-in-out"
            : "grid-rows-[0fr] opacity-0 pointer-events-none transition-all duration-200 ease-in-out"
        }`}
      >
        <table
          className={`${
            open
              ? "max-h-[1000px] overflow-visible transition-[max-height] duration-300 ease-in-out"
              : "max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          } w-full`}
        >
          <tbody>
            {dataArray.map((item: any) => (
              <tr key={item.id} className="text-start border-b">
                <td className="flex lg:w-20 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {moment(item.time).format("HH:mm")}
                </td>
                <td className="lg:w-1/2">
                  {item.urgency === "Finished" ? (
                    <del>{item.name}</del>
                  ) : (
                    item.name
                  )}
                </td>
                <td>{item.urgency}</td>

                <td className="text-end ">
                  {item.urgency === "Finished" ? (
                    <></>
                  ) : (
                    <button
                      type="button"
                      onClick={() => markAsFinished(item.id)}
                      className="me-2 text-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() =>
                      deleteData(item.id, () => deleteRow(item.id))
                    }
                    className="ms-2 text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
