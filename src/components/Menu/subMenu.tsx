import React, { useContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from "./menuItem";
import { Context } from "./menu";
import { MenuMode } from "./menu";
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
    // context.onSelected();
    e.preventDefault();
    setOpened(!opened);
  };
  const handleMouse = (toggle: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpened(toggle);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: handleMouse(true),
          onMouseLeave: handleMouse(false),
        }
      : {};
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "sub-menu";
export default SubMenu;
