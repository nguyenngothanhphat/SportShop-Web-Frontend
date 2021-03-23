import React from 'react';
import StarRating from 'react-star-ratings';

const showAverageRating = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings
    let total = []
    let length = ratingsArray.length

    ratingsArray.map((rating) => total.push(rating.start))
    let totalReduced = total.reduce((p, n) => p + n, 0);
  }
}

export default showAverageRating;