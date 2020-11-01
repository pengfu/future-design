import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

export type MenuMode = "horizontal" | "vertical";
type SelectedCallback = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectedCallback;
  defaultOpenedSubMenu?: string[];
}

export interface IMenuContext {
  index: string;
  onSelected?: SelectedCallback;
  mode?: MenuMode;
  defaultOpenedSubMenu?: string[];
}

export const Context = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenedSubMenu,
  } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const classes = classNames("future-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: activeIndex ? activeIndex : "0",
    onSelected: handleClick,
    mode,
    defaultOpenedSubMenu,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      let ch = child as React.FunctionComponentElement<MenuItemProps>;
      if (
        ch.type.displayName === "menu-item" ||
        ch.type.displayName === "sub-menu"
      ) {
        return React.cloneElement(ch, { index: index.toString() });
      } else {
        console.error("Warning: has child which is not MenuItem component");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <Context.Provider value={passedContext}>
        {renderChildren()}
      </Context.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
};

export default Menu;
