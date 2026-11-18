// used ai
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    startStation: {
      type: String,
      required: true,
      trim: true,
    },
    endStation: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    bestSeason: {
      type: String,
      trim: true,
    },
    operatingMonths: {
      type: [Number],
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'trips',
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const databaseName = process.env.MONGODB_DB_NAME || 'practice';
const specificDb = mongoose.connection.useDb(databaseName, { useCache: true });
const Trip = specificDb.model('Trip', tripSchema);

export default Trip;