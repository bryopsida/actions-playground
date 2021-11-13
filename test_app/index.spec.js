const assert = require('assert');
const axios = require('axios');

const port = process.env.APP_PORT || 3000;

describe('TestApp', function() {
  describe('echo', function() {
    it('should return same message sent as an echo', function() {
        return axios.get(`http://localhost:${port}?message=test`).then(function(response) {
            assert.equal(response.data.message, 'test');
        });
    });
  });
});