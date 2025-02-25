export interface Menuitemtype {
  menutitle?: string;
  path?: string;
  title?: string;
  icon?: any;
  type?: 'link' | 'empty' | 'sub';
  active?: boolean;
  selected?: boolean;
  dirchange?: boolean;
  children?: Menuitemtype[];
  badgetxt?: string;
  class?: string;
  menusub?: boolean;
}


export const MENUITEMS: Menuitemtype[] = [

];