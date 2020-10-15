const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  urlCode : String,
  longUrl : String,
  shortUrl : String,
  date : { type: String, default: Date.now() }
})

const Url = mongoose.model('url', urlSchema)

module.exports = Url