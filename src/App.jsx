import PizzasList from "./Components/PizzasListComponent/PizzasList"
import OrdenesConfirmacion from "./Components/Ordenes_Confirmacion/OrdenesConfirmacion"

function App() {

  return (
    <>
      <h1 className='text-center my-3'>Pizzería Express</h1>
  
      <PizzasList />
    

    <OrdenesConfirmacion/>
    </>
  )
}

export default App
