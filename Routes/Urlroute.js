const express = require('express');
const shortid = require('shortid');
const {UrlModel}=require("../Models/Urlmodels");

const urlrouter = express.Router();

urlrouter.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    console.log(originalUrl);
    // Check if the original URL is valid
    if (!originalUrl) {
      return res.status(400).json('Invalid URL');
    }
  
    try {
      let url = await UrlModel.findOne({ originalUrl });
   
  
      // If the URL already exists, return it
      if (url) {
        return res.json(url);
      }
  
      // Generate short ID and construct the short URL
      const shortUrl = shortid.generate();
      const newUrl = new UrlModel({ originalUrl, shortUrl });
  
      await newUrl.save();
      res.json(newUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });

  urlrouter.get('/:shortUrl', async (req, res) => {
    try {
      const url = await UrlModel.findOne({ shortUrl: req.params.shortUrl });
  
      if (url) {
        return res.redirect(url.originalUrl);
      } else {
        return res.status(404).json('No URL found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });

  module.exports={urlrouter};