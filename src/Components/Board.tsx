import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragableCard from "./DragableCard";

const Boards = styled.div`
  padding: 1.5rem 1rem;
  padding-top: 3rem;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 0.5rem;
  min-height: min-content;
`;

interface BoardInterface {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardInterface) => {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Boards ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DragableCard key={toDo} index={index} toDo={toDo} />
          ))}
          {magic.placeholder}
        </Boards>
      )}
    </Droppable>
  );
};

export default Board;
