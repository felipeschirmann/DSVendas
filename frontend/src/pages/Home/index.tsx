import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container content d-flex align-items-center justify-content-center">
        <div className="glass-jumbotron w-100">
          <h1>DSVendas</h1>
          <p className="lead">
            Analise o desempenho das suas vendas por diferentes perspectivas
          </p>
          <hr />
          <p className="mb-4">
            Esta aplicação consiste em exibir um dashboard a partir de dados
            fornecidos por um back end construído com Spring Boot.
          </p>
          <Link className="btn-primary-glow" to="/dashboard"> 
            Acessar o Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
