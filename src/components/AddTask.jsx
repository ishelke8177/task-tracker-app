import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/apiCalls";

/**
 * *Component for adding Task
 */
const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    completed: false
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addHandler = async () => {
    dispatch(addTask(task))
  };

  // Function to handle chnages in the form fields
  const handleChange = (e) => {
    e.preventDefault();

    setTask({ ...task, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      task.title === ""
    ) {
      alert("All fields are required");
    } else {
      addHandler();
      navigate("/");
    }
  };

  return (
    <>
      <form className="w-full max-w-sm" onSubmit={(e) => handleSubmit(e)}>
        <div className="md:flex md:items-center md:justify-start mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="title"
            >
              Title
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              type="text"
              name="title"
              value={task.title}
              onChange={(e) => handleChange(e)}
              placeholder="Enter title here..."
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
