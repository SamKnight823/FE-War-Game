var expect = chai.expect;

describe(`MyFunctions`,function(){
    describe(`#incrementScore`,function(){
        it(`should add one point to the score`, function(){
            var x = incrementScore(5);
            expect(x).equal(6);
        });
    });
});