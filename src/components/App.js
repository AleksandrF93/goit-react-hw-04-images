import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { ToastContainer } from 'react-toastify';
import imageAPI from '../services/ImageApi';
import 'react-toastify/dist/ReactToastify.css';
import s from './styles.module.css'

export default function App() {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    if (imageName === '') return;
    setStatus("pending");
    fetchQuery();
  }, [imageName]);

  const fetchQuery = () => {
    imageAPI
      .fechImage(imageName, page)
      .then((data) => {
        setData(data);
        setImages((images) => [...images, ...data.hits]);
        setPage(page + 1);
        setStatus("resolved");
      }).catch(error => {
        setStatus("rejected");
        setError(error);
      })
  };
    
  const handleSearchbarSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
  };

   const openModal = (imageUrl) => {
     setShowModal(true);
     setLargeImageURL(imageUrl);
  };
  
   const closeModal = () => {
     setShowModal(false);
   };
  
  return (
      <div>
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {status === 'idle' && <div>Введите имя картинки</div>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && < h1 > {error.message}</h1>}
        {status === 'resolved' &&
          <main>
          <ImageGallery
            images={images}
            toggleModal={openModal}
            showModal={showModal} />
          {images.length !== data.totalHits &&
            <div className={s.LoadMoreBtn}>
              <Button onClickBtn={fetchQuery} />
            </div>}
          </main>}
          {showModal && (
          <Modal onClose={closeModal}>
            <img src={largeImageURL} alt="images"></img>
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
}


 

// export default class App extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//     showModal: false,
//     imageName: '',
//     page: 1,
//     largeImageUrl: {}
//   };

//   fetchValue = () => {
//     const { imageName, page } = this.state;
//     imageAPI
//       .fechImage(imageName, page)
//       .then(data => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.hits],
//           page: prevState.page + 1,
//           status: 'resolved',
//           data,
//         }))
//       }).catch(error => this.setState({ error, status: 'rejected' }))
//   };

//    componentDidUpdate(prevProps, prevState) {
//         if (prevState.imageName !== this.state.imageName) {
//             this.setState({  images: []  });
//              this.fetchValue(this.state.imageName, this.state.page)
//      };
//   };

//    handleSearchbarSubmit = imageName => {
//     this.setState({ imageName, page: 1 });
//   };

//   openModal = (imageUrl) => {
//     this.setState({ showModal: true, largeImageURL: imageUrl });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, activeImgUrl: "" });
//   };


//   render() {
//     const { images, error, status, data, showModal, largeImageURL } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.handleSearchbarSubmit} />
//         {status === 'idle' && <div>Введите имя картинки</div>}
//         {status === 'pending' && <Loader />}
//         {status === 'rejected' && < h1 > {error.message}</h1>}
//         {status === 'resolved' &&
//           <main>
//           <ImageGallery
//             images={images}
//             toggleModal={this.openModal}
//             showModal={showModal} />
//             {images.length !== data.totalHits &&
//               <div class='LoadMoreBtn'>
//                 <Button onClickBtn={this.fetchValue} />
//               </div>}
//           </main>}
//           {showModal && (
//           <Modal onClose={this.closeModal}>
//             <img src={largeImageURL} alt="images"></img>
//           </Modal>
//         )}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   };
// };

  
    

