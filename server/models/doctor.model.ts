import mongoose, { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IDoctorOptions extends Document {
    name: string;
    email: string;
    cnic: string; // Changed to String to accommodate larger CNIC numbers
    password: string;
    contactNo: {
        type: string; // Clinic contact, personal contact, etc.
        numbers: string; // Phone numbers as string
    }[];
    address: string;
    totalAvailableHours: number;
    userAccountId?: string;
    currentStatus: {
        isFree: boolean;
    };
    timing: {
        openTime: string; // Time in HH:mm format
        closeTime: string; // Time in HH:mm format
        daysInWeek: {
            nameOfTheDays: number[];
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
    maxPatients: number;
    ban: {
        isBanned: boolean;
        reason: string;
        duration: Date | string; // Duration can be Date or string
    };
}

const doctorSchema: Schema<IDoctorOptions> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (v: string) => {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        v
                    ); // Email validation regex
                },
                message: (props: any) =>
                    `${props.value} is not a valid email address!`,
            },
        },
        cnic: {
            type: String, // Changed to String to prevent loss of data for large numbers
            required: [true, "CNIC is required"],
            trim: true,
            unique: true,
            validate: {
                validator: (v: string) => {
                    return /^[0-9]{13}$/.test(v); // CNIC validation (13 digits)
                },
                message: (props: any) => `${props.value} is not a valid CNIC!`,
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            trim: true,
        },
        contactNo: {
            type: [
                {
                    type: {
                        type: String, // clinic contact, personal contact, etc.
                        enum: ["clinic", "personal", "emergency"], // Restrict to specific types
                        required: true,
                    },
                    numbers: {
                        type: String,
                        required: true,
                        validate: {
                            validator: (v: string) => {
                                return /^[0-9]{10}$/.test(v); // Phone number validation (10 digits)
                            },
                            message: (props: any) =>
                                `${props.value} is not a valid phone number!`,
                        },
                    },
                },
            ],
            required: [true, "At least one contact number is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
            maxlength: [255, "Address cannot exceed 255 characters"],
        },
        totalAvailableHours: {
            type: Number,
            min: [1, "Total available hours must be at least 1"],
            max: [24, "Total available hours cannot exceed 24"],
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
            openTime: {
                type: String,
                required: [true, "Open time is required"],
                match: [
                    /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                    "Please enter a valid open time in HH:mm format",
                ],
            },
            closeTime: {
                type: String,
                required: [true, "Close time is required"],
                match: [
                    /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                    "Please enter a valid close time in HH:mm format",
                ],
            },
            daysInWeek: {
                nameOfTheDays: {
                    type: [Number],
                    enum: [0, 1, 2, 3, 4, 5, 6], // Restrict days to the range 0-6 (Sunday-Saturday)
                    required: true,
                },
            },
        },
        qualification: {
            type: [
                {
                    title: {
                        type: String,
                        required: [true, "Qualification title is required"],
                    },
                    year: {
                        type: String,
                        required: [true, "Qualification year is required"],
                    },
                    location: {
                        type: String,
                        required: [true, "Qualification location is required"],
                    },
                },
            ],
            required: [true, "Qualification is required"],
        },
        fees: {
            type: Number,
            required: [true, "Fees are required"],
            min: [1, "Fees must be greater than 0"],
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
            required: [true, "Specialization is required"],
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: [true, "Gender is required"],
            trim: true,
        },
        messageForPatient: {
            type: String,
            maxlength: [
                255,
                "Message for patient cannot exceed 255 characters",
            ],
        },
        maxPatients: {
            type: Number,
            default: 0,
            min: [1, "Max patients must be at least 1"],
        },
        ban: {
            type: Object,
            default: {
                isBanned: false,
                reason: "",
                duration: undefined,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
doctorSchema.pre<IDoctorOptions>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare plain text password with hashed password
doctorSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

const doctorModel: mongoose.Model<IDoctorOptions> = model(
    "Doctors",
    doctorSchema,
    "Doctors"
);

export default doctorModel;
