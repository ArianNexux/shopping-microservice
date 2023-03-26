export default class InvalidDataProvided extends Error {
    constructor(field: String) {
        super(`Invalid ${field} provided`)
    }
}