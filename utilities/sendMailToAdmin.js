import axios from 'axios'

export default sendMailToAdmin = async (institute, addressed) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/admins.json`
    )

    const resData = await response.json()

    const Admin = await Object.entries(resData).find(admin => admin[1].institute === institute)
    const email = Admin[1].email

    axios.post(`http://${IP_ADDRESS}:8000/send-email`, {
        addressee: '',
        addressed: ''
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    
}