import React, { Component } from 'react';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import css from './imageGallery.module.css';
import Button from '../Button';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import { BsArrowRightShort } from 'react-icons/bs';

const handleFetch = () => {};

export default class ImageGallery extends Component {
  state = {
    resault: null,
    status: 'idle',
    error: null,
    modal: false,
    largeImg: '',
    loading: false,
  };

  handleFetch() {
    console.log('call');
    const { value, page } = this.props.data;
    this.setState({
      loading: true,
    });
    fetch(
      `https://pixabay.com/api/?q=${value}&page=${page}&key=22553611-d17142b90db34a0c793ad1fbe&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(resault => {
        if (resault.hits.length === 0) {
          this.setState({
            status: 'noImage',
            loading: false,
          });
          // console.log('noImage', this.status);
        } else {
          this.setState(prevState => {
            const newArray =
              page > 1 ? [...prevState.resault, ...resault.hits] : resault.hits;
            return {
              resault: newArray,
              status: 'resolved',
              loading: false,
            };
          });
        }
      })
      .catch(error => this.state({ staus: error }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.handleFetch();
    }
  }

  modalClick = e => {
    this.setState({ modal: false });
  };

  modalOpen = e => {
    this.setState({ modal: true });
    console.log('modalOpen event', e.getAttribute('largeImg'));
    this.setState({ largeImg: e.getAttribute('largeImg') });
  };

  render() {
    const { error, status, resault } = this.state;

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

          {this.state.modal && (
            <Modal
              data={this.state.status}
              url={this.state.largeImg}
              click={this.modalClick}
            />
          )}
          <div className={css.button}>
            <Button click={this.props.paginator} />
          </div>
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
      return <h1>No images with word ${this.props.value}</h1>;
    }
    if (status === 'idle') {
      return;
    }
  }
}
ImageGallery.propTypes = {
  page: PropTypes.number,
  value: PropTypes.string,
};
