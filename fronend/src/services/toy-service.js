// const axios = require('axios');
import { httpService } from './http.service'
import { utilService } from './util.service.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

// import Axios from 'axios'
// var axios = Axios.create({ withCredentials: true })
// function _getUrl(id = '') {
//     const BASE_URL = (process.env.NODE_ENV !== 'development') ?
//         '/api/toy' :
//         'http://localhost:3030/api/toy'
//     return `${BASE_URL}/${id}`
// }
export const toyService = {
        query,
        getById,
        remove,
        save,
        getEmptyToy
    }
    // updateArray()

function updateArray() {
    query([])
    .then(toys=>{
        toys.forEach(toy => {
                toy.createdAt = utilService.getRandomInt(Date.now() - 100000000, Date.now())
                save(toy)
                    .then(CurrToy => {
                            console.log('update success', CurrToy);
                        })
                })
            })
}

async function query(filterBy) {
    const labels = [
        "On wheels",
        "Box game",
        "Art",
        "Baby",
        "Doll",
        "Puzzle",
        "Outdoor"
    ]
    if (!filterBy.labels.length) filterBy.labels = labels
    try {
        const toys = await httpService.get('toy',filterBy)
        console.log(toys);
        return toys
    } catch (err) {
        throw err
    }
}



async function getById(toyId) {
    try {
        const toy = await httpService.get(`toy/${toyId}`)
        return toy
    } catch (err) {
        throw err
    }
}

async function save(toy) {
    const savedToy = (toy._id) ? await updateToy(toy) : await addToy(toy)
    return savedToy;
}

async function addToy(toy) {
    try {
        const newToy = await httpService.post('toy/', toy)
        return newToy
    } catch (err) {
        throw err
    }

}

async function updateToy(updateToy) {
    try {
        const upToy = await httpService.put(`toy/${updateToy._id}`, updateToy)
        return upToy
    } catch (err) {
        throw err
    }
}

async function remove(toyId) {
    try {
        await httpService.delete(`toy/${toyId}`)
    } catch (err) {
        throw err
    }
}

// function changeFilterSelect(newFilter) {
//     const labels = { "On wheels": false, "Box game": false, "Art": false, "Baby": false, "Doll": false, "Puzzle": false, "Outdoor": false }
//     newFilter.labels.forEach(label => labels[label] = true)
//     return labels
// }

// function isSameLabels(objFilterBy, arrayUserDefult) {
//     for (const keyFilter in objFilterBy) {
//         if (objFilterBy[keyFilter]) {
//             const isContain = arrayUserDefult.some((oneDefultUser => {
//                 return keyFilter === oneDefultUser
//             }))
//             if (isContain) {
//                 return true
//             }
//         }
//     }
//     return false
// }

function getEmptyToy(name = '', price = null) {
    const newToy = {
        "name": "",
        "description": "problem when clicking Save",
        "price": "",
        "labels": [],
        "createdAt": Date.now(),
        "inStock": true,
        "creator": {
            "_id": "xyz111",
            "name": "Shahar"
        },
        "img": utilService.getRandomInt(1, 12)
    }
    newToy.name = name
    newToy.price = price
    return newToy
}