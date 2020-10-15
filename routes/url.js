const express = require('express')
const config = require('config')
const validUrl = require('valid-url')
const router = express.Router()
const Url = require('../models/Url')
const shortid = require('shortid')

// @route POST /url/shorten
// @desc create short url
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = config.get('baseUrl')

  // cek baseUrl
  if(!validUrl.isUri(baseUrl)) {
    return res.status(401).json('domain tidak valid')
  }

  // create url code
  const urlCode = shortid.generate()

  if(validUrl.isUri(longUrl)){
    try {
      let url = await Url.findOne({longUrl})

      if(url){
        res.json(url)
      }else{
        const shortUrl = baseUrl + '/' + urlCode

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        })

        await url.save()

        res.json(url)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json('server error')
    }
  }else {
    res.status(401).json('link tidak valid')
  }
})

module.exports = router