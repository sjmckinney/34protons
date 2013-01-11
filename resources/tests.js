var errTxt = 'Value is not positive and numeric; zero value assumed';
//Test error message is displayed or not dependent on input
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
	.test("validateNumeric: error message", function(params) {
		$('#validateError').html("");
		$('#inputDelay').val(params.a);
		validateNumeric();
		equal( $('#validateError').html(), params.expectedTxt);
	});
	
QUnit
	.cases([
		{ title: "minus 1", a : -1, returnValue : 0},
		{ title: "zero", a : 0, returnValue : 0},
		{ title: "decimal 0.1", a : 0.1, returnValue : 0},
		{ title: "integer 1", a : 1, returnValue : 0},
		{ title: "string 1", a : '1', returnValue : 0},
		{ title: "undefined", a : undefined, returnValue : 0},
		{ title: "empty string", a : '', returnValue : 0},
		{ title: "$", a : '$', returnValue : 0},
		{ title: "new line", a : '\n', returnValue : 0},
		{ title: "boolean true", a : true, returnValue : 0},
		{ title: "NaN", a : NaN, returnValue : 0}
		])
	.test("validateNumeric: return value", function(params) {
		equal( validateNumeric(params.a), params.returnValue);
	});