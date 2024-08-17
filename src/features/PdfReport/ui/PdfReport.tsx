import { Fragment, ReactElement } from "react";
import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";
import { TableColumn } from "../../../shared/types/TableColumn";

export interface ReportProps<T> {
  data?: Array<T>;
  chart?: ReactElement;
  head?: TableColumn[];
  dates?: Array<string | undefined>;
  title?: string;
}

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  theader: {
    marginTop: 20,
    fontSize: 10,
    fontFamily: "Roboto",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});

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

export const PdfReport = <T extends Object>(props: ReportProps<T>) => {
  const { data, head, title, dates } = props;
  // const numOfProperties = head?.length;

  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            textAlign: "center",
            fontSize: 15,
            marginRight: 30,
            fontFamily: "Roboto",
            flexDirection: "column",
          }}
        >
          <Text>Отчет</Text>
          <Text>{title}</Text>
          {dates ? (
            <Text>
              с {dates[0]} по {dates[1]}
            </Text>
          ) : (
            <></>
          )}
        </View>
        {/* <View>{""}</View> */}
        <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
          {head?.map((header) => (
            <View style={styles.theader}>
              <Text>{header.name}</Text>
            </View>
          ))}
        </View>
        {data?.map((el: T, id) => (
          <Fragment key={id}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              {head?.map((column) => {
                const indexes = column.index.split(".");
                let arr: Object[] = [];
                getProperty(indexes, 0, el, arr);
                return (
                  <View style={styles.tbody}>
                    <Text>
                      <>
                        {column.index === "workload"
                          ? (Number(arr[0]) * 100).toFixed(2) + " %"
                          : arr[0]}
                      </>
                    </Text>
                  </View>
                );
              })}
            </View>
          </Fragment>
        ))}
      </Page>
    </Document>
  );
};
