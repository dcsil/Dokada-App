import './styles/Dashboard.css';
import ProductHeatmap from './ProductHeatmap';
import jacket from './images/denim_jacket.png'

function Dashboard() {
  return (
    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF10", minHeight: "100vh"}}>
        <p>
            Dashboard goes here
        </p>
        <ProductHeatmap imageUrl={jacket}/>
      </header>
    </div>
  );
}

export default Dashboard;
