import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      searchValue: value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') {
      alert('type theme to search');
      return;
    }
    this.props.onSubmit(this.state);
    // this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>
              <BsSearch />
            </span>
          </button>

          <input
            className={css.input}
            name="searchValue"
            onChange={this.handleChange}
            value={this.state.searchValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
