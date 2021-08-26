const crudDb = require("../model/crudModel");
const mongoose = require("mongoose");

exports.getData = async(req,res) => {
    try { 
        const data = await crudDb.find();
        res.status(200).json(data);
    } catch(error) {
        console.log("ERROR:", error.message);
    }
}


exports.createData = async(req,res) => {
    console.log(req.body);
    const newData = new crudDb({
        name:req.body.name,
        img:req.file.filename,
        summary:req.body.summary
    })
    try { 
        let dataPresent = await crudDb.find({ name: newData.name })
        console.log(dataPresent)
        if(dataPresent && dataPresent.length){
            res.status(400).send("data already present")
        }else{
            const result = await crudDb(newData).save();
            res.status(201).json({"Created Data": result});
        }
    } catch(error) {
        console.log("ERROR:", error.message);
    }
}

exports.updateData = async(req,res) => {
    console.log(req.body,req.query);
    const name = req.body.name;
    const id = req.query.id;
    try { 
        await crudDb.findByIdAndUpdate(id, {
                name: req.body.name,
                img: req.body.img,
                summary: req.body.summary
              }
        ).then(result => {
            res.status(201).json({"updated Data":result});
        }).catch(err=> console.log(err));
    } catch(error) {
        console.log("ERROR:", error.message);
    }
}

exports.deleteData = async(req,res) => {
    const id = req.query.id;
    try { 
        const result = await crudDb.findOneAndDelete({_id: id})
        res.status(201).json({"Deleted Data":result});
    } catch(error) {
        console.log("ERROR:", error.message);
    }
}

