import './App.css';
import {useEffect, useState} from 'react'

import { db } from './config/firebase';
import {uid} from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
function App() {
  //write
  
  const [todo, setTodo] = useState('');
  
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `${uuid}`), {
      todo: todo,
      uuid: uuid,

    })
    setTodo("");
  }

  //read from database
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArr) => [...oldArr, todo]);
        })
      }
    } )

  },[])

  //delete from database

  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`))
  }

  return (
    <div className="App">
      <h1>Realtime database</h1>
      <input type='text' 
      onChange={(e) => setTodo(e.target.value)}
      />
      {console.log(todo)}
      <button onClick={writeToDatabase}>Submit</button>
      <div className='podaci'>
        {
          todos.map((todo) =>(
            <div>

            <h1>{todo.todo}</h1>
            <button onClick={() => handleDelete(todo)} >Delete</button>
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
