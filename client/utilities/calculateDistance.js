import { getDistance } from 'geolib'


export default (lat1,lng1,lat2,lng2) => {
    return getDistance(
        {latitude: lat1, longitude: lng1},
        {latitude: lat2, longitude: lng2}
    )
}