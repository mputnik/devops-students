const CreateTable = ({ data, column }) => {
    return (
        <table class="wb-tables table table-striped table-hover" data-wb-tables='{ "ordering" : false }'>
            <thead>
            <tr>
                {column.map((item) => <TableHeadItem item={item} />)}
            </tr>
            </thead>
            <tbody>
                {data.map((item) => <TableRow item={item} column={column} />)}
            </tbody>
        </table>
    )
}
  
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
  
const TableRow = ({ item, column }) => (
    <tr>
        {column.map((columnItem) => {
        return <td>{item[`${columnItem.value}`]}</td>
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
      <div id="wb-bnr" class="container">
        <h1>Submitted Forms Table</h1>
        <CreateTable data={tableData} column={column} />
      </div>
    );
  }

export default Table;