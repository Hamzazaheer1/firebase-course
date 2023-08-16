import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { auth, db, storage } from './config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, 'movies');

  // movie states
  const [title, setTitle] = useState('');
  const [releasedDate, setReleasedDate] = useState(0);
  const [receivedAnOscar, setReceivedAnOscar] = useState(false);

  // update Title state
  const [updatedTitle, setUpdatedTitle] = useState('');

  // File upload state
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title,
        releasedDate,
        receivedAnOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <Auth />
      {/* POST */}
      <div>
        <input
          type="text"
          placeholder="Enter movie title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter released date"
          onChange={(e) => setReleasedDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={receivedAnOscar}
          onChange={(e) => setReceivedAnOscar(e.target.checked)}
        />
        <label htmlFor="">Received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>
      {/* Get All */}
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releasedDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>
              Delete a movie
            </button>
            <input
              type="text"
              placeholder="Update title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button
              onClick={() => {
                updateMovieTitle(movie.id);
              }}
            >
              Update Title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </>
  );
}

export default App;
