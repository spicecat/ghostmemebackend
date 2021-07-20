const Posts = require ('../models/Posts')

const CreatePost = async (req, res, next) => {
    const body = req.body

    try {
        const result = await Posts.create(body)

        res.send(result)
        next()
    } catch (e) {
        console.log(e)
        const err = new Error('Something has gone wrong')
        next(err)
    }
}

module.exports = CreatePost