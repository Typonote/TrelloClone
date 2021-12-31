import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { saveTodos } from "../localStorage";

const Container = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  margin: 1rem auto;
  padding: 0.5rem;
`;

const AddForm = styled.form`
  width: 200px;
  margin: 1rem auto;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};

  input {
    color: #5d5d5d;
    font-size: 1rem;
    background-color: transparent;
    padding: 0.5rem;
    border: none;
    margin-right: 1rem;

    &:focus {
      outline: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
    }
  }
`;

interface AddBoardInterface {
  category: string;
}

const AddBoards = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<AddBoardInterface>();
  const onVaild = ({ category }: AddBoardInterface) => {
    if (category === "") {
      return;
    }
    setToDos((allBoard) => {
      return {
        [category]: [],
        ...allBoard,
      };
    });
    setValue("category", "");
  };

  useEffect(() => {
    saveTodos(toDos);
  }, [toDos]);

  return (
    <Container>
      <Wrapper>
        <AddForm onSubmit={handleSubmit(onVaild)}>
          <input
            {...register("category", { required: true })}
            type="text"
            placeholder="Add Task Board"
          />
        </AddForm>
      </Wrapper>
    </Container>
  );
};

export default AddBoards;
