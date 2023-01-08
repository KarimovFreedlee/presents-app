import {useEffect, useState} from 'react'
import "../componentsView/Present.scss"
import { historySlice, IAction } from '../store/reducers/HistoryReducer'
import { IPresent, presentSlice, TSex } from '../store/reducers/PresentReducer'
import { useAppDispatch, useAppSelector } from '../store/store'

export default function Present() {
    //redux const
    const dispatch = useAppDispatch()
    const {pushToPresents, setPresents, setAnimalsCount, setAgeCount} = presentSlice.actions
    const {pushAction, setActionIndex} = historySlice.actions
    const presents = useAppSelector(state => state.PresentReducer.presents)
    const actionsHistory = useAppSelector(state => state.HistoryReducer.actions)
    const actionIndex = useAppSelector(state => state.HistoryReducer.actionIndex)
    //useState const
    const [animals] = useState<string[]>(["Дикий Авимим", "Смышлёная Юрамайя", "Оранжевый Таларурус", "Грациозная Иликура", "Беспечная Ендайя"])
    const [animal, setAnimal] = useState<string>(animals[0])
    const [age, setAge] = useState<string>("0")
    const [sex, setSex] = useState<TSex>("male")

    const mainClass = "present"
    const headerClass = `${mainClass}__header`
    const radioClass = `${mainClass}__radio`
    const inputClass = `${mainClass}__input`
    const dropdownClass = `${mainClass}__dropdown`
    const itemsClass = `${mainClass}__items`

    useEffect(() => {
        const newCount: any = {}
        if(actionsHistory.length > 0)
            actionsHistory[actionIndex].presents.forEach(function(i) { newCount[i.name] = (newCount[i.name]||0) + 1;});
        dispatch(setAnimalsCount(newCount))
    },[actionIndex])

    useEffect(() => {
        const newCount: any = {}
        if(actionsHistory.length > 0)
            actionsHistory[actionIndex].presents.forEach(function(i) {
                newCount[i.sex] = {
                    ...newCount[i.sex],
                }
                newCount[i.sex][i.age] = (newCount[i.sex][i.age]||0) + 1
            });
        dispatch(setAgeCount(newCount))
    },[actionIndex])

    function handleSubmit() {
        const newPresent = {
            name: animal,
            sex: sex,
            age: age
        }
        const newAction: IAction = {
            actionType: "present",
            animal: animal,
            presents: [...presents, newPresent]
        }
        dispatch(pushToPresents(newPresent))
        dispatch(pushAction(newAction))
        dispatch(setActionIndex(actionsHistory.length))
    }

    function handleAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setAge(e.target.value)
    }
    
    function handleAnimalChange(e: any) {
        e.preventDefault()
        setAnimal(e.target.value)
    }

    function deletePresent(index: number) {
        const newPresentsArr: IPresent[] = [...presents]
        newPresentsArr.splice(index, 1)
        const newAction: IAction = {
            actionType: "delete",
            animal: presents[index].name,
            presents: newPresentsArr
        }
        dispatch(setPresents(newPresentsArr))
        dispatch(pushAction(newAction))
        dispatch(setActionIndex(actionsHistory.length))
    }

    return (
        <div className={`${mainClass} element`}>
            <h2>Подарить подарок</h2>
            <div className={headerClass}>
                <select name="animals" className={dropdownClass} onChange={handleAnimalChange}>
                    {animals.map((item, key) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
                <input name="sex" type="radio" onClick={() => setSex("male")} className={radioClass}/>
                <p>M</p>
                <input name="sex" type="radio" onClick={() => setSex("female")} className={radioClass}/>
                <p>Ж</p>
                <input type="number" placeholder="Укажите возраст" className={inputClass} onChange={handleAgeChange}/>
                <button className="btn" onClick={handleSubmit}>Добавить</button>
            </div>
            <h2>Список подарков:</h2>
            <div className={itemsClass}>
                {presents.map((item, key) => {
                    return <div className="item" key={crypto.randomUUID()}>
                        <div className="item item-header">
                            {item.name} 
                            <button className="btn-delete" onClick={() => deletePresent(key)}>Удалить</button>
                        </div>
                        <div className='item-body'>
                            <p>
                                Пол: {item.sex}
                            </p>
                            <p>
                                Возраст: {item.age} 
                            </p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
