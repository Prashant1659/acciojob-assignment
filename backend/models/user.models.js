import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model('user',userSchema);