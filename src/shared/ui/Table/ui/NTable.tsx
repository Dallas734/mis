import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import cls from "./Table.module.scss";
import { TableColumn } from "../../../types/TableColumn";
import { TableSortLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { Order } from "../../../types/Order";

const getProperty = (
  indexes: String[],
  i: number,
  el: Object,
  arr: Object[]
) => {
  type P = keyof typeof el;
  var newProperty = el ? el[indexes[i] as P] : "";

  if (newProperty !== "") {
    if (indexes[i + 1] !== undefined) {
      i++;
      getProperty(indexes, i, newProperty, arr);
    } else {
      arr[0] = newProperty;
    }
  }
};

interface TableProps<T> {
  data?: T[];
  head?: TableColumn[];
  setHead?: (arr: TableColumn[]) => void;
  setSelectedElement?: (el: T) => void;
}

export const NTable = <T extends Object>(props: TableProps<T>) => {
  const {
    data = [],
    head = [],
    setHead = null,
    setSelectedElement = null,
  } = props;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>();
  const [viewData, setViewData] = useState<Array<T>>(data);
  const [sortDirection, setSortDirection] = useState<Order>("asc");
  const [activeId, setActiveId] = useState<number>();

  useEffect(() => {
    setViewData(data);
  }, [data]);

  const handleSortRequest = (cell: TableColumn) => {
    const isAsc = orderBy === cell.index && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cell.index);
  };

  var sortMultidimensionalArrayFunc = <T extends Object>(
    inArr: Array<T>,
    inIndex: string,
    inOrderBy: Order
  ) => {
    var arr: Array<T> = inArr.length > 0 && inArr !== undefined ? inArr : [];
    var index: string =
      inIndex.length > 1 && inIndex !== undefined ? inIndex : "";
    var orderBy = inOrderBy;

    const indexes = index.split(".");
    var len = indexes.length;

    if (process.env.NODE_ENV !== "production") {
      var classof = function classof(obj: Object) {
        return Object.prototype.toString.call(obj).slice(8, -1);
      };

      if (classof(arr) !== "Array") {
        throw new Error("First argument must be a array");
      }

      if (classof(index) !== "String") {
        throw new Error("Second argument must be a string");
      }
    }

    function asc(firstArray: Object, secondArray: Object) {
      var i = 0;
      while (i < len) {
        firstArray = firstArray[indexes[i] as keyof Object];
        secondArray = secondArray[indexes[i] as keyof Object];
        i++;
      }
      i--;
      if (firstArray > secondArray) {
        return 1;
      } else if (firstArray < secondArray) {
        return -1;
      }

      return 0;
    }

    function desc(firstArray: Object, secondArray: Object) {
      var i = 0;
      while (i < len) {
        firstArray = firstArray[indexes[i] as keyof Object];
        secondArray = secondArray[indexes[i] as keyof Object];
        i++;
      }
      i--;
      if (firstArray < secondArray) {
        return 1;
      } else if (firstArray > secondArray) {
        return -1;
      }

      return 0;
    }

    switch (orderBy) {
      case "asc":
        return arr.sort(asc);
      case "desc":
        return arr.sort(desc);
      default:
        return arr;
    }
  };

  const sortTableFunc = (id: string, sortMethod: Order, index: number) => {
    let currentSortMethod = sortMethod;
    switch (sortMethod) {
      case undefined:
        currentSortMethod = undefined;
        break;
      case "asc":
        currentSortMethod = "desc";
        break;
      case "desc":
        currentSortMethod = "asc";
        break;
      default:
        currentSortMethod = "asc";
    }

    setSortDirection(currentSortMethod);

    head.forEach((x) =>
      x.index === id ? (x.sortMethod = currentSortMethod) : x.sortMethod
    );
    if (setHead) setHead(head);

    let arrayForSort = [...viewData];
    setViewData(
      sortMultidimensionalArrayFunc(arrayForSort, id, currentSortMethod)
    );
  };

  return (
    <div className={cls.body}>
      <TableContainer
        component={Paper}
        style={{ height: "100%", width: "100%" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {head.map((el, index) => (
                <TableCell
                  key={index}
                  sx={{
                    [`&.${tableCellClasses.head}`]: {
                      backgroundColor: "#afd5af",
                    },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === el.index ? true : false}
                    direction={sortDirection}
                    onClick={() => {
                      sortTableFunc(
                        head[index].index,
                        head[index].sortMethod,
                        index
                      );
                      handleSortRequest(el);
                    }}
                  >
                    {el.name}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {viewData.map((el: T, index) => (
              <TableRow
                hover
                key={index}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "fff6e7",
                  },
                }}
                onClick={() => {
                  setActiveId(index);
                  if (setSelectedElement) setSelectedElement(el);
                }}
                className={activeId === index ? cls.active : ""}
              >
                {head.map((column) => {
                  const indexes = column.index.split(".");
                  let arr: Object[] = [];
                  getProperty(indexes, 0, el, arr);
                  return (
                    <TableCell key={Math.random()}>
                      <>{arr[0]}</>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
