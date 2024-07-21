import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateMovie from '../../components/UpdateMovie/UpdateMovie'
import './DashboardAdmin.scss'
import CreateMovie from '../../components/CreateMovie/CreateMovie'
import { deleteMovie, getMovies, getMoviesFromStore, removeSelectedMovie } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'



function DashboardAdmin() {
  const { movies } = useSelector(getMoviesFromStore)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  console.log("movies in dashboard", movies)

const [isCreateNewMovie, setIsCreateNewMovie] = useState(false)
const [isUpdateMovie, setIsUpdateMovie] = useState(false)
const [idSelectedMovie, setIdSelectedMovie] = useState('')

const selectedMovie = useMemo(() => {
  return movies.find(item => item._id === idSelectedMovie) || {}
}, [movies, idSelectedMovie])

const handleDeleteMovie = async (movieId) => {
  if(confirm('Are you sure you want to delete this movie?')) {
  setLoading(true)
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
    await dispatch(deleteMovie({ 
      accessToken,
      id: movieId
     }))
    await dispatch(getMovies(accessToken))
    setLoading(false)
    setIdSelectedMovie('')
  }
}
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20,
    }}>
      <h1>Admin dashboard</h1>
      <button
      className='new-movie-btn'
      onClick={() => setIsCreateNewMovie(true)}
      >New Movie
      </button>
      {
        isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie} />
      }
      {
        isUpdateMovie && <UpdateMovie
        setIdSelectedMovie={setIdSelectedMovie}
        selectedMovie={selectedMovie}
        setIsUpdateMovie={setIsUpdateMovie}
         />
      }
      <section>
        <div className='table-header'>
            <p>Id</p>
            <p>Title</p>
            <p>Year</p>
            <p>Poster</p>
            <p>Actions</p>
        </div>
        <>
        {
          movies?.length && movies?.map(movie => {
              const { _id, title, year, poster } = movie
              return (
                <div key={_id} className='table-body'>
                  <p className='table-data'>{_id}</p>
                  <p className='table-data'>{title}</p>
                  <p className='table-data'>{year}</p>
                  <p className='table-data'>
                    <img src={poster} alt='movie-poster' className='table-data-poster'/>
                  </p>
                  <p className='table-data'>
                    <button style={{
                      cursor: 'pointer',
                      padding: 3,
                    }} onClick={() => {
                      setIsUpdateMovie(true)
                      setIdSelectedMovie(_id)
                    }}>
                      Edit
                    </button>
                    <button style={{
                      cursor: 'pointer',
                      padding: 3,
                    }} onClick={() => handleDeleteMovie(_id)}>
                      Delete
                    </button>
                  </p>
                </div>
              )
          })
        }
        </>
      </section>
      <div className='table-heading'>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  )
}

export default DashboardAdmin
