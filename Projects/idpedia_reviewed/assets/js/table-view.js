/**
 * TableView class handles table-related operations.
 */
export class TableView {
  /**
   * Constructor initializes table configuration.
   * @param {Object} tableConfig - Configuration for the table views.
   */
  constructor(tableConfig) {
    this.tableConfig = tableConfig;
  }

  /**
   * Toggles visibility for a specific table while hiding other tables.
   * @param {string} tableId - The ID of the table to show.
   */
  toggleTable(tableId) {
    const tableToShow = this.#getTableElementById(tableId);
    if (!tableToShow) {
      console.error("Table not found.");
      return;
    }

    this.#showTable(tableToShow);
    this.#hideOtherTables(tableId, tableToShow);
  }

  /**
   * Populates a table with rows of data.
   * @param {string} tableId - The ID of the table to populate.
   * @param {Array} data - The array of data objects to populate the table with.
   */
  populateTable(tableId, data) {
    const table = this.#getTableElementById(tableId);
    const config = this.#getConfigForTable(tableId);

    if (!table || !config) {
      console.error("Invalid table or configuration.");
      return;
    }

    this.#clearTableRows(table);
    this.#addRowsToTable(table, data, config.fields);
  }

  /**
   * Populates all tables configured in tableConfig with the given data.
   * @param {Array} data - The array of data objects to populate the tables with.
   */
  populateAllTables(data) {
    Object.keys(this.tableConfig).forEach((tableName) => {
      this.populateTable(tableName, data);
    });
  }

  // Private helper methods

  #getTableElementById(tableId) {
    return document.getElementById(tableId);
  }

  #getConfigForTable(tableId) {
    return this.tableConfig[tableId];
  }

  #clearTableRows(table) {
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
  }

  #addRowsToTable(table, data, fields) {
    const tbody = table.querySelector("tbody");
    data.forEach((rowData) => {
      const row = document.createElement("tr");
      fields.forEach((field) => {
        const cell = document.createElement("td");
        cell.textContent = rowData[field] || "";
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  }

  #showTable(table) {
    table.classList.remove("hidden");
  }

  #hideOtherTables(tableId, tableToShow) {
    const allTables = document.querySelectorAll("table");
    allTables.forEach((table) => {
      if (table.id !== tableId && !tableToShow.classList.contains("hidden")) {
        table.classList.add("hidden");
      }
    });
  }
}
