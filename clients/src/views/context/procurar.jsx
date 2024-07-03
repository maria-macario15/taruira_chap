import React, { useState } from 'react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('user');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const endpoint = type === 'user' ? 'searchUser' : 'searchPost';
    const response = await fetch(`http://localhost:5000/${endpoint}?params=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="user">User</option>
          <option value="post">Post</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <div>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result">
              {result.username ? (
                <div>
                  <img src={result.user_img} alt={result.username} className="user-img" />
                  <p>{result.username}</p>
                </div>
              ) : (
                <div>
                  <h2>{result.post_desc}</h2>
                  <p>by {result.username}</p>
                  {result.image && <img src={result.image} alt={result.post_desc} />}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
