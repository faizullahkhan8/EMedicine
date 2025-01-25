import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPatientOptions extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientInfo: [
        {
            patientId: string;
            patientNo: number;
        }
    ];
    currentPatient: mongoose.Types.ObjectId;
}

const patientSchema: Schema<IPatientOptions> = new Schema(
    {
        doctorId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Doctors",
            required: true,
        },
        patientInfo: {
            type: [Object],
        },
        currentPatient: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

const PatientModel: Model<IPatientOptions> = model(
    "Patients",
    patientSchema,
    "Patients"
);

export default PatientModel;
