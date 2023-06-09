import { Component } from 'react';
import { Wrap } from 'components/App.styled.js';

import { PER_PAGE } from 'services/constants';
import * as API from '../services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    word: '',
    gallery: [],
    isLoading: false,
    isMore: false,
    modalImg: null,
  };

  componentDidUpdate(prevProps, { gallery }) {
    if (this.state.gallery.length === 0) window.scrollTo({ top: 0 });
    if (gallery.length !== this.state.gallery.length)
      window.scrollTo({
        top: document.querySelector('body').scrollHeight,
        behavior: 'smooth',
      });
  }

  requestToApi = async (word, currentGallery) => {
    this.setState({ isLoading: true });
    try {
      const { reqGallery, isMore } = await API.readData(
        word,
        Math.floor(currentGallery.length / PER_PAGE) + 1
      );

      console.log(reqGallery, isMore);
      this.setState({
        gallery: [...currentGallery, ...reqGallery],
        isMore,
        word,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        word: '',
        gallery: [],
        isMore: false,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlerSubmit = word => {
    this.setState({
      word,
      gallery: [],
      isLoading: true,
    });

    this.requestToApi(word, []);
  };

  handlerMore = () => {
    console.log(this.state);
    this.requestToApi(this.state.word, this.state.gallery);
  };

  onClickToGallery = modalImg => {
    this.setState({ modalImg });
  };

  closeModal = () => this.setState({ modalImg: null });

  render() {
    const { gallery, isMore, isLoading, modalImg } = this.state;
    return (
      <Wrap>
        {/* modal */}
        {modalImg && (
          <Modal closeWindow={this.closeModal}>
            <img src={modalImg?.img} alt={modalImg?.alt} />
          </Modal>
        )}

        {/* search bar */}
        <Searchbar onSubmit={this.handlerSubmit} isDisabled={isLoading} />
        {/* gallery list */}
        <ImageGallery
          gallery={gallery}
          onClickToGallery={this.onClickToGallery}
        />
        {/* loader */}
        <Loader visible={isLoading} />
        {/* button 'Load more' */}
        {isMore && <Button isDisabled={isLoading} onClick={this.handlerMore} />}
      </Wrap>
    );
  }
}
export default App;
