// icone no input
import {FiSearch} from 'react-icons/fi'

import { useState } from 'react';

import Api from "./services/Api"
import './App.css'


function App() {

  const [input, setInput] = useState('');
  const [infoCep, setInfoCep] = useState({});

  // função para buscar as informações do Cep em formato Json
    async function handleSearch(){
      //condiçaõ caso o valor do input fique vazio
      if(input === ''){
        alert("Digite um Cep!")
        return;
      }
      // caso o valor do input esteja OK
      try{
        const resp = await Api.get(`${input}/json`);
        setInfoCep(resp.data)
        setInput("");
      }
      // se o valor digitado não for encontrado no bando de dados da Api
      catch{
        alert("Erro ao buscar Cep, verifique se o numero digitado esta correto!")
        console.log("nao encontrado")
        setInput("")
      }
    }
  
  return (
  
    
    <div className="container">
    
    <h1 className="title">Buscador CEP</h1>

  <div className="container_Input">
    
    <input 
    type="text"
    placeholder="Digite seu cep..."
    onChange={(e) => setInput(e.target.value)}
    value={input}
     />

  <button className="button_Search" onClick={handleSearch}>
    <FiSearch size={25} color="#fff"/>
  </button>

  </div>
 {/* renderização condicional para apresentar o quado branco com as informções do CEP */} 
  {Object.keys(infoCep).length > 0 && (
        
        <main className='main'>
        <h2>CEP: {infoCep.cep} </h2>

        <span>{infoCep.logradouro}</span>
        <span>Complemento: {infoCep.complemento}</span>
        <span>{infoCep.bairro}</span>
        <span>{infoCep.localidade} - {infoCep.uf}</span>

      </main>
      )}

  </div>

  );
}

export default App;
