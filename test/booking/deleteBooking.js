const assert = require("assert");
const Ajv = require("ajv");
const ajv = new Ajv();

const deleteSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "job": { "type": "string" },
        "updatedAt": { "type": "string" }
    },
    "required": ["name", "job", "updatedAt"]
};

describe('Validation JSON Schema', function () {

    it('DELETE JSON Schema', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response body is empty
        const text = await response.text();
        if (text) {
            const data = JSON.parse(text);
            const validate = ajv.compile(deleteSchema);

            const valid = validate(data);
            if (!valid) {
                console.log(validate.errors);
            }

            console.log("test: " + JSON.stringify(data, null, 1));
            assert.ok(valid, "Response JSON harus sesuai dengan schema");
        } else {
            console.log("No content in response body");
        }
    });

});

describe('Network Response Status', function () {

    it('DELETE should return status 204', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Assert that the response status is 204
        assert.strictEqual(response.status, 204, "Response status harus 204");
    });

});