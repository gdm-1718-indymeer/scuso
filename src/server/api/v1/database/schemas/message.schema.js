import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

let MessageSchema = new mongoose.Schema(
    {
        conversation_id: { type: String, required: true },
        from: { type: String, required: true },
        from_name: { type: String, required: true },
        to: { type: String, required: true },
        to_name: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }
);

export default mongoose.model('Message', MessageSchema);
