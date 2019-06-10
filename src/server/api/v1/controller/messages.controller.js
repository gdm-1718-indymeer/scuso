/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Messages } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class MessagesController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const messages = await Messages.find()
            return res.status(200).json(messages);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving blogs', next);
        }
    };

    // conversations = async (req, res, next) => {
    //     try {
    //         const conversations = await db.collection('messages').find({
    //             from:
    //         })
    //         return res.status(200).json(messages);
    //     } catch (err) {
    //         return handleAPIError(500, err.message || 'Some error occurred while retrieving blogs', next);
    //     }
    // };
    //
    // // Show specific model by id
    // show = async (req, res, next) => {
    //     try {
    //         const { id } = req.params;
    //         const item = await User.findById(id).populate('category').exec();
    //         if (item === undefined || item === null) {
    //             throw new APIError(404, `User with id: ${id} not found!`);
    //         }
    //         return res.status(200).json(item);
    //     } catch (err) {
    //         return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving posts', next);
    //     }
    // }
    //
    // ViewModel for Insert / Create

    create = (req, res) => {
        const newMessage = new Messages({
            from: req.body.from,
            to: req.body.to,
            content: req.body.content,
        });
        newMessage.save().then(message => res.json(message))
        // return res.status(200).json(newMessage);
    }
    //
    // Store / Create the new model
    // store = async (req, res, next) => {
    //     try {
    //         const newMessage = new Messages({
    //             content: req.body.content
    //         })
    //     } catch (err) {
    //         return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the User!', next);
    //     }
    // }
    //
    // // ViewModel for Edit / Update
    // edit = async (req, res, next) => {
    //     const { id } = req.params;
    //
    //     try {
    //         const user = await User.findById(id).exec();
    //
    //         if (!user) {
    //             throw new APIError(404, `User with id: ${id} not found!`);
    //         } else {
    //             const vm = {
    //                 user,
    //                 categories: [],
    //             };
    //             return res.status(200).json(vm);
    //         }
    //     } catch (err) {
    //         return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the User with id: ${id}!`, next);
    //     }
    // }
    //
    // // Update the model
    // update = async (req, res, next) => {
    //     const { id } = req.params;
    //
    //     try {
    //         const postUpdate = req.body;
    //         const user = await User.findOneAndUpdate({ _id: id }, postUpdate, { new: true }).exec();
    //
    //         if (!user) {
    //             throw new APIError(404, `User with id: ${id} not found!`);
    //         }
    //         return res.status(200).json(user);
    //     } catch (err) {
    //         return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the User with id: ${id}!`, next);
    //     }
    // }
    //
    // // Delete / Destroy the model
    // destroy = async (req, res, next) => {
    //     const { id } = req.params;
    //
    //     try {
    //         let user = null;
    //
    //         let { mode } = req.query;
    //         if (mode) {
    //             user = await User.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
    //         } else {
    //             mode = 'delete';
    //             user = await User.findOneAndRemove({ _id: id });
    //         }
    //
    //         if (!user) {
    //             throw new APIError(404, `User with id: ${id} not found!`);
    //         } else {
    //             return res.status(200).json({ message: `Successful deleted the User with id: ${id}!`, user, mode });
    //         }
    //     } catch (err) {
    //         return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the User with id: ${id}!`, next);
    //     }
    // }
}

export default MessagesController;
