import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import Nav from './views/Nav.js';
import Todo from './views/Todo.js';
import Covid from './views/Covid.js';
import Blog from './views/Blog.js';
import DetailBlog from './views/DetailBlog.js';
import AddNewBlog from './views/AddNewBlog.js';
import NotFound from './views/NotFound.js';
import YouTubeSearch from './views/YoutubeSearch.js';
import { CountDown, NewCountDown } from './views/Countdown.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [name, setName] = useState("Thanh Thien");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { id: 'todo1', title: 'Learning English', type: 'study' },
    { id: 'todo2', title: 'Doing homework', type: 'study' },
    { id: 'todo3', title: 'Playing game', type: 'relax' },
    { id: 'todo4', title: 'Reading books', type: 'study' }
  ]);

  useEffect(() => {
    // console.log(">>> using Effect hook")
  }, [value]);

  useEffect(() => {
    // console.log(">>> using Effect hook with todos")
  }, [todos]);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  }

  const handleEventClick = (event) => {
    let newTodos = {
      id: Math.floor(Math.random() * 100000 + 1),
      title: value,
      type: 'study',
    }

    setTodos([...todos, newTodos]);
    setValue("");
  }

  const deleteDataTodo = (id) => {
    let currentTodos = todos;
    currentTodos = currentTodos.filter(item => item.id !== id);
    setTodos(currentTodos);
  }

  const onTimesUp = () => {
    // alert('Times up!')
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Nav />
        </header>

        <Switch >
          <Route exact path="/">
            <Covid />
          </Route>
          <Route path="/todo">
            <input type="text" value={value} onChange={(event) => handleOnChange(event)}></input>
            <button type="button" onClick={(event) => handleEventClick(event)}>Click me</button>
            <Todo
              todos={todos}
              title={"Todo List"}
              deleteDataTodo={deleteDataTodo}
            />
          </Route>
          <Route path="/countdown">
            <CountDown onTimesUp={onTimesUp} />
            <NewCountDown onTimesUp={onTimesUp} />
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/blog/:id">
            <DetailBlog />
          </Route>
          <Route path="/add-new-blog">
            <AddNewBlog />
          </Route>
          <Route path="/search">
            <YouTubeSearch />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch >

      </div>
    </Router>
  );
}

export default App;
