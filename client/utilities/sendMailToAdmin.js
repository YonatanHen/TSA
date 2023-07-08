import { SERVER_URL, DATABASE_URL } from '@env'
import axios from 'axios'

export default sendMailToAdmin = async (institute, addressed, name, content) => {
    const response = await fetch(
        `${DATABASE_URL}/users/admins.json`
    )

    const resData = await response.json()

    const Admin = await Object.entries(resData).find(admin => admin[1].institute === institute)
    const addressee = Admin[1].email

    axios.post(`${SERVER_URL}/send-email`, {
        addressee: addressee,
        addressed: addressed,
        name: name,
        content: content
    })
        .then(res => console.log(res))
        .catch(err => { console.log(err) })



    return

}