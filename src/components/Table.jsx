import React, { useState, useMemo } from 'react';

export default function Table({ tableName = 'Data Table', columns, data=[], rowsPerPage = 5 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter(row =>
      columns.some(column =>
        String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = key => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div style={styles.container}>
      <div className="flex justify-between">
        <h2 style={styles.heading} className="text-center font-bold text-[18px] text-gray-800 tracking-wide mb-4 border-b border-gray-300 pb-2">📋 {tableName}</h2>
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={styles.headerCell}
                >
                  {col.header}{' '}
                  {sortConfig.key === col.key && (
                    <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={styles.noData}>
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} style={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  {columns.map(col => (
                    <td key={col.key} style={styles.cell}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

// 💅 Inline styles (extract to CSS/styled-components for production)
const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
    background: '#f9f9fb',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  heading: {
    marginBottom: '10px',
    // color: '#333',
  },
  searchInput: {
    padding: '10px 12px',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  headerCell: {
    backgroundColor: '#f0f0f5',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderBottom: '2px solid #ddd',
    userSelect: 'none',
  },
  cell: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
    color: '#333',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#fafafa',
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
  },
  pagination: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  pageButton: {
    padding: '8px 14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#555',
  },
};
