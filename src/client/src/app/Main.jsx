/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';

/*
Utilities
*/
import { RouteWithLayout } from './utilities';

/*
Layout
*/
import { LoginLayout, PageLayout } from './layouts';
import { AdminLayout } from './admin/layouts';

/*
Page components
*/
import HomePage from './pages/home';
import AdminPage from './admin/pages/admin';
import LoginPage from './pages/login';
import SignPage from './pages/signup';
import NewsPage from './pages/news';
import PostDetailPage from './pages/post-detail';
import profilePage from './pages/profile';
import NewsFeed from './pages/newsfeed';
import EventPage from './pages/events'

/*
Import styling
*/
import './Main.css';
import MessagingPage from "./pages/messaging";

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <RouteWithLayout exact path='/' layout={ PageLayout } component={ HomePage }/>
          <Redirect from="/home" to="/"/>
          <RouteWithLayout exact path='/news' layout={ PageLayout } component={ NewsPage }/>
          <RouteWithLayout exact path='/news/:id' layout={ PageLayout } component={ PostDetailPage }/>
          <RouteWithLayout path="/login" layout={ LoginLayout } component={ LoginPage }></RouteWithLayout>
          <RouteWithLayout path="/signup" layout={ LoginLayout } component={ SignPage }></RouteWithLayout>
          <RouteWithLayout path="/admin" layout={ AdminLayout } component={ AdminPage }></RouteWithLayout>
          <RouteWithLayout path="/profile" component={ profilePage }></RouteWithLayout>
          <RouteWithLayout path="/messaging" component={ MessagingPage }></RouteWithLayout>
          <RouteWithLayout path="/newsfeed" component={ NewsFeed }></RouteWithLayout>
          <RouteWithLayout path="/events" component={ EventPage }></RouteWithLayout>

        </Switch>
      </div>
    );
  }
}

export default Main;