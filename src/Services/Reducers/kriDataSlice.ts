import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface KriData {
    id: string;
    data: any; 
  }

  interface KriState {
    KriDropDownData: KriData[];
    KriMetricData: KriData[]; 
    finalData: KriData[]; 
  }
  
  const initialState: KriState = {
    KriDropDownData: [],
    KriMetricData: [],
    finalData:[],
  };
export const kriDataSlice = createSlice({
    name:"kri",
    initialState,
    reducers:{
        addKriDDData:(state,action)=>{
            const Kri = {
                id: uuidv4(),
                data: action.payload,
            }
            state.KriDropDownData.length>0 ? state.KriDropDownData.pop(): "";
            state.KriDropDownData.push(Kri);

        },
        removeKriDDData:(state,action)=>{
            state.KriDropDownData = state.KriDropDownData.filter((kri) =>
            kri.id !== action.payload)
        },
        addKrimetrics:(state,action)=>{
            const Kri = {
                id: uuidv4(),
                data: action.payload,
            }
            state.KriMetricData.push(Kri)
        },
        removeKrimetric:(state,action)=>{
            state.KriMetricData = state.KriMetricData.filter((kri) =>
            kri.id !== action.payload)
        },
        finalKriData:(state,action)=>{
            const Kri = {
                id: uuidv4(),
                data: action.payload,
            }
            state.finalData.push(Kri);

        },
        removeFinalKriData:(state,action)=>{
            state.finalData = state.finalData.filter((kri) =>
            kri.id !== action.payload)
        },
    }
})


export const {addKriDDData,removeKriDDData,addKrimetrics,removeKrimetric,finalKriData,removeFinalKriData} = kriDataSlice.actions
export default kriDataSlice.reducer