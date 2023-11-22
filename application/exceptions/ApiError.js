module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedError() {
        return new ApiError(401, 'Unauthorized')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static internal() {
        return new ApiError(500, 'Internal server error')
    }

    static forbidden() {
        return new ApiError(403, 'Forbidden')
    }
}