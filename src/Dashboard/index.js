import { Button } from "antd";
import React, { useState } from "react";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  // const message = "Say Hello to Naveen"
  // const handleClick = (e) => {
  //     setMessage(e);
  // }
  const CardData = [
    {
      key: 1,
      name: "Guhan",
      role: "Frontend Developer",
      company: "Waila Technology",
      exp: "2-year" 
    },
    {
      key: 2,
      name: "Sabarish",
      role: "Fullstack Developer",
      company: "Waila Technology",
      exp: "2-year" 
    },
    {
      key: 3,
      name: "Thiru",
      role: "Backend Developer",
      company: "Waila Technology",
      exp: "2-year" 
    },
    {
      key: 4,
      name: "Bharathlin",
      role: "frontend Developer",
      company: "Waila Technology",
      exp: "1.5-year" 
    },
  ]
  return (
    <>
      <div className="flex justify-around w-full flex-wrap gap-1">
        {CardData.map((item, index) => {
          return(
            <>
              <div key={index} className="w-4/12 px-3 py-3 bg-sky-200 rounded-lg cursor-pointer shadow-2xl">
                <h2 className="text-xl antialiased font-bold py-1.5">{item.name}</h2>
                <p className="py-1.5">{item.role}</p>
                <p className="py-1.5">{item.company}</p>
                <span className="py-1.5">{item.exp}</span>
              </div>

            </>
          )
        })}
      </div>
    </>
  );
};

export default Dashboard;
