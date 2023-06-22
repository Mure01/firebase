import './App.css';
import {useEffect, useState} from 'react'
//firebase login, init, deploy

import { db } from './config/firebase';
import {uid} from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import { getDocs, doc, collection, addDoc, deleteDoc } from 'firebase/firestore';
function App() {
{
/*
  const [podaci, setPodaci] = useState([]);
  const podaciRef = collection(db, 'tepih')
  const [promjenam, setPromjena] = useState(false);
  useEffect(() => {
    
    const getPodaci = async () => {
      try {
        const podaci = await getDocs(podaciRef);
        const filteredPodaci = podaci.docs.map((doc) => (
          {...doc.data(), 
            id: doc.id, }
        ))
        setPodaci(filteredPodaci);
      }catch(err){
        console.error(err);
      }
      
    }
    getPodaci();
  }, [promjenam]) 
  
  const [ime, setIme] = useState("")
  const [broj, setBroj] = useState()
  const [adresa, setAdresa] = useState("")
  const [tepih, setTepih] = useState("")
  
  const posaljiPodatke = async () => {
    await addDoc(podaciRef, {imeprezime: ime, adresa: adresa, brojtelefona: broj, tepih: tepih })
  }
  
  const obrisiPodatke = async (id) => {
    
    const podaciDoc = doc(db, 'tepih', id);
    await deleteDoc(podaciDoc);
  }
 */ 
}
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
      {
        /*

     <h1 className='naslov'>Firebase</h1> 

     <div>
      <input type='text' 
             placeholder='Ime i prezime'
             onChange={(e) => setIme(e.target.value)}/>
      <input type='number' 
             placeholder='Broj telefona'
             onChange={(e) => setBroj(e.target.value)}/>
      <input type='text' 
             placeholder='Adresa'
             onChange={(e) => setAdresa(e.target.value)}/>
      <input type='text' 
             placeholder='Tepih'
             onChange={(e) => setTepih(e.target.value)}/>

      <button onClick={posaljiPodatke}>POosalji</button>
     </div>
      {
        podaci.map((podaci) => {
          console.log(podaci.imeprezime);
          return (

            <div className='podaci'>
            <h1 className=''>{podaci.imeprezime}</h1>
            <h1 className=''>{podaci.adresa}</h1>
            <h1 className=''>{podaci.brojtelefona}</h1>
            <h1 className=''>{podaci.tepih}</h1>

            <button onClick={() => obrisiPodatke(podaci.id) || setPromjena(!promjenam)}>Obrisi tepih</button>
          </div>
            )
        })
      }
      */}
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
