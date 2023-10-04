import mongoose, {Schema} from "mongoose";

export interface DoctorInstance{
    name: string,
    email: string,
    password: string,
    specialization: string,
    gender: string,
    phone: string
}

const doctorSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    specialization: {type:String, required:true},
    gender: {type:String, required:true},
    phone: {type:String, required:true},
    // reports: [{type:mongoose.Schema.Types.ObjectId, ref:'report'}]
},
{
    timestamps:true
})
//<doctorInstance>
const Doctor = mongoose.model("Doctor", doctorSchema)

export default Doctor