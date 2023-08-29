import React, { useContext, useEffect,useState ,useRef} from "react";
import { firstName } from "../App";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(firstName);
 const Navigate=useNavigate()
  const { info, Delete, getAllnotes,Edit} = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllnotes();
    }else{
      Navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refclose = useRef(null);
  const [text, setText] = useState({id:"", etitle: "", edesc: "", etag: "default " });
  const handleClick=(ctext) => {
    // console.log("edit");
    Edit("edited notes")
    ref.current.click()
    setText({id:ctext._id,etitle:ctext.title,edesc:ctext.desc,etag:ctext.tag})
    
  };
  // handleClick=Edit
  
  const handleOnchan = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handleClickes = (e) => {
    // Edit(text)
    toast.success("Updated succesfully...!",{position:"top-left",theme:"dark"})
    console.log("update.."+ text)
    Edit(text.id,text.etitle,text.edesc,text.etag)
    refclose.current.click()
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn d-none btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="col-md-3 ">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                   value={text.etitle} onChange={handleOnchan}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edesc"
                    className="form-control"
                    id="edesc"
                    aria-describedby="emailHelp"
                   value={text.edesc} onChange={handleOnchan}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    className="form-control"
                    id="etag"
                    aria-describedby="emailHelp"
                   value={text.etag} onChange={handleOnchan}
                  />
                </div>
                <ToastContainer/>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClickes}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="d-grid justify-content-center mt-3"><b>YOUR NOTES</b> </h1>
     
      <div
        className="row my-3"
       
      >
        {info && info.map &&
          info.map((item, index) => {
            return (
              <div className="col-md-3" key={index}>
            <div className="card bg-info my-3">
                <div className="card-body">
                    <div className="d-flex  align-items-center" style={{cursor:"pointer"}}>
                        <h5 className="card-title gap-5">{item.title}</h5>
                        <div className="d-flex justify-content-end text-end ">
                        <i className="far fa-trash-alt mx-2" onClick={()=>{Delete(item._id);toast.success("Deleted succesfully...!",{position:"top-left",theme:"dark"})}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{handleClick(item)}}></i>
                        </div>
                    </div>
                    <p className="card-text">{item.desc}</p>

                </div>
            </div>
        </div>
    )
          })}
      </div>
    </>
  );
};

export default Notes;
