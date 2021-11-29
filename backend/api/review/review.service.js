const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log(filterBy, 'id');

    try {

        const criteria = (Object.keys(filterBy).length) ? _buildCriteria(filterBy) : {}
            // console.log(criteria, 'objId');
        const collection = await dbService.getCollection('review')
        var reviews = await collection.find(criteria).toArray()
        console.log(reviews, 'hello');
        reviews = await collection.aggregate([{
                $match: criteria
            },
            {
                $lookup: {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup: {
                    localField: 'aboutToyId',
                    from: 'toys',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutToy = { _id: review.aboutToy._id, name: review.aboutToy.name }
            delete review.byUserId
            delete review.aboutToyId
            return review
        })
        console.log(reviews, 'reviews');
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
            // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        const addReview = await collection.insertOne(reviewToAdd)
        return addReview.ops[0]
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = { "aboutToyId": ObjectId(filterBy.id) }
    return criteria
}

module.exports = {
    query,
    remove,
    add
}