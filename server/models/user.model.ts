require("dotenv").config();
import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Interface representing a User document in MongoDB
export interface IUser extends Document {
    fullname: string;
    username: string;
    email: string;
    isVerified: boolean;
    address?: string;
    cnic?: number;
    profilePic?: string;
    bio?: string;
    accountStatus: "active" | "inActive" | "suspended";
    lastLogin?: Date;
    specialty?: string[];
    password: string;
    gender: "male" | "female";
    contactNo?: number; // Fixed typo from "contectNo"
    role: "user" | "admin" | "doctor"; // Fixed typo from "docotor"
    twoFactor: boolean;
    searchHistory: string[];
    completedFields: {
        fullname: boolean;
        address: boolean;
        cnic: boolean;
        profilePic: boolean;
        bio: boolean;
        specialty: boolean;
        contactNo: boolean; // Fixed typo from "contectNo"
        twoFactor: boolean;
    };
    ComparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Full name is required"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email address"], // Added email format validation
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        address: String,
        cnic: {
            type: Number,
            maxlength: [13, "CNIC must be exactly 13 digits"],
        },
        profilePic: String,
        bio: String,
        accountStatus: {
            type: String,
            enum: ["active", "inActive", "suspended"],
            default: "active",
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        specialty: {
            type: [String],
            default: [],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Gender is required"],
        },
        contactNo: {
            type: Number, // Fixed typo
            validate: {
                validator: (value: number) => value.toString().length === 11, // Assuming 11 digits for contactNo
                message: "Contact number must be 11 digits",
            },
        },
        role: {
            type: String,
            enum: ["user", "admin", "doctor"], // Fixed typo
            default: "user",
        },
        twoFactor: {
            type: Boolean,
            default: false,
        },
        searchHistory: {
            type: [String],
            default: [],
        },
        completedFields: {
            type: Object,
            default: {
                fullname: false,
                address: false,
                cnic: false,
                profilePic: false,
                bio: false,
                specialty: false,
                contactNo: false,
                twoFactor: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password before saving the user document
userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
    }

    // Check completed fields status
    const specialtyCompleted = !!this.specialty && this.specialty.length > 0;

    this.completedFields = {
        fullname: !!this.fullname,
        address: !!this.address,
        cnic: !!this.cnic,
        profilePic: !!this.profilePic,
        bio: !!this.bio,
        specialty: specialtyCompleted,
        contactNo: !!this.contactNo,
        twoFactor: this.twoFactor,
    };

    next();
});

// Method to compare passwords for login
userSchema.methods.ComparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.SignAccessToken = function (): string {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    // Create and return a signed JWT token with a 30-minute expiration
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });
};

// Method to generate a refresh token for the user
userSchema.methods.SignRefreshToken = function (): string {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET not defined");
    }

    // Create and return a signed refresh JWT token with a 3-day expiration
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3d",
    });
};

// Create and export the User model
const UserModel: Model<IUser> = model("Users", userSchema, "Users");

export default UserModel;
