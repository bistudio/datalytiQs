import { API } from "./api.js";
import { TableView } from "./table-view.js";
import { Search } from "./search.js";

/**
 * Assigns event listeners to various DOM elements.
 * @param {TableView} tableView - Instance of TableView class.
 * @param {Search} search - Instance of Search class.
 */
const assignEventListeners = (tableView, search) => {
  const eventElements = {
    selectedItem: document.getElementById("selected-item"),
    sourceSystemLink: document.getElementById("source-system-link"),
    businessGlossaryLink: document.getElementById("business-glossary-link"),
    dataWarehouseLink: document.getElementById("data-warehouse-link"),
  };

  // Toggle tables when corresponding links are clicked
  eventElements.sourceSystemLink.addEventListener("click", (e) => {
    e.preventDefault();
    tableView.toggleTable("tbl-source-system");
  });

  eventElements.businessGlossaryLink.addEventListener("click", (e) => {
    e.preventDefault();
    tableView.toggleTable("tbl-business-gloss");
  });

  eventElements.dataWarehouseLink.addEventListener("click", (e) => {
    e.preventDefault();
    tableView.toggleTable("tbl-data-warehouse");
  });

  // Apply filter when a new item is selected from dropdown
  eventElements.selectedItem.addEventListener("change", () => {
    const selectedValue = eventElements.selectedItem.value;
    const filteredData = search.applyFilter(selectedValue);
    tableView.populateAllTables(filteredData);
  });
};

/**
 * Main setup function to initialize the application.
 */
const setup = async () => {
  // Fetch data from API
  const rigthioData = await API.getAllDataDictionary();
  if (!rigthioData) {
    console.error("Failed to load data.");
    return;
  }

  // Initialize TableView with configuration
  const tableView = new TableView({
    "tbl-business-gloss": {
      fields: [
        "businessGlossaryId",
        "businessGlossaryName",
        "businessDefinition",
        "businessCategory",
        "relatedTerm",
        "businessGlossaryNotes",
      ],
    },
    "tbl-data-warehouse": {
      fields: ["dwDatabase", "dwTable", "dwColumn", "dwDataType", "dwExpression", "dwExpressionType"],
    },
    "tbl-source-system": {
      fields: [
        "sourceSystem",
        "sourceTable",
        "sourceColumn",
        "sourceDataType",
        "sourceExpression",
        "sourceExpressionType",
      ],
    },
  });

  // Initialize Search with data
  const search = new Search(rigthioData);

  // Assign event listeners
  assignEventListeners(tableView, search);

  // Initialize UI
  search.populateDatalist();
  const defaultData = search.applyDefaultFilter();
  tableView.populateAllTables(defaultData);
};

// Kickstart the application
setup();
