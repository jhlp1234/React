import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function H1(props){
  return <h1 style={{cursor: "pointer"}} onClick={function(){
    props.onClicks();
  }}>{props.title}</h1>
}

function Nav(props){
  const list = [];
  for(let i = 0; i < props.list.length; i++){
    list.push(<li key={props.list[i]} style={{cursor: "pointer"}} onClick={function(event){
      props.onClicks(props.list[i]);
    }}>{props.list[i]}</li>)
  }
  return <ol>
    {list}
  </ol>
}

function Create(props){
  return <article>
    <form onSubmit={function(event){
      event.preventDefault();
      let name = event.target.name.value
      let password = event.target.password.value
      props.creates(name, password);
    }}>
    <p><input type='text' name='name' placeholder='Name'/></p>
    <p><input type='password' name='password' placeholder='Password'/></p>
    <p><input type='submit' value="제출"/></p>
  </form>
    </article>
}

function Update(props){
  const [name, setName] = useState(props.id)
  return <form onSubmit={function(event){
    event.preventDefault();
    let newId = event.target.name.value;
    props.updates(props.id, newId);
  }}>
    <p><input type='text' name='name' placeholder='Name' value={name} onChange={function(event){
      setName(event.target.value)
    }}/></p>
    <p><input type='password' name='password' placeholder='Password'/></p>
    <p><input type='submit' value="제출"/></p>
  </form>
}

function Article(props){
  if(props.mode == null){
    return <a href='/create' onClick={function(event){
      event.preventDefault();
      props.onClicks();
    }}>Create</a>
  }
  else if(props.mode == "create"){
    return <Create creates={function(name, password){
      props.onCreate(name, password);
    }}></Create>
  }
  else if(props.mode == "update"){
    return <Update id={props.id} updates={function(oldId, newId){
      props.onUpdate(oldId, newId);
    }}></Update>
  }
  else{
    return <article>
      {props.id}<br/>
      <a href="/update" onClick={function(event){
        event.preventDefault();
        props.toUpdate();
      }}>Update</a>
        <p><input type='submit' value="Delete" onClick={function(){
          props.onDelete(props.id);
        }}/></p>
      </article>
  }
}

function App() {
  const [lists, setLists] = useState(["1", "2", "3"]);
  const [id, setId] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <div>
      <H1 title="React" onClicks={function(){
        setMode(null);
      }}></H1>
      <Nav list={lists} onClicks={function(num){
        setId(num);
        setMode("number");
      }}></Nav>
      <Article id={id} mode={mode} onClicks={function(){
        setMode("create");
      }} onCreate={function(name, password){
        let newLists = [...lists];
        newLists.push(name)
        setLists(newLists);
      }}
      toUpdate={function(){
        setMode("update");
      }}
      onUpdate={function(oldId, newId){
        let newLists = [...lists];
        for(let i = 0; i < newLists.length; i++){
          if(newLists[i] == oldId){
            newLists[i] = newId;
          }
        }
        setLists(newLists);
        setMode(null)
      }}
      onDelete={function(id){
        let newLists = [];
        for(let i = 0; i < lists.length; i++){
          if(lists[i] != id){
            newLists.push(lists[i]);
          }
        }
        setLists(newLists);
      }}
      ></Article>
    </div>
  );
}

export default App;
