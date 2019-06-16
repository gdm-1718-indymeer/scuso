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
import { User } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class MessagesController {
    // List all the models
    index = async (req, res, next) => {
        console.log(req.params.you)
        console.log(req.params.other)
        try {
            const messages = await Messages.find({
                $or: [
                    { $and: [{'from': req.params.you}, {'to': req.params.other}] },
                    { $and: [{'from': req.params.other}, {'to': req.params.you}] }
                ]
            })
            return res.status(200).json(messages);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving blogs', next);
        }
    };

    loadConversations = async (req, res, next) => {
        console.log('LOADING CONVERSATIONS');
        try {
            console.log(typeof req.params.id)
            console.log(req.params.id)
            const conversations = await Messages.find({ 'conversation_id': { '$regex': req.params.id, '$options': 'i' }});
            // console.log(conversations)
            return res.status(200).json(conversations);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving conversations', next);
        }
    };

    searchRecipient = async (req, res, next) => {
        try {
            console.log(req.params.query)
            const resp = await User.find({ 'username': { '$regex': req.params.query, '$options': 'i' }})
            return res.status(200).json(resp);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving conversations', next);
        }
    };

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

    create = async (req, res) => {
        let newMessage = new Messages()
        const fromto = `${req.body.from}_${req.body.to}`
        const tofrom = `${req.body.to}_${req.body.from}`
        let newConversationId = fromto
        // console.log('1 NCI: ' + newConversationId)
        Messages.findOne({'conversation_id':fromto}, function (err, result) {
            if (err) {
                // console.log(err)
            }
            if (!result) {
                // console.log('no fromto found')
            }
            if(result){
                // console.log('fromto found')
                newConversationId = fromto
            }
            // console.log('2 NCI: ' + newConversationId)
            Messages.findOne({'conversation_id':tofrom}, function (err, result) {
                if (err) {
                    // console.log(err)
                }
                if (!result) {
                    // console.log('no tofrom found')
                }
                if(result){
                    // console.log('tofrom found')
                    newConversationId = tofrom
                }
                // console.log('3 NCI: ' + newConversationId)
                newMessage = new Messages({
                    conversation_id: newConversationId,
                    from: req.body.from,
                    from_name: req.body.from_name,
                    to: req.body.to,
                    to_name: req.body.to_name,
                    content: req.body.content,
                });
                newMessage.save();
                return res.status(200).json(newMessage);
            })
        })
    };


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
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let user = null;

            let { mode } = req.query;
            if (mode) {
                user = await User.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                user = await User.findOneAndRemove({ _id: id });
            }

            if (!user) {
                throw new APIError(404, `User with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the User with id: ${id}!`, user, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the User with id: ${id}!`, next);
        }
    }

    // TMP TESTING FUNCTION
    hakare = async () => {
        Messages.deleteMany({}).then((res) => {
            console.log(res)
        })
    }
}

export default MessagesController;
