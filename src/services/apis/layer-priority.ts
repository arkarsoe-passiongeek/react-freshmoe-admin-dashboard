import { http } from "@/lib/http"
import { generateFormdata } from "@/lib/utils"
import { data } from "@/mock/layer-priority"

export const create = async (payload: { name: string }) => {
    try {
        const res = await http.post('/admin/login', generateFormdata(payload))
        return { data: res.data }
    } catch (error) {
        return { data: {}, error }
    }
}

export const get = async (payload: { id: string }) => {
    try {
        // const res = await http.post('/admin/login', generateFormdata(payload))
        const res = await Promise.resolve({ data: data.filter((each: any) => payload.id === each.id)[0] })
        return { data: res.data }
    } catch (error) {
        return { data: {}, error }
    }
}

export const getAll = async (payload: { query: { layer: string, src: string } }) => {
    try {
        // const res = await http.post('/admin/login', generateFormdata(payload))
        const res = await Promise.resolve({
            data: data.filter((each: any) => {
                if (payload.query.layer === each.layer.id) {
                    if (payload.query.src) {
                        if (payload.query.src === each.parent) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                }
            }
            )
        })
        return { data: res.data }
    } catch (error) {
        return { data: {}, error }
    }
}