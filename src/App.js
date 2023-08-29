import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import Login from "./components/Login";
import api from './components/serverapi'
const firstName = createContext();
function App() {
  // const api = process.env.BASE_URI;
  const data = [];

  const [info, setInfo] = useState(data);

  //Add all Notes
  const getAllnotes = async () => {
    try {
      const response = await fetch(`${api}/getallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await response.json();
      console.log(json);
      setInfo(json);
    } catch (error) {
      console.log(error);
    }
  };

  //Add item
  const Addnotes = async (title, desc, tag) => {
    try {
      const response = await fetch(`${api}/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, desc, tag }),
      });
      
      const json = await response.json();
  //adding new notes
      setInfo(info.concat(json));
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item

  const Delete = async (id) => {
    try {
      const response = await fetch(`${api}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);

      console.log("deleted itmes " + id);
      const items = info.filter((element) => {
        return element._id !== id;
      });
      setInfo(items);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit item
  const Edit = async (id, title, desc, tag) => {
    const response = await fetch(`${api}/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, desc, tag }),
    });
    const data = await response.json();
    console.log(data);
    let newNotes = JSON.parse(JSON.stringify(info));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        newNotes[index].tag = tag;
        break;
      }
    }
    setInfo(newNotes);
  };
  return (
    <>
      <firstName.Provider
        value={{ info, setInfo, Addnotes, Edit, Delete, getAllnotes }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/registeration" element={<Registration />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </firstName.Provider>
    </>
  );
}
export default App;
export { firstName };
