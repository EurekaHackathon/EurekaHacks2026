"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import "./faq-styles.css"

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is a hackathon?",
    answer:
      "A hackathon is an event where participants collaborate intensively to create innovative solutions or prototypes. It's focused on coding, problem-solving, and creativity around a specific challenge or theme.",
  },
  {
    question: "Who can participate?",
    answer:
      "EurekaHacks is open exclusively to high school students, no prior experience required! Whether you're a seasoned hacker or a first-time coder, we welcome you to join us for a day of learning, building, and fun!",
  },
  {
    question: "What if I don't know how to code?",
    answer:
      "No problem! Hackathons are a great place to learn new skills, meet new people, and have fun. We'll have workshops, mentors, and resources available to help you get started and build your project.",
  },
  {
    question: "What if I don't have a team?",
    answer:
      "Don't worry! We'll have team building activities to help you find your coding squad! There is a limit of four people per team.",
  },
  {
    question: "How much does it cost?",
    answer:
      "EurekaHacks is completely free for all participants! We'll provide everything you need to participate, including workshops, mentors, and of course, free food!",
  },
  {
    question: "What should I bring?",
    answer:
      "You should bring your laptop, charger, and any other tech or hardware you need to work on your project. We also recommend bringing a water bottle and snacks.",
  },
  {
    question: "How do I register?",
    answer:
      "Registration for EurekaHacks is now open! Apply now on our website! Check our website and social media for updates on registration dates and deadlines.",
  },
  {
    question: "What's in it for me?",
    answer:
      "You'll have the opportunity to meet some of the coolest people ever! There'll be workshops, fun events, free food, swag, and epic prizes!",
  },
];


const cardsContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const bobVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function FAQSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? faqData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === faqData.length - 1 ? 0 : prev + 1
    );
  };

  const visibleFAQs = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % faqData.length;
    visibleFAQs.push({ ...faqData[index], id: index });
  }

  return (
    <div className="w-screen h-screen !p-12">
      <div id="faq" className="border-12 border-white shadow-2xl w-full p-6 bg-[#0a1c29]">
          <h2 className="faq-title">FAQ</h2>

          <div className="faq-items-container">
            <motion.button
              onClick={handlePrev}
              className="faq-nav-button"
              aria-label="Previous FAQ"
              variants={bobVariants}
              animate="animate"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/landing/left.webp" alt="Previous" />
            </motion.button>

            <motion.div
              className="faq-cards"
              variants={cardsContainerVariants}
              initial="initial"
              animate="animate"
              key={currentIndex}
            >
              {visibleFAQs.map((faq) => (
  <motion.div
    key={faq.id}
    className="faq-card"
    variants={cardVariants}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      e.currentTarget.style.setProperty("--x", `${x}px`);
      e.currentTarget.style.setProperty("--y", `${y}px`);
    }}
  >
    <div className="faq-card--blur">
      <h3 className="faq-question">{faq.question}</h3>
      <p className="faq-answer">{faq.answer}</p>
    </div>
    <div className="faq-card--sharp">
      <h3 className="faq-question">{faq.question}</h3>
      <p className="faq-answer">{faq.answer}</p>
    </div>
    <div className="faq-card-visible">
      <h3 className="faq-question">{faq.question}</h3>
      <p className="faq-answer">{faq.answer}</p>
    </div>
  </motion.div>
))}

            </motion.div>

            <motion.button
              onClick={handleNext}
              className="faq-nav-button"
              aria-label="Next FAQ"
              variants={bobVariants}
              animate="animate"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/landing/right.webp" alt="Next" />
            </motion.button>
          </div>

          <div className="faq-illustration">
            <img src="/mascots/minions_frame1.png" alt="FAQ Illustration" />
          </div>
      </div>
    </div>
  );
}