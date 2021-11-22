import envs from '../config/env'
import axios from 'axios'

const { IP_ADDRESS } = envs

export default sendMailToAdmin = async (institute, addressed, name, content) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/admins.json`
    )

    const resData = await response.json()

    const Admin = await Object.entries(resData).find(admin => admin[1].institute === institute)
    const addressee = Admin[1].email

    axios.post(`http://${IP_ADDRESS}:8000/send-email`, {
        addressee: addressee,
        addressed: addressed,
        name: name,
        content: content
    })
        .then(res => console.log(res))
        .catch(err => { console.log(err) })



    return

}