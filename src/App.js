import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import React, { Component } from 'react';
import css from './components/shared/app.module.css';

// import Button from './components/Button/Button';

export default class App extends Component {
  state = {
    value: '',
    page: 1,
  };
  submitHandler = data => {
    this.setState({
      value: data.searchValue,
      page: 1,
    });
    console.log('data come in app', this.state);
  };
  pageHandler = () => {
    this.setState(prevState => {
      return { ...prevState, page: 1 };
    });
  };

  render() {
    return (
      <div className="container">
        <Searchbar onSubmit={this.submitHandler} />
        <ImageGallery
          className={css.gallery}
          data={this.state}
          paginator={this.pageHandler}
        />
      </div>
    );
  }
}
