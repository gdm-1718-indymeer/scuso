/*
Import external libraries
*/
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import classNames from 'classnames';

/*
Styling
*/
import './PostDetail.scss'

class PostDetail extends Component {
    
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
                        <img className="imagedetail" src={this.props.with.imageurl} />
                        <div className="contentdetail">
                            <div className="detailpost">
                                
                                <h2>{this.props.with.title}</h2>
                                
                                <p>{this.props.with.body}</p>
                                
                            </div>
                            <div className="info">
                                <p><strong>Slug: </strong>{this.props.with.slug}</p>
                                <p className="author"><strong>Author: </strong>{this.props.with.author}</p>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (PostDetail);