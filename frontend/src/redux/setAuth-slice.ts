import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type DataType = { id?: number; name?: string; surname?: string }

type Data = {
  value: DataType
}

const initialState: Data = {
  value: {},
}

const setAuthSlice = createSlice({
  name: "@@setAuth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<DataType>) => {
      state.value = action.payload
    },
  },
})

export default setAuthSlice.reducer
export const { setAuth } = setAuthSlice.actions
