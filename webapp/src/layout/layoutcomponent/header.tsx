import { FC, useState } from "react";
import Switcher from "./switcher";
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
