import { useState, useEffect } from "react"
import countryService from "../services/countries" 

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      countryService
        .getCountry(name)
          .then(res => {
            console.log(res)
            setCountry({
              found: true,
              data: res
            })
          })
          .catch(error => {
            setCountry({
              found: false,
              data: null
            })
          })
    }
  }, [name])

  return country
}