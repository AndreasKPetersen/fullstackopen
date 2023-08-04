import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
        <input 
        name="filter" 
        onChange={(event) => dispatch(filterChange(event.target.filter))}
        />
    </div>
  )
}

export default VisibilityFilter