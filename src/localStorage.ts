import { ToDoStateInterface } from "./atoms";

export const loadedTodos = () => {
  const localState = localStorage.getItem("state");
  if (localState !== null) {
    return JSON.parse(localState);
  }
};

export const saveTodos = (todo: ToDoStateInterface) => {
  localStorage.setItem("state", JSON.stringify(todo));
};
