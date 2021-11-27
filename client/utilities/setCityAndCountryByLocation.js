import { GEOPIFY_API } from '@env'

export default async (location) => {
    var city, country
    await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&format=json&apiKey=${GEOPIFY_API}`)
        .then(response => response.json())
        .then(result => {
            city = result.results[0].city
            country = result.results[0].country
        })
        .catch(err => {
            console.log(err)
        })

        return {city: city, country: country}
}