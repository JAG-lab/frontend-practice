import { useEffect, useState } from "react";

function App() {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const [todos, setTodos] = useState();
  const fetchApi = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    setTodos(responseJson);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div className="App">
      Task List
      <ul>
        {!todos
          ? "Loading..."
          : todos.map((todo, index) => {
              return <li key={index}>{todo.title} {todo.completed ? 'Complete' : 'Incomplete'}</li>;
            })}
      </ul>
    </div>
  );
}

export default App;
