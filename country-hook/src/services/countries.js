import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = query => {
    const countryUrl = baseUrl + String(query).toLowerCase()
    console.log(countryUrl)
    const response = axios
        .get(countryUrl)
            .then(res => res.data)
    return response
}

export default { getCountry }