const assert = require('assert');
const axios = require('axios');

describe('TestApp', function() {
  describe('echo', function() {
    it('should return same message sent as an echo', function() {
        return axios.get('http://localhost:3000?message=test').then(function(response) {
            assert.equal(response.data.message, 'test');
        });
    });
  });
});