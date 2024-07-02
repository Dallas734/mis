import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import cls from "./Table.module.scss";
import { TableColumn } from "../../../types/TableColumn";

const getProperty = (
  indexes: String[],
  i: number,
  el: Object,
  arr: Object[]
) => {
  type P = keyof typeof el;
  var newProperty = el[indexes[i] as P];

  if (indexes[i + 1] !== undefined) {
    i++;
    getProperty(indexes, i, newProperty, arr);
  } else {
    arr[0] = newProperty;
  }
};

interface TableProps<T> {
  data?: T[];
  head?: TableColumn[];
}

export const NTable = <T extends Object>(props: TableProps<T>) => {
  const { data = [], head = [] } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {head.map((el, index) => (
              <TableCell key={index}>{el.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((el: T, index) => (
            <TableRow key={index}>
              {head.map((column) => {
                const indexes = column.index.split(".");
                let arr: Object[] = [];
                getProperty(indexes, 0, el, arr);
                return (
                  <TableCell key={indexes[0]}>
                    <>{arr[0]}</>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
