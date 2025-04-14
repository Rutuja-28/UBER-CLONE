const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname: {
           type: String,
           required: true 
        },
        lastname: {
            type: String,
        },
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socetId:{
        type: String,
    },
    status:{
        type: String,
        status:[ 'active', 'inactive' ],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3]
        },
        plate:{
            type: String,
            required: true,
            minlength: [3]
        },
        capacity:{
            type: Number,
            required: true,
            minlength: [1]
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type:Number
        }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel;
