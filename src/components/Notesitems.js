import React from "react";

const Notesitems = ({ note }) => {
  return (
    <>
      <div class="card col-md-3 ">
        <div class="card-body">
          <h5 class="card-title">{note}</h5>
          <p class="card-text">
            {note} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Enim ab eligendi in perspiciatis quasi velit quisquam eaque veniam
            delectus error.
          </p>
        </div>
      </div>
    </>
  );
};

export default Notesitems;
