/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { APIError, handleAPIError } from '../../../utilities';
import { events } from '../database/schemas';

class EventsController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let posts = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'category',
                    sort: { created_at: -1 },
                };
                events = await events.paginate({}, options);
            } else {
                events = await events.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (posts === undefined || posts === null) {
                throw new APIError(404, 'Collection for events not found!');
            }
            return res.status(200).json(posts);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving events', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await events.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving posts', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            categories: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        console.log("kzit in den try")
        try {
            const postCreate = new Events({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
                categoryId: req.body.categoryId,
            });
            const post = await postCreate.save();
            return res.status(201).json(post);
            console.log("jeuj")
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Events!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Events = await events.findById(id).exec();

            if (!Events) {
                throw new APIError(404, `event with id: ${id} not found!`);
            } else {
                const vm = {
                    events,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Post with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const postUpdate = req.body;
            const post = await events.findOneAndUpdate({ _id: id }, postUpdate, { new: true }).exec();

            if (!post) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            }
            return res.status(200).json(post);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Events with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let post = null;

            let { mode } = req.query;
            if (mode) {
                post = await events.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                post = await events.findOneAndRemove({ _id: id });
            }

            if (!post) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Post with id: ${id}!`, events, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Post with id: ${id}!`, next);
        }
    }
}

export default EventsController;
