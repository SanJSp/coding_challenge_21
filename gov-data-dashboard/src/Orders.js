import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button } from '@material-ui/core';


const getDataFromAPI = async () => {
  const response = await fetch('https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true')
  return await response.json()
} 


// Generate Order Data
function createData(name, amount) {
  const data = getDataFromAPI()
  return {name, amount };
}

const rows = [
  createData(
    'Elvis Presley',
    312.44,
  ),
  createData(
    'Paul McCartney',
    866.99,
  ),
  createData(
    'Michael Jackson',
    654.39,
  ),
  createData(
    'Bruce Springsteen',
    212.79,
  ),
];

export default function Orders() {
  return (
    <React.Fragment>
      <Button onClick={getDataFromAPI}> Debug </Button>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ministerium</TableCell>
            <TableCell align="right">Anzahl Datensätze</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
