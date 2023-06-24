import {useEffect, useState} from 'react'
import { db } from '../config/firebase';
import { FaTrash, FaRegPaperPlane } from 'react-icons/fa';
import { set, ref, onValue, remove, orderByChild } from 'firebase/database';
function Chat(props) {
  //write
  
  const [todo, setTodo] = useState('');
  
  const writeToDatabase = () => {
    const timestamp = new Date().getTime();
    console.log(timestamp)
    !todo ? alert('Morate unijete tekst'):
    set(ref(db, `${timestamp}`), {
      todo: todo,
      timestamp: timestamp,

    })
    setTodo('');
  }

  //read from database
  const [todos, setTodos] = useState([]);
  useEffect(() => {

    orderByChild('timestamp')
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
    remove(ref(db, `/${todo.timestamp}`))
  }

  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload();
  }
  
  const user = props.props
  console.log(user.photoURL)

  return (
    <div className=" h-[100vh] relative w-full bg-slate-300  p-5 md:w-1/2 m-auto">
        <div className='flex justify-around border-b-4 items-center'>
        <h1>{user.displayName} </h1>
      <h1 className=' text-center text-3xl pb-2'>Bolnica Jagomir</h1>
        <button onClick={handleSignOut} className=' bg-red-600 px-3 py-2 rounded-lg uppercase mb-2'>Signout</button>
        </div>

      <div className=' w-11/12 overflow-y-auto m-auto no-scrollbar md:scrollbar  h-[75vh]'>
        {
          todos.length > 0 ?
          todos.map((todo) =>(
            <div key={todo.timestamp} className='flex justify-between mb-5 mt-5 rounded-lg bg-slate-400 px-4 py-2 items-center '>
            
            <img src={user.photoURL}  referrerpolicy="no-referrer" className='w-[50px] h-[50px] rounded-full' ></img>
            <h1 className='mr-auto pl-5'>{todo.todo}</h1>
            <button onClick={() => handleDelete(todo)} className=' bg-red-700 px-3 py-2 rounded-md' > <FaTrash/> </button>
          </div> 
          )) : <h1 className='text-center text-2xl py-3'>Nema poruka</h1>
        }
      </div>


      <div className='flex m-auto absolute h-200px bottom-10 w-11/12 space-x-5 justify-center items-center'>
      <textarea type='text' 
      className='p-3 rounded-md w-full md:w-2/3'
      onChange={(e) => setTodo(e.target.value)}
      value={todo}
      />
      {console.log(todo)}
      <button onClick={writeToDatabase} className=' hidden md:block bg-slate-400 p-3 w-1/3 rounded-md'> Submit</button>
      <button onClick={writeToDatabase} className=' md:hidden bg-slate-400 px-5 py-4 w-fit rounded-md'> <FaRegPaperPlane/></button>
      </div>
      
    </div>
  );
}

export default Chat;
