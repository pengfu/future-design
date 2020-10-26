import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("our first react test case", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

// describe 分类 ，it等同于上面的的test

describe("test Button Component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
  });
});
