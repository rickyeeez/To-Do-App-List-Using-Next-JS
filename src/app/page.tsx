"use client";
import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import ModalComponent from "./component/modal";
import TodoListComponent from "./component/list_todo";
import getData from "./lib/get";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
export interface ItemsData {
  success: boolean;
  data: { [key: string]: Datum[] };
}

export interface Datum {
  id: number;
  name: string;
  time: Date;
  urgency: string;
}

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ItemsData>();
  const [toast, setToast] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleShowAllChange = () => {
    setShowAll((prevState) => !prevState);
  };
  async function fetchData() {
    setLoading(true);
    const response = await getData();
    const jsonData = await response.json();
    setData(jsonData);
    setLoading(false);
  }

  const refetchData = () => {
    fetchData();
    setToast(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="relative ">
        <div className="absolute top-5 right-10">
          {toast ? (
            <Toast>
              <div className=" inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Task Added Succesfully
              </div>
              <Toast.Toggle />
            </Toast>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ModalComponent
        setReload={refetchData}
        openModal={openModal}
        onCloseModal={handleCloseModal}
      />

      <main className="w-full h-full px-8 lg:px-56 pt-8">
        <div className="flex flex-col w-full bg-white border border-gray-100 shadow-lg rounded-lg">
          <div className="grid grid-cols-2 w-full py-4 mb-4 border-b-2">
            <div className="flex px-4 items-center">Todo App List</div>
            <div className="flex w-full justify-end items-center px-4">
              {/* Check Box */}
              <div className="lg:flex hidden items-center me-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="true"
                    className="sr-only peer"
                    onChange={handleShowAllChange}
                  ></input>
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Show All To Do List
                  </span>
                </label>
              </div>
              {/* Check Box */}
              <button
                className="select-none rounded-lg border border-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-green-600 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Add Task
              </button>
            </div>
          </div>
          {loading ? (
            "Loading...."
          ) : (
            <>
              {data?.data &&
                Object.entries(data.data).map(([key, items]) => (
                  <div key={key}></div>
                ))}

              {data &&
                Object.keys(data.data).map((key) => (
                  <TodoListComponent
                    key={key}
                    showAll={showAll}
                    title={new Intl.DateTimeFormat("id-ID", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    }).format(new Date(key))}
                    data={data.data[key]}
                  />
                ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}
