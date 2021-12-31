import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

library.add(faTrashAlt);

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  font-weight: 400;
`;

const TrashBtn = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 700;
  cursor: pointer;
  background-color: transparent;
  border: 3px solid #e84118;
  color: #e84118;

  &:hover {
    color: white;
    background-color: #e84118;
  }
`;

interface DragableCardInterface {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragableCard({ toDoId, toDoText, index }: DragableCardInterface) {
  const setToDos = useSetRecoilState(toDoState);

  const onClickDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(toDoId, toDoText, index);
    setToDos((allTodos) => {
      console.log("allTodos", allTodos);
      console.log("allTodos", allTodos[0]);
      return {
        ...allTodos,
        // [boardId]: [...allBoards[boardId], newToDo],
      };
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <TrashBtn onClick={onClickDeleteHandler}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </TrashBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragableCard);
