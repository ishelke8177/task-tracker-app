import { createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config/config.json'
import axios from "axios";

export const getTasks = createAsyncThunk("getTasks", async () => {
    const resp = await axios.get(`${config.HOST_LINK}`)
    return resp?.data;
});

export const getTaskById = createAsyncThunk("getTaskById", async (id) => {
    const resp = await axios.get(`${config.HOST_LINK}/${id}`)
    return resp?.data;
});

export const addTask = createAsyncThunk("addTask", async (taskObj) => {
    const resp = await axios.post(`${config.HOST_LINK}`, taskObj)
    return resp?.data;
});

export const deleteTask = createAsyncThunk("deleteTask", async (taskId) => {
    await axios.delete(`${config.HOST_LINK}/${taskId}`)
    return {id: taskId};
});

export const updateTaskStatus = createAsyncThunk("updateTaskStatus", async ({id, newTaskObj}) => {
    const resp = await axios.put(`${config.HOST_LINK}/${id}`, newTaskObj)
    return resp?.data;
});