import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, getTaskById, getTasks, updateTaskStatus } from "./apiCalls";

const tasksSlice = createSlice({
    name: 'task',
    initialState: {
        isLoading: false,
        tasksArr: [],
        task: null,
        isError: false
    },
    extraReducers: (builder) => {
        // getTasks
        builder.addCase(getTasks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasksArr = action.payload;
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.isError = true;
        })

        // getTask
        builder.addCase(getTaskById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTaskById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.task = action.payload;
        })
        builder.addCase(getTaskById.rejected, (state, action) => {
            state.isError = true;
        })
        
        // addTask
        builder.addCase(addTask.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasksArr.push(action.payload);
        })
        builder.addCase(addTask.rejected, (state, action) => {
            state.isError = true;
        })

        // deleteTask
        builder.addCase(deleteTask.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedItemId = action.payload.id;
            state.tasksArr = state.tasksArr.filter(task => task.id !== deletedItemId);
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.isError = true;
        })

        // updateTaskStatus
        builder.addCase(updateTaskStatus.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            const taskId = action.payload.id;
            const isCompleted = action.payload.completed
            state.tasksArr = state.tasksArr.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: (isCompleted===true ? true:false) };
                }

                return task;
            });
        })
        builder.addCase(updateTaskStatus.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default tasksSlice.reducer;