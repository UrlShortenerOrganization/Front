import React, { useState } from 'react';
import './styles.css';

function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(''); 

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleShortenUrl = () => {
    // Симуляція скорочення URL (тут можна підключити реальний API)
    setShortUrl(`https://short.url/${Math.random().toString(36).substring(7)}`);
    setCopySuccess('');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => setCopySuccess('Copied!'))
      .catch(() => setCopySuccess('Failed to copy'));
  };
  

  return (
    <div className="container">
      <h1 className="url-shortener-title">URL Shortener</h1>
      <p>Paste the URL to be shortened</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter the link here"
          value={url}
          onChange={handleInputChange}
        />
        <button onClick={handleShortenUrl}>Shorten URL</button>
      </div>
      {shortUrl && (
        <div className="result">
          <span>Shortened URL: </span>
          <span onClick={handleCopyUrl} className="copyable-url" title="Click to copy">{shortUrl}</span>
          {copySuccess && <span className="copy-status">{copySuccess}</span>}
        </div>
      )}
    </div>
  );
}

export default URLShortener;
