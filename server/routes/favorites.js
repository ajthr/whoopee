// Import Packages
const router = require('express').Router()
const axios = require('axios')
const dotenv = require('dotenv')

// Config env
dotenv.config()

const uri = process.env.TMBD_BASE_URL
const apiKey = process.env.TMDB_API_KEY

// Import Models
const User = require('../models/user')
const Fav = require('../models/favorite')

router.get('/', async (req, res) => {
  try {
    let error = null
    let movies = []
    const user = await User.find({ _id: req.query.id })
    const fav = await Fav.find({ user: user }, 'movie')
    const getData = async () => {
      for (const favData of fav) {
        await axios
          .get(uri + 'movie/' + favData.movie, {
            params: {
              api_key: apiKey,
            },
          })
          .then((response) => {
            movies.push(response.data)
          })
          .catch((err) => {
            error = err
          })
      }
    }
    getData().then(() => {
      return res.status(200).send(movies)
    })
  } catch (err) {
    return res.status(400).send(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const pairExists = await Fav.find({
      user: req.body.id,
      movie: req.body.mid,
    })

    if (pairExists[0]) {
      await Fav.findOneAndDelete({ _id: pairExists[0]._id })
      return res.status(202).send()
    } else {
      const fav = new Fav({
        user: req.body.id,
        movie: req.body.mid,
      })
      await fav.save()
      return res.status(201).send()
    }
  } catch (err) {
    return res.status(400).send(err)
  }
})

module.exports = router
