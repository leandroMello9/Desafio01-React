import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";
import {uuid} from 'uuidv4';
function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepositorieTitle, setNewRepositorie] = useState()
  const [urlRepositorie, setUrlRepositorie] = useState();
  const [techs, setTechs] = useState();
  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories')
      console.log(response.data);
      setRepositories(response.data);

    }
    loadRepositories();
  },[])
  async function handleAddRepository() {
    // TODO
   try {
    const newTechs = techs.split(',');
    
    const newRepositorie = {
      title: newRepositorieTitle,
      url: urlRepositorie,
      techs: newTechs
    }
    const response = await api.post('/repositories', newRepositorie)
   
    setRepositories(repositorie => [...repositorie, response.data])
    setTechs("");
    setUrlRepositorie("");
    setNewRepositorie("")
   }catch(err) {
     console.log(err)
   }

    
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id)
    const repo = repositories.filter(repositorie => repositorie.id !== id)
    console.log(repo);
    await api.delete(`/repositories/${id}`)
    setRepositories(repo);
  
  }

  return (
    <div>
      <div id="inputs">
      <input 
      type="text" 
      name="" 
      id=""
      value={newRepositorieTitle}
      placeholder="Informe o nome do repositorio" 
      onChange={event => setNewRepositorie(event.target.value)}/>
      <input 
      type="text" 
      name="" 
      id=""
      value={urlRepositorie} 
      placeholder="Url do repositorie" 
      onChange={
        event => setUrlRepositorie(event.target.value)
      }/>
      <input value={techs} type="text" placeholder="Tecnlogias, separa Por virgula" name="" id="" onChange={event => setTechs(event.target.value)}/>
      </div>
  
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
             {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
