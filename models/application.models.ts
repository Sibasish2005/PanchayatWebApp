import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Application Document Interface
 */
export interface IApplication extends Document {
  service: string;
  name: string;
  mobileNo: string;
  address: string;
  documentType: string;
//   documentUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Application Schema
 */
const ApplicationSchema: Schema<IApplication> = new Schema(
  {
    service: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      length: 10,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    // documentUrl: {
    //   type: String,
    //   required: true, // Cloudinary URL
    // },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

/**
 * Prevent model overwrite in dev (Next.js hot reload fix)
 */
const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
