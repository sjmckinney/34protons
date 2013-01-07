var errTxt = 'Value of delay time is not a positive numeric value';

QUnit
	.cases([
		{ title: "minus 1", a : -1, 	expectedTxt : errTxt},
		{ title: "zero", a : 0, 	expectedTxt : ''},
		{ title: "decimal 0.1", a : 0.1, expectedTxt : errTxt},
		{ title: "integer 1", a : 1, 	expectedTxt : ''},
		{ title: "string 1", a : '1', 	expectedTxt : ''},
		{ title: "undefined", a : undefined, expectedTxt : ''},
		{ title: "empty string", a : '', expectedTxt : ''},
		{ title: "$", a : '$', expectedTxt : errTxt},
		{ title: "new line", a : '\n', expectedTxt : ''},
		{ title: "boolean true", a : true, expectedTxt : errTxt},
		{ title: "NaN", a : NaN, expectedTxt : errTxt}
		])
	.test("validateNumeric: input", function(params) {
	$('#validateError').html("");
	$('#inputDelay').val(params.a);
	validateNumeric();
	equal( $('#validateError').html(), params.expectedTxt);
	});