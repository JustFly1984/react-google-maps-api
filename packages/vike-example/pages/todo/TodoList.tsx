import React, { useState } from "react";

type Props = {
  initialTodoItems: Array<{ text: string }>;
};

export function TodoList({ initialTodoItems }: Props): React.JSX.Element {
  const [todoItems, setTodoItems] = useState(initialTodoItems);

  const [newTodo, setNewTodo] = useState("");

  return (
    <>
      <ul>
        {todoItems.map((todoItem, index) => (
          // biome-ignore lint:
          <li key={index}>{todoItem.text}</li>
        ))}
      </ul>

      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setTodoItems((prev) => [...prev, { text: newTodo }]);
          }}
        >
          <input type="text" onChange={(ev) => setNewTodo(ev.target.value)} value={newTodo} />{" "}
          <button type="submit">Add to-do</button>
        </form>
      </div>
    </>
  );
}
