/**
 * API class handles API interactions for fetching data.
 */
export class API {
  /**
   * URL for the API, dependent on whether the environment is development or production.
   */
  static apiURL = this.isDEV()
    ? "https://api-idpedia.rightio-dev.co.uk/data-dictionary"
    : "https://api-idpedia.rightio.co.uk/data-dictionary";

  /**
   * Checks if the environment is development.
   * @return {boolean} - True if the environment is development, false otherwise.
   */
  static isDEV() {
    return true; // TODO: Implement actual environment check logic if needed.
  }

  /**
   * Fetches all data from the data dictionary API.
   * @return {Promise<Object>|void} - Returns a JSON object if successful, otherwise logs an error.
   */
  static async getAllDataDictionary() {
    try {
      const response = await this.#fetchFromAPI();

      if (this.#isResponseOK(response)) {
        return await response.json();
      } else {
        this.#logResponseError(response);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  // Private helper methods

  static async #fetchFromAPI() {
    return await fetch(this.apiURL);
  }

  static #isResponseOK(response) {
    return response.ok;
  }

  static #logResponseError(response) {
    console.error(`Error: ${response.status}`);
  }
}
