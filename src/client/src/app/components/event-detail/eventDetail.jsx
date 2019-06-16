/*
Import external libraries
*/
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import classNames from 'classnames';

/*
Styling
*/
import './eventDetail.scss'

class EventDetail extends Component {
    
    render() {

        return (
            <React.Fragment>
                <div className="postdetailpage">
                    <div className="body">
                        <div className="headerwithsearch">
                            <div className="header">
                            <h2 className="discover">Newsfeed</h2>
                            <p>What's new?</p> 
                            </div>
                        </div>
                        <div className="contentdetail">
                            <div className="detailpost">
                                <h2>{this.props.with.title}</h2>
                                
                                <p>{this.props.with.body}</p>
                                <img className="imagedetail" src={this.props.with.imageurl} />
                            </div>
                            <div className="info">
                                <p className="author"><strong>Prijs: </strong>{this.props.with.price}</p>
                                <p className="author"><strong>Data: </strong>{this.props.with.data}</p>
                                <p className="author"><strong>category: </strong>{this.props.with.label}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (EventDetail);