const mongoose = require("mongoose");
const schema = mongoose.Schema;

const crudModel = new schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    summary: {
        type: String
    }
});

module.exports = mongoose.model("CrudModel", crudModel);