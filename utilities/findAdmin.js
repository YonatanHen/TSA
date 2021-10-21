
export default findAdmin = async (institute, role) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/admins.json`
    )

    const resData = await response.json()

    const isAdmin = [...Object.entries(resData)].filter(admin => admin[1].institute === institute)
    const isExist = isAdmin !== []

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