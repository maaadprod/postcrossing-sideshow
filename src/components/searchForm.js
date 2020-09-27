import React, { useState, useCallback } from 'react';

function SearchForm({ onUserSearch }) {
  const [currentUser, setCurrentUser] = useState("");

  const onUserFieldChange = useCallback(event => setCurrentUser(event.target.value), [ setCurrentUser]);
  const searchCurrentUser = useCallback(() => onUserSearch(currentUser), [ currentUser, onUserSearch]);
  
  return (
    <div className="searchForm">
      <input type="text" onChange={onUserFieldChange} />
      <button onClick={searchCurrentUser}>Search user</button>
    </div>);
  }

export default SearchForm;
