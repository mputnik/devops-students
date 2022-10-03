import { useState, useEffect } from 'react'

const CreateTable = ({ data, column }) => {
    return (
        <table className="wb-tables table table-striped table-hover" data-wb-tables='{ "ordering" : false }'>
            <thead>
            <tr>
                {column.map((item, i) => <TableHeadItem item={item} key={i} />)}
            </tr>
            </thead>
            <tbody>
                {data.map((item, i) => <TableRow item={item} column={column} key={i} />)}
            </tbody>
        </table>
    )
}
  
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
  
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, i) => {
      return <td key={i}>{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

// TODO: add componentDidMount to request db data, setState/re-render when data is retrieved.
function Table() {
    // const tableData = require("../testData.json");

    // Declare state variable.
    const [tableData, setData] = useState([]);

    // On load, send HTTP request to server.
    // Fires twice because StrictMode (see index.js) renders components twice on dev. Should not be an issue in production.
    useEffect(() => {
      let http = new XMLHttpRequest();
      http.onreadystatechange = () => {   // Set the function for when the response is sent back.
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          setData(JSON.parse(http.response));
        }
      }
      http.open("GET", "http://localhost:8080/data/entry", true);   // true => async
      http.send(null);
    }, [tableData]);
    
    const column = [
      { heading: 'First Name', value: 'firstName' },
      { heading: 'Last Name', value: 'lastName' },
      { heading: 'Favorite Pet', value: 'favoritePet' },
      { heading: 'Favorite Color', value: 'favoriteColor' },
      { heading: 'Message', value: 'message' },
    ]
  
    return (
      <div id="wb-bnr" className="container">
        <h1>Submitted Forms Table</h1>
        <CreateTable data={tableData} column={column} />
        <br/><br/>
      </div>
    );
  }

export default Table;