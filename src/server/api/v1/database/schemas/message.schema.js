import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

let Message = new mongoose.Schema(
    {
        content: { type: String, required: true, max: 512 },
    }
);

module.exports = Message = mongoose.model('Message', MessageSchema);
