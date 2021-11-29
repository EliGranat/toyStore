const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId





async function query(filterBy = {}) {
    console.log(filterBy);
    var criteria = (Object.keys(filterBy).length) ? _buildCriteria(filterBy) : {}
    try {
        var sortBy = {
            [`${filterBy.sortBy}`]: 1
        } || {}
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).sort(sortBy).toArray()
            // var toys = await collection.find(criteria).sort(sortBy).toArray()

        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.$or = [{
            name: txtCriteria
        }, ]
    }
    criteria.inStock = JSON.parse(filterBy.inStock)
    criteria.labels = { $in: filterBy.labels }
    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        const addedToy = await collection.insertOne(toy)
        return addedToy.ops[0]
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        const toyToUpdate = {
            ...toy,
            _id: ObjectId(toy._id)
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ "_id": toyToUpdate._id }, { $set: toyToUpdate })
        return toyToUpdate

    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}