import { useState } from 'react';
import store from './redux/store';
import { closeMenuRecursively } from '../layout/layoutcomponent/sidebar';
import { MENUITEMS } from './sidemenu';

export function Dark(actionfunction: any) {
    const theme = store.getState();

	actionfunction({
		...theme,
		"datathememode": "dark",
		"dataheaderstyles": "dark",
		"datamenustyles": "dark",
		"darkbg": "",
		"bodybg": "",
        "inputBorder": ""
	});
	localStorage.setItem("nowadarktheme", "dark");
	localStorage.removeItem("nowalighttheme");
    if (localStorage.getItem('nowadarktheme') && localStorage.getItem('nowaHeader') && localStorage.getItem('nowaMenu')) {
        localStorage.removeItem("nowaHeader");
        localStorage.removeItem("nowaMenu");
    }

    if (localStorage.getItem('nowadarktheme') && localStorage.getItem('darkBgRGB1')) {
        localStorage.removeItem("darkBgRGB1");
    }

    var icon = document.getElementById("switcher-menu-dark") as HTMLInputElement;
    if (icon) {
        icon.checked = true
    }
    var headericon = document.getElementById("switcher-header-dark") as HTMLInputElement;
    if (headericon) {
        headericon.checked = true
    }
}

export function Light(actionfunction: any) {
    const theme = store.getState();

        document.documentElement.removeAttribute('style');
   

    actionfunction({
        ...theme,
        "datathememode": "light",
        "dataheaderstyles": "light",
        "datamenustyles": 'light',
        "darkbg": "",
        "bodybg": "",
        "inputBorder": ""

    });
    localStorage.setItem("nowalighttheme", "light");
    localStorage.removeItem("nowadarktheme");

    localStorage.removeItem("darkBgRGB1");
    localStorage.removeItem("nowaHeader");
    localStorage.removeItem("nowaMenu");

    var icon = document.getElementById("switcher-menu-light") as HTMLInputElement;
    if (icon) {
        icon.checked = true
    }
    var headericon = document.getElementById("switcher-header-light") as HTMLInputElement;
    if (headericon) {
        headericon.checked = true
    }
}

export function Ltr(actionfunction: any) {
    const theme = store.getState();
    actionfunction({ ...theme, dir: "ltr" });
    localStorage.setItem("nowaltr", "ltr");
    localStorage.removeItem("nowartl");
}
export function Rtl(actionfunction: any) {
    const theme = store.getState();
    actionfunction({ ...theme, dir: "rtl" });
    localStorage.setItem("nowartl", "rtl");
    localStorage.removeItem("nowaltr");
}


export const HorizontalClick = (actionfunction: any) => {
    const theme = store.getState();

    const updatedTheme = {
        ...theme,
        "datanavlayout": "horizontal",
        "datamenustyles": localStorage.nowadarktheme ? "dark" : localStorage.darkBgRGB1 ? localStorage.nowaMenu : localStorage.nowaMenu ? localStorage.nowaMenu : "light",
        "dataverticalstyle": "",
        "datanavstyle": localStorage.vexelnavstyles ? localStorage.vexelnavstyles : "menu-click"
    };

    actionfunction(updatedTheme);
    localStorage.setItem("nowalayout", "horizontal");
};

export const Vertical = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavlayout": "vertical",
        "datanavstyle": "",
        "datamenustyles": localStorage.nowadarktheme ? "dark" : localStorage.darkBgRGB1 ? localStorage.nowaMenu : localStorage.nowaMenu ? localStorage.nowaMenu : "light",
        "dataverticalstyle": "default",
        "toggled": ""
    });

    localStorage.setItem("nowalayout", "vertical");

};

export const Menuclick = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavstyle": "menu-click",
        "dataverticalstyle": "",
        "toggled": "menu-click-closed",
    });
    localStorage.setItem("nowanavstyles", "menu-click");
    localStorage.removeItem("nowaverticalstyles");
};
export const MenuHover = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavstyle": "menu-hover",
        "dataverticalstyle": "",
        "toggled": "menu-hover-closed",
        "horStyle": ""
    });
    localStorage.setItem("nowanavstyles", "menu-hover");
    localStorage.removeItem("nowaverticalstyles");
};
export const IconClick = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavstyle": "icon-click",
        "dataverticalstyle": "",
        "toggled": "icon-click-closed",
    });
    localStorage.setItem("nowanavstyles", "icon-click");
    localStorage.removeItem("nowaverticalstyles");
};
    
