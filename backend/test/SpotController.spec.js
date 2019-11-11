var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3333";

describe("Teste API - SPOT",function(){
  const term = 'React'

  it("should be returning status 200",function(done){
    request.get(
      {
        url : urlBase + "/spots?tech=" + term
      },
      function(error, response, body){
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("should be the term React as true and ",function(done){
    request.get(
      {
        url : urlBase + "/spots?tech=" + term
      },
      function(error, response, body){
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        let arrayTechs = []
        _body.map(items => {
          const obj = {}
          obj.id = items._id;

          if (items.should.have.property('techs')) {
            let techs = items.techs.splice(',')
            techs.filter(tech => {
              if (tech === term) {
                obj.techs = tech;
                arrayTechs.push(obj);
              }
            });
          }
        });

        arrayTechs.map(item => {
          expect(item.techs).to.equal(term);
        });
        expect(_body.length).to.equal(arrayTechs.length);

        done();
      }
    );
  });
});