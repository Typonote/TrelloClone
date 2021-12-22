import { atom } from "recoil";

interface ToDoStateInterface {
  [key: string]: string[];
}

export const toDoState = atom<ToDoStateInterface>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