export const IconHover = (actionfunction: any) => {
    const theme = store.getState();
    closeMenuRecursively(MENUITEMS); //comes from sidebar.tsx
    actionfunction({
        ...theme,
        "datanavstyle": "icon-hover",
        "dataverticalstyle": "",
        "toggled": "icon-hover-closed"
    });
    localStorage.setItem("nowanavstyles", "icon-hover");
    localStorage.removeItem("nowaverticalstyles");

};
export const Fullwidth = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datawidth": "fullwidth",
    });
    localStorage.setItem("nowafullwidth", "Fullwidth");
    localStorage.removeItem("nowaboxed");

};
export const Boxed = (actionfunction: any) => {
    const theme = store.getState();
    const bodyClass = document.body.className;

    let dataWidthValue = "boxed";

    if (bodyClass.includes("login-img")) {
        dataWidthValue = "";
    }

    actionfunction({
        ...theme,
        "datawidth": dataWidthValue,
    });

    localStorage.setItem("nowaboxed", dataWidthValue === "boxed" ? "Boxed" : "");
    localStorage.removeItem("nowafullwidth");
};
export const FixedMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenuposition": "fixed",
    });
    localStorage.setItem("nowamenufixed", "MenuFixed");
    localStorage.removeItem("nowamenuscrollable");
};
export const scrollMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenuposition": "scrollable",
    });
    localStorage.setItem("nowamenuscrollable", "Menuscrolled");
    localStorage.removeItem("nowamenufixed");
};
export const Headerpostionfixed = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderposition": "fixed",
    });
    localStorage.setItem("nowaheaderfixed", 'FixedHeader');
    localStorage.removeItem("nowaheaderscrollable");
};
export const Headerpostionscroll = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderposition": "scrollable",
    });
    localStorage.setItem("nowaheaderscrollable", "ScrollableHeader");
    localStorage.removeItem("nowaheaderfixed");
};
export const Regular = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datapagestyle": "regular"
    });
    localStorage.setItem("nowaregular", "Regular");
    localStorage.removeItem("nowaclassic");
    localStorage.removeItem("nowamodern");
};
export const Classic = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datapagestyle": "classic",
    });
    localStorage.setItem("nowaclassic", "Classic");
    localStorage.removeItem("nowaregular");
    localStorage.removeItem("nowamodern");
};
export const Modern = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datapagestyle": "modern",
    });
    localStorage.setItem("nowamodern", "Modern");
    localStorage.removeItem("nowaregular");
    localStorage.removeItem("nowaclassic");
};

// export function Enable(actionfunction: any) {
//     const theme = store.getState();
//     actionfunction({ ...theme, loader: "enable" });
//     localStorage.setItem("nowaloaderenable", "enable");
//     localStorage.setItem("nowaloaderdisable", "enable");
// }
// export function Disable(actionfunction: any) {
//     const theme = store.getState();
//     actionfunction({ ...theme, loader: "disable" });
//     localStorage.setItem("nowaloaderdisable", "disable");
//     localStorage.removeItem("nowaloaderenable");
// }

export const Defaultmenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataverticalstyle": "default",
        "datanavlayout": "vertical",
        "toggled": "close",
        "datanavstyle": ""
    });
    localStorage.removeItem("nowanavstyles");
    localStorage.setItem("nowaverticalstyles", 'default');
};
export const Closedmenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavlayout": "vertical",
        "dataverticalstyle": "closed",
        "toggled": "close-menu-close",
        "datanavstyle": ""
    });
    localStorage.removeItem("nowanavstyles");
    localStorage.setItem("nowaverticalstyles", "closed");

};

export const iconText = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datanavlayout": "vertical",
        "dataverticalstyle": "icontext",
        "toggled": "icon-text-close",
        "datanavstyle": ""
    });
    localStorage.removeItem("nowanavstyles");
    localStorage.setItem("nowaverticalstyles", "icontext");
};
export const iconOverayFn = (actionfunction: any) => {
    const theme = store.getState()
    actionfunction({
        ...theme,
        "datanavlayout": "vertical",
        "dataverticalstyle": "overlay",
        "toggled": "icon-overlay-close",

    })
    localStorage.setItem("nowaverticalstyles", "overlay");

    var icon = document.getElementById("switcher-icon-overlay") as HTMLInputElement;
    if (icon) {
        icon.checked = true
    }
    const MainContent = document.querySelector(".main-content");
    const appSidebar = document.querySelector('.app-sidebar');
    appSidebar?.addEventListener("click", () => {
        DetachedOpenFn();
    });
    MainContent?.addEventListener("click", () => {
        console.log("detachedclose");
        DetachedCloseFn();
    });
};

function DetachedOpenFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.setAttribute('data-icon-overlay', 'open');
        }
    }
}
function DetachedCloseFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.removeAttribute('data-icon-overlay');
        }
    }
}
export const DetachedFn = (actionfunction: any) => {
    const theme = store.getState()
    actionfunction({
        ...theme,
        "datanavlayout": "vertical",
        "dataverticalstyle": "detached",
        "toggled": "detached-close",
        "datanavstyle": "",

    })
    localStorage.setItem("nowaverticalstyles", "detached");

    const MainContent = document.querySelector(".main-content");
    const appSidebar = document.querySelector('.app-sidebar');

    appSidebar?.addEventListener("click", () => {
        DetachedOpenFn();
    });
    MainContent?.addEventListener("click", () => {
        console.log("detachedclose");
        DetachedCloseFn();
    });
};

export const DoubletFn = (actionfunction:any) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"datanavlayout": "vertical",
		"dataverticalstyle": "doublemenu",
		"toggled": "double-menu-open",
		"datanavstyle": "",
	});
	localStorage.setItem("nowaverticalstyles", "doublemenu");
	localStorage.removeItem("nowanavstyles");
	setTimeout(() => {
		if (!document.querySelector(".main-menu .has-sub.open")) {
			const theme = store.getState();
			actionfunction(
				{
					...theme,
					"toggled": "double-menu-close",
				}
			);
		}
	}, 100);

};

export const bgImage1 = (actionfunction: any) => {

    const theme = store.getState();
    actionfunction({
        ...theme,
        "bgimg": "bgimg1"
    });
    localStorage.setItem("bgimage", "bgimg1");
    localStorage.removeItem("bgimage2");
    localStorage.removeItem("bgimage3");
    localStorage.removeItem("bgimage4");
    localStorage.removeItem("bgimage5");
};

export const bgImage2 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bgimg": "bgimg2"
    });
    localStorage.setItem("bgimage", "bgimg2");
    localStorage.removeItem("bgimage1");
    localStorage.removeItem("bgimage3");
    localStorage.removeItem("bgimage4");
    localStorage.removeItem("bgimage5");
};

export const bgImage3 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bgimg": "bgimg3"
    });
    localStorage.setItem("bgimage", "bgimg3");
    localStorage.removeItem("bgimage1");
    localStorage.removeItem("bgimage2");
    localStorage.removeItem("bgimage4");
    localStorage.removeItem("bgimage5");
};

export const bgImage4 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bgimg": "bgimg4"
    });
    localStorage.setItem("bgimage", "bgimg4");
    localStorage.removeItem("bgimage1");
    localStorage.removeItem("bgimage2");
    localStorage.removeItem("bgimage3");
    localStorage.removeItem("bgimage5");
};

export const bgImage5 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bgimg": "bgimg5"
    });
    localStorage.setItem("bgimage", "bgimg5");
    localStorage.removeItem("bgimage1");
    localStorage.removeItem("bgimage2");
    localStorage.removeItem("bgimage3");
    localStorage.removeItem("bgimage4");
};


export const lightMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenustyles": "light",
    });
    localStorage.setItem("nowaMenu", "light");
};

export const colorMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenustyles": "color",
    });
    localStorage.setItem("nowaMenu", "color");
};

export const darkMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenustyles": "dark",
    });
    localStorage.setItem("nowaMenu", "dark");
};

export const gradientMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenustyles": "gradient",
    });
    localStorage.setItem("nowaMenu", "gradient");
};

export const transparentMenu = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "datamenustyles": "transparent",
    });
    localStorage.setItem("nowaMenu", "transparent");
};

export const lightHeader = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderstyles": "light",
    });
    localStorage.setItem("nowaHeader", "light");
};

export const darkHeader = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderstyles": "dark",
    });
    localStorage.setItem("nowaHeader", "dark");
};

export const colorHeader = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderstyles": "color",
    });
    localStorage.setItem("nowaHeader", "color");
};

