import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: '',
    token: ''
}

export const popupSlice=createSlice({
    name: 'contactInfo',
    initialState,
    reducers: {
        setID: (state,action)=>{
            state.id=action.payload
        },
        setToken: (state,action)=>{
            state.token=action.payload
        }
    }
})

export const { setID, setToken } = popupSlice.actions;

export default popupSlice.reducer;