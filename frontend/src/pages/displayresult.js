import { useState, useEffect } from "react";
import "../cssfile/result.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
function Rendertable({ data, func }) {
  const [Name, setname] = useState("j");
  const [pres, setpres] = useState(0);
  const [selectionBehavior, setSelectionBehavior] = useState("toggle");

  if (data.length !== 0) {
    data = data.present;
  }
  return (
    <>
      <Table
        id="tables"
        aria-label="Rows actions table example with dynamic content"
        selectionBehavior={selectionBehavior}
        onRowAction={(key) => {
          setpres(23);
          setname(data[key].name);
          func(data[key].name, 23);
        }}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLL NUMBER</TableColumn>
          <TableColumn>ATTENDANCE</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((student, index) => (
            <TableRow className="hover:" key={index}>
              <TableCell> {student.name}</TableCell>
              <TableCell>{student.rollnumber}</TableCell>
              <TableCell>
                {student.attendance == 1 ? "Present" : "Absent"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default function Result() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const [data, setdata] = useState({
    present: [
      { name: "ybhinav", rollnumber: "2", attendance: 1 },
      { name: "inav", rollnumber: "2", attendance: 1 },
    ],
  });
  const [Date, setDate] = useState("12-09-23");
  const [Total, setTotal] = useState("100");
  const [Studentname, setStudentname] = useState("ybhinav");
  const [Studentattendance, setStudentattendance] = useState("35");
  // write an api request to get the information of Total(student present), Student name and there attendance.
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  function handlerowclick(Name, pres) {
    //send a api request to get the overall attendance of the student of that class.
    setStudentname(Name);
    setStudentattendance(pres);
  }
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (showAlert) {
      alert("double click the student row to show information of that student");
      setShowAlert(false); // Set showAlert to false to prevent showing the alert again.
    }
  }, [showAlert]);

  return (
    <>
      <nav className="navMenu">
        <a href="/home">Home</a>
        <a href="/myclass">MyClass</a>
        <a href="/about">About</a>
        <a href="/result">MyResult</a>
      </nav>
      {/* <div class="center">
          <div class="article-card">
            <label htmlFor="chosen-date " className="">Choose a Date: </label>
            <input type="date" id="chosen-date" onChange={handleDateChange}/>
            <button className="">Display Result</button>
        </div>
      </div> */}
      <div className="center-container">
        <div className="center">
          <div className="article-card">
            <label htmlFor="chosen-date" className="">
              Choose a Date:{" "}
            </label>
            <input type="date" id="chosen-date" onChange={handleDateChange} />

            <label
              className="block text-s font-medium text-gray-800 mt-4"
              htmlFor="Batch"
            >
              Batch:
            </label>
            <input
              type="text"
              name="Batch"
              id="Batch"
              className="mt-2 mb-2 border-gray-800 focus: block w-full h-8 shadow-sm sm:text-sm border border-black rounded-md"

            />

            <button id="buttoner" className="mt-4">
              Display Result
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-4 items-center">
        <div className="flex flex-col">
          <div
            id="flex"
            className="flex flex-row bg-white rounded-md border-2 border-purple-300 w-full h-fit p-2 justify-center "
          >
            <div className="flex flex-col items-center w-full border-r-2">
              <p className="font-bold text-xl">DATE</p>
              <div className="text-3xl">{Date}</div>
            </div>
            <div className="flex flex-col items-center border-l-2 w-full">
              <p className="font-bold text-xl">Student info</p>
              <div className="text-xl">{Studentname}</div>
              <div>
                {Studentattendance} days present out of {Total} days.
              </div>
            </div>
          </div>
          <div className="self-center max-w-1/2 overflow-y-auto min-h-[350px]">
            <div className="styled-table overflow-y-auto min-h-[350px]">
              <Rendertable data={data} func={handlerowclick} name="present" />
            </div>
          </div>
        </div>
        {/* <div className="h-full flex-wrap  w-1/2 flex h-full flex-col items-center content-center ">
    <div className="slider-container ">
      <div className="slider">
        <div className="slide">
          <img src="unnamed.png" alt="Image 1" />
        </div>
        <div className="slide">
          <img src="unnamed.png" alt="Image 2" />
        </div>
        <div className="slide">
          <img src="unnamed.png" alt="Image 3" />
        </div>
      </div>
    </div>
    <div className="flex mt-2  flex-row w-full max-w-[400px] items-center place-content-between ">
    <button className="text-xl font-bold text-purple bg-slate-400 self-left h-fit rounded-md p-2 hover:bg-slate-500 hover:shadow-lg ">Previous</button>
    <button className="text-xl font-bold text-purple bg-slate-400  h-fit rounded-md p-2 hover:bg-slate-500 hover:shadow-lg">Next</button>
    </div>
    </div> */}
      </div>
    </>
  );
}
