import React, { useState,useContext } from 'react'
import { firstName } from "../App";
import Notes from "./Notes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    const context = useContext(firstName);

    const {Addnotes} = context;

const [test, setTest] = useState({title:"",desc:"",tag:" "})
const handleOnchange =(e)=>{

  setTest({...test,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
  toast.success("Added successfully...!",{position:"top-left",theme: "dark",})
  e.preventDefault()
  Addnotes(test.title,test.desc,test.tag)
  setTest({title:"",desc:"",tag:" "})
}

  return (
    <>
      <h1 className="d-flex justify-content-center  " style={{color:"pink" }}><b>ADD NOTES</b></h1>
      <div className="d-flex justify-content-center ">
       <form className="col-md-3 " >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"  minLength={5} onChange={handleOnchange} value={test.title}
          />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="desc"
              className="form-control"
              id="desc"
              aria-describedby="emailHelp" minLength={5} onChange={handleOnchange} value={test.desc}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              aria-describedby="emailHelp"  onChange={handleOnchange} value={test.tag}
            />
          </div>
          <button type="submit" disabled={test.title.length<5 || test.desc.length<5} className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form> 
     <ToastContainer />

      </div> 
      <Notes />
    </>
  );
};

export default Home;
