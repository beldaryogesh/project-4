const urlModel = require("../models/urlModel");
const mongoose= require('mongoose');
const config = require('config');
const shortid= require('shortid');
const { default: validator } = require("validator");
const validUrl = require('valid-url');
const shorten = async function (req, res) {
    try{
        let host = "http:localhost:3000";
    const data = req.body;
    let longUrl=data.longUrl;
    //checking base url
    
    if(!validUrl.isUri(longUrl)) {
        return res
        .status(401)
        .send({ status: false, msg: "Invalid url" });
    }
    else {
        const urlCode= shortid.generate();
         const shortUrl= host + '/' + urlCode;
         data.urlCode=urlCode;
        data.shortUrl=shortUrl;
        
         
            let datafull={urlCode: urlCode,
                shortUrl: shortUrl,
                longUrl: longUrl};
                
            const createdURL = await urlModel.create(datafull);
            return res
            .status(200)
        .send({ status: true, data: data });

    }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

const getUrl = async function (req, res) {
    try {
      let urlCode = req.params.urlCode;
      const originalUrl = await urlModel
        .findOne({ urlCode: urlCode })
        .select({ longUrl: 1, _id: 0 });
  
      if (originalUrl) {
        res.redirect(originalUrl.longUrl);
      }
      if (!originalUrl) {
        return res.status(400).send({
          status: false,
          msg: "Url is not there!",
        });
      }
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.msg });
    }
  };
module.exports = {shorten, getUrl};