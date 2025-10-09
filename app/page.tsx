'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    setIsError(false);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for signing up! We\'ll keep you updated.');
        setEmail('');
      } else {
        setIsError(true);
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero-container">

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <Image
            src="/socials/logo.png"
            alt="EUREKAHACKS Logo"
            width={40}
            height={40}
            className="header-logo"
            priority
          />
          <nav>
            <ul className="nav-links">
              <li><a href="#about">ABOUT</a></li>
              <li><a href="#last-year">LAST YEAR</a></li>
              <li><a href="#contact">CONTACT</a></li>
            </ul>
          </nav>
        </div>
        <div className="social-icons">
          <a href="https://instagram.com/eurekahacks" target="_blank" rel="noopener noreferrer">
            <Image src="/socials/insta.svg" alt="Instagram" width={24} height={24} />
          </a>
          <a href="https://linkedin.com/company/eurekahacks" target="_blank" rel="noopener noreferrer">
            <Image src="/socials/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </a>
          <a href="https://github.com/eurekahacks" target="_blank" rel="noopener noreferrer">
            <Image src="/socials/github.svg" alt="GitHub" width={24} height={24} />
          </a>
          <a href="mailto:hello@eurekahacks.ca">
            <Image src="/socials/email.svg" alt="Email" width={24} height={24} />
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Character silhouettes */}
        <div className="characters">
          <div className="character-left"></div>
          <div className="character-right"></div>
        </div>

        <div className="bolt-container">
          <Image
            src="/socials/bolt.svg"
            alt="Bolt"
            width={500}
            height={500}
            className="bolt-icon"
          />
        </div>

        {/* Main title */}
        <h1 className="main-title">EUREKAHACKS</h1>

        {/* Event details */}
        <div className="event-details">
          <div className="event-detail">MARCH 2026</div>
          <div className="event-detail">LOCATION TBD</div>
        </div>

        {/* Central logo */}
        <div className="central-logo">
          <Image
            src="/socials/logo.png"
            alt="EUREKAHACKS Central Logo"
            width={160}
            height={160}
            priority
          />
        </div>

        {/* Email signup form */}
        <form className="signup-form" onSubmit={handleEmailSubmit}>
          <h2 className="signup-title">SIGN UP FOR UPDATES</h2>
          <div className="email-input-container">
            <input
              type="email"
              className="email-input"
              placeholder="ENTER YOUR EMAIL ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <Image src="/socials/send.svg" alt="Send" width={20} height={20} />
              )}
            </button>
          </div>
          {message && (
            <div className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>INTERESTED IN SPONSORING? CONTACT HELLO@EUREKAHACKS.CA</p>
      </footer>
    </div>
  );
}