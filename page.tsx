'use client';

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const slideInVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const scaleInVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const popVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 15,
        duration: 0.2
      }
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);
    setIsError(false);
    setMessage('');

    const params = new URLSearchParams(window.location.search);

    const source =
      params.has('source') ? params.get('source') :
      (params.has('fbclid') || params.has('brid')) ? 'instagram' :
      'unknown';


    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for signing up! We\'ll keep you updated.');
        setEmail('');
      } else {
        setIsError(true);
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
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
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Image
              src="/socials/logo.png"
              alt="EUREKAHACKS Logo"
              width={40}
              height={40}
              className="header-logo"
              priority
            />
          </motion.div>
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="nav-links">
              <motion.li variants={fadeInVariants}><a href="#about">ABOUT</a></motion.li>
              <motion.li variants={fadeInVariants}><a href="https://2025.eurekahacks.ca/">LAST YEAR</a></motion.li>
              <motion.li variants={fadeInVariants}><a href="mailto:hello@eurekahacks.ca">CONTACT</a></motion.li>
            </ul>
          </motion.nav>
        </div>
        <motion.div
          className="social-icons"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://instagram.com/eureka_hacks"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/socials/insta.svg" alt="Instagram" width={24} height={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/company/eurekahacks"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/socials/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </motion.a>
          <motion.a
            href="https://github.com/eurekahacks"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/socials/github.svg" alt="GitHub" width={24} height={24} />
          </motion.a>
          <motion.a
            href="mailto:hello@eurekahacks.ca"
            variants={fadeInVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/socials/email.svg" alt="Email" width={24} height={24} />
          </motion.a>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <div className="bolt-container">
          <Image
            src="/socials/bolt.svg"
            alt="Bolt"
            width={0}
            height={0}
            className="bolt-icon"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>

        {/* Main title */}
        <motion.h1
          className="main-title"
          variants={popVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          EUREKAHACKS
        </motion.h1>

        {/* Event details */}
        <motion.div
          className="event-details"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="event-detail"
            variants={fadeInVariants}
          >
            MARCH 2026
          </motion.div>
          <motion.div
            className="event-detail"
            variants={fadeInVariants}
          >
            LOCATION TBD
          </motion.div>
        </motion.div>

        {/* Central logo */}
        <motion.div
          className="central-logo"
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/socials/logo.png"
            alt="EUREKAHACKS Central Logo"
            width={160}
            height={160}
            priority
          />
        </motion.div>

        {/* Email signup form */}
        <motion.form
          className="signup-form"
          onSubmit={handleEmailSubmit}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <motion.h2
            className="signup-title"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            SIGN UP FOR UPDATES
          </motion.h2>
          <motion.div
            className="email-input-container"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.0 }}
          >
            <input
              type="email"
              className="email-input"
              placeholder="ENTER YOUR EMAIL ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <Image src="/socials/send.svg" alt="Send" width={20} height={20} />
              )}
            </motion.button>
          </motion.div>
          {message && (
            <motion.div
              className={`message ${isError ? 'error' : 'success'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {message}
            </motion.div>
          )}
        </motion.form>
      </main>

      {/* Footer */}
      <motion.footer
        className="footer"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        <motion.p
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3 }}
        >
          INTERESTED IN SPONSORING? CONTACT HELLO@EUREKAHACKS.CA
        </motion.p>
      </motion.footer>
    </div>
  );
}