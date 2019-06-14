import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

let FriendRequestSchema = new mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    }
);

export default mongoose.model('FriendRequest', FriendRequestSchema);
