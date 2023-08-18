import { ReactNode } from 'react';
import { get } from 'lodash';

interface Columns<T> {
  dataIndex: string;
  name: string | ReactNode;
  width?: string;
  textAlign?: 'center' | 'left' | 'right';
  render?: (text: string, record: T) => ReactNode;
}

export type ColumnTypes<T> = Columns<T>[];

interface TableProps<T> {
  title?: string;
  columns: ColumnTypes<T>;
  data: T[];
  loading: boolean;
}

function Table<T>({ title, columns, data, loading = false }: TableProps<T>) {
  return (
    <div className="overflow-auto rounded-sm bg-white  px-5 pb-2.5 pt-6 text-sm dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && (
        <h4 className="mb-6 text-xl font-semibold text-graydark dark:text-white">
          {title}
        </h4>
      )}

      <div className="relative mb-4 overflow-x-scroll border border-stroke dark:border-strokedark">
        <table className="w-full">
          <thead className="border-b border-stroke bg-gray-2  dark:border-strokedark dark:bg-meta-4">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    minWidth: column.width,
                    textAlign: column.textAlign,
                  }}
                  className="p-2.5 xl:p-5"
                >
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    {column.name}
                  </h5>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((row, indexRow) => (
                <tr key={(get(row, 'id') as string) || indexRow}>
                  {columns.map((column, indexCol) => (
                    <td key={indexCol} className="p-2.5 xl:p-5">
                      <div
                        style={{ overflowWrap: 'anywhere' }}
                        className={`flex text-black dark:text-white ${
                          column.textAlign &&
                          `text-${column.textAlign} justify-${column.textAlign}`
                        }`}
                      >
                        {column.render
                          ? column.render(get(row, column.dataIndex), row)
                          : get(row, column.dataIndex)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div
          className={`absolute top-0 h-full w-full items-center justify-center bg-gray-2 bg-opacity-60 p-4 dark:bg-graydark dark:bg-opacity-40
            ${loading ? 'flex' : 'hidden'}
            `}
        ></div>
        {!loading && data.length === 0 && (
          <div className="flex w-full justify-center p-4">
            <span className="text-lg">Data not found!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
