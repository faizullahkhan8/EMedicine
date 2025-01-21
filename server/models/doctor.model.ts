import mongoose, { Document, model, Schema } from "mongoose";

interface IDoctorOptions extends Document {
    name: string;
    email: string;
    cnic: number;
    password: string;
    contactNo: {
        type: string; // like clinic contact, personal contact etc.
        numbers: string;
    }[];

    address: string;
    totalAvailableHours: number;
    userAccountId?: string;
    currentStatus: {
        free: boolean;
        busy: boolean;
    }; // if current status is true it means that doctor is available and vice versa
    timing: {
        openTime: string; // find the correct data type for the open time
        closeTime: string; // find the correct data type for the close time
        daysInWeek: {
            nameOftheDays: string[];
        };
    };
    qualification: {
        title: string;
        year: string;
        location: string;
    }[];
    fees: number;
    profilePic: string;
    isApproved: boolean;
    specialization: string[];
    gender: string;
    messageForPatient: string;
}

const doctorSchema: Schema<IDoctorOptions> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    cnic: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
    contactNo: {
        type: [Object],
        default: [],
        min: 1,
        max: 10,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Address must be at least 50 characters long"],
    },
    totalAvailableHours: {
        type: Number,
        required: true,
    },
    userAccountId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
    },
    currentStatus: {
        type: Object,
        default: {
            free: false,
            busy: false,
        },
    },
    timing: {
        type: Object,
        required: true,
        default: {
            openTime: "",
            closeTime: "",
            daysInWeek: {
                nameOftheDays: [],
            },
        },
    },
    qualification: {
        type: [Object],
        required: true,
        default: [
            {
                title: "",
                year: "",
                location: "",
            },
        ],
    },
    fees: {
        type: Number,
        required: true,
    },
    profilePic: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    specialization: {
        type: [String],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
        trim: true,
    },
    messageForPatient: {
        type: String,
        trim: true,
        maxlength: 255,
    },
});

const doctorModel: mongoose.Model<IDoctorOptions> = model(
    "Doctors",
    doctorSchema,
    "Doctors"
);

export default doctorModel;
