class QuotesApi {
    #apiBaseUrl = "";

    constructor() {
        this.#apiBaseUrl = "https://api.quotable.io";
    }

    async getRandomQuote() {
        try {
            const response = await fetch(`${this.#apiBaseUrl}/random?minLength=100&maxLength=150`);
            if (!response.ok) {
                throw new Error('Failed to load random quote');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default QuotesApi;