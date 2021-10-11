
export default findAdmin = async (institute, role) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/admins/${institute}/institute.json`
    )

    const resData = await response.json()

    console.log('FIND ADMIN : ' + institute)
    console.log(resData)

    if ((role === 'admin' && !resData) || (role !== 'admin' && resData)) {
        return
    }
    else if (role !== 'admin' && !resData) {
        throw new Error(`Your academic institue, ${institute} did not registered to app services.`)
    }
    else if (role === 'admin' && resData) {
        throw new Error(`An admin for ${institute} already exists.`)
    }
}