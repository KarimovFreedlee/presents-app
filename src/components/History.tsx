import { useAppSelector } from '../store/store'
import "../componentsView/History.scss"
import { useDispatch } from 'react-redux'
import { historySlice } from '../store/reducers/HistoryReducer'

export default function History() {
  const actionsHistory = useAppSelector(state => state.HistoryReducer.actions)
  const {setActionIndex} = historySlice.actions

  const dispatch = useDispatch()
  
  function handleClick(index: number) {
    dispatch(setActionIndex(index))
  }

  return (
    <div className="history element">
      <h2>История действий:</h2>
      <div className="history__items">
        {actionsHistory.map((item, key) => {
          return <div className='item' key={key}>
            [{item.actionType}] {item.animal}
            <button className="btn" onClick={() => handleClick(key)}>Вернуться</button>
          </div>
        })}
      </div>
    </div>
  )
}
