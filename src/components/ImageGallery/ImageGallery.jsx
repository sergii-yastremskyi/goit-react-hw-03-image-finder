import React, { Component } from 'react';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import css from './imageGallery.module.css';
import Button from '../Button';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import { BsArrowRightShort } from 'react-icons/bs';
export default class ImageGallery extends Component {
  state = {
    resault: null,
    searchValue: '',
    status: 'idle',
    error: null,
    oldValue: '',
    page: 1,
    modal: false,
    largeImg: '',
    loading: false,
  };
  componentDidMount() {
    console.log('galleryProps', this.props);
  }
  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props.data;
    const newPage = this.state.page.toString();
    if (prevProps.data.value !== value) {
      if (this.state.page !== 1) {
        this.setState({ page: 1 });
      } else {
        this.setState({ oldValue: value });
        this.setState({ status: 'pending', loading: true });
        this.setState({ searchValue: value });
        console.log('componentDidUpdate', value);

        fetch(
          `https://pixabay.com/api/?q=${value}&page=${newPage}&key=22553611-d17142b90db34a0c793ad1fbe&image_type=photo&orientation=horizontal&per_page=12`,
        )
          .then(res => res.json())
          .then(resault => {
            if (resault.hits.length === 0) {
              this.setState({
                status: 'noImage',
                loading: false,
              });
              console.log('noImage', this.status);
            } else {
              this.setState({
                resault: resault.hits,
                status: 'resolved',
                loading: false,
              });
            }
          })
          .catch(error => this.state({ staus: error }));
      }
      // .finally(() => this.setState({ status: 'resolved' }));
    }
    if (prevState.page !== this.state.page) {
      this.setState({
        // status: 'pending',
        loading: true,
      });
      fetch(
        `https://pixabay.com/api/?q=${value}&page=${newPage}&key=22553611-d17142b90db34a0c793ad1fbe&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(resault => {
          if (resault.hits.length === 0) {
            this.setState({ status: 'noImage' });
          } else {
            this.setState({ status: 'resolved' });
            this.setState(prevState => ({
              resault: prevState.resault.concat(resault.hits),
            }));
          }
        });
    }
  }

  handleClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    console.log('кнопочка');
  };
  modalClick = e => {
    this.setState({ modal: false });
  };
  modalOpen = e => {
    this.setState({ modal: true });
    console.log('modalOpen event', e.getAttribute('largeImg'));
    this.setState({ largeImg: e.getAttribute('largeImg') });
  };
  render() {
    const { error, status, resault, oldValue } = this.state;

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.imageList}>
            {resault.map((image, i) => (
              <ImageGalleryItem
                isLast={i + 1 === resault.length}
                click={this.modalOpen}
                key={image.id}
                data={image}
              />
            ))}
          </ul>
          <div></div>
          {this.state.modal && (
            <Modal
              data={this.state.status}
              url={this.state.largeImg}
              click={this.modalClick}
            />
          )}

          <Button click={this.handleClick} />
          <div />
        </>
      );
    }
    if (this.state.loading === true) {
      return (
        <div className={css.loader}>
          <Loader />
        </div>
      );
    }
    if (status === 'error') {
      <h1>Error</h1>;
    }
    if (status === 'noImage') {
      return <h1>No images with word {oldValue}</h1>;
    }
    if (status === 'idle') {
      return <div></div>;
    }
  }
}
ImageGallery.propTypes = {
  page: PropTypes.number,
  value: PropTypes.string,
};
