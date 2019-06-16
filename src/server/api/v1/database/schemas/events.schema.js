import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

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
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

EventSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

EventSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

EventSchema.virtual('id').get(function () { return this._id; });
EventSchema.virtual('Events', {
    ref: 'Events',
    localField: 'EventsId',
    foreignField: '_id',
    justOne: true,
});

EventSchema.plugin(mongoosePaginate);
export default mongoose.model('Event', EventSchema);
