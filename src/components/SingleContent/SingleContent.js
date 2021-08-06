import { img_300, unavailable } from '../../config/config'
import './SingleContent.css'
const SingleContent = (
    {id,
    poster,
    title,
    date,
    media_type,
    vote_average}) => {

    return (
      <div className='media'>
        <img
          className='poster'
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt=''
        />
        <b className='title'>{title}</b>
        <div className='subtitle'>
          <span>{media_type === 'tv' ? 'TV series' : 'Movie'}</span>
          <span>{date}</span>
        </div>
      </div>
    )
}

export default SingleContent
