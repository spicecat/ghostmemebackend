const Posts = require ('../models/Posts')

const UpdatePost = async (req, res, next) => {
    const updatedId = req.query.id
    const body = req.body

    try {
        console.log(updatedId, body)
        const result = await Posts.updateOne({ _id: updatedId }, body)

        res.send(result)
        next()
    } catch (e) {
        console.log(e)
        const err = new Error('Something has gone wrong')
        next(err)
    }
}

module.exports = UpdatePost