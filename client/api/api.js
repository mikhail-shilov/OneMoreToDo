import * as axios from "axios";

export const DONE = 'done'
export const INPROGRESS = 'in progress'
export const BLOCKED = 'blocked'

const toDoApi = axios.create({
    baseURL: '/api/v1/'
});

const api = {
    loadTasks(category, timespan) {
        const url = `tasks/${category}${(typeof timespan !== 'undefined') ? `/${timespan}` : ''}`
        return toDoApi.get(url).then(data => {
            console.log(data.data)
            return data.data
        })
    },
    loadCategories() {
        return toDoApi.get(`categories/`).then(data => data.data.categories)
    },
    create(category, title) {
        return toDoApi.post(`tasks/${category}`, { title }).then(data => data.data.status)
    },
    patch(category, id, key, value) {
        return toDoApi.patch(`tasks/${category}/${id}`, { [key]: value }).then(data => data.data.status)
    },
    patchMass(category, id, objWithUpdate) {
        return toDoApi.patch(`tasks/${category}/${id}`, objWithUpdate).then(data => data.data.status)
    },
    delete(category, id) {
        return toDoApi.delete(`tasks/${category}/${id}`).then(data => data.data.status)
    }
}


export default api