import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

let MessageSchema = new mongoose.Schema(
    {
        content: { type: String, required: true, max: 512 },
        timestamp: { type: Date, default: Date.now }
    }
);

export default mongoose.model('Message', MessageSchema);
