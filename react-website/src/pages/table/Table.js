import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateTable = ({ data, column, setDocId }) => {
    return (
        <table className="wb-tables table table-striped table-hover" data-wb-tables='{ "ordering" : false }'>
            <thead>
            <tr>
                {column.map((item, i) => <TableHeadItem item={item} key={i} />)}
            </tr>
            </thead>
            <tbody>
                {data.map((item, i) => <TableRow item={item} column={column} setDocId={setDocId} key={i} />)}
            </tbody>
        </table>
    )
}
  
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
  
const TableRow = ({ item, column, setDocId }) => {
  const navigate = useNavigate();

  function rowClick (docId) {
    setDocId(docId);
    navigate('/admin-form')
  }

  // Replace with authentication token check.
  const auth = true;

  return (
    <tr type="button" onClick={auth ? () => rowClick(item._id) : null}>
      {column.map((columnItem, i) => {
        return <td key={i}>{item[`${columnItem.value}`]}</td>
      })}
    </tr>
  );
};

function Table(props) {
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
        <CreateTable data={tableData} column={column} setDocId={props.setDocId} />
        <br/><br/>
      </div>
    );
}

export default Table;