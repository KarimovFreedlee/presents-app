import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TSex = "male" | "female"

export interface IPresent {
    name: string,
    sex: TSex,
    age: string
}

interface ICount {
    [name: string]: number
}

export interface IAgeCount {
    female: {
        [age: number]: number
    },
    male: {
        [age: number]: number
    }
}

export interface IinitialState {
    presents: IPresent[],
    animalsCount: ICount,
    ageCount: IAgeCount
}

const initialState: IinitialState = {
    presents: [],
    animalsCount: {},
    ageCount: {
        female: {},
        male: {}
    }
}

export const presentSlice = createSlice({
    name: "present",
    initialState,
    reducers: {
        setAnimalsCount(state, action: PayloadAction<any>) {
            state.animalsCount = action.payload
        },
        pushToPresents(state, action: PayloadAction<IPresent>) {
            state.presents.push(action.payload)
        },
        setPresents(state, action: PayloadAction<IPresent[]>) {
            state.presents = action.payload
        },
        setAgeCount(state, action: PayloadAction<IAgeCount>) {
            state.ageCount = action.payload
        }
    }
})

export default presentSlice.reducer