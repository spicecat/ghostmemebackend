const Posts = require ('../models/Posts')

const UpdatePost = async (req, res, next) => {
    const deletedId = req.query.id

    try {
        const result = await Posts.deleteOne({ _id: deletedId })

        res.send(result)
        next()
    } catch (e) {
        console.log(e)
        const err = new Error('Something has gone wrong')
        next(err)
    }
}

module.exports = UpdatePost
