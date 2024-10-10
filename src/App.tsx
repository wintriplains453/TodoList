import { FC } from "react";
import TodoComponent from "./components/todo/todo";

const App: FC = () => {
  return (
    <div className="wrapperContent">
      <div className="content">
        <h1>Todos</h1>
        <TodoComponent />        
      </div>
    </div>
  );
}

export default App;
