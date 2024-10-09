import type { Data } from "./+data";
import React from "react";
import { useData } from "vike-react/useData";
import { TodoList } from "./TodoList.js";

export default function Page(): React.JSX.Element {
  const data = useData<Data>();

  return (
    <>
      <h1>To-do List</h1>
      <TodoList initialTodoItems={data.todo} />
    </>
  );
}
