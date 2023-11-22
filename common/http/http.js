const fetch = require("node-fetch");

class Fetch {
    async makeRequest(uri, method, headers, body, queryParams) {
        let options = {}
        if (body) {
            options = {
                method: method,
                headers: headers,
                body: body
            };
        } else if (queryParams) {
            options = {
                method: method,
                headers: headers
            };
            const queryString = new URLSearchParams(queryParams).toString()
            uri = `${uri}?${queryString}`
        }
        try {
            const response = await fetch(uri, options);
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Fetch();