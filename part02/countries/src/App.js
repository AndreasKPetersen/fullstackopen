import { useState, useEffect } from 'react';
import axios from 'axios'

import DisplayCountries from './components/DisplayCountries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToDisplay, setCountriesToDisplay] = useState([])


  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setFilter(filterValue)
    setCountriesToDisplay(countries.filter(country =>
      country.name.common.includes(filterValue)
    ))
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <DisplayCountries filter={filter} countriesToDisplay={countriesToDisplay} setCountriesToDisplay={setCountriesToDisplay} />
    </div>
    
  )
}

export default App