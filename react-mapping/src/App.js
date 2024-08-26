import React, {useState, useEffect} from 'react';
import './App.css';

const App= ()=>{
  const [users, setUsers] =useState([]);
  const [searchQuary, setSearchQuary] =useState('');
  const [searched, setsearched] =useState([]);

  const getData = () =>{
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response)=>response.json())
    .then((json)=>setUsers(json))
  }

  useEffect(()=>{
    getData();
  }, []);

  useEffect(()=>{
    if(searchQuary){
      const searched = setTimeout(()=>{
        setsearched(
          users.filter((user)=>{
            return Object.values((user)).join('').toLowerCase().includes(searchQuary.toLowerCase())
          })
        )
      }, 500);
      return ()=>{
        clearTimeout(searched);
      }
    }else{
      setUsers(users);
    }
  }, [searchQuary, users]);
  return (
    <div>
      <input className="search" placeholder="Search users" onChange={(event)=>setSearchQuary(event.target.value)} />

      <div className="grid-main">
        {searchQuary.length>0
        ? searched.map((search)=>{
          return (
            <div className='grid-child'>
              <h1>{search.name}</h1>
              <p>{search.username}</p>
            </div>
          )
        }):users.map((user)=>{
          return (
            <div className='grid-child'>
              <h1>{user.name}</h1>
              <p>{user.username}</p>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}
export default App;