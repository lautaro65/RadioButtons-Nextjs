"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StarProps {
  filled: boolean
  hovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

const Star: React.FC<StarProps> = ({ filled, hovered, onMouseEnter, onMouseLeave, onClick }) => (
  <motion.svg
    className="w-12 h-12 cursor-pointer"
    viewBox="0 0 24 24"
    fill={filled ? "#fbbf24" : "none"}
    stroke={hovered ? "#fbbf24" : "#4b5563"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <AnimatePresence>
      {filled && (
        <motion.polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          fill="#fbbf24"
        />
      )}
    </AnimatePresence>
  </motion.svg>
)

const StarRating: React.FC = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center justify-center p-8 bg-gray-800 rounded-xl shadow-2xl">
      <div className="relative">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              hovered={star <= hover}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <AnimatePresence>
          {rating > 0 && (
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {rating} / 5
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default StarRating

