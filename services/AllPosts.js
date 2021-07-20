const Posts = require ('../models/Posts')

const AllPosts = async (req, res, next) => {
    const body = req.body

    try {
        const result = await Posts.find({}, 'title text')

        const cleanResults = result.map(post => {
            return {
                title: post.title,
                text: post.text,
            }
        })

        res.send(result)
        next()
    } catch (e) {
        console.log(e)
        const err = new Error('Something has gone wrong')
        next(err)
    }
}

module.exports = AllPosts