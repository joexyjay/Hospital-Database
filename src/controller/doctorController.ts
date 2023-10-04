import {Request, Response} from 'express';
import Doctor from '../model/doctorModel';
import { registerDoctorSchema, options, loginDoctorSchema } from '../utils/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const controller = {
    //Register doctor
    registerDoctor: async (req:Request, res:Response)=>{

        try {
        // validate with joi
        const validation = registerDoctorSchema.validate(req.body, options)

        if(validation.error){
           return res.status(400).json({Error:validation.error.details[0].message})
        } 
        //Hash password
        const passwordHash = await bcrypt.hash(req.body.password, 8)

        //check if user exist
        const doctorExist = await Doctor.findOne({email: req.body.email})

        if(doctorExist){
            return res.status(400).json({
                error: "Email already exist"
            })
        }

        const newDoctor = new Doctor({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            specialization: req.body.specialization,
            gender: req.body.gender,
            phone: req.body.phone
        })
        

        
            const savedDoctor = await newDoctor.save()
            res.status(201).json({
                data: savedDoctor
            })
        } catch (error) {
            res.status(400).json({error: 'failed to register doctor'})
        }
    },

    //Login Doctor
    loginDoctor: async (req:Request, res:Response)=>{
        try {
            const validation = loginDoctorSchema.validate(req.body, options)

        if(validation.error){
           return res.status(400).json({Error:validation.error.details[0].message})
        } 

        const doctor= await Doctor.findOne({email: req.body.email})
        if(!doctor){
            return res.status(400).json({
                error: "Doctor does not exist, kindly register!!"
            })
        }
        const validPass = await bcrypt.compare(req.body.password, doctor.password)
        if(!validPass){
            return res.status(400).json({
                error: "invalid password"
            })
        } else {
            //generate token
            const token = jwt.sign({_id: doctor?._id}, process.env.JWT_TOKEN as string, {expiresIn:"30d"})
            // res.cookie('token', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
            res.status(201).header('auth-token', token).json({
                msg: "login successfully",
                doctor,
                token
            })
        }
        } catch (error) {
            res.status(400).json({error: 'failed to login doctor'})
        }
    },
    //Get all doctors
    getAllDoctors: async (req:Request, res:Response) => {
        
            try {
                const allDoctors = await Doctor.find({})
                res.status(200).json({
                    data: allDoctors
                })
            } catch (error) {
                res.status(400).json({error: 'failed to get doctors'})
                    console.error(error)
            }
        },
        //Get one doctor
    getOneDoctor: async (req:Request, res:Response) => {
            
            try {
                const thisDoctor = await Doctor.findById(req.params.id)
                res.status(200).json({
                    data: thisDoctor
                })
            } catch (error) {
                res.status(400).json({error: 'failed to get this doctor'})
                    console.error(error)
            }
            },
        //Update doctor
    updateDoctor: async (req:Request, res:Response) => {
        
            try {
                const thisDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body)
                res.status(200).json({
                    data: thisDoctor
                })
            } catch (error) {
                res.status(400).json({error: 'failed to update this doctor'})
                    console.error(error)
            }
        },

        //delete doctor
        deleteDoctor: async (req:Request, res:Response) => {
    

                try {
                    const thisDoctor = await Doctor.findByIdAndDelete(req.params.id)
                    if(!thisDoctor){
                        res.status(404).json({
                            msg: "No doctor found"
                        })
                    } else{
                        res.status(200).json({
                            msg: "doctor deleted"
                        })
                    }
                    
                } catch (error) {
                    res.status(400).json({error: 'failed to get this doctor'})
                        console.error(error)
                }
        }
}

export default controller