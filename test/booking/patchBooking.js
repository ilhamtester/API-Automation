const assert = require("assert");
const Ajv = require("ajv");
const ajv = new Ajv();

const patchSchema = {
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

    it('PATCH JSON Schema', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "morpheus",
                job: "zion resident"
            })
        });

        const data = await response.json();
        const validate = ajv.compile(patchSchema);

        const valid = validate(data);
        if (!valid) {
            console.log(validate.errors);
        }

        console.log("test: " + JSON.stringify(data, null, 1));
        assert.ok(valid, "Response JSON harus sesuai dengan schema");
    });

});

describe('Network Response Status', function () {

    it('PATCH should return status 200', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users/2', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "morpheus",
                job: "zion resident"
            })
        });

        // Assert that the response status is 200
        assert.strictEqual(response.status, 200, "Response status harus 200");
    });

});