export const gradientHeader = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderstyles": "gradient",

    });
    localStorage.setItem("nowaHeader", "gradient");
};

export const transparentHeader = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "dataheaderstyles": "transparent",
    });
    localStorage.removeItem("gradient");
    localStorage.setItem("nowaHeader", "transparent");
};

export const primaryColor1 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "colorprimaryrgb": "58, 88, 146",

    });
    localStorage.setItem("primaryRGB", "58, 88, 146");


};
export const primaryColor2 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "colorprimaryrgb": "92, 144, 163",

    });
    localStorage.setItem("primaryRGB", "92, 144, 163");
};

export const primaryColor3 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "colorprimaryrgb": "161, 90, 223",
    });
    localStorage.setItem("primaryRGB", "161, 90, 223");
};

export const primaryColor4 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "colorprimaryrgb": "78, 172, 76",
    });
    localStorage.setItem("primaryRGB", "78, 172, 76");
};

export const primaryColor5 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "colorprimaryrgb": "223, 90, 90",
    });
    localStorage.setItem("primaryRGB", "223, 90, 90");
};

export const backgroundColor1 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bodybg": "20, 30, 96",
        "darkbg": "25, 38, 101",
        "inputBorder": "255, 255, 255, 0.1",
        "datathememode": "dark",
        "datamenustyles": "dark",
        "dataheaderstyles": "dark"
    });
    localStorage.setItem('darkBgRGB1', "20, 30, 96");
    localStorage.setItem('darkBgRGB2', "25, 38, 101");
    localStorage.setItem('inputBorder', "255, 255, 255, 0.1");

};

export const backgroundColor2 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bodybg": "8, 78, 115",
        "darkbg": "13, 86, 120",
        "inputBorder": "255, 255, 255, 0.1",
        "datathememode": "dark",
        "datamenustyles": "dark",
        "dataheaderstyles": "dark"
    });
    localStorage.setItem('darkBgRGB1', "8, 78, 115");
    localStorage.setItem('darkBgRGB2', "13, 86, 120",);
    localStorage.setItem('inputBorder', "255, 255, 255, 0.1",);
};

export const backgroundColor3 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bodybg": "90, 37, 135",
        "darkbg": "95, 45, 140",
        "inputBorder": "255, 255, 255, 0.1",
        "datathememode": "dark",
        "datamenustyles": "dark",
        "dataheaderstyles": "dark"
    });
    localStorage.setItem('darkBgRGB1', "90, 37, 135");
    localStorage.setItem('darkBgRGB2', "95, 45, 140",);
    localStorage.setItem('inputBorder', "255, 255, 255, 0.1",);
};

export const backgroundColor4 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bodybg": "24, 101, 51",
        "darkbg": "29, 109, 56",
        "inputBorder": "255, 255, 255, 0.1",
        "datathememode": "dark",
        "datamenustyles": "dark",
        "dataheaderstyles": "dark"
    });
    localStorage.setItem('darkBgRGB1', "24, 101, 51");
    localStorage.setItem('darkBgRGB2', "29, 109, 56");
    localStorage.setItem('inputBorder', "255, 255, 255, 0.1");
};

export const backgroundColor5 = (actionfunction: any) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        "bodybg": "120, 66, 20",
        "darkbg": "125, 74, 25",
        "inputBorder": "255, 255, 255, 0.1",
        "datathememode": "dark",
        "datamenustyles": "dark",
        "dataheaderstyles": "dark"
    });
    localStorage.setItem('darkBgRGB1', "120, 66, 20");
    localStorage.setItem('darkBgRGB2', "125, 74, 25");
    localStorage.setItem('inputBorder', "255, 255, 255, 0.1");
};

const ColorPicker = (props: any) => {
    return (
        <div className="color-picker-input">
            <input type="color" {...props} />
        </div>
    );
};

