import React from 'react'
import './MovieDetail.scss'
import { Link } from 'react-router-dom'

function MovieDetail({ movie }) {
  
  return (
   <div className='movie-section'>
      <div className='section-left'>
        <div className='movie-title'>
          {movie?.title}
          </div>
        <div>
        <img src={movie?.poster} />
        </div>
      </div>
      <div>
      <span>Year: </span>{movie?.year}
      </div>
      <div className='section-right'>
      <p><Link to={'/'} style={{
        color: 'blue',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}>Back</Link></p>
      </div>
    </div>
  )
}

export default MovieDetail
