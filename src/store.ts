import { configureStore } from "@reduxjs/toolkit"
import compoundsReducer from "./features/compoundsSlice"
import reactionsReducer from "./features/reactionsSlice"

const store = configureStore({
  reducer: {
    compounds: compoundsReducer,
    reactions: reactionsReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
