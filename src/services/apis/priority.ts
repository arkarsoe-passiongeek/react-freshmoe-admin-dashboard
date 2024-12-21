import { data } from "@/mock/priority"

export const getAll = async () => {
    // const res = await http.post('/admin/login', generateFormdata(payload))
    const res = await Promise.resolve({ data: data })
    return res.data
}

export const create = async (values: any) => {
    try {
        // const res = await http.post('/admin/login', generateFormdata(payload))
        const res = await Promise.resolve({ data: data })
        return { data: res.data }
    } catch (error) {
        return { data: {}, error }
    }
}