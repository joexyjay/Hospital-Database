import mongoose, {Schema} from "mongoose";


const reportSchema = new Schema({
    patientName: {type:String, required:true},
    age: {type:Number, required:true},
    hospital: {type:String, required:true},
    weight: {type:String, required:true},
    height: {type:String, required:true},
    bloodGroup: {type:String, required:true},
    genotype: {type:String, required:true},
    bloodPressure: {type:String, required:true},
    HIV_status: {type:String, required: true},
    hepatitis: {type:String, required:true},
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
},
{
    timestamps:true
})

const Report = mongoose.model("Report", reportSchema)

export default Report