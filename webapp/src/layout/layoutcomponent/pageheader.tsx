import { FC, Fragment } from 'react';
import { Breadcrumb } from 'react-bootstrap';

interface ComponentProps {
  title: string;
  heading?: string;
  active: string;
}

const Pageheader: FC<ComponentProps> = ({ title, heading, active }) => {
  return (
    <Fragment>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <h1 className="page-title fw-semibold fs-18 mb-0">{title}</h1>
        <div className="ms-md-1 ms-0">
          <nav>
            <Breadcrumb as="ol" className="mb-0 ps-0">
              {heading && (
                <Breadcrumb.Item as="li" className="fs-15" href="#!">
                  {heading}
                </Breadcrumb.Item>
              )}
              <Breadcrumb.Item as='li' aria-current="page" active>
                {active}
              </Breadcrumb.Item>
            </Breadcrumb>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Pageheader;