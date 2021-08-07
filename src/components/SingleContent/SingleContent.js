import { Badge } from '@material-ui/core'
import { img_300, unavailable } from '../../config/config'
import ContentModal from '../ContentModal/ContentModal'
import './SingleContent.css'
const SingleContent = (
    {id,
    poster,
    title,
    date,
    media_type,
    vote_average}) => {

    return (
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          color={vote_average > 7 ? 'primary' : 'secondary'}
        />
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
      </ContentModal>
    )
}

export default SingleContent
