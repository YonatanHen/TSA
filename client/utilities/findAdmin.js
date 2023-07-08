
import { DATABASE_URL } from '@env'

export default findAdmin = async (institute, role) => {
    const response = await fetch(
        `${DATABASE_URL}/users/admins.json`
    )

    const resData = await response.json()
    if (resData !== null) {
        const isAdmin = [...Object.entries(resData)].filter(admin => admin[1].institute === institute)
        const isExist = isAdmin.length > 0

        if ((role === 'admin' && !isExist) || (role !== 'admin' && isExist)) {
            return
        }
        else if (role !== 'admin' && !isExist) {
            throw new Error(`Your academic institue, ${institute} did not registered to app services.`)
        }
        else if (role === 'admin' && isExist) {
            throw new Error(`An admin for ${institute} already exists.`)
        }
    }
}