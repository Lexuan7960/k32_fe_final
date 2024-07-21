import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMovies, removeSelectedMovie, updateMovie } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import './UpdateMovie.scss'

function UpdateMovie({ selectedMovie, setIsUpdateMovie, accessToken }) {
  const [ loading, setLoading ] = useState(false)
  const dispatch = useDispatch()
  const { id } =  useParams()
  const [ formData, setFormData ] = useState({
    title: selectedMovie?.title || '',
    year: selectedMovie?.year || '',
    poster: selectedMovie?.poster || '',

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    setLoading(true)
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    console.log("ID", selectedMovie?._id)
    await dispatch(updateMovie({
      accessToken,
      id: selectedMovie?._id,
      updateData: formData,
    }))
    await dispatch(getMovies(accessToken))
    setLoading(false)
  }


  return (
    <section>
      <h1 className='title'>Update Movie</h1>
      <form onSubmit={handleUpdateMovie} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 500,
        maxWidth: 500,
        }}>
          <input
          type='input'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          required
          className='input'
        />
        <input
          type='input'
          name='year'
          value={formData.year}
          onChange={handleChange}
          placeholder='Year'
          required
          className='input'
        />
        <textarea
          type='text'
          name='poster'
          rows={4}
          value={formData.poster}
          onChange={handleChange}
          placeholder='Poster URL'
          required
          className='input'
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 5,
          marginTop: 10,
          widows: '100%',
        }}
        >
        <button type='submit' className='btn btn-submit'>
          Update
          {loading && <Spin size='small' style={{marginLeft: 5 }} />}
        </button>
        <button type='button' className='btn btn-cancel' onClick={() => setIsUpdateMovie(false)}>
          Cancel
        </button>
          </div>
        </form>
    </section>
  )
}

export default UpdateMovie
