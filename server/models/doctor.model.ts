import mongoose, { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IDoctorOptions extends Document {
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
        isFree: boolean;
    }; // if current status is true it means that doctor is available and vice versa
    timing: {
        openTime: string; // find the correct data type for the open time
        closeTime: string; // find the correct data type for the close time
        daysInWeek: {
            nameOfTheDays: string[];
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
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: true,
    },
    cnic: {
        type: Number,
        required: [true, "CNIC is required."],
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
        required: [true, "Contact No is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [50, "Address must be at least 50 characters long"],
    },
    totalAvailableHours: {
        type: Number,
    },
    userAccountId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
    },
    currentStatus: {
        type: Object,
        default: {
            isFree: false,
        },
    },
    timing: {
        type: Object,
        required: [true, "Please set your timing."],
        default: {
            openTime: "",
            closeTime: "",
            daysInWeek: {
                nameOfTheDays: [],
            },
        },
    },
    qualification: {
        type: [Object],
        required: [true, "Qualification is required"],
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
        required: [true, "Please set your Fees"],
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
        required: [true, "Gender is required."],
        trim: true,
    },
    messageForPatient: {
        type: String,
        trim: true,
        maxlength: 255,
    },
});

doctorSchema.pre<IDoctorOptions>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

const doctorModel: mongoose.Model<IDoctorOptions> = model(
    "Doctors",
    doctorSchema,
    "Doctors"
);

export default doctorModel;
