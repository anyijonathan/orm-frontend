import { ReactNode, useEffect, useState } from "react";
import styles from "../../Assets/Styles/Component/table.module.scss";
import Pagination from "../Pagination";
import { v4 as uuidv4 } from 'uuid';

/**
  * <summary>
  * Provides the DataTable required by App
  * </summary>
  * <param name="headers, data, totalcount">
  * </param> 
  * <returns>
  * Custom Table UI with input provided by user
  * </returns> 
  */
interface DataTableHeaderProps {
  title?: ReactNode;
  sortable?: boolean;
}

interface DataTablePropsData {
  title: ReactNode;
}

interface DataTableProps {
  headers: DataTableHeaderProps[];
  data: DataTablePropsData[][];
  totalCount:number,
  onChangePage: (page: number) => void;
  paginator: boolean;
  type?: "normal" | "error";
}

export const DataTable = ({
  headers,
  data,
  totalCount,
  onChangePage,
  paginator,
  type = "normal",
}: DataTableProps) => {
  const [pagedData, setPagedData] = useState<ReactNode[][]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const splitTableDataIntoChunksOfArray = () => {
    let temporaryArray: any[] = [];
    for (let i = 0; i < data.length; i += pageSize) {
      let myChunk = data.slice(i, i + pageSize);
      temporaryArray.push(myChunk);
    }
    return temporaryArray;
  };

  useEffect(() => {
    setPageSize(10);
    setActivePage(1);
    let data = splitTableDataIntoChunksOfArray();
    setPagedData(data[activePage - 1] || []);

  }, [data, pageSize, activePage]);

  return (
    <>
      <div className={styles?.LTable}>
        <table data-border="0" cellPadding="0" cellSpacing="0">
          <thead>
            <tr className={styles?.tableHead}>
              {headers.map((item: any, i: number) => (
                <th key={uuidv4()}>{item.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginator
              ? pagedData.map((group: Array<any>, j: number) => (
                  <tr key={uuidv4()} className={styles?.[type]}>
                    {group.map((item: any, i: number) => (
                      <td key={uuidv4()}>{item.title}</td>
                    ))}
                  </tr>
                ))
              : data.map((group: Array<any>, j: number) => (
                  <tr key={uuidv4()} className={styles?.[type]}>
                    {group.map((item: any, i: number) => (
                      <td key={uuidv4()}>{item.title}</td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {paginator && (
          <Pagination
            totalPages={Math.ceil(totalCount/ pageSize)}
            defaultActivePage={activePage}
            onChangePage={onChangePage}
          />
      )}
    </>
  );
};
