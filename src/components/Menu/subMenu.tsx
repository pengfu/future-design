import React, { useContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from "./menuItem";
import { Context } from "./menu";
export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  title,
  children,
  className,
  index,
}) => {
  const context = useContext(Context);
  const defaultOpenedSubMenu = context.defaultOpenedSubMenu as Array<string>;
  const classes = classNames("menu-item submenu-item", classNames, {
    "is-active": index === context.index,
  });
  const [opened, setOpened] = useState(
    context.mode === "vertical" &&
      typeof index === "string" &&
      defaultOpenedSubMenu.includes(index)
  );
  const renderChildren = () => {
    const subClasses = classNames("future-submenu", {
      "menu-opened": opened,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const ch = child as React.FunctionComponentElement<MenuItemProps>;
      if (ch.type.displayName === "menu-item") {
        return React.cloneElement(ch, { index: `${index}-${i}` });
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

  let timer: any;
  const handleMouse = (toggle: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpened(toggle);
    }, 300);
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
