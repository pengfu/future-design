import React, { useContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from "./menuItem";
import { Context } from "./menu";

export interface SubMenuProps {
  title: string;
  index?: number;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  title,
  children,
  className,
  index,
}) => {
  debugger;
  const context = useContext(Context);
  const classes = classNames("menu-item submenu-item", classNames, {
    "is-active": index === context.index,
  });
  const [opened, setOpened] = useState(false);
  const renderChildren = () => {
    const subClasses = classNames("future-submenu", {
      "menu-opened": opened,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const ch = child as React.FunctionComponentElement<MenuItemProps>;
      if (ch.type.displayName === "menu-item") {
        return React.cloneElement(ch, { index: i });
      } else {
        console.error("SubMenu 下面只能包含MenuItem");
      }
    });

    return <ul className={subClasses}>{childrenComponent}</ul>;
  };
  const handleClick = (e: React.MouseEvent) => {
    debugger;
    // context.onSelected();
    e.preventDefault();
    setOpened(!opened);
  };
  return (
    <li key={index} className={classes}>
      <div className="submenu-title" onClick={handleClick}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "sub-menu";
export default SubMenu;
