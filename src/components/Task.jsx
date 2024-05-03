import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteTask, updateTaskStatus } from "../features/apiCalls";
import { useDispatch } from "react-redux";

/**
 * *Component for displaying single Task
 */
const Task = ({ taskDetails, handleDragStart, handleDragEnd, handleDragOver, handleDrop }) => {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    dispatch(deleteTask(taskDetails.id))
  };

  const completeHandler = () => {
    const isCompleted = taskDetails?.completed 
    let newTaskObj=null;
    if(isCompleted){
      newTaskObj = { ...taskDetails, completed: false}
    }else{
      newTaskObj = { ...taskDetails, completed: true}
    }
    dispatch(updateTaskStatus({id: taskDetails.id, newTaskObj}))
  }

  return (
    <div 
      draggable="true"
      onDragStart={(e) => handleDragStart(e, taskDetails)}
      onDragEnd={handleDragEnd} 
      onDragOver={handleDragOver} 
      onDrop={(e) => handleDrop(e, taskDetails)} 
      className="w-full px-4 py-4 shadow-md rounded flex flex-col gap-2 bg-white"
    >
      <h2 className="font-semibold">{taskDetails.id + ". "}{taskDetails.title}</h2>
      <p>{taskDetails.description}</p>
      <div className="flex justify-between gap-2">
        <button
          className={`${
            taskDetails.completed ? "bg-green-400" : "bg-red-400"
          } text-white py-2 px-3 font-medium rounded-full`}
          onClick={completeHandler}
        >
          {taskDetails.completed ? "Completed" : "Incomplete"}
        </button>
        <button
          className=" border-red-400 text-red-400 border-2  py-2 px-3 font-medium rounded flex items-center gap-2"
          onClick={deleteHandler}
        >
          Delete
          <AiFillDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
