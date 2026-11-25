import mongoose from "mongoose";

const stationSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        prefecture: {
            type: String,
            required: true,
            trim: true,
        },
        region: {
            type: String,
            required: true,
            trim: true,
        },
        facilities: {
            type: [String],
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        }

    }
)

const databaseName = process.env.MONGODB_DB_NAME || 'practice';
const specificDb = mongoose.connection.useDb(databaseName, { useCache: true });
const station = specificDb.model("Station", stationSchema);

export default station;