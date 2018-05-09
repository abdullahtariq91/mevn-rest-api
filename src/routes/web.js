const express = require('express')

const router = express.Router()

//send back the index.html containing the Vue Application
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../public/index.html'))
})

module.exports = router
