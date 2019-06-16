import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const EventSchema = new Schema(
    {
        title: { type: String, required: false },
        imageurl: { type: String, required: false },
        body: { type: String, required: false },
        data: { type: String, required: false },
        label: { type: String, required: false },
        price: { type: String, required: false },
        author: { type: String, required: false },
    },
);

export default mongoose.model('Event', EventSchema);
