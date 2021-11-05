import Data from '../data/countriesData'

export default (countryName) => {
    return Data.find(country => country["country_name"] === countryName)["phone_code"]
}