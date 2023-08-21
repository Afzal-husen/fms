import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const Card = ({theme, type, url, cost}) => {
    const [length, setLength] = useState("")
    const [vehicles, setVehicles] = useState([])
    const [drivers, setDrivers] = useState([])
    const [fuels, setFuels] = useState([])
    const [detail, setDetail] = useState([])

    let total= 0
    for(let i = 0; i<fuels.length; i++) {
        console.log(fuels[i])
        total += fuels[i].fuel_total_price
    }
    total = total.toLocaleString("en-IN")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(url)
                if(data.vehicles) {
                    setVehicles(data.vehicles)
                }
                if(data.drivers) {
                    setDrivers(data.drivers)
                }
                if(data.fuel_detail) {
                    setFuels(data.fuel_detail)
                }
                if(data.data) {
                    setDetail(data.data)
                }
                setLength(data.numRows.numRows)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [url])

  return (
    <Fragment>
      <div className="card-container" style={{backgroundColor: theme}}>
        <div className="card-wrapper">
          <h3>{type}</h3>
          <h5>Total {cost ? cost : type}: {cost ? total : length}</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
