import { useState, useEffect } from 'react'
import './App.css'
import { UserAuth } from './components/UserAuth.jsx'
import { db, auth, storage } from './config/firebase.js'
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { onAuthStateChanged, signOut } from 'firebase/auth'
// In a database we have a collection (movies) and inside collection we have documents for which we can set the schema ourself
// fetching database : getDocs
// updating in database : updateDoc
// deleting in database : deleteDoc
// adding in database : addDoc
function App() {
  const [movieList, setMovieList] = useState([])
  const [movieInputs, setMovieInputs] = useState({
    movieName: "",
    releasedDate: null
  })
  const [recievedAnOscar, setRecievedAnOscar] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
  // File Upload State
  const [fileUpload, setFileUpload] = useState(null)
  // reference to the collection
  const moviesCollectionRef = collection(db, "movies")

  // onSnapshot(moviesCollectionRef, (snapshot) => { ... }): This sets up a listener on the moviesCollectionRef (a reference to the movies collection).
  useEffect(() => {
    // When you use onSnapshot, you are setting up a listener to monitor a specific document or collection in Firestore.
    // onSnapshot() is called with moviesCollectionRef it subscribes to the database collection.
    // It also returns a unsubscribe function which we store in unsubscribe variable which we will call later to unsubscribe when component unmounts
    const unsubscribe = onSnapshot(moviesCollectionRef, (snapshot) => {
      // we have an id in doc but we want to have id inside doc.data() which will be our filteredData
      const filteredData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setMovieList(filteredData)
    }, (error) => {
      console.error(error)
    })
    // return () => unsubscribe(): The useEffect hook returns a cleanup function that unsubscribes from the snapshot listener when the component unmounts, preventing memory leaks and unnecessary updates.
    return () => unsubscribe()
  }, [])

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Name: movieInputs.movieName,
        releasedate: movieInputs.releasedDate,
        recievedAnOscar: recievedAnOscar,
        userId: auth?.currentUser?.uid
      })
      setMovieInputs({
        movieName: "",
        releasedDate:null
      })
      // in the rules section in firebase we are going to make changes
      // allow read: if True
      // write includes create, delete, update you can also have different rules for each
      // allow write: if request.auth != null && request.auth.uid == request.resource.data.userId
    } catch (error) {
      console.log(error)
    }
  }

  const handleMovieChange = (e) => {
    setMovieInputs({ ...movieInputs, [e.target.name]: e.target.value })
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }
  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { Name: updatedTitle })
    setUpdatedTitle('')
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFolder/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload)
    } catch (error) {
      console.error(error)
    }
  }
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {authUser ? <div className='flex gap-5'><button className='border-4 border-red-400 bg-yellow-300 text-bold text-lg p-2 m-2 rounded-lg'>{`Logged in as ${auth?.currentUser?.displayName}`}</button><button onClick={logout} className='bg-black text-lg m-2 p-2 rounded-lg text-white'>Logout</button></div> : <UserAuth />}
      <div>
        <input className='border-2 m-2 rounded-md border-black p-2' type="text" name="movieName" value={movieInputs.movieName} placeholder='Movie name' onChange={handleMovieChange} />
        <input className='border-2 m-2 rounded-md border-black p-2' type="number" name='releasedDate' value={movieInputs.releasedDate || ''} placeholder='Released date' onChange={handleMovieChange} />
        <input type="checkbox" name='recievedAnOscar' checked={recievedAnOscar} onChange={(e) => setRecievedAnOscar(e.target.checked)} />
        <label htmlFor="recievedAnOscar">Recieved an Oscar</label>
        <button className='bg-gray-400 border-2 rounded-lg border-black text-black p-2 m-2' onClick={onSubmitMovie} type="submit">Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 className='text-2xl font-bold' style={{ color: movie.recievedAnOscar ? 'green' : 'red' }}>{movie.Name}</h1>
            <p className='text-lg text-black'>{movie.releasedate}</p>
            <input className='border-2 border-black p-2 m-2' type="text" onChange={(e) => setUpdatedTitle(e.target.value)} placeholder='Update Movie Title' />
            <button className='bg-black text-white p-2 m-2 rounded-lg' onClick={() => deleteMovie(movie.id)}>Delete</button>
            <button className='bg-black text-white p-2 m-2 rounded-lg' onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>

      <div className='flex gap:20px'>
        <input className='border-1 border-yellow-400 bg-yellow-300 p-2 m-2 rounded-lg' type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button className='rounded-lg border-2 border-black bg-sky-300 p-2 m-2' onClick={uploadFile}>Upload File</button>
      </div>
    </>
  )
}

export default App
