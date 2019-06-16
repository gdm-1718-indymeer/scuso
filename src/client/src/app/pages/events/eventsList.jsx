/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';
import Api from '../../services'

/*
Styling
*/

class eventsLists extends Component {
    constructor(props){
        super(props);
            this.state = {
                events: [],
                title: [],
                showPopup: false,
            };
        }
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }
    componentDidMount(){

        Api.findAllEvents()
            .then((data) => {
                console.log('postloader')
                this.setState(prevState => ({
                    ...prevState,
                    events: data
                }));
                console.log(this.state.events)
            })
            .catch((error) => {

            });
    }
    render() {

        return (
            <React.Fragment>
                
                {this.state.events.map((item, index) =>
                        <section className="card" key={index}>
                            <img className="card-image loading" src={item.imageurl}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{item.title}</h3>
                            <p className="card-description loading">{item.body}</p>
                            <div className="fadeout"></div>

                            </div>
                        </section>
                        )}
            </React.Fragment>
        );
    }
}

export default (eventsLists);