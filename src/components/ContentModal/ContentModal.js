import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { img_500, unavailable,unavailableLandscape } from '../../config/config'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { YouTube } from '@material-ui/icons'
import "./ContentModal.css"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
      width: "90%",
      height:"80%",
    backgroundColor:"#39445a",
    border: '2px solid #282c34',
    color: 'white',
    borderRadius:10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}))

export default function ContentModal({children,id,media_type} ) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
const fetchData = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )

  setContent(data)
  // console.log(data);
}

const fetchVideo = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )

  setVideo(data.results[0]?.key)
}

useEffect(() => {
  fetchData()
  fetchVideo()
  // eslint-disable-next-line
}, [])


  return (
    <div>
      <div
        type='button'
        className='media'
        style={{ cursor: 'pointer' }}
        color='inherit'
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className='ContentModal'>
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className='ContentModal__portrait'
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className='ContentModal__landscape'
                />
                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      '-----'
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}

                  <span className='ContentModal__description'>
                    {content.overview}
                  </span>

                  <div>
                    
                  </div>

                  <Button
                    variant='contained'
                    startIcon={<YouTube />}
                    color='secondary'
                    target='__blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  )
}
