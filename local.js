const app = require('./server'), { port } = require('./var')

app.listen(port, console.log('listening at port:', port))