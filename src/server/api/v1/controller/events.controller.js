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
import {Event, Post} from '../database/schemas';


class EventsController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const events = await Event.find().sort({ created_at: -1 }).exec();
            console.log(events)
            return res.status(200).json(events);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving events', next);
        }
    };

    showAuth = async (req, res, next) => {
        try {
            const events = await Event.find({'author': req.params.author}).sort({ created_at: -1 }).exec();
            console.log(events)
            return res.status(200).json(events);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving events', next);
        }
    };

    updateScrapedEvents = async (req, res) => {
        //Scrape the web and update database
        // const url = 'https://cors-anywhere.herokuapp.com/https://deschuur.org/agenda';
        // axios.get(url)
        //     .then(response => {
        //         let getData = html => {
        //             let data = [];
        //             const $ = cheerio.load(html);
        //             $('.card').each((i, elem) => {
        //                 data.push({
        //                     image : $(elem).find('img').attr('src'),
        //                     title : $(elem).find('h2').text(),
        //                     bio: $(elem).find('.content').text(),
        //                     link : 'https://deschuur.org' + $(elem).find('a').attr('href'),
        //                     data: {
        //                         day: $(elem).find('.date').children('.day').text(),
        //                         day_month: $(elem).find('.day_month').text()
        //                     },
        //                     label: $(elem).find('.tag').text(),
        //                     price: $(elem).find('.cost').text(),
        //                 });
        //             });
        //             console.log(data)
        //         }
        //         console.log(getData(response.data))
        //     })
        //     .catch(error => {
        //         toast.error(error.message, { position: toast.POSITION.BOTTOM_LEFT })
        //     })
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const events = await Event.find({'author': req.params.id}).sort({ created_at: -1 }).exec();
            console.log(events)
            return res.status(200).json(events);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving events', next);
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
        console.log('instore')
        try {
            const newEvent = new Event({
                title: req.body.title,
                imageurl: req.body.imageurl,
                body: req.body.body,
                data: req.body.data,
                label: req.body.label,
                price: req.body.price,
                author: req.body.author,
                
            });
            console.log(newEvent)
            const event = await newEvent.save();
            return res.status(201).json(event);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Events!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Events = await Event.findById(id).exec();

            if (!Events) {
                throw new APIError(404, `event with id: ${id} not found!`);
            } else {
                const vm = {
                    Events,
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
            const post = await Event.findOneAndUpdate({ _id: id }, postUpdate, { new: true }).exec();

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
                post = await Event.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                post = await Event.findOneAndRemove({ _id: id });
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
