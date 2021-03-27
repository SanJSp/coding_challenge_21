import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import departments from './departments.json';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getDepartmentData(fetchedData) {
    const departmentsDescription = departments.departments;
    const regex = /.*([Mm]inisterium).*/;
    let departmentNamesWithData = [];
    let departmentsData = [];

    fetchedData.forEach(function (department) {
      if (department.display_name.match(regex)) {
        departmentsData.push(department);
        departmentNamesWithData.push(department.display_name);
      }
    });

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

    departmentsData = this.addDepartmentsWithoutData(
      departmentsData,
      departmentNamesWithData
    );
    departmentsData.sort(function (a, b) {
      return b.package_count - a.package_count;
    });

    return departmentsData;
  }

  addDepartmentsWithoutData(departmentsData, departmentNamesWithData) {
    const regex = /.*([Mm]inisterium).*/;
    const listOfAllDepartments = [];
    departments.departments.forEach(function (department) {
      if (department.name.match(regex)) {
        listOfAllDepartments.push(department.name);
      }
    });
    const departmentsWithoutData = listOfAllDepartments.filter(
      (item) => !departmentNamesWithData.includes(item)
    );

    departmentsWithoutData.forEach((department) => {
      departmentsData.push({ display_name: department, package_count: 0 });
    });

    return departmentsData;
  }

  componentDidMount() {
    fetch('https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        const editedData = this.getDepartmentData(data.result);
        this.setState({ data: editedData });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Title>Anzahl der Datensätze pro Ministerium</Title>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Ministerium</TableCell>
              <TableCell align='right'>Anzahl Datensätze</TableCell>
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
