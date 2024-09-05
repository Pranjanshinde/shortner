const mongoose=require("mongoose");

const Urlschema=  mongoose.Schema({
    originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }

});

const UrlModel=mongoose.model("url",Urlschema);

module.exports={UrlModel};