export const getUser = async () => {
    try {
        const res = await Promise.resolve({
            data: {
                username: 'mgmg', email: 'admin@gmail.com'
            }
        })
        return { data: { data: res.data } }
    } catch (error: any) {
        return error.status
    }
}