import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    // input-field value is in variable event.target.filter.value
    event.preventDefault()
    dispatch(filterChange(event.target.value))
  }

  return (
    <div style={style}>
        filter
        <input 
        onChange={handleChange}
        />
    </div>
  )
}

export default Filter