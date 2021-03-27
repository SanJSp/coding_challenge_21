import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import departments from './departments.json'

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

    editData(passedData){
        const departmentsJson = departments.departments
        const regex =  /.*([Mm]inisterium).*/
        let ministerien = [];
        passedData.forEach(function(department){
            if (department.display_name.match(regex)) {
                ministerien.push(department)
            }
        })

        console.log(ministerien)
        ministerien.forEach(ministerium => {
            const ministeriumJSON = departmentsJson.find((eintrag) => eintrag.name === ministerium.display_name  )
            console.log(ministeriumJSON)
            if(ministeriumJSON.subordinates){
                ministeriumJSON.subordinates.forEach((subordinate => {
                    
                    const subordinateJson = passedData.find((eintrag) => eintrag.display_name === subordinate.name)
                    ministerium.package_count += subordinateJson.package_count 
                }))
            }
        })

        ministerien.sort(function (a,b) {return b.package_count - a.package_count})



        return ministerien
    }
  
    componentDidMount() {
        fetch('https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true')
        .then(response => response.json())
        .then(data => { 
            console.log(data.result)
            const editedData = this.editData(data.result)

            this.setState({ data: editedData })}
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