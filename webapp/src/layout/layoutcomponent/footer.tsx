import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Footer: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span> Copyright © <span id="year">{new Date().getFullYear()}</span> <Link
            to="#" className="text-primary">Nowa</Link>.
            Designed with <span className="bi bi-heart-fill text-danger"></span> by <Link to="#">
              <span className="fw-semibold text-decoration-underline">Spruko</span>
            </Link> All
            rights
            reserved
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;