import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [images, setImages] = useState([]);

  const onUserFieldChange = useCallback(event => setCurrentUser(event.target.value), [ setCurrentUser]);
  const searchCurrentUser = useCallback(() => setUser(currentUser), [ currentUser, setUser]);
  useEffect(() => {
    if (user) {
      api.userReceivedPosts(user).then(setImages)
    }
  }, [user, setImages]);
  
  return (
    <div className="App">
      <input type="text" onChange={onUserFieldChange} />
      <button onClick={searchCurrentUser}>Search user</button>
      { images.map((image, index) => <img title="postals" alt="postals" src={image.image} key={index} />)}
    </div>);
  }

export default App;
