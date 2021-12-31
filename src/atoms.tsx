import { atom } from "recoil";
import { loadedTodos } from "./localStorage";

export interface TodoInterface {
  id: number;
  text: string;
}

export interface ToDoStateInterface {
  [key: string]: TodoInterface[];
}

export const toDoState = atom<ToDoStateInterface>({
  key: "toDo",
  default: loadedTodos()
    ? loadedTodos()
    : {
        "To Do": [],
        Doing: [],
        Done: [],
      },
});
