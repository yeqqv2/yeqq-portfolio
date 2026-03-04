import React from "react";
import styles from "./style.module.css";

export default function Table({ columns, data }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={styles.td}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                henüz veri bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
