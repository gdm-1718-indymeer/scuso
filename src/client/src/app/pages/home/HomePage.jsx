/*
Import extenal libraries
*/
import React, { Component } from 'react';


/*
Import internal libraries
*/
import Api from '../../services';
import PostsList from '../../components/posts-list';
const axios = require('axios');
const cheerio = require('cheerio');

class HomePage extends Component {
    state = {
        posts: [],
    };

    componentWillMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        const url = 'https://cors-anywhere.herokuapp.com/https://deschuur.org/agenda';

        axios.get(url)
        .then(response => {
            console.log(response.data);
            let getData = html => {
                let data = [];
                const $ = cheerio.load(html);
                $('.card').each((i, elem) => {
                  data.push({
                    image : $(elem).find('.card.img').attr('img'),
                    title : $(elem).text(),
                    link : $(elem).find('a.storylink').attr('href')
                  });
                });
                console.log(data);
              }
              
              getData(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    

        Api.findAllPosts()
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    posts: data
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToPostDetailPage = (id) => {
        this.props.history.push(`/news/${id}`);
    }

    render() {
        const { posts } = this.state;
        return (
            <React.Fragment>
                <h1 className="hidden">Overzicht Grafische en Digitale Media</h1>
                <section className="section section--articles">
                    <header className="section__header">
                        <h2 className="section__title">Nieuws</h2>
                    </header>
                    <div className="section__content section__content--articles">
                        <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
                    </div>
                    <footer className="section__footer">
                        READ MORE
                    </footer>
                </section>
            </React.Fragment>
        )
    }
}

export default (HomePage);