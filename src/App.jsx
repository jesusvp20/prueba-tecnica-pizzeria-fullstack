import PizzasList from "./Components/PizzasListComponent/PizzasList";
import OrdenesConfirmacion from "./Components/Ordenes_Confirmacion/OrdenesConfirmacion";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <header className="container-fluid py-4 px-3 px-md-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-warning mb-3">
            <span role="img" aria-label="pizza">🍕</span> Pizzería Express </h1>
          <p className="lead text-muted">Realiza tu pedido de forma sencilla </p>
        </div>
      </header>

      <main className="container-fluid px-3 px-md-5 pb-5">
        <div className="row gy-4 gx-lg-5">
          <div className="col-12 col-lg-7">
            <div className="card custom-card bg-gray-800 border-warning p-4 rounded-4 h-100">
              <h2 className="mb-4 text-center text-lg-start text-warning">
                Nuestras Especialidades
              </h2>
              <PizzasList />
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card custom-card bg-gray-800 border-warning p-4 rounded-4 h-100">
              <h2 className="mb-4 text-center text-lg-start text-warning">
                Tu Pedido
              </h2>
              <OrdenesConfirmacion />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;