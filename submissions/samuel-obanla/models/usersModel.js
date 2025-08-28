const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        booksCreated: { type: [mongoose.Schema.Types.ObjectId], ref: "books" },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)


const OTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});


usersSchema.methods.generateOTP = async function() {

    const otp = Math.floor(100000 + Math.random() * 900000);
    await mongoose.model('otp').findOneAndUpdate(
        { userId: this._id },
        { 
            userId: this._id,
            otp: otp.toString()
        },
        { upsert: true, new: true }
    );

    return otp;
};


usersSchema.methods.verifyOTP = async function(otpToVerify) {
    const otpDoc = await mongoose.model('otp').findOne({ 
        userId: this._id,
        otp: otpToVerify
    });

    if (!otpDoc) {
        return false;
    }

    await Promise.all([
        mongoose.model('users').findByIdAndUpdate(
            this._id,
            { isVerified: true }
        ),
        mongoose.model('otp').deleteOne({ _id: otpDoc._id })
    ]);

    return true;
};

const users = mongoose.model("users", usersSchema)
const otp = mongoose.model("otp", OTPSchema)

module.exports = { users, otp }