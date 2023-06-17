import { Link } from 'react-router-dom';
import { paths } from './paths';

// todo: github doesnt work with SPA
const NotFoundPage = () => {
  return (
    <div>
      hey, no page here
      <Link to={paths.home()}>go home</Link>
    </div>
  )
}

export default NotFoundPage;
