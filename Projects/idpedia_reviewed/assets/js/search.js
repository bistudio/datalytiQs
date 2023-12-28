/**
 * Search class handles operations related to search functionality.
 */
export class Search {
  /**
   * Constructor initializes data for search.
   * @param {Array} data - The array of data objects used in search.
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Populates the datalist with options from the provided data.
   */
  populateDatalist() {
    const datalistOpt = this.#getDatalistElement();
    const optionsFragment = this.#createOptionsFragment();

    datalistOpt.appendChild(optionsFragment);
  }

  /**
   * Filters data based on the provided value.
   * @param {string} defaultValue - The value to filter the data by.
   * @return {Array} - The filtered data.
   */
  applyFilter(defaultValue) {
    return this.data.filter((item) => item.businessGlossaryName === defaultValue);
  }

  /**
   * Filters data using the default value "Active Jobs".
   * @return {Array} - The filtered data.
   */
  applyDefaultFilter() {
    return this.applyFilter("Active Jobs");
  }

  // Private helper methods

  #getDatalistElement() {
    return document.getElementById("search-term");
  }

  #createOptionsFragment() {
    const fragment = document.createDocumentFragment();
    this.data.forEach((item) => {
      const option = this.#createOptionElement(item.businessGlossaryName);
      fragment.appendChild(option);
    });
    return fragment;
  }

  #createOptionElement(value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    return option;
  }
}
