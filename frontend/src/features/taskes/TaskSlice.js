import { createSlice } from "@reduxjs/toolkit";

const getDefaultState = () => ( {
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

    setTasks: (state, action) => {
      const tasks = action.payload;

      // clear old tasks
      state.columns.todo.tasks = [];
      state.columns.inprogress.tasks = [];
      state.columns.done.tasks = [];

      // distribute tasks
      tasks.forEach((task) => {
        if (state.columns[task.status]) {
          state.columns[task.status].tasks.push(task);
        }
      });
    },

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
      const {
        sourceColumn,
        destinationColumn,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      const sourceTasks =
        state.columns[sourceColumn].tasks;

      const destinationTasks =
        state.columns[destinationColumn].tasks;

      const [movedTask] = sourceTasks.splice(
        sourceIndex,
    1
      );

      movedTask.status = destinationColumn;

      destinationTasks.splice(
        destinationIndex,
        0,
        movedTask
      );
},


    updateTask: (state, action) => {
      const { columnId, updatedTask } = action.payload;

      const column = state.columns?.[columnId];

      // 🛡️ HARD SAFETY CHECK
      if (!column) {
        console.error("Invalid columnId:", columnId);
        return;
      }

      if (!Array.isArray(column.tasks)) {
        console.error("Tasks missing in column:", columnId);
        column.tasks = []; // auto-fix broken state
      }

      const index = column.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );

      if (index !== -1) {
        column.tasks[index] = updatedTask;
      }
    },

    extraReducers: (builder) => {},



  },

   
});



export const { addTask, deleteTask, updateTask, moveTask, setTasks, } = taskSlice.actions;
export default taskSlice.reducer;