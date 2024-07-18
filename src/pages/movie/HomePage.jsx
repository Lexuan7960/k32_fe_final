import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies, getMoviesFromStore } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'
import { Spin } from 'antd'
import MovieListing from '../../components/MovieListing/MovieListing'

function HomePage() {
  const dispatch = useDispatch()
  const  {movies}  = useSelector(getMoviesFromStore)

  const fetchMovies = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if(accessToken) {
      dispatch(getMovies(accessToken))
    }
  }

useEffect(() => {
  fetchMovies()
 }, [localStorage.getItem(ACCESS_TOKEN)])

  return (
    <section>
      <h1 className='title'>Movies</h1>
      {
        movies?.length === 0 ?(<div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Spin size='large' />
        </div>) : (<MovieListing movies={movies} />)
      }
    </section>
  )
}

export default HomePage
