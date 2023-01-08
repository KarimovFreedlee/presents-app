import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPresent } from "./PresentReducer"

type TActionType = "delete" | "present"
type TAnimal = "Дикий Авимим"|"Смышлёная Юрамайя"|"Оранжевый Таларурус"|"Грациозная Иликура"|"Беспечная Ендайя" | string

export interface IAction {
    actionType: TActionType
    animal:  TAnimal
    presents: IPresent[]
}

export interface IinitialState {
    actions: IAction[]
    actionIndex: number
}

const initialState: IinitialState = {
    actions: [],
    actionIndex: -1
}

export const historySlice = createSlice({
    name: "present",
    initialState,
    reducers: {
        pushAction(state, actions: PayloadAction<IAction>) {
            state.actions.push(actions.payload)
        },
        setActionIndex(state, actions: PayloadAction<number>) {
            state.actionIndex = actions.payload
        }
    }
})

export default historySlice.reducer