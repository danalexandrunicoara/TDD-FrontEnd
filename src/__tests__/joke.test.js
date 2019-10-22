import React from "react";
import Joke from "../joke";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Joke component receives props and then renders text - with getByTestId", () => {
  // Arrange
  const funnyJoke = "The funniest joke this year.";
  const { getByTestId } = render(<Joke text={funnyJoke} />);

  // Assert
  expect(getByTestId("joke-text")).toHaveTextContent(funnyJoke);
});

test("Joke component receives props and then renders text - with getByText", () => {
  // Arrange
  const notFunnyJoke = "Not a very funny one...";
  const { getByText } = render(<Joke text={notFunnyJoke} />);

  // Assert
  expect(getByText(notFunnyJoke)).toBeTruthy();
});
