import { useState, useEffect } from 'react'
import axios from 'axios'

const CreateTable = ({ data, column, ObjectId }) => {
    return (
        <table className="wb-tables table table-striped table-hover" data-wb-tables='{ "ordering" : false }'>
            <thead>
            <tr>
                {column.map((item, i) => <TableHeadItem item={item} key={i} />)}
            </tr>
            </thead>
            <tbody>
                {data.map((item, i) => <TableRow item={item} column={column} ObjectId={ObjectId} key={i} />)}
            </tbody>
        </table>
    )
}
  
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
  
const TableRow = ({ item, column, ObjectId}) => (
  <tr id={item[`${ObjectId}`]}>
    {column.map((columnItem, i) => {
      return <td key={i}>{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

function Table() {
    // Declare state variable.
    const [tableData, setData] = useState([]);

    // On load, send HTTP request to server.
    // Fires twice because StrictMode (see index.js) renders components twice on dev. Should not be an issue in production.
    useEffect(() => {
      axios.get('/api')
        .then((response) =>{
          setData(response.data);
        })
        .catch((error) => {
          alert(`Error: ${error.message}`)
        })
    // Keep the empty array.
    }, []);
    
    const ObjectId = '_id';

    const column = [
      { heading: 'First Name', value: 'firstName' },
      { heading: 'Last Name', value: 'lastName' },
      { heading: 'Favorite Pet', value: 'favoritePet' },
      { heading: 'Favorite Color', value: 'favoriteColor' },
      { heading: 'Message', value: 'message' },
    ];
  
    return (
      <div id="wb-bnr" className="container">
        <h1>Submitted Forms Table</h1>
        <CreateTable data={tableData} column={column } ObjectId={ObjectId} />
        <br/><br/>
      </div>
    );
  }

export default Table;