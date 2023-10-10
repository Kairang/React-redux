import store from "./store/configureStore";
import { loadBugs, addBug, resolveBug, addBugToUser } from "./store/slice/bugs";

store.dispatch(loadBugs());
// store.dispatch(addBug({ description: 'New bug added' }));
// store.dispatch(addBugToUser({ bugId: 2, userId: 3 }));

setTimeout(() => store.dispatch(resolveBug(3)), 2000);
setTimeout(() => store.dispatch(addBugToUser(4, 1)), 2000);