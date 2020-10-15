const express = require('express')
const router = express.Router()

const Url = require('../models/Url')

// @route GET /:code
// @desc redirect to original url
router.get('/:code', async (req,res) => {
  try {
    const url = await Url.findOne({urlCode: req.params.code})

    if(url){
      return res.redirect(url.longUrl)
    }else{
      return res.status(404).json('url tidak ditemukan')
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('server error')
  }
})

module.exports = router