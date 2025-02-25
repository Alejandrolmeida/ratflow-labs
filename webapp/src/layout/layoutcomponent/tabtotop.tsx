import { FC, Fragment, useEffect } from 'react';

interface ComponentProps { }

const Tabtotop: FC<ComponentProps> = () => {
  const screenUp = () => {
		window.scrollTo(0, 0);
	  };
	
	  useEffect(() => {
		const handleScroll = () => {
		  const color = document.getElementsByClassName('scrollToTop')[0] as HTMLElement;
		  if (color) {
			window.scrollY > 100 ? (color.style.display = 'flex') : (color.style.display = 'none');
		  }
		};
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);
  return (
    <Fragment>
      <div className="scrollToTop" onClick={screenUp}>
        <span className="arrow"><i className="ri-arrow-up-s-fill fs-20"></i></span>
      </div>
    </Fragment>
  );
};

export default Tabtotop;