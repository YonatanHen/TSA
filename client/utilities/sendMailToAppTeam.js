import { IP_ADDRESS, DEVELOPMENT_TEAM_EMAIL } from '@env'
import axios from 'axios'

export default sendMailToAppTeam = (addressed, name, content) => {

    axios.post(`https://tsa-server1.herokuapp.com/send-email`, {
        addressee: DEVELOPMENT_TEAM_EMAIL,
        addressed: addressed,
        name: name,
        content: content
    })
        .then(res => console.log(res))
        .catch(err => { console.log(err) })

    return
}