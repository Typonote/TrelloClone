import { atom } from "recoil";

interface ToDoStateInterface {
  [key: string]: string[];
}

export const toDoState = atom<ToDoStateInterface>({
  key: "toDo",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
