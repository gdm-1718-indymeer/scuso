import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

let MessageSchema = new mongoose.Schema(
    {
        from: { type: String, required: true },
        from_name: { type: String, required: true },
        to: { type: String, required: true },
        to_name: { type: String, required: true },
        content: { type: String, required: true, max: 512 },
        timestamp: { type: Date, default: Date.now }
    }
);

export default mongoose.model('Message', MessageSchema);
