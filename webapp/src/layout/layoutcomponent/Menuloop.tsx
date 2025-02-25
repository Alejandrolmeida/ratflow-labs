import { FC, Fragment } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Menuitemtype } from '../../common/sidemenu';

type MenuComponentProps = {

    MENUITEMS: Menuitemtype;

    toggleSidemenu: (event: React.MouseEvent, item: Menuitemtype) => void;

    level: number;

};

const Menuloop: FC<MenuComponentProps> = ({ MENUITEMS, toggleSidemenu, level }: any) => {
    return (
        <Fragment>
            <Link to="#!" className={`side-menu__item ${MENUITEMS?.selected ? "active" : ""}`} onClick={(event) => { event.preventDefault(); toggleSidemenu(event, MENUITEMS); }}>


                {/* In case of doublemenu style the icon contains tooltip here is the style for sub menu items */}

                {((level <= 1) && MENUITEMS.icon) && (
                    (localStorage.nowaverticalstyles === 'doublemenu') && (localStorage.nowalayout !== 'horizontal') ? (
                        <div className="custom-tooltip">
                            <OverlayTrigger placement={localStorage.nowartl ? 'left' : 'right'} overlay={<Tooltip>{MENUITEMS.title}</Tooltip>}>
                                {MENUITEMS.icon}
                            </OverlayTrigger>
                        </div>
                    ) : (
                        MENUITEMS.icon
                    )
                )}


                <span className={`${level === 1 ? "side-menu__label" : ""}`}>{MENUITEMS.title}</span>

                <i className="fe fe-chevron-right side-menu__angle"></i>

            </Link>

            <ul className={`slide-menu child${level}  
                          ${MENUITEMS.active ? "double-menu-active" : ""} 
                          ${MENUITEMS?.dirchange ? "force-left" : ""}  `}
                          style={MENUITEMS.active ? { display: "block" } : { display: "none" }}>

                {level <= 1 ? <li className='slide side-menu__label1'> <Link to="#!">{MENUITEMS.title}</Link> </li> : ""}

                {MENUITEMS.children?.map((firstlevel: Menuitemtype) => (
                    <li className={`${firstlevel.menutitle ? "slide__category" : ""}
                             ${firstlevel?.type === "empty" ? "slide" : ""} 
                            ${firstlevel?.type === "link" ? "slide" : ""} 
                            ${firstlevel?.type === "sub" ? "slide has-sub" : ""} 
                            ${firstlevel?.active ? "open" : ""} 
                            ${firstlevel?.selected ? "active" : ""}`}
                            key={Math.random()}>

                        {/* if it is a single link like Dashboard or Widgets or landingpage */}

                        {firstlevel.type === "link" ? (
                            <Link to={firstlevel.path || "#!"} className={`side-menu__item ${firstlevel.selected ? "active" : ""}`}>
                                {firstlevel.icon} <span className="">{firstlevel.title}</span>
                            </Link>
                        ) : ""}

                        {/* if empty type  */}

                        {firstlevel.type === "empty" ? (
                            <Link to="#!" className='side-menu__item'>
                                {firstlevel.icon} <span className=""> {firstlevel.title} </span>
                            </Link>
                        ) : ""}

                        {/* //for sub level refer the Menuloop.tsx component */}


                        {firstlevel.type === "sub" ? (
                            <Menuloop MENUITEMS={firstlevel} toggleSidemenu={toggleSidemenu} level={level + 1} />
                        ) : ""}

                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default Menuloop;