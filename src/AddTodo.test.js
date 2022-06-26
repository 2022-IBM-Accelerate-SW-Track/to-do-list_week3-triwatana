import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("test that App component doesn't render dupicate Task", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const dueDate1 = "07/20/2022";
  fireEvent.change(inputTask, { target: { value: "Calculus Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate1 } });
  fireEvent.click(addButton);
  const checkTask = screen.getByText(/Calculus Test/i);
  const checkDate = screen.getByText("7/20/2022");
  expect(checkTask).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  const dueDate2 = "08/02/2022";
  fireEvent.change(inputTask, { target: { value: "Calculus Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate2 } });
  fireEvent.click(addButton);
  const checkDups = screen.getAllByText(/Calculus Test/i);
  expect(checkDups.length).toBe(1);
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const dueDate = "07/26/2022";
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const addButton = screen.getByRole("button", { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "Wash dishes" } });
  fireEvent.click(addButton);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const dueDate = "08/20/2022";
  fireEvent.change(inputTask, { target: { value: "Science Project" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  const checkTask = screen.getByText(/Science Project/i);
  const checkDate = screen.getByText("8/20/2022");
  expect(checkTask).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  const deleteTask = screen.getByRole("checkbox");
  fireEvent.click(deleteTask);
  const taskDeleted = screen.getByText(/You have no todo's left/i);
  expect(taskDeleted).toBeInTheDocument();
});

test("test that App component renders different colors for past due events", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const dueDate1 = "09/12/2023";
  fireEvent.change(inputTask, { target: { value: "Walk the Dog" } });
  fireEvent.change(inputDate, { target: { value: dueDate1 } });
  fireEvent.click(addButton);
  const checkTask1 = screen.getByText(/Walk the Dog/i);
  const checkDate1 = screen.getByText("9/12/2023");
  expect(checkTask1).toBeInTheDocument();
  expect(checkDate1).toBeInTheDocument();
  const onTimeTask = screen.getByTestId(/Walk the Dog/i).style.background;
  // #FAFFFD is the same as rgb(250, 255, 253)
  expect(onTimeTask).toBe("rgb(250, 255, 253)");
  const dueDate2 = "05/10/2020";
  fireEvent.change(inputTask, { target: { value: "Buy Groceries" } });
  fireEvent.change(inputDate, { target: { value: dueDate2 } });
  fireEvent.click(addButton);
  const checkTask2 = screen.getByText(/Buy Groceries/i);
  const checkDate2 = screen.getByText("5/10/2020");
  expect(checkTask2).toBeInTheDocument();
  expect(checkDate2).toBeInTheDocument();
  const lateTask = screen.getByTestId(/Buy Groceries/i).style.background;
  expect(lateTask).toBe("rgb(250, 150, 150)");
});
