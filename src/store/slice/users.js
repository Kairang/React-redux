import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                username: action.payload,
            })
        }
    }
});

export const { userAdded, assignBug } = slice.actions;
export default slice.reducer;
