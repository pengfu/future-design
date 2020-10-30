import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps: ButtonProps = {
  onClick: jest.fn(),
};

const buttonProps: ButtonProps = {
  size: ButtonSize.Large,
  btnType: ButtonType.Primary,
  className: "klass",
};

const linkProps: ButtonProps = {
  btnType: ButtonType.Link,
  href: "http://www.baidu.com",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

test("our first react test case", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

// describe 分类 ，it等同于上面的的test

describe("test Button Component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");

    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render correct based on diffrent props", () => {
    const wrapper = render(<Button {...buttonProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toHaveClass("btn btn-primary btn-lg klass");
  });

  it("should render link when btnType equals link and href is set", () => {
    const wrapper = render(<Button {...linkProps}>Link</Button>);
    const element = wrapper.getByText("Link");
    expect(element).toHaveClass("btn btn-link");
    expect(element.tagName).toEqual("A");
  });

  it("should render disabled when disabled props is set", () => {
    const wrapper = render(<Button {...disabledProps}>test</Button>);
    const element = wrapper.getByText("test") as HTMLButtonElement;
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
    expect(element.disabled).toBeTruthy();
  });
});
