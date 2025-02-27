import { FC, Fragment, useEffect } from 'react';
import { Button, Nav, Offcanvas, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap';
import Themeprimarycolor, * as Switcherdata from '../../common/Switcherdata'
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { ThemeChanger } from '../../common/redux/action';
import { Link } from 'react-router-dom';

type SwitcherProps = {
    show: boolean;
    onClose: () => void;
    local_varaiable: any;
    ThemeChanger: any;
}

const Switcher: FC<SwitcherProps> = ({ local_varaiable, ThemeChanger, show, onClose }) => {

    useEffect(() => {
        Switcherdata.LocalStorageBackup(ThemeChanger);
    }, []);


    const generateCustomStyles = () => {
        let styles = '';
    
        if (localStorage.getItem("darkBgRGB1") && localStorage.getItem("darkBgRGB2")) {
          styles += `--body-bg-rgb:${local_varaiable.bodybg};`;
          styles += `--body-bg-rgb2:${local_varaiable.darkbg};`;
          styles += `--light-rgb:${local_varaiable.darkbg};`;
          styles += `--form-control-bg:rgb(${local_varaiable.darkbg});`;
          styles += `--input-border:rgba(${local_varaiable.inputBorder});`;
        }
    
        if (localStorage.getItem("primaryRGB")) {
          styles += `--primary-rgb:${local_varaiable.colorprimaryrgb};`;
        }
    
        return styles;
      };
    
      const customStyles: any = generateCustomStyles();

    return (
        <Fragment>
            <Helmet>
                <html dir={local_varaiable.dir}
                    data-theme-mode={local_varaiable.datathememode}
                    data-header-styles={local_varaiable.dataheaderstyles}
                    data-vertical-style={local_varaiable.dataverticalstyle}
                    data-nav-layout={local_varaiable.datanavlayout}
                    data-menu-styles={local_varaiable.datamenustyles}
                    data-toggled={local_varaiable.toggled}
                    data-nav-style={local_varaiable.datanavstyle}
                    hor-style={local_varaiable.horstyle}
                    data-page-style={local_varaiable.datapagestyle}
                    data-width={local_varaiable.datawidth}
                    data-menu-position={local_varaiable.datamenuposition}
                    data-header-position={local_varaiable.dataheaderposition}
                    data-icon-overlay={local_varaiable.iconoverlay}
                    data-bg-img={local_varaiable.bgimg}
                    data-icon-text={local_varaiable.icontext}
                    style={customStyles}
                >
                </html>
            </Helmet>
            <Offcanvas show={show} onHide={onClose} placement="end" id="switcher-canvas" aria-labelledby="offcanvasRightLabel">
                <Offcanvas.Header className='border-bottom' closeButton>
                    <Offcanvas.Title className='text-default'>Switcher</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Nav variant="" className="border-bottom border-block-end-dashed nav-justified">
                            <Nav.Item><Nav.Link eventKey="first">Theme Styles</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="second">Theme Colors</Nav.Link></Nav.Item>
                        </Nav>
                        <Tab.Content id="nav-tabContent">
                            <Tab.Pane eventKey="first" id="switcher-home" className='border-0'>
                                <div className="">
                                    <p className="switcher-style-head">Theme Color Mode:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-light-theme">
                                                    Light
                                                </label>
                                                <input className="form-check-input" type="radio" name="theme-style" id="switcher-light-theme" checked={local_varaiable.datathememode === 'light'} onChange={(_e) => { }} onClick={() => Switcherdata.Light(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-dark-theme">
                                                    Dark
                                                </label>
                                                <input className="form-check-input" type="radio" name="theme-style" id="switcher-dark-theme" checked={local_varaiable.datathememode === 'dark'} onChange={(_e) => { }} onClick={() => Switcherdata.Dark(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Directions:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-ltr">
                                                    LTR
                                                </label>
                                                <input className="form-check-input" type="radio" name="direction" id="switcher-ltr" checked={local_varaiable.dir === 'ltr'} onChange={(_e) => { }} onClick={() => { Switcherdata.Ltr(ThemeChanger); }} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-rtl">
                                                    RTL
                                                </label>
                                                <input className="form-check-input" type="radio" name="direction" id="switcher-rtl" checked={local_varaiable.dir === 'rtl'} onChange={(_e) => { }} onClick={() => { Switcherdata.Rtl(ThemeChanger); }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Navigation Styles:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-vertical">
                                                    Vertical
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-style" id="switcher-vertical" checked={local_varaiable.datanavlayout === 'vertical'} onChange={(_e) => { }} onClick={() => Switcherdata.Vertical(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-horizontal">
                                                    Horizontal
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-style" id="switcher-horizontal" checked={local_varaiable.datanavlayout === 'horizontal'} onChange={(_e) => { }} onClick={() => Switcherdata.HorizontalClick(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="navigation-menu-styles">
                                    <p className="switcher-style-head">Vertical & Horizontal Menu Styles:</p>
                                    <div className="row switcher-style gx-0 gy-2">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-menu-click">
                                                    Menu Click
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-menu-styles" id="switcher-menu-click" checked={local_varaiable.datanavstyle === 'menu-click'} onChange={(_e) => { }} onClick={() => Switcherdata.Menuclick(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-menu-hover">
                                                    Menu Hover
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-menu-styles" id="switcher-menu-hover" checked={local_varaiable.datanavstyle === 'menu-hover'} onChange={(_e) => { }} onClick={() => Switcherdata.MenuHover(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-icon-click">
                                                    Icon Click
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-menu-styles" id="switcher-icon-click" checked={local_varaiable.datanavstyle === 'icon-click'} onChange={(_e) => { }} onClick={() => Switcherdata.IconClick(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-icon-hover">
                                                    Icon Hover
                                                </label>
                                                <input className="form-check-input" type="radio" name="navigation-menu-styles" id="switcher-icon-hover" checked={local_varaiable.datanavstyle === 'icon-hover'} onChange={(_e) => { }} onClick={() => Switcherdata.IconHover(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidemenu-layout-styles">
                                    <p className="switcher-style-head">Sidemenu Layout Styles:</p>
                                    <div className="row switcher-style gx-0 gy-2">
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-default-menu">
                                                    Default Menu
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-default-menu" checked={local_varaiable.dataverticalstyle === 'default'} onChange={(_e) => { }} onClick={() => Switcherdata.Defaultmenu(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-closed-menu">
                                                    Closed Menu
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-closed-menu" checked={local_varaiable.dataverticalstyle === 'closed'} onChange={(_e) => { }} onClick={() => Switcherdata.Closedmenu(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-icontext-menu">
                                                    Icon Text
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-icontext-menu" checked={local_varaiable.dataverticalstyle === 'icontext'} onChange={(_e) => { }} onClick={() => Switcherdata.iconText(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-icon-overlay">
                                                    Icon Overlay
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-icon-overlay" checked={local_varaiable.dataverticalstyle === 'overlay'} onChange={(_e) => { }} onClick={() => Switcherdata.iconOverayFn(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-detached">
                                                    Detached
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-detached" checked={local_varaiable.dataverticalstyle === 'detached'} onChange={(_e) => { }} onClick={() => Switcherdata.DetachedFn(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-double-menu">
                                                    Double Menu
                                                </label>
                                                <input className="form-check-input" type="radio" name="sidemenu-layout-styles" id="switcher-double-menu" checked={local_varaiable.dataverticalstyle === 'doublemenu'} onChange={(_e) => { }} onClick={() => Switcherdata.DoubletFn(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Page Styles:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-regular">
                                                    Regular
                                                </label>
                                                <input className="form-check-input" type="radio" name="page-styles" id="switcher-regular" checked={local_varaiable.datapagestyle === 'regular'} onChange={(_e) => { }} onClick={() => Switcherdata.Regular(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-classic">
                                                    Classic
                                                </label>
                                                <input className="form-check-input" type="radio" name="page-styles" id="switcher-classic" checked={local_varaiable.datapagestyle === 'classic'} onChange={(_e) => { }} onClick={() => Switcherdata.Classic(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-modern">
                                                    Modern
                                                </label>
                                                <input className="form-check-input" type="radio" name="page-styles" id="switcher-modern" checked={local_varaiable.datapagestyle === 'modern'} onChange={(_e) => { }} onClick={() => Switcherdata.Modern(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Layout Width Styles:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-full-width">
                                                    Full Width
                                                </label>
                                                <input className="form-check-input" type="radio" name="layout-width" id="switcher-full-width" checked={local_varaiable.datawidth === 'fullwidth'} onChange={(_e) => { }} onClick={() => Switcherdata.Fullwidth(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-boxed">
                                                    Boxed
                                                </label>
                                                <input className="form-check-input" type="radio" name="layout-width" id="switcher-boxed" checked={local_varaiable.datawidth === 'boxed'} onChange={(_e) => { }} onClick={() => Switcherdata.Boxed(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Menu Positions:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-menu-fixed">
                                                    Fixed
                                                </label>
                                                <input className="form-check-input" type="radio" name="menu-positions" id="switcher-menu-fixed" checked={local_varaiable.datamenuposition === 'fixed'} onChange={(_e) => { }} onClick={() => Switcherdata.FixedMenu(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-menu-scroll">
                                                    Scrollable
                                                </label>
                                                <input className="form-check-input" type="radio" name="menu-positions" id="switcher-menu-scroll" checked={local_varaiable.datamenuposition === 'scrollable'} onChange={(_e) => { }} onClick={() => Switcherdata.scrollMenu(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="switcher-style-head">Header Positions:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-header-fixed">
                                                    Fixed
                                                </label>
                                                <input className="form-check-input" type="radio" name="header-positions" id="switcher-header-fixed" checked={local_varaiable.dataheaderposition === 'fixed'} onChange={(_e) => { }} onClick={() => Switcherdata.Headerpostionfixed(ThemeChanger)} />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-header-scroll">
                                                    Scrollable
                                                </label>
                                                <input className="form-check-input" type="radio" name="header-positions" id="switcher-header-scroll" checked={local_varaiable.dataheaderposition === 'scrollable'} onChange={(_e) => { }} onClick={() => Switcherdata.Headerpostionscroll(ThemeChanger)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="">
                                    <p className="switcher-style-head">Loader:</p>
                                    <div className="row switcher-style gx-0">
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-loader-enable">
                                                    Enable
                                                </label>
                                                <input className="form-check-input" type="radio" name="page-loader" id="switcher-loader-enable" />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check switch-select">
                                                <label className="form-check-label" htmlFor="switcher-loader-disable">
                                                    Disable
                                                </label>
                                                <input className="form-check-input" type="radio" name="page-loader" id="switcher-loader-disable" checked />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" id="switcher-profile" className='border-0'>
                                <div className="theme-colors">
                                    <p className="switcher-style-head">Menu Colors:</p>
                                    <div className="d-flex switcher-style pb-2">
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Light Menu</Tooltip>}>
                                                <input className="form-check-input color-input color-white" type="radio" name="menu-colors" id="switcher-menu-light" defaultChecked={local_varaiable.datamenustyles == 'light'} onChange={(_e) => { }} onClick={() => Switcherdata.lightMenu(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Dark Menu</Tooltip>}>
                                                <input className="form-check-input color-input color-dark" type="radio" name="menu-colors" id="switcher-menu-dark" defaultChecked={local_varaiable.datamenustyles == 'dark'} onChange={(_e) => { }} onClick={() => Switcherdata.darkMenu(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Color Menu</Tooltip>}>
                                                <input className="form-check-input color-input color-primary" type="radio" name="menu-colors" id="switcher-menu-primary" defaultChecked={local_varaiable.datamenustyles == 'color'} onClick={() => Switcherdata.colorMenu(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Gradient Menu</Tooltip>}>
                                                <input className="form-check-input color-input color-gradient" type="radio" name="menu-colors" id="switcher-menu-gradient" defaultChecked={local_varaiable.datamenustyles == 'gradient'} onChange={(_e) => { }} onClick={() => Switcherdata.gradientMenu(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Transparent Menu</Tooltip>}>
                                                <input className="form-check-input color-input color-transparent" type="radio" name="menu-colors" id="switcher-menu-transparent" defaultChecked={local_varaiable.datamenustyles == 'transparent'} onChange={(_e) => { }} onClick={() => Switcherdata.transparentMenu(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-3 text-muted fs-11">Note:If you want to change color Menu dynamically change from below Theme Primary color picker</div>
                                </div>
                                <div className="theme-colors">
                                    <p className="switcher-style-head">Header Colors:</p>
                                    <div className="d-flex switcher-style pb-2">
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Light Header</Tooltip>}>
                                                <input className="form-check-input color-input color-white" type="radio" name="header-colors" id="switcher-header-light" defaultChecked={local_varaiable.dataheaderstyles === 'light'} onChange={(_e) => { }} onClick={() => Switcherdata.lightHeader(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Dark Header</Tooltip>}>
                                                <input className="form-check-input color-input color-dark" type="radio" name="header-colors" id="switcher-header-dark" defaultChecked={local_varaiable.dataheaderstyles === 'dark'} onChange={(_e) => { }} onClick={() => Switcherdata.darkHeader(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Color Header</Tooltip>}>
                                                <input className="form-check-input color-input color-primary" type="radio" name="header-colors" id="switcher-header-primary" defaultChecked={local_varaiable.dataheaderstyles === 'color'} onChange={(_e) => { }} onClick={() => Switcherdata.colorHeader(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Gradient Header</Tooltip>}>
                                                <input className="form-check-input color-input color-gradient" type="radio" name="header-colors" id="switcher-header-gradient" defaultChecked={local_varaiable.dataheaderstyles === 'gradient'} onChange={(_e) => { }} onClick={() => Switcherdata.gradientHeader(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <OverlayTrigger overlay={<Tooltip>Transparent Header</Tooltip>}>
                                                <input className="form-check-input color-input color-transparent" type="radio" name="header-colors" id="switcher-header-transparent" defaultChecked={local_varaiable.dataheaderstyles === 'transparent'} onChange={(_e) => { }} onClick={() => Switcherdata.transparentHeader(ThemeChanger)} />
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-3 text-muted fs-11">Note:If you want to change color Header dynamically change from below Theme Primary color picker</div>
                                </div>
                                <div className="theme-colors">
                                    <p className="switcher-style-head">Theme Primary:</p>
                                    <div className="d-flex flex-wrap align-items-center switcher-style">
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-primary-1" type="radio" name="theme-primary" id="switcher-primary" checked={local_varaiable.colorprimaryrgb === '58, 88, 146'} onClick={() => Switcherdata.primaryColor1(ThemeChanger)} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-primary-2" type="radio" name="theme-primary" id="switcher-primary1" checked={local_varaiable.colorprimaryrgb === '92, 144, 163'} onClick={() => Switcherdata.primaryColor2(ThemeChanger)} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-primary-3" type="radio" name="theme-primary" id="switcher-primary2" checked={local_varaiable.colorprimaryrgb === '161, 90, 223'} onClick={() => Switcherdata.primaryColor3(ThemeChanger)} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-primary-4" type="radio" name="theme-primary" id="switcher-primary3" checked={local_varaiable.colorprimaryrgb === '78, 172, 76'} onClick={() => Switcherdata.primaryColor4(ThemeChanger)} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-primary-5" type="radio" name="theme-primary" id="switcher-primary4" checked={local_varaiable.colorprimaryrgb === '223, 90, 90'} onClick={() => Switcherdata.primaryColor5(ThemeChanger)} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select ps-0 mt-1 color-primary-light">
                                            {/* <div className="theme-container-primary"></div>
                                            <div className="pickr-container-primary"></div> */}
                                            <div className='pickr-container-primary'>
                                                <div className='pickr'>
                                                    <Button className='pcr-button' onClick={(ele: any) => {
                                                        if (ele.target.querySelector("input")) {
                                                            ele.target.querySelector("input").click();
                                                        }
                                                    }}>
                                                        <Themeprimarycolor theme={local_varaiable} actionfunction={ThemeChanger} />
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theme-colors">
                                    <p className="switcher-style-head">Theme Background:</p>
                                    <div className="d-flex flex-wrap align-items-center switcher-style">
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-bg-1" type="radio" name="theme-background" id="switcher-background" checked={local_varaiable.bodybg === '20, 30, 96'} onClick={() => {
                                                Switcherdata.backgroundColor1(ThemeChanger);
                                                localStorage.getItem('nowaMenu') && (localStorage.removeItem('nowaMenu'), localStorage.removeItem('nowaHeader'));
                                            }} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-bg-2" type="radio" name="theme-background" id="switcher-background1" checked={local_varaiable.bodybg === '8, 78, 115'} onClick={() => {
                                                Switcherdata.backgroundColor2(ThemeChanger);
                                                localStorage.getItem('nowaMenu') && (localStorage.removeItem('nowaMenu'), localStorage.removeItem('nowaHeader'));
                                            }} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-bg-3" type="radio" name="theme-background" id="switcher-background2" checked={local_varaiable.bodybg === '90, 37, 135'} onClick={() => {
                                                Switcherdata.backgroundColor3(ThemeChanger);
                                                localStorage.getItem('nowaMenu') && (localStorage.removeItem('nowaMenu'), localStorage.removeItem('nowaHeader'));
                                            }} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-bg-4" type="radio" name="theme-background" id="switcher-background3" checked={local_varaiable.bodybg === '24, 101, 51'} onClick={() => {
                                                Switcherdata.backgroundColor4(ThemeChanger);
                                                localStorage.getItem('nowaMenu') && (localStorage.removeItem('nowaMenu'), localStorage.removeItem('nowaHeader'));
                                            }} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select me-3">
                                            <input className="form-check-input color-input color-bg-5" type="radio" name="theme-background" id="switcher-background4" checked={local_varaiable.bodybg === '120, 66, 20'} onClick={() => {
                                                Switcherdata.backgroundColor5(ThemeChanger);
                                                localStorage.getItem('nowaMenu') && (localStorage.removeItem('nowaMenu'), localStorage.removeItem('nowaHeader'));
                                            }} onChange={(_e) => { }} />
                                        </div>
                                        <div className="form-check switch-select ps-0 mt-1 tooltip-static-demo color-bg-transparent">
                                            {/* <div className="theme-container-background"></div>
                                            <div className="pickr-container-background"></div> */}

                                            <div className='theme-container-primary' >
                                                <button className="">nano</button>
                                            </div>
                                            <div className='pickr-container-primary'>
                                                <div className='pickr'>
                                                    <Button className='pcr-button' onClick={(ele: any) => {
                                                        if (ele.target.querySelector("input")) {
                                                            ele.target.querySelector("input").click();
                                                        }
                                                    }}>
                                                        <Switcherdata.Themebackgroundcolor theme={local_varaiable} actionfunction={ThemeChanger} />
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-image mb-3">
                                    <p className="switcher-style-head">Menu With Background Image:</p>
                                    <div className="d-flex flex-wrap align-items-center switcher-style">
                                        <div className="form-check switch-select m-2">
                                            <input className="form-check-input bgimage-input bg-img1" type="radio" name="theme-background" id="switcher-bg-img" onClick={() => Switcherdata.bgImage1(ThemeChanger)}/>
                                        </div>
                                        <div className="form-check switch-select m-2">
                                            <input className="form-check-input bgimage-input bg-img2" type="radio" name="theme-background" id="switcher-bg-img1" onClick={() => Switcherdata.bgImage2(ThemeChanger)}/>
                                        </div>
                                        <div className="form-check switch-select m-2">
                                            <input className="form-check-input bgimage-input bg-img3" type="radio" name="theme-background" id="switcher-bg-img2" onClick={() => Switcherdata.bgImage3(ThemeChanger)}/>
                                        </div>
                                        <div className="form-check switch-select m-2">
                                            <input className="form-check-input bgimage-input bg-img4" type="radio" name="theme-background" id="switcher-bg-img3" onClick={() => Switcherdata.bgImage4(ThemeChanger)}/>
                                        </div>
                                        <div className="form-check switch-select m-2">
                                            <input className="form-check-input bgimage-input bg-img5" type="radio" name="theme-background" id="switcher-bg-img4" onClick={() => Switcherdata.bgImage5(ThemeChanger)}/>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <div className="canvas-footer text-center">
                                <Link to="#"  className="btn btn-danger m-1" onClick={() => Switcherdata.Reset(ThemeChanger)}>Reset</Link>
                            </div>
                        </Tab.Content>
                    </Tab.Container>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Switcher);