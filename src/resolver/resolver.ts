import Doctor from "../model/doctorModel";
import Report from "../model/reportModel";
import bcrypt from "bcryptjs";

interface GetDoctor{
    id: string;
}
interface GetInput{
    input: GetDoctor;
}
interface createDoctor{
    name:string;
    email:string;
    password:string;
    specialization:string;
    gender:string;
    phone:string
}
interface DoctorInput{
    input: createDoctor
}
interface loginDoctor{
    email:string
    password:string
}
interface LoginInput{
    input:loginDoctor
}

interface updateDoctor{
    id: string
    name:string
    email:string
    password:string
    specialization:string
    gender:string
    phone:string
}
interface UpdateInput{
    input: updateDoctor
}

interface createReport{
    patientName: String
    age: String
    hospital: String
    weight: String
    height: String
    bloodGroup: String
    genotype: String
    bloodPressure: String
    HIV_status: String
    hepatitis: String
    doctor: String
}
interface updateReport{
    id: String
    patientName: String
    age: String
    hospital: String
    weight: String
    height: String
    bloodGroup: String
    genotype: String
    bloodPressure: String
    HIV_status: String
    hepatitis: String
    doctor: String
}
interface ReportInput{
    input: createReport
}
interface UpdateReportInput{
    input: updateReport
}


export const resolvers = {
    Query: {
      doctors: async () => {
            try {
                const doctors = await Doctor.find({})
                if(!doctors || doctors.length === 0){
                    throw new Error('No doctors found')
                }
                return doctors
            } catch (error) {
                console.error('Error fetching doctors', error)
                throw new Error('An error occured while fetching doctors')
            }
        },
        doctor: async (_parent: any, args: GetInput) => {
            try {
                const id = args.input.id
                const doctor = await Doctor.findById(id)
                if(!doctor){
                    throw new Error('doctor not found')
                }
                return doctor
            } catch (error) {
                console.error('Error fetching this doctor', error)
                throw new Error('An error occured while fetching this doctor')
            }
           
        },
      reports: async () => {
            try {
                const reports = await Report.find({})
                if(!reports || reports.length === 0){
                    throw new Error('Reports not found');
                }
                return reports
            } catch (error) {
                console.error('Error fetching reports', error)
                throw new Error('An error occured while fetching reports')
            }
        },
        report: async (_parent:any, args: GetInput) => {
            try {
                const id = args.input.id
                const report = await Report.findById(id)
                if(!report){
                    throw new Error ('this report not found')
                }
                return report
            } catch (error) {
                console.error('Error fetching this report', error)
                throw new Error('An error occured while fetching this report')
            }
        }
        
    },
    Mutation: {
        registerDoctor: async (_parent:any, {input}:DoctorInput ) => {
            try {  
                const {password, email, name, specialization, gender, phone} = input

                //Hash Password
                const passwordHash = await bcrypt.hash(password, 8)
                
                const doctorExist = await Doctor.findOne({email: email})

                if(doctorExist){
                    throw new Error ('email alreay exist')
                }
 
                const newDoctor = new Doctor({
                name,
                email,
                password:passwordHash,
                specialization,
                gender,
                phone
            })
           const doctor =  await newDoctor.save()
            return doctor
               
            } catch (error) {
                console.error('Error creating doctor', error)
                throw new Error('An error occured while trying to create doctor')
            }
        },
        loginDoctor: async (_parent:any, {input}:LoginInput)=> {
            try {
                const doctor = await Doctor.findOne({email:input.email})
                if(!doctor){
                    throw new Error ('Email does not exist')
                }
                const validPass = await bcrypt.compare(input.password, doctor.password)
                if(!validPass){
                    throw new Error('Invalid Password')
                }
                else{
                return doctor}
            } catch (error) {
                console.error('Error login doctor', error)
                throw new Error('An error occured while trying to login doctor')
            }
        },
        updateDoctor: async (_parent:any, args:UpdateInput)=>{
            try {
                const {id, password, email, name, specialization, gender, phone} = args.input
                const input = {
                    name,
                    email,
                    password,
                    specialization,
                    gender,
                    phone
                }
                const doctor = await Doctor.findByIdAndUpdate(id, input)
                return doctor
            } catch (error) {
                console.error('Error updating doctor', error)
                throw new Error('An error occured while trying to modify doctor')
            }
        },
        deleteDoctor: async (_parent: unknown, args: GetInput)=> {
            try {
                const {id} = args.input

                const doctor = await Doctor.findByIdAndDelete(id)
                
                if(doctor){
                    return {
                        status: true
                    }
                } 
               
            } catch (error) {
                console.error('Error deleting doctor', error)
                throw new Error('An error occured while trying to delete doctor')
            }
        },
        createReport: async (_parent:any, args:ReportInput ) => {
            try {  
                const {
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis,
                    doctor
                } = args.input
 
                const newReport = new Report({
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis,
                    doctor
            })
           const report =  await newReport.save()
            return report
               
            } catch (error) {
                console.error('Error creating report', error)
                throw new Error('An error occured while trying to create report')
            }
        },
        updateReport: async (_parent:any, args:UpdateReportInput)=>{
            try {
                const {
                    id,
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis
                } = args.input
                const input = {
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis,
                }
                const report = await Report.findByIdAndUpdate(id, input)
                return report
            } catch (error) {
                console.error('Error updating report', error)
                throw new Error('An error occured while trying to modify report')
            }
        },
        deleteReport: async (_parent: unknown, args: GetInput)=> {
            try {
                const {id} = args.input

                const report = await Report.findByIdAndDelete(id)
                if(report){
                   return {
                    status: true
                   }
                }
               
            } catch (error) {
                console.error('Error deleting report', error)
                throw new Error('An error occured while trying to delete report')
            }
        }
    }
  }







