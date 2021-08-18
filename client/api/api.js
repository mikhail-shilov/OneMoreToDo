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
        toDoApi.post(`tasks/${category}`, { title }).then(data => data.data.status)
    },
    patch(category, id, key, value) {
        toDoApi.patch(`tasks/${category}/${id}`, { [key]: value }).then(data => data.data.status)
    },
    patchMass(category, id, update) {
        toDoApi.patch(`tasks/${category}/${id}`, update).then(data => data.data.status)
    },
    delete(category, id) {
        toDoApi.delete(`tasks/${category}/${id}`).then(data => data.data.status)
    }
}


export default api