import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

const onSelected = (index: string) => {
  alert(index);
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          test
        </Button>
        <Button autoFocus>test</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          test
        </Button>
        <Menu onSelect={onSelected}>
          <MenuItem>item 1</MenuItem>
          <MenuItem>item 2</MenuItem>
          <SubMenu title="SubMenuTitle">
            <MenuItem>subItem 1</MenuItem>
            <MenuItem>subItem 2</MenuItem>
            <MenuItem disabled>subItem 3</MenuItem>
          </SubMenu>
          <MenuItem disabled>item 3</MenuItem>
        </Menu>

        {/* <Menu onSelect={onSelected} >
          <MenuItem index={0}>item 1</MenuItem>
          <MenuItem index={1}>item 2</MenuItem>
          <MenuItem index={2} disabled>
            item 3
          </MenuItem>
        </Menu> */}
        <a>learn react</a>
      </header>
    </div>
  );
}

export default App;
