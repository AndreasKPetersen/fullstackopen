import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

test("renders not done todo correctly", () => {
  const todo = {
    text: "Buy groceries",
    done: false,
  };
  const deleteTodo = jest.fn();
  const completeTodo = jest.fn();

  render(
    <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
  );

  const todoText = screen.getByText("Buy groceries");
  const setAsDoneButton = screen.getByText("Set as done");
  const deleteButton = screen.getByText("Delete");

  expect(todoText).toBeInTheDocument();
  expect(setAsDoneButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(setAsDoneButton);
  expect(completeTodo).toHaveBeenCalledWith(todo);

  fireEvent.click(deleteButton);
  expect(deleteTodo).toHaveBeenCalledWith(todo);
});

test("renders done todo correctly", () => {
  const todo = {
    text: "Finish homework",
    done: true,
  };
  const deleteTodo = jest.fn();
  const completeTodo = jest.fn();

  render(
    <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
  );

  const todoText = screen.getByText("Finish homework");
  const deleteButton = screen.getByText("Delete");

  expect(todoText).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);
  expect(deleteTodo).toHaveBeenCalledWith(todo);
});
