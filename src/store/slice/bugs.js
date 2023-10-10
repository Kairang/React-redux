import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from 'moment';
import { apiCallBegin } from "../api";

let initialState = {
    list: [],
    loading: false,
    lastFetch: null,
};

const slice = createSlice({
    name: "bugs",
    initialState,
    reducers: {
        bugRequested: (bugs, _) => {
            bugs.loading = true;
        },
        bugReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugRequestFailed: (bugs, _) => {
            bugs.loading = false;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
            bugs.loading = false;
        },
        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex((bug) => bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        bugRemoved: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
            bugs.list.splice(index, 1);
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
    },
});

const {
    bugAdded,
    bugRemoved,
    bugResolved,
    bugAssignedToUser,
    bugReceived,
    bugRequested,
    bugRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creator
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    if (diffInMinutes < 10) return; // Trong vong 10p se k goi lai api

    dispatch(apiCallBegin({
        url,
        onStart: bugRequested.type,
        onSuccess: bugReceived.type,
        onError: bugRequestFailed.type,
    }));
};

export const addBug = bug => apiCallBegin({
    url,
    method: 'post',
    data: bug,
    onStart: bugRequested.type,
    onSuccess: bugAdded.type,
    onError: bugRequestFailed.type,
});

export const addBugToUser = (bugId, userId) => apiCallBegin({
    url: `${url}/${bugId}`,
    method: 'patch',
    data: { userId },
    onStart: bugRequested.type,
    onSuccess: bugAssignedToUser.type,
    onError: bugRequestFailed.type,
});

export const resolveBug = id => apiCallBegin({
    url: `${url}/${id}`,
    method: 'patch',
    data: { resolved: true },
    onStart: bugRequested.type,
    onSuccess: bugResolved.type,
    onError: bugRequestFailed.type,
});

// Memoizing Selectors with Reselect
const selectBugs = (state) => state.entities.bugs;

export const getUnresolvedBugs = createSelector(selectBugs, (bugs) =>
    bugs.list.filter((bug) => !bug.resolved)
);
export const getBugsByUser = (userId) =>
    createSelector(selectBugs, (bugs) =>
        bugs.list.filter((bug) => bug.user === userId)
    );
