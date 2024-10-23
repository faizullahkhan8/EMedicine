require("dotenv").config();
import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";

export interface IUser extends Document {
    fullname: string;
    username: string;
    email: string;
    isVerified: boolean;
    address: string;
    cnic: number;
    profilePic?: string;
    bio?: string;
    accountStatus: "active" | "inActive" | "suspended";
    lastLogin?: Date;
    specialty?: Array<string>;
    password: string;
    gender: "male" | "female";
    contectNo: number;
    role: "user" | "admin" | "doctor";
    twoFactor: boolean;
    searchHistory: Array<string>;
    completedFields: {
        fullname: boolean;
        address: boolean;
        cnic: boolean;
        profilePic: boolean;
        bio: boolean;
        speciality: boolean;
        contectNo: boolean;
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
            required: [true, "Fullname is required"],
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
        },
        isVerified: Boolean,
        address: String,
        cnic: {
            type: Number,
            maxlength: [13, "CNIC is invalid"],
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
            default: Date.now(),
        },
        specialty: { type: Array<String>, default: [] },
        password: {
            required: true,
            minlength: [6, "Password must be 6 character"],
            type: String,
            select: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Gender is required"],
        },
        contectNo: Number,
        role: {
            type: String,
            enum: ["user", "admin", "docotor"],
            default: "user",
        },
        twoFactor: {
            type: Boolean,
            default: false,
        },
        searchHistory: [Array<string>],
        completedFields: {
            type: Object,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    let speciality: boolean = false;

    if (this.specialty) {
        speciality = this.specialty?.length < 0;
    }

    this.completedFields = {
        address: !!this.address,
        bio: !!this.bio,
        fullname: !!this.fullname,
        twoFactor: this.twoFactor,
        speciality,
        contectNo: !!this.contectNo,
        cnic: !!this.cnic,
        profilePic: !!this.profilePic,
    };

    next();
});

userSchema.methods.ComparePassword = async function (
    password: string
): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: "30m",
    }) as string;
};

userSchema.methods.SignRefreshToken = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET || "", {
        expiresIn: "3d",
    }) as string;
};

const UserModel: Model<IUser> = model("Users", userSchema, "Users");

export default UserModel;
