import './styles/Dashboard.css';
import ProductHeatmap from './ProductHeatmap';
import AggregateHeatmap from './AggregateHeatmap';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jacket from './images/denim_jacket.png'
import ProductCarousel from './components/Carousel';
// import tshirt from "./images/tshirt.png";
// import pants from "./images/pants.png";
// import shirt from "./images/shirt.png";

function Dashboard() {


  const [viewType, setViewType] = React.useState('');

  const changeViewType = (event) => {
    setViewType(event.target.value);
  };

  const showView = () => {
    if (viewType === 1) {
      return <AggregateHeatmap imageUrl={jacket} prductid={2} />;
    }
    else if (viewType === 2) {
      return (<ProductHeatmap imageUrl={jacket}/>);
    }
    else {
      return (
        <p>
          Select a view
        </p>
      );
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <ProductCarousel />
      <header style={{ backgroundColor: "#82C3FF10", minHeight: "100vh" }}>
        <div style={{ padding: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="view-select-label">View</InputLabel>
            <Select
              labelId="view-select-label"
              id="view-simple-select"
              value={viewType}
              label="Select View"
              onChange={changeViewType}
            >
              <MenuItem value={1}>Aggregate View</MenuItem>
              <MenuItem value={2}>Single Feedback View</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <div style={{padding:'6em'}}>
          {showView()}
        </div>
      </header>
    </div>
  );
}

export default Dashboard;
