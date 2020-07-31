const router = require('express').Router()
const axios = require('axios')
const dotenv = require('dotenv')

// Config env
dotenv.config()

const uri = process.env.TMBD_BASE_URL
const apiKey = process.env.TMDB_API_KEY

router.get('/', async (req, res) => {
  const filter = req.query.filter || 'popular'
  await axios
    .get(uri + 'movie/' + filter, {
      params: {
        api_key: apiKey,
        page: req.query.page,
      },
    })
    .then((response) => {
      return res.status(200).send(response.data)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

router.get('/a/:mid', async (req, res) => {
  await axios
    .get(uri + 'movie/' + req.params.mid, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return res.send(response.data)
    })
    .catch((err) => {
      return res.status(400).send()
    })
})

router.get('/m/trending', async (req, res) => {
  await axios
    .get(uri + 'trending/movie/day', {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return res.status(200).send(response.data)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

router.get('/r/:mid', async (req, res) => {
  await axios
    .get(uri + 'movie/' + req.params.mid + '/recommendations', {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return res.status(200).send(response.data)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

router.get('/c/:mid', async (req, res) => {
  await axios
    .get(uri + 'movie/' + req.params.mid + '/reviews', {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return res.status(200).send(response.data)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

router.get('/s', async (req, res) => {
  await axios
    .get(uri + 'search/movie', {
      params: {
        api_key: apiKey,
        query: req.query.query_string,
        page: req.query.page,
        include_adult: true,
      },
    })
    .then((response) => {
      return res.status(200).send(response.data)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

module.exports = router
