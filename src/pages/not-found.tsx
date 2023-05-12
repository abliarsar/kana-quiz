import { Link } from 'react-router-dom';
import { paths } from './paths';

const NotFoundPage = () => {
  return (
    <div>
      hey, no page here
      <Link to={paths.home()}>go home</Link>
    </div>
  )
}

export default NotFoundPage;
