import React from "react";
import * as axios from "axios";
import MockAxios from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import JokeGenerator from "../jokeGenerator";
import { render, fireEvent, wait } from "@testing-library/react";

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
const noJokeLoaded = "You haven't loaded any joke yet!";

test("'JokeGenerator' no joke loaded", async () => {
  // Arrange
  mock.onGet().replyOnce(200, {
    value: "Really funny joke"
  });

  const { getByText } = render(<JokeGenerator />);

  // Assert
  expect(getByText(noJokeLoaded)).toBeInTheDOM();
});

test("'JokeGenerator' component fetches a random joke a renders it", async () => {
  // Arrange
  const loading = "Loading...";
  mock.onGet().replyOnce(200, {
    value: "Really funny joke"
  });

  const { queryByText } = render(<JokeGenerator />);

  // Act
  fireEvent.click(queryByText("Load a random joke"));

  // Assert
  expect(queryByText(noJokeLoaded)).not.toBeInTheDOM();
  expect(queryByText(loading)).toBeInTheDOM();
  await wait(() => expect(queryByText(loading)).not.toBeInTheDOM());
});
