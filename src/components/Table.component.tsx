import { type ReactNode } from "react";
import { RotatingLines } from "react-loader-spinner";
import styled, { useTheme, type CSSProperties } from "styled-components";

type TableItem = Record<string, ReactNode> & { id: string };

type TableProps<T extends TableItem> = Readonly<{
  items: T[] | undefined;
  columns: { key: keyof T; label: string }[];
  style?: CSSProperties;
  isLoading?: boolean;
}>;

export default function Table<T extends TableItem>({
  items,
  columns,
  style,
  isLoading,
}: TableProps<T>) {
  const isTableEmpty = !items || items?.length === 0;

  const { main } = useTheme().colors.background;
  return (
    <SCTableContainer style={style}>
      <SCLoading
        visible={isLoading}
        color={main}
        height="100"
        width="100"
        wrapperStyle={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <SCTable>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th title={label} key={String(key)}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isTableEmpty && (
            <tr>
              <SCEmpty colSpan={columns.length}>
                {!isLoading ? "Tabela sem dados." : ""}
              </SCEmpty>
            </tr>
          )}

          {items?.map((item) => (
            <tr key={item.id}>
              {/*//?Renderiza o conteúdo de 'items' baseado na ordem e 
                //? declaração das keys desejadas na prop 'columns'*/}
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

const SCLoading = styled(RotatingLines)`
  color: ${({ theme }) => theme.colors.background.main};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SCTableContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.background.main};
  border-radius: 10px;
  overflow: auto;
  position: relative;
  display: flex;
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

const SCEmpty = styled.td`
  text-align: center;
  height: 130px;
`;
