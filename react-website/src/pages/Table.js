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

function Table() {
    const tableData = require("../testData.json");
  
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
      </div>
    );
  }

export default Table;