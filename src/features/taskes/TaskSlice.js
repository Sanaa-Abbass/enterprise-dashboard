import { createSlice } from "@reduxjs/toolkit";


const getDefaultState = () => ({
  columns: {
    todo: {
      title: "To Do",
      tasks: [],
    },
    inprogress: {
      title: "In Progress",
      tasks: [],
    },
    done: {
      title: "Done",
      tasks: [],
    },
  },
});

const initialState = getDefaultState(); 



const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask : (state, action) => {
        const {columnId, task}= action.payload;
        state.columns[columnId].tasks.push(task);

    }, 

    deleteTask : (state, action) => {
        const {columnId, taskId} = action.payload;
        state.columns[columnId].tasks = 
            state.columns[columnId].tasks.filter(
            (task) => task.id !== taskId
            );
    },


     moveTask: (state, action) => {
      const { source, destination } = action.payload;

      const sourceColumn  = state.columns[source.droppableId];
      const destinationColumn  = state.columns[destination.droppableId];

      // Remove task from source column
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

      destinationColumn.tasks.splice(destination.index, 0, movedTask);
    },

    extraReducers: (builder) => {},



  },

   
});



export const { addTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;