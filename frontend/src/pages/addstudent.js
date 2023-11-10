import "../cssfile/addstudent.css";
import { Modal, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function Addstudent() {

  const [data, setdata] = useState([
    {id:1, student: "student", rollnumber: 1001 },
    {id:2, student: "student2", rollnumber: 1002 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("open");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteclass = (id) => {
    console.log("Delete row with ID:", id);
    const updatedData = data.filter((row) => row.id !== id);
    setdata(updatedData);
  };

  return (
    <>
      <nav className="navMenu">
        <a href="/home">Home</a>
        <a href="/myclass">MyClass</a>
        <a href="/about">About</a>
        <a href="/result">MyResult</a>
      </nav>

      <div className="relative mt-64 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative items-center">
        <div className="absolute inset-0 z-0" />
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Add Student
            </h2>
          </div>
          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Name
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder=" "
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Roll Number
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder=" "
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Photo
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img className="has-mask h-36 object-center" />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <a
                        href=""
                        id=""
                        className="text-blue-600 hover:underline"
                      >
                        select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: png, jpg, jpeg of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        className="fixed bottom-5 left-5 md:bottom-10 md:left-10 bg-gray-800 border border-gray-300 text-white p-2 rounded-md"
        type="button"
        id="modal-switch"
        onClick={openModal}
      >
        Student info
      </button>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{ overflowY: "auto", maxHeight: 400 }}
            >
              <form>
                <div className="bg-gray-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                  <h2
                    className="text-xl leading-6 font-semibold text-gray-900 mb-6"
                    id="modal-headline"
                  >
                    Student Information:
                  </h2>
                  {/*table start */}
                  <table className="space-x-0">
                    <thead>
                      <tr>
                        <th className="px-5 py-4 text-left font-semibold text-l text-gray-700 uppercase">
                          Student
                        </th>
                        <th className="px-5 py-4 text-left font-semibold text-l text-gray-700 uppercase">
                          Roll Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => {
                        return (
                          <tr key={row.id}>{console.log(row)}
                            <td className="text-gray-900">{row.student}</td>
                            <td className="text-gray-900">
                              {row.rollnumber}
                              <span
                                className="text-black text-s hover:font-bold hover:cursor-pointer ml-20"
                                onClick={() => deleteclass(row.id)}
                              >
                                ✖
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {/* <tr>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          Aadish Jain
                        </th>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          220001001
                        </th>
                      </tr>
                      <tr>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          Abhinav gangil
                        </th>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          220001002
                        </th>
                      </tr>
                      <tr>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          aditya kshtiz
                        </th>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          220001004
                        </th>
                      </tr>
                      <tr>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          aditya mastud
                        </th>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          220001005
                        </th>
                      </tr>
                      <tr>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          aditya yadav
                        </th>
                        <th className="px-5 py-4 text-left font-medium text-xs text-gray-700 ">
                          220001006
                        </th>
                      </tr> */}
                    </tbody>
                  </table>
                  {/*add table here  */}
                </div>

                <div className="bg-gray-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
