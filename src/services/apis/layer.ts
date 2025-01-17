import { LAYERS } from "@/mock/layer"


export const getAll = async () => {
    // const res = await http.post('/admin/login', generateFormdata(payload))
    const res = await Promise.resolve({ data: LAYERS })
    return res.data
}

export const create = async (values: any) => {
    try {
        // const res = await http.post('/admin/login', generateFormdata(payload))
        const res = await Promise.resolve({ data: LAYERS })
        return { data: res.data }
    } catch (error) {
        return { data: {}, error }
    }
}