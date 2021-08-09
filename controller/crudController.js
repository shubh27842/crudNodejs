const crudDb = require("../model/crudModel");
const mongoose = require("mongoose");

exports.getData = async(req,res) => {
    try { 
        const data = await crudDb.find();
        res.status(200).json(data);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

exports.createData = async(req,res) => {
    console.log(req.body);
    const newData = new crudDb({
        name:req.body.name,
        img:req.body.img,
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
        res.status(404).json({message: error.message});
    }
}

exports.updateData = async(req,res) => {
    console.log(req.body);
    const name = req.body.name;
    try { 
        await crudDb.findOneAndUpdate({name: name},{
            $set: {
                name: req.body.name,
                img: req.body.img,
                summary: req.body.summary
              }
        }).then(res => {
            res.status(201).json({"updated Data":res});
        }).catch(err=> console.log(err));
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

exports.deleteData = async(req,res) => {
    console.log(req.body);
    console.log(req.params);
    const name = req.body.name;
    try { 
        const result = await crudDb.deleteOne({name: name})
        res.status(201).json({"Deleted Data":result});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}