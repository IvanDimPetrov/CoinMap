import { useEffect, useState } from 'react'
import './App.css'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import Main from './layout/main/Main'
import Routing from './Routing'
import { GetRequest } from './api/cruds'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function  populateData() {
       const data = await GetRequest('weatherforecast');
       setData(data);

    }

    populateData();
  }, [])

  return (
    <>
      <Header/>
      <Main>
        <Routing/>
      </Main>  
      <Footer/>
    </>
  )
}

export default App
function GetReguest<T>(arg0: string) {
  throw new Error('Function not implemented.')
}

