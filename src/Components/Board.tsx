import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragableCard from "./DragableCard";
import { TodoInterface, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<AreaInterface>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#b2bec3"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface BoardInterface {
  toDos: TodoInterface[];
  boardId: string;
}

interface AreaInterface {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface FormInterface {
  toDo: string;
}

const Board = ({ toDos, boardId }: BoardInterface) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<FormInterface>();
  const onValid = ({ toDo }: FormInterface) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
