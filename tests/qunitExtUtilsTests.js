/*
* name:		qunitUtilsTests.js
* author:	Steve McKinney
* date:		02/04/2013
* purpose:	Extended qunit test for use with QunitExtTest.html.
* 			The latter incorporates the page under test as well as quit test. 
*/

var errTxt = 'Value is not positive and numeric; zero value assumed';
var utils = new Utils();
module("validateNumeric: validate input value is numeric")
QUnit
	.cases([
		{ title: "minus 1", a : -1, expected : false},
		{ title: "zero", a : 0, expected : true},
		{ title: "decimal 0.1", a : 0.1, expected : false},
		{ title: "integer 1", a : 1, expected : true},
		{ title: "string 1", a : '1', expected : true},
		{ title: "undefined", a : undefined, expected : false},
		{ title: "empty string", a : '', expected : false},
		{ title: "$", a : '$', expected : false},
		{ title: "new line", a : '\n', expected : false},
		{ title: "boolean true", a : true, expected : false},
		{ title: "NaN", a : NaN, expected : false}
		])
	.test("", function(params) {
		equal( utils.validateNumeric(params.a), params.expected);
	});

module("validateInputDelay: return error message")
QUnit
	.cases([
		{ title: "minus 1", a : -1, expectedTxt : errTxt},
		{ title: "zero", a : 0, expectedTxt : ''},
		{ title: "decimal 0.1", a : 0.1, expectedTxt : errTxt},
		{ title: "integer 1", a : 1, expectedTxt : ''},
		{ title: "string 1", a : '1', expectedTxt : ''},
		{ title: "undefined", a : undefined, expectedTxt : errTxt},
		{ title: "empty string", a : '', expectedTxt : errTxt},
		{ title: "$", a : '$', expectedTxt : errTxt},
		{ title: "new line", a : '\n', expectedTxt : errTxt},
		{ title: "boolean true", a : true, expectedTxt : errTxt},
		{ title: "NaN", a : NaN, expectedTxt : errTxt}
		])
	.test("", function(params) {
		$('input#inputDelay').val(params.a);
		utils.validateInputDelay();
		equal( $('#validateError').html(), params.expectedTxt);
	});

module("validateInputDelay: input element return value")
QUnit
	.cases([
		{ title: "minus 1", a : -1, returnValue : 0},
		{ title: "decimal 0.1", a : 0.1, returnValue : 0},
		{ title: "integer 1", a : 1, returnValue : 1},
		{ title: "string 1", a : new String("1"), returnValue :"1"},
		{ title: "undefined", a : undefined, returnValue : 0},
		{ title: "empty string", a : '', returnValue : 0},
		{ title: "$", a : '$', returnValue : 0},
		{ title: "new line", a : '\n', returnValue : 0},
		{ title: "boolean true", a : true, returnValue : 0},
		{ title: "NaN", a : NaN, returnValue : 0}
		])
	.test("", function(params) {
		$('input#inputDelay').val(params.a);
		equal( utils.validateInputDelay(), params.returnValue);
	});
/*
module("validateNumeric: return value");	
QUnit
	.cases([
		{ title: "minus 1", a : -1, returnValue : 0},
		{ title: "zero", a : 0, returnValue : 0},
		{ title: "decimal 0.1", a : 0.1, returnValue : 0},
		{ title: "integer 1", a : 1, returnValue : 1},
		{ title: "string 1", a : new String("1"), returnValue :"1"},
		{ title: "undefined", a : undefined, returnValue : 0},
		{ title: "empty string", a : '', returnValue : 0},
		{ title: "$", a : '$', returnValue : 0},
		{ title: "new line", a : '\n', returnValue : 0},
		{ title: "boolean true", a : true, returnValue : 0},
		{ title: "NaN", a : NaN, returnValue : 0}
		])
	.test("", function(params) {
		equal( utils.validateNumeric(params.a), params.returnValue);
	});
*/	
	
module("getBodyText: return value");
QUnit
	.cases([
		{ title: "Famous Lines - Mae West", a : 1, returnValue : "Mae West \"I used to be Snow White, but I drifted.\" I'm No Angel (1933)"},
		{ title: "Famous Lines - Woody Allen", a : 2, returnValue : "Woody Allen \"My brain: it's my second favorite organ.\" Sleeper (1973)"},
		{ title: "Famous Lines - Kenneth Williams", a : 3, returnValue : "Kenneth Williams \"Infamy! Infamy. They\'ve all got it in for me!\" Carry on Cleo (1964)"},
		{ title: "Famous Lines - Carleton Young", a : 4, returnValue : "Carleton Young \"When the legend becomes fact, print the legend.\" The Man Who Shot Liberty Valance (1962)"},
		{ title: "Opening Lines: Books - Hunter Thompson", a : 5, returnValue : "Hunter S. Thompson \"We were somewhere around Barstow on the edge of the desert when the drugs began to take hold.\" Fear and Loathing in Las Vegas"},
		{ title: "Opening Lines: Books - L.P. Hartley", a : 6, returnValue : "L.P. Hartley \"The past is a foreign country; they do things differently there.\" The Go-Between"},
		{ title: "Opening Lines: Books - William Gibson", a: 7, returnValue : "William Gibson \"The sky above the port was the color of television, tuned to a dead channel\" Neuromancer"},
		{ title: "Opening Lines: Books - J.M. Barrie", a: 8, returnValue : "J.M. Barrie \"All children, except one, grow up.\" Peter Pan"},
		{ title: "Opening Lines: Poems - Robert Frost", a: 9, returnValue : "Robert Frost \"Two roads diverged in a wood, and I - I took the one less traveled by, And that has made all the difference.\" The Road Not Taken"},
		{ title: "Opening Lines: Poems - Allen Ginsburg", a: 10, returnValue : "Allen Ginsburg \"I saw the best minds of my generation destroyed by madness.\" Howl"},
		{ title: "Opening Lines: Poems - William Blake", a: 11, returnValue : "William Blake \"Tyger! Tyger! burning bright in the forests of the night. What immortal hand or eye could frame thy fearful symmetry?\" Tyger! Tyger!"},
		{ title: "Opening Lines: Poems - Philip Larkin", a: 12, returnValue : "Philip Larkin \"They f*** you up, your mom and dad\" This be the verse"}
	])

	.asyncTest("", function(params) {
		//need to bind getQuote func to click event to test code to work
		$('#' + params.a + "").click(utils.getQuote);
        $('#' + params.a + "").click();
        setTimeout(function(){
            equal($('#contentTxt').text(), params.returnValue);
            start();
            }, 1000);
    });