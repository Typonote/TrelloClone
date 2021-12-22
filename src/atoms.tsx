import { atom } from "recoil";

export interface TodoInterface {
  id: number;
  text: string;
}

interface ToDoStateInterface {
  [key: string]: TodoInterface[];
}

export const toDoState = atom<ToDoStateInterface>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
