import React, { useState, useCallback } from 'react';
import './App.css';
import api from "./api";
import SearchForm from "./components/searchForm";
import List from "./components/list";

function App() {
  const [images, setImages] = useState([]);
  const handleUserSearch = useCallback(user => {
    if (user) {
      setImages([]);
      api.userReceivedPosts(user).then(setImages)
    }
  }, [setImages]);
  
  return (
    <div className="App">
      <SearchForm onUserSearch={handleUserSearch} />
      { images.length > 0 && <List images={images} /> }
    </div>);
  }

export default App;
