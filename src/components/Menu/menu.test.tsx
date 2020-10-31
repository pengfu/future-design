import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testMenuProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test-menu",
};
const testVerMenuProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1}>xxx</MenuItem>
      <MenuItem index={2} disabled>
        disabled
      </MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testMenuProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("future-menu test-menu");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const xxxItem = wrapper.getByText("xxx");
    fireEvent.click(xxxItem);
    expect(xxxItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testMenuProps.onSelect).toHaveBeenCalledWith(1);

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testMenuProps.onSelect).not.toHaveBeenCalledWith(2);
  });

  it("should render vertical mode when mode is set to be vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerMenuProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});
