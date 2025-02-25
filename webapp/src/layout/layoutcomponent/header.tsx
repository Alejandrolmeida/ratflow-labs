import { FC, useState } from "react";
import Switcher from "./switcher";
// import { imagesData } from "../../common/commonimages";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "../../common/redux/action";

interface ComponentProps {}

const Header: FC<ComponentProps> = () => {
  //Switcher
  const [showSwitcher, setShowSwitcher] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left align-items-center">
            {/* logo */}
            {/* <div className="header-element">
            
              <div className="horizontal-logo">
                <Link
                  to={`${import.meta.env.BASE_URL}`}
                  className="header-logo"
                >
                  <img
                    src={imagesData("desktoplogo")}
                    alt="logo"
                    className="desktop-logo"
                  />
                  <img
                    src={imagesData("togglelogo")}
                    alt="logo"
                    className="toggle-logo"
                  />

                  <img
                    src={imagesData("desktopdark")}
                    alt="logo"
                    className="desktop-dark"
                  />
                  <img
                    src={imagesData("toggledark")}
                    alt="logo"
                    className="toggle-dark"
                  />
                  <img
                    src={imagesData("desktopwhite")}
                    alt="logo"
                    className="desktop-white"
                  />
                  <img
                    src={imagesData("togglewhite")}
                    alt="logo"
                    className="toggle-white"
                  />
                </Link>
              </div>
            </div> */}
            <h2>🐀⚡<span className="text-danger">RatFlow</span><span className="text-warning"> Labs</span></h2>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light ">
          <h5>🤖 <span className="text-info">Microsoft PromptFlow</span> <span className="text-warning">Demo</span> 🚀</h5>
          </nav>
          <div className="header-content-right">
            {/* Switcher */}
            <div className="header-element">
              <Switcher
                show={showSwitcher}
                onClose={() => setShowSwitcher(false)}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Header);
