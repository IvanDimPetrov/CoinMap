import './App.css'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import Main from './layout/main/Main'
import Routing from './Routing'



function App() {
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

export default App;

