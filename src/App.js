import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const BASE_URL = 'http://localhost:5299';
const GENERATE_URL = `${BASE_URL}/generate?url=`;

function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(''); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const handleShortenUrl = async () => {
    if (!isValidUrl(url)) {
      console.error('Invalid URL');
      setShortUrl('');
      setCopySuccess(''); 
      navigate('/invalid-link');
      return;
    }
  
    try {
      const response = await fetch(GENERATE_URL + encodeURIComponent(url), {
        method: 'POST'
      });
  
      if (response.ok) {
        const data = await response.text();
        const shortenedUrl = `${BASE_URL}/${data}`;
        setShortUrl(shortenedUrl);
        setCopySuccess('');
      } else {
        console.error('Error shortening URL');
        setShortUrl('');
        navigate('/invalid-link');
      }
    } catch (error) {
      console.error('Failed to shorten URL:', error);
      setShortUrl('');
      navigate('/invalid-link');
    }
  };
  
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 3000);
      })
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
