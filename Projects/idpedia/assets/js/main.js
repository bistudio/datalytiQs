let rigthiodata = [];

const isDEV = true;
const apiURL = isDEV
  ? "https://api-idpedia.rightio-dev.co.uk/data-dictionary"
  : "https://api-idpedia.rightio.co.uk/data-dictionary";

const getByID = (name) => document.getElementById(name);

// Function to populate the datalist
function toggleTable(tableId) {
  const tableToShow = getByID(tableId);

  // Show the selected table
  if (tableToShow) {
    tableToShow.classList.remove("hidden");
  }

  // Hide the other tables
  const allTables = document.querySelectorAll("table");
  for (let i = 0; i < allTables.length; i++) {
    if (
      allTables[i].id !== tableId &&
      !tableToShow.classList.contains("hidden")
    ) {
      allTables[i].classList.add("hidden");
    }
  }
}

async function getAllDataDictionary() {
  try {
    const response = await fetch(apiURL);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

function populateDatalist() {
  const datalistopt = getByID("searchTerm");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < rigthiodata.length; i++) {
    let businessGlossary = rigthiodata[i].businessGlossaryName;

    const option = document.createElement("option");
    option.value = businessGlossary;
    option.textContent = businessGlossary;

    fragment.appendChild(option);
  }

  datalistopt.appendChild(fragment);
}

function applyDefaultFilter(defaultValue) {
  const filteredData = rigthiodata.filter(
    (item) => item.businessGlossaryName === defaultValue
  );

  // Use the filteredData as needed (e.g., display or manipulate)
  console.log(filteredData);
}
// create table column name object
const tables = {
  tbl_bg: {
    element: getByID("tbl_business_gloss"),
    fields: [
      "businessGlossaryId",
      "businessGlossaryName",
      "businessDefinition",
      "businessCategory",
      "relatedTerm",
      "businessGlossaryNotes",
    ],
  },
  tbl_dw: {
    element: getByID("tbl_data_warehouse"),
    fields: [
      "dwDatabase",
      "dwTable",
      "dwColumn",
      "dwDataType",
      "dwExpression",
      "dwExpressionType",
    ],
  },
  tbl_ss: {
    element: getByID("tbl_source_system"),
    fields: [
      "sourceSystem",
      "sourceTable",
      "sourceColumn",
      "sourceDataType",
      "sourceExpression",
      "sourceExpressionType",
    ],
  },
};

// toggle to switch between table views

const assignDOM = () => {
  return {
    
    clearButton: document.getElementById("clearButton"),
    selectedItem: getByID("selectedItem"),
    sourceSystemLink: getByID("sourceSystemLink"),
    businessGlossaryLink: getByID("businessGlossaryLink"),
    dataWarehouseLink: getByID("dataWarehouseLink"),
  };
};

const assignListeners = (domElements) => {

  domElements.clearButton.addEventListener("click", function (event){
    event.preventDefault();
    selectedItem.value = '';
  });

  domElements.sourceSystemLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleTable("tbl_source_system");
  });

  domElements.businessGlossaryLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleTable("tbl_business_gloss");
  });

  domElements.dataWarehouseLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleTable("tbl_data_warehouse");
  });

  domElements.selectedItem.addEventListener("change", function () {
    const selectedValue = selectedItem.value;
    console.log(selectedValue);
    applyDefaultFilter(selectedValue);

    // Filter the rigthiodata array based on the selected value
    const filteredData = rigthiodata.find(
      (item) => item.businessGlossaryName === selectedValue
    );

    if (filteredData) {
      // Loop through each table and populate its rows
      for (const tableKey in tables) {
        if (tables.hasOwnProperty(tableKey)) {
          const table = tables[tableKey];
          const row = table.element.rows[1];
          for (let i = 0; i < table.fields.length; i++) {
            const field = table.fields[i];
            row.cells[i].innerHTML = filteredData[field] || "";
          }
        }
      }
    } else {
      console.log("No matching data found.");
    }
  });
};

const fetchAllData = async () => {
  const data = await getAllDataDictionary();
  console.log("Data Loaded");
  rigthiodata = data;
};

const main = async () => {
  const domElements = assignDOM();
  assignListeners(domElements);
  await fetchAllData();
  populateDatalist();
  applyDefaultFilter("Active Jobs");
};

main();
