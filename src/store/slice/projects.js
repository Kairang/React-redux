import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: new Date().getTime(),
                name: action.payload.name
            })
        }
    }
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