function hexToRgb(hex: any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
const Themeprimarycolor = ({ actionfunction }: any) => {
    const theme = store.getState();
    const [state, updateState] = useState("#b94eed");

    const handleInput = (e: any) => {
        const rgb = hexToRgb(e.target.value);

        if (rgb !== null) {
            const { r, g, b } = rgb;
            updateState(e.target.value);
            actionfunction({
                ...theme,
                "colorprimaryrgb": `${r}, ${g}, ${b}`,
            });
            localStorage.setItem("primaryRGB", `${r}, ${g}, ${b}`);
        }
    };

    return (
        <div className="Themeprimarycolor theme-container-primary pickr-container-primary">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    );
};

export default Themeprimarycolor;

//themeBackground
export const Themebackgroundcolor = ({ actionfunction }: any) => {
    const theme = store.getState();
    const [state, updateState] = useState("#38cab3");
    const handleInput = (e: any) => {
        const { r, g, b }: any = hexToRgb(e.target.value);
        updateState(e.target.value);
        actionfunction({
            ...theme,
            "bodybg": `${r}, ${g}, ${b}`,
            "darkbg": `${r + 5} ${g + 8} ${b + 5}`,
            "inputBorder": "255, 255, 255, 0.1",
            "datathememode": "dark",
            "dataheaderstyles": "dark",
            "datamenustyles": "dark"
        });
        localStorage.setItem("darkBgRGB1", `${r}, ${g}, ${b}`);
        localStorage.setItem("darkBgRGB2", `${r + 5} ${g + 8} ${b + 5}`);
        localStorage.setItem("inputBorder", "255, 255, 255, 0.1");
    };
    return (
        <div className="Themebackgroundcolor">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    );
};

export const Reset = (actionfunction: any) => {
    const theme = store.getState();
    Vertical(actionfunction);
    actionfunction({
        ...theme,
        lang: "en",
        dir: "ltr",
        datanavlayout: "vertical",
        datathememode: "light",
        dataheaderstyles: 'light',
        datamenustyles: 'light',
        dataverticalstyle: "default",
        toggled: "",
        datanavstyle: "",
        horstyle: "",
        datapagestyle: "regular",
        datawidth: "fullwidth",
        datamenuposition: "fixed",
        dataheaderposition: "fixed",
        // loader: "disable",
        iconoverlay: "",
        colorprimaryrgb: "",
        bodybg: "",
        light: "",
        darkbg: "",
        inputBorder: "",
        bgimg: "",
        icontext: "",
        body: {
            class: ""
        }
    });
    localStorage.clear();

    const headerLightInput = document.getElementById("switcher-header-light") as HTMLInputElement;
    const menuLightInput = document.getElementById("switcher-menu-light") as HTMLInputElement;
    if (headerLightInput && menuLightInput) {
        headerLightInput.checked = true;
        menuLightInput.checked = true;
    }
};

export const Resetlandingswitcher = (actionfunction: any) => {
    const theme = store.getState();
    // Vertical(actionfunction);
    actionfunction({
        ...theme,
        lang: "en",
        dir: "ltr",
        datathememode: "light",
        datamenustyles: "dark",
        datanavlayout: "horizontal",
        dataheaderstyles: "light",
        dataverticalstyle: "overlay",
        toggled: "",
        datanavstyle: "menu-click",
        datamenuposition: "",
        iconoverlay: "",
        colorprimaryrgb: "",
        bgimg: "",
        icontext: "",
        body: {
            class: ""
        }
    });
    localStorage.clear();
};

export const LocalStorageBackup = (actionfunction: any) => {

    (localStorage.nowaltr) ? Ltr(actionfunction) : "";
    (localStorage.nowartl) ? Rtl(actionfunction) : "";
    (localStorage.nowadarktheme) ? Dark(actionfunction) : "";
    (localStorage.nowalighttheme) ? Light(actionfunction) : "";
    (localStorage.nowaregular) ? Regular(actionfunction) : "";
    (localStorage.nowaclassic) ? Classic(actionfunction) : "";
    (localStorage.nowamodern) ? Modern(actionfunction) : "";
    (localStorage.nowafullwidth) ? Fullwidth(actionfunction) : "";
    (localStorage.nowaboxed) ? Boxed(actionfunction) : "";
    (localStorage.nowamenufixed) ? FixedMenu(actionfunction) : "";
    (localStorage.nowamenuscrollable) ? scrollMenu(actionfunction) : "";
    (localStorage.nowaheaderfixed) ? Headerpostionfixed(actionfunction) : "";
    (localStorage.nowaheaderscrollable) ? Headerpostionscroll(actionfunction) : "";

    // (localStorage.nowaloaderenable) ? Enable(actionfunction) : "";
    // (localStorage.nowaloaderdisable) ? Disable(actionfunction) : "";

    (localStorage.nowanavstyles === "menu-click") ? Menuclick(actionfunction) : '';
    (localStorage.nowanavstyles === "menu-hover") ? MenuHover(actionfunction) : '';
    (localStorage.nowanavstyles === "icon-click") ? IconClick(actionfunction) : '';
    (localStorage.nowanavstyles === "icon-hover") ? IconHover(actionfunction) : '';

    (localStorage.bgimage === 'bgimg1') ? bgImage1(actionfunction) : '';
    (localStorage.bgimage === 'bgimg2') ? bgImage2(actionfunction) : '';
    (localStorage.bgimage === 'bgimg3') ? bgImage3(actionfunction) : '';
    (localStorage.bgimage === 'bgimg4') ? bgImage4(actionfunction) : '';
    (localStorage.bgimage === 'bgimg5') ? bgImage5(actionfunction) : '';
    (localStorage.nowalayout == 'horizontal') && HorizontalClick(actionfunction);
    (localStorage.nowalayout == 'vertical') && Vertical(actionfunction);

    //primitive 
    if (
        localStorage.getItem("nowaltr") == null ||
        localStorage.getItem("nowaltr") == "ltr"
    )
        if (localStorage.getItem("nowartl") == "rtl") {
            document.querySelector("body")?.classList.add("rtl");
            document.querySelector("html[lang=en]")?.setAttribute("dir", "rtl");

        }

    // Theme Primary: Colors: Start
    switch (localStorage.primaryRGB) {
        case '58, 88, 146':
            primaryColor1(actionfunction);

            break;
        case '92, 144, 163':
            primaryColor2(actionfunction);

            break;
        case '161, 90, 223':
            primaryColor3(actionfunction);

            break;
        case '78, 172, 76':
            primaryColor4(actionfunction);

            break;
        case '223, 90, 90':
            primaryColor5(actionfunction);

            break;
        default:
            break;
    }
    // Theme Primary: Colors: End

    switch (localStorage.darkBgRGB1) {
        case '20, 30, 96':
            backgroundColor1(actionfunction);

            break;
        case '8, 78, 115':
            backgroundColor2(actionfunction);

            break;
        case '90, 37, 135':
            backgroundColor3(actionfunction);

            break;
        case '24, 101, 51':
            backgroundColor4(actionfunction);

            break;
        case '120, 66, 20':
            backgroundColor5(actionfunction);

            break;
        default:
            break;
    }

    //layout
    if (localStorage.nowaverticalstyles) {
        const verticalStyles = localStorage.getItem("nowaverticalstyles");

        switch (verticalStyles) {
            case "default":
                Defaultmenu(actionfunction);
                break;
            case "closed":
                Closedmenu(actionfunction);
                break;
            case "icontext":
                iconText(actionfunction);
                break;
            case "overlay":
                iconOverayFn(actionfunction);
                break;
            case "detached":
                DetachedFn(actionfunction);
                break;
            case "doublemenu":
                DoubletFn(actionfunction);
                break;
        }
    }

    //Theme Primary:
    if (localStorage.primaryRGB) {
        const theme = store.getState();
        actionfunction({
            ...theme,
            "colorprimaryrgb": localStorage.primaryRGB,
        });
    }

    //Theme BAckground:
    if (localStorage.darkBgRGB1) {
        const theme = store.getState();
        actionfunction({
            ...theme,
            "bodybg": localStorage.darkBgRGB1,
            "darkbg": localStorage.darkBgRGB2,
            "inputBorder": localStorage.inputBorder,
            "datathememode": "dark",
            "dataheaderstyles": "dark",
            "datamenustyles": "dark",
        });
    }

    // ThemeColor MenuColor Start
    switch (localStorage.nowaMenu) {
        case 'light':
            lightMenu(actionfunction);

            break;
        case 'dark':
            darkMenu(actionfunction);

            break;
        case 'color':
            colorMenu(actionfunction);

            break;
        case 'gradient':
            gradientMenu(actionfunction);

            break;
        case 'transparent':
            transparentMenu(actionfunction);

            break;
        default:
            break;
    }

    // ThemeColor Header Colors: start
    switch (localStorage.nowaHeader) {
        case 'light':
            lightHeader(actionfunction);

            break;
        case 'dark':
            darkHeader(actionfunction);

            break;
        case 'color':
            colorHeader(actionfunction);

            break;
        case 'gradient':
            gradientHeader(actionfunction);

            break;
        case 'transparent':
            transparentHeader(actionfunction);

            break;
        default:
            break;
    }

};
