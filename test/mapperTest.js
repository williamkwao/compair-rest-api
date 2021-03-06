var assert = require('assert');
var _ = require('lodash');
const mockAmzResponse = require('./mocks/mockAmzResponse');
const mockWalmartResponse = require('./mocks/mockWalmartResponse');
const helperFunctions = require('../helperFunctions');

helperFunctions.mapAmzToCompair(mockAmzResponse);
helperFunctions.mapWalmartToCompair(mockWalmartResponse);

const expectedKeys = ['retailer', 'name', 'shortDescription', 'salePrice', 'mediumImage', 'productURL'];

describe('Amazon Mapper Test', function () {
    it('Should return the same number of items in mock element', function () {
        var mappedResponse = helperFunctions.mapAmzToCompair(mockAmzResponse);
        assert.equal(mappedResponse.length, mockAmzResponse.ItemSearchResponse.Items.Item.length);
    });

    it('Should return the same needed elements', function () {
        var mappedResponse = helperFunctions.mapAmzToCompair(mockAmzResponse);
        var amazonItems = mockAmzResponse.ItemSearchResponse.Items.Item;
        assert.equal(amazonItems[0].ItemAttributes.Title, mappedResponse[0].name);
    });

    it('Should return empty array yon empty item response', function () {
        const emptyResponse = {
            ItemSearchResponse: {
                Items: {
                    item: []
                }
            }
        }
        var mappedResponse = helperFunctions.mapAmzToCompair(emptyResponse);
        assert(_.isEmpty(mappedResponse))
    });
});

describe('Walmart Mapper Test', function () {
    it('Should return the same number of items in mock element', function () {
        var mappedResponse = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        assert.equal(mappedResponse.length, mockWalmartResponse.items.length);
    });

    it('Should return the same needed elements', function () {
        var mappedResponse = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        var walmartItems = mockWalmartResponse.items;
        assert.equal(walmartItems[0].name, mappedResponse[0].name);
    });

    it('Should return empty array yon empty item response', function () {
        const emptyResponse = {
            items: []
        }
        var mappedResponse = helperFunctions.mapWalmartToCompair(emptyResponse);
        assert(_.isEmpty(mappedResponse))
    });
});

describe('Relevance sort test', function () {
    it('Should return the sum of two arrays', function () {
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        var result = helperFunctions.relevanceSort(testamz, testwm);
        assert.equal(testamz.length + testwm.length, result.length);
    });

    it('Should return the sum of two arrays with different length', function () {
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        console.log("Length of amazon -" + testamz.length)
        testamz.pop();
        console.log("Length of amazon after pop - " + testamz.length)
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        console.log("Length of Walmart -  " + testwm.length)
        var result = helperFunctions.relevanceSort(testamz, testwm);
        assert.equal(testamz.length + testwm.length, result.length);
    });


    it('Should return one array if the other one is empty', function () {
        var testamz = [];
        console.log("length of amz after cleared - " + testamz.length)
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        var result = helperFunctions.relevanceSort(testamz, testwm);
        console.log("The result is -" + result.length)
        assert.equal(testamz.length + testwm.length, result.length);
    });

});




