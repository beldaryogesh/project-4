const urlModel = require("../models/urlModel");
const mongoose= require('mongoose');
const config = require('config');
const shortid= require('shortid');
const { default: validator } = require("validator");
const validUrl = require('valid-url');
const shorten = async function (req, res) {
    try{
        let host = "http:localhost:3000";
    const longUrl = req.body;
    const baseUrl= host;

    //checking base url
    if(validUrl.isUri(longUrl)) {
        return res
        .status(401)
        .send({ status: false, msg: "Invalid url" });
    }
    else {
        const urlCode= shortid.generate();
         const shortUrl= baseUrl + '/' + urlCode;
            let data={urlCode: urlCode,
                shortUrl: shortUrl,
                longUrl: longUrl};
            const createdURL = await urlModel.create(data);
            return res
            .status(200)
        .send({ status: true, data: data });

    }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports = {shorten};