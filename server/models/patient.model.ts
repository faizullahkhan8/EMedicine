import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPatientOptions extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientInfo: [
        {
            patientId: mongoose.Types.ObjectId; // Changed to ObjectId for consistency
            patientNo: number;
            createdAt: Date;
        }
    ];
    currentPatient?: mongoose.Types.ObjectId; // Made it optional, assuming a patient might not always be assigned
}

const patientSchema: Schema<IPatientOptions> = new Schema(
    {
        doctorId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Doctors",
            required: true,
        },
        patientInfo: {
            type: [
                {
                    patientId: {
                        type: mongoose.SchemaTypes.ObjectId, // Ensuring patientId is an ObjectId reference
                        ref: "Users", // Linking to the Users collection
                        required: true,
                    },
                    patientNo: {
                        type: Number,
                        required: true, // Ensuring patientNo is always provided
                    },
                    createdAt: {
                        type: Date,
                        required: true, // Ensuring createdAt is always recorded
                        default: Date.now, // Default to the current date if not provided
                    },
                },
            ],
            required: true, // Ensuring that the patientInfo array is not empty
        },
        currentPatient: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            default: null, // Allows this field to be null initially
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
