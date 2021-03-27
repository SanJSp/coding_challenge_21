import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button } from '@material-ui/core';

class DataTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = 
      {
        data: [{name: 'Elvis Presley',
        amount: 312.44}],
        rows: [{name: 'Elvis Presley',
        amount: 312.44}]
      };
    }
  
    componentDidMount() {
        fetch('https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true')
        .then(response => response.json())
        .then(data => { 
            console.log(data.result);

            this.setState({ data: data.result })}
           );
    }
  
    componentWillUnmount() {
    }
  
    render() {
        return (
            <React.Fragment>
              <Title>Recent Orders</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Ministerium</TableCell>
                    <TableCell align="right">Anzahl Datensätze</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map((row) => (
                    <TableRow key={row.display_name}>
                      <TableCell>{row.display_name}</TableCell>
                      <TableCell align="right">{row.package_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </React.Fragment>
          );
    }
  }

  export default DataTable