import { Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './CreateMovie.scss'
import { createNewMovie, getMovies } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'

function CreateMovie(setIsCreateNewMovie) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [ formData, setFormData] = useState({
    title:'',
    year:'',
    poster: '',
  })

  const handleCreateNewMovie = async (e) => {
    e.preventDefault()
    setLoading(true)
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    await dispatch(createNewMovie({
      accessToken,
      newMovie: formData,
    }))
    await dispatch(getMovies(accessToken))
    setLoading(false)
  }
  return (
    <section>
      <h1 className='title'> Create a new Movie</h1>
      <form onSubmit={handleCreateNewMovie} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 500,
        maxWidth: 500,
      }}>
        <input type='text'
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value })}
        placeholder='Movie Title'
        className='input'
        autoFocus
        />
        <input type='text'
        value={formData.year}
        onChange={e => setFormData({...formData, year: e.target.value})}
        placeholder='Year release'
        className='input'
        />
        <textarea 
        type='text'
        rows={4}
        value={formData.poster}
        onChange={e => setFormData({...formData, poster: e.target.value})}
        placeholder='Movie Poster'
        className='input'
        />
        <div style={{
          display: 'flex',
          justifyContent:'center',
          gap: 10,
          marginTop: 20,
          width: '100%',
        }}>
          <button className='btn btn-submit' type='Submit' onClick={handleCreateNewMovie}>
            Create
            {loading && <Spin size='small' style={{marginLeft: 5 }} />}
          </button>
          <button className='btn btn-cancel' onClick={() => setIsCreateNewMovie(false)}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateMovie
