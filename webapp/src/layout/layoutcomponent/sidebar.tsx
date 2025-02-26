import { FC} from 'react';
import { connect } from 'react-redux';
import { ThemeChanger } from '../../common/redux/action';

export function closeMenuRecursively(items: any) {
  items?.forEach((item: any) => {
    item.active = false;
    closeMenuRecursively(item.children);
  });
};

interface actiontype {
  local_varaiable: any;
  ThemeChanger: (action: any) => void;
}

const Sidebar: FC<actiontype> = () => {
  return (
    <></>
  );
};

const mapStateToProps = (state: actiontype) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);