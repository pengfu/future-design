import React, { createContext, useState } from "react";
import classNames from "classnames";

type MenuMode = "horizontal" | "vertical";
type SelectedCallback = (selectedIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectedCallback;
}

export interface IMenuContext {
  index: number;
  onSelected?: SelectedCallback;
}

export const Context = createContext<IMenuContext>({ index: 0 });
const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const classes = classNames("future-menu", className, {
    "menu-vertical": mode === "vertical",
  });

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: activeIndex ? activeIndex : 0,
    onSelected: handleClick,
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <Context.Provider value={passedContext}>{children}</Context.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
