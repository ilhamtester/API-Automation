const assert = require("assert");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "id": { "type": "integer" },
                "email": { "type": "string" },
                "first_name": { "type": "string" },
                "last_name": { "type": "string" },
                "avatar": { "type": "string" }
            },
            "required": ["id", "email", "first_name", "last_name", "avatar"]
        },
        "support": {
            "type": "object",
            "properties": {
                "url": { "type": "string" },
                "text": { "type": "string" }
            },
            "required": ["url", "text"]
        }
    },
    "required": ["data", "support"]
};

describe('Validation JSON Schema', function () {

    it('JSON Schema', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2');

        const data = await response.json();
        const validate = ajv.compile(schema);

        const valid = validate(data);
        if (!valid) {
            console.log(validate.errors);
        }

        console.log("test: " + JSON.stringify(data, null, 1));
        assert.ok(valid, "Response JSON harus sesuai dengan schema");
    });

});

describe('Network Response Status', function () {

    it('should return status 200', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2');

        // Assert that the response status is 200
        assert.strictEqual(response.status, 200, "Response status harus 200");
    });

});