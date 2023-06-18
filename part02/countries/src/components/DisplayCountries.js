import Weather from './Weather';

const DisplayCountries = ( {filter, countriesToDisplay, setCountriesToDisplay} ) => {

    const countriesDisplayCount = countriesToDisplay.length

    if (filter.length === 0) {
        return (
            <div>
                Specify a filter
            </div>
        )
    }

    else if (countriesDisplayCount === 1) {
        
        const countryData = countriesToDisplay[0]

        return (
            <div>
                <h1>{countryData.name.common}</h1>
                <p>capital {countryData.capital}</p>
                <p>area {countryData.area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.values(countryData.languages).map(language => {
                        return (
                            <li key={language}>{language}</li>
                        )
                    })
                    }
                </ul>

                <img src={countryData.flags.png} alt={countryData.flags.alt}></img>

                <Weather capital={countryData.capital} />
                
            </div>
        )
    }

    else if (countriesDisplayCount > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    else {
        return (
            <div>
                {countriesToDisplay.map(countryToDisplay => 
                    <div key={countryToDisplay.name.common}>
                        {countryToDisplay.name.common} &nbsp;
                        <button onClick={ () => setCountriesToDisplay([countryToDisplay]) }>show</button>
                    </div>
                )}
            </div>
        )
    }
}

export default DisplayCountries