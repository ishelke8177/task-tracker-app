import React, { useState, useEffect } from "react";
import { Task, Loader, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../features/apiCalls";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const taskItems = useSelector(store => store.task)
  const { tasksArr , isLoading } = taskItems
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const dispatch = useDispatch();

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setTasks(tasksArr?.filter((task) => task.completed === true));
        break;
      case "incomplete":
        setTasks(tasksArr?.filter((task) => task.completed === false));
        break;
      default:
        setTasks(tasksArr);
        break;
    }
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    filterHandler();
  }, [tasksArr, status]);

  useEffect(() => {
    setTasks(tasksArr);
    const filteredTasks = tasksArr?.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filteredTasks);
  }, [tasksArr, searchTerm]);

  return (
    <>
      <div className="w-full mx-4 md:w-1/2  flex flex-col mt-4">
        <div className="flex gap-4">
          <input
            className=" appearance-none w-full border-2 border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="title"
            type="text"
            name="title"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Enter title to search..."
          />
          <select
            className="rounded border-2 border-gray-300 text-gray-400 py-2 px-4 focus:border-purple-500 focus:outline-none focus:text-black"
            onChange={statusHandler}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div className="w-full justify-center flex flex-wrap my-4 gap-4">
          {isLoading && <Loader />}
          {tasks?.length > 0 ? (
            tasks?.map((taskD) => <Task key={taskD?.id} taskDetails={taskD} />)
          ) : (
            <Message message="No Tasks Found" />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
