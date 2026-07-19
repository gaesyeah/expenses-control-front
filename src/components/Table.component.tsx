import { type ReactNode } from "react";
import styled from "styled-components";

type TableItem = Record<string, ReactNode> & { id: string };

type TableProps<T extends TableItem> = Readonly<{
  items: T[] | undefined;
  columns: { key: keyof T; label: string }[];
}>;

export default function Table<T extends TableItem>({
  items,
  columns,
}: TableProps<T>) {
  return (
    <SCTableContainer>
      <SCTable>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={String(key)}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key }) => {
                const value = item[key];
                return (
                  <td
                    key={String(key)}
                    title={
                      typeof value !== "object" ? String(value) : undefined
                    }
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </SCTable>
    </SCTableContainer>
  );
}

const SCTableContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.background.main};
  border-radius: 10px;
  overflow: auto;
`;
const SCTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    border-bottom: 2px solid ${({ theme }) => theme.colors.background.main};
    text-align: center;
    vertical-align: middle;
    padding-top: 5px;
    padding-bottom: 5px;
    max-width: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tbody tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background.gray["0"]};
  }
  tbody tr:last-child td {
    border-bottom: none;
  }

  thead {
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.font.white};
    background-color: ${({ theme }) => theme.colors.background.main};
    border-radius: 10px;
  }
`;
