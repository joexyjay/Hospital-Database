"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "doctors" query returns an array of zero or more Doctors (defined above).
  type Query {
    doctors: [Doctor]
    # doctor (id: ID!): Doctor
    doctor (input: GetInput): Doctor
    reports: [Report]
    report (input: GetInput): Report
    # report (id: ID!): Report
  }

  type Mutation {
    registerDoctor(input: DoctorInput): Doctor
    loginDoctor(input: LoginInput): Doctor
    updateDoctor(input: UpdateInput): Doctor
    deleteDoctor(input: GetInput): Deleted
    createReport(input: ReportInput): Report
    updateReport(input: UpdateReportInput): Report
    deleteReport(input: GetInput): Deleted
  }


     # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Doctor" type defines the queryable fields for every doctor in our data source.
  type Doctor {
    id: ID
    name: String
    email: String
    password: String
    specialization: String
    gender: String
    phone: String
  }

  type Report {
    id: ID
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

  input GetInput {
    id: String!
  }

  input DoctorInput{
    name:String
    email:String
    password:String
    specialization:String
    gender:String
    phone:String
  }
  input ReportInput{
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

  input LoginInput{
    email: String
    password:String
  }

  input UpdateInput{
    id: String
    name:String
    email:String
    password:String
    specialization:String
    gender:String
    phone:String
  }

  input UpdateReportInput{
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
  }

  type Deleted{
    status: Boolean
  }
  
`;
