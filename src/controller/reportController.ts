import {Request, Response} from 'express';
import Report from '../model/reportModel';


const controller = {
     createReport: async (req:Request, res:Response) => {
    
        try {
            const newPatient = new Report(req.body)
            console.log('patient created')
            await newPatient.save();
            res.status(201).json({
                data: newPatient
            })
        } catch (error) {
            res.status(400).json({error: 'failed to create patient'})
                console.error(error)
        }
    },
    getAllReports: async (req:Request, res:Response) => {
    
        try {

            const allreports = await Report.find({}).populate('doctor', 'doctor name')
            
            res.status(200).json({
                data: allreports
            })
        } catch (error) {
            res.status(400).json({error: 'failed to get patients'})
                console.error(error)
        }
    },
    getOneReport: async (req:Request, res:Response) => {
        
    
        try {
            const thisReport = await Report.findById(req.params.id).populate('doctor', 'doctor.name')
            if(thisReport){
            res.status(200).json({
                data: thisReport
            })
        } else{
            res.status(400).json({
                msg: 'report not found'
            })
        }
        } catch (error) {
            res.status(400).json({msg: 'failed to get this patient'})
                console.error(error)
        }
    },
    updateReport: async (req:Request, res:Response) => {
    
        try {
            const thisReport = await Report.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json({
                data: thisReport
            })
        } catch (error) {
            res.status(400).json({error: 'failed to update this doctor'})
                console.error(error)
        }
    },
    deleteReport: async (req:Request, res:Response) => {
    

        try {
            const thisReport = await Report.findByIdAndDelete(req.params.id)
            if(!thisReport){
                res.status(404).json({
                    msg: "No patient found"
                })
            } else{
                res.status(200).json({
                    msg: "patient deleted"
                })
            }
            
        } catch (error) {
            res.status(400).json({error: 'failed to get this patient'})
                console.error(error)
        }
    }
}   

export default controller