import * as React from "react";
import { fetchPriceList } from "../service/ApiConfig";
import LineChart from "./LineChart";
import { Button } from "@mui/material";

interface Props {
  stocksList: any[];
  price: string; // Define the type of your function prop
  dateRange: string[];
}

const Main: React.FC<Props> = ({ stocksList, price, dateRange }) => {
  const [priceList, setpriceList] = React.useState<any[]>([]);
  const [graphData, setGraphData] = React.useState<any[]>([]);

  console.log("stocklist : ",stocksList);
  console.log("price-list : ",priceList);
   
  React.useEffect(() => {
    fetchPriceList(stocksList)
      .then((res) => {        
        setpriceList([...res]);        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stocksList]);

  const showChart = () => {
    setGraphData([]);
    priceList.map((p, i) =>
      setGraphData((prev) => [
        ...prev,
        {
          label: p.name,
          data: p[price],
          borderColor: `${
            i == 0
              ? "rgb(100,99,132)"
              : "rgb(255, 99, 132)" && i == 2
              ? "rgb(220, 99, 132)"
              : ""
          }`,
          // borderColor: `${`rgb(${i + 100}, ${i + 36}, ${i + 132})`}`,
          backgroundColor: `${
            i == 0
              ? "rgb(100,99,132)"
              : "rgb(255, 99, 132)" && i == 2
              ? "rgb(220, 99, 132)"
              : ""
          }`
          // backgroundColor: `rgb(${i + 100}, ${i + 36}, ${i + 132})`
        }
      ])
    );
  };

  return (
    <>
      <div style={{display:'flex',marginTop:10, justifyContent:'center'}}>
        <Button variant="contained" onClick={showChart}>Show Chart</Button>
      </div>
      <div>
        <LineChart graphData={graphData} dateRange={dateRange} />
      </div>
    </>
  );
};

export default Main;
