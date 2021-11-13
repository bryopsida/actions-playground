const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const resp = {
        "message": req.query.message
    }
  res.json(resp);
})

const server = app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`)
})

const close = () => {
    server.close(() => {
        console.log('HTTP server closed')
    })
}

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    close()
})

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server')
    close()
})