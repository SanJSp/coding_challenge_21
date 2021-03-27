import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import departmentsJSON from './departments.json';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getDepartmentData(fetchedData) {
    const departmentsDescription = departmentsJSON.departments;
    const regex = /.*([Mm]inisterium).*/;
    let departmentNamesWithData = [];
    let departmentsData = [];

    // collect apartments with data
    fetchedData.forEach(function (department) {
      if (department.display_name.match(regex)) {
        departmentsData.push(department);
        departmentNamesWithData.push(department.display_name);
      }
    });

    // include subordinate count 
    departmentsData.forEach((department) => {
      const departmentDescription = departmentsDescription.find(
        (entry) => entry.name === department.display_name
      );
      if (departmentDescription.subordinates) {
        departmentDescription.subordinates.forEach((subordinate) => {
          const subordinateData = fetchedData.find(
            (entry) => entry.display_name === subordinate.name
          );
          department.package_count += subordinateData.package_count;
        });
      }
    });

    // include departments without data
    departmentsData = this.addDepartmentsWithoutData(
      departmentsData,
      departmentNamesWithData
    );

    // sort desc by count
    departmentsData.sort(function (a, b) {
      return b.package_count - a.package_count;
    });

    return departmentsData;
  }

  addDepartmentsWithoutData(departmentsData, departmentNamesWithData) {
    const regex = /.*([Mm]inisterium).*/;
    const allDepartments = [];
    departmentsJSON.departments.forEach(function (department) {
      if (department.name.match(regex)) {
        allDepartments.push(department.name);
      }
    });
    const departmentsWithoutData = allDepartments.filter(
      (item) => !departmentNamesWithData.includes(item)
    );

    departmentsWithoutData.forEach((department) => {
      departmentsData.push({ display_name: department, package_count: 0 });
    });

    return departmentsData;
  }

  componentDidMount() {
    fetch(
      'https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true'
    )
      .then((response) => response.json())
      .then((data) => {
        const relavantData = this.getDepartmentData(data.result);
        this.setState({ data: relavantData });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Title>Anzahl der Datensätze pro Ministerium</Title>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell style={{"font-weight": "bold"}} >Ministerium</TableCell>
              <TableCell style={{"font-weight": "bold"}} align='right'>Anzahl Datensätze</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((row) => (
              <TableRow key={row.display_name}>
                <TableCell>{row.display_name}</TableCell>
                <TableCell align='right'>{row.package_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default DataTable;
