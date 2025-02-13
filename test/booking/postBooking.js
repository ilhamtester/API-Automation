const assert = require("assert");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "id": { "type": "string" },
        "createdAt": { "type": "string" },
        "name": { "type": "string" },
        "job": { "type": "string" }
    },
    "required": ["id", "createdAt", "name", "job"]
};

describe('Validation JSON Schema', function () {

    it('JSON Schema', async function () {
        this.timeout(5000);
        const response = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "morpheus",
                job: "leader"
            })
        });

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
