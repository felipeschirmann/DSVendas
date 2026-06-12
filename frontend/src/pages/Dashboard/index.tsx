import BarChart from "components/BarChart";
import DonutChart from "components/DonutChart";
import DataTable from "components/DataTable";
import Footer from "components/Footer";
import NavBar from "components/NavBar"; 

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="container content pb-5">
        <h1 className="dashboard-title py-3">Dashboard de vendas</h1>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <div className="glass-card">
              <h5 className="text-center text-muted mb-4">Taxa de sucesso (%)</h5>
              <BarChart />
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <div className="glass-card">
              <h5 className="text-center text-muted mb-4">Todas as vendas</h5>
              <DonutChart />
            </div>
          </div>
        </div>
        <div className="py-4">
          <h2 className="section-title">Todas as vendas</h2>
          <DataTable />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
