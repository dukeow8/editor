var Save = require("../helpers/save.js");
var assert = require("assert");
var expect = require("chai").expect;

describe("Savephoto()", function() {
        context("Not passing any arguments", function(){
                it("should return 0", function(){
                        assert.equal(Save(), 0);
                })      
        })              

        context("Passing proper photos", function(){
                it("should add photos", function(){
                        assert.equal(Save(1), 3);
                })      
        })      

})



