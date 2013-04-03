//Initialise test object
var utils = new Utils();
//Useful functions
var timestampedMessage = function(msg) {
	return msg + " timestamp: " + new Date().getTime();
	}

describe("Illustration Jasmine's inbuilt matchers", function() {
	it("Test of toBeDefined matcher", function(){
		var one;
		var two = 2;
		expect(one).not.toBeDefined();
		expect(two).toBeDefined();
    })
	it("Test of toBeUndefined matcher", function(){
		var one;
		var two = 2;
		expect(one).toBeUndefined();
		expect(two).not.toBeUndefined();
    })
});

describe("Test of validateNumeric function in utils.js", function() {
  var undef;
  it("Test of validateNumeric function; parameter: -1", function(){
      expect(utils.validateNumeric(-1)).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: 0.1", function(){
      expect(utils.validateNumeric(0.1)).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: 1", function(){
      expect(utils.validateNumeric(1)).toEqual(1);
    })
  it("Test of validateNumeric function; parameter: 10", function(){
      expect(utils.validateNumeric(10)).toEqual(10);
    })
  it("Test of validateNumeric function; parameter: '1'", function(){
      expect(utils.validateNumeric('1')).toEqual("1");
    })
  it("Test of validateNumeric function; parameter: '1a'", function(){
      expect(utils.validateNumeric('1a')).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: undefined", function(){
      expect(utils.validateNumeric(undef)).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: non-numeric !", function(){
      expect(utils.validateNumeric('!')).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: NaN", function(){
      expect(utils.validateNumeric(NaN)).toEqual(0);
    })
  it("Test of validateNumeric function; parameter: boolean true", function(){
      expect(utils.validateNumeric(true)).toEqual(0);
    })
});

describe("Test of displayText function in utils.js", function() {
	it("Displayed text should equal test parameter", function(){
		$('<div></div>').attr('id', 'test').appendTo($('#details'));
		utils.displayText('test' , 'dummy text');
		expect($('#test').html()).toEqual("dummy text");
		$('#test').remove();
    })
});

//Jasmine async support example taken from http://pivotal.github.com/jasmine

describe("Test of user defined delay in getQuote function", function() {
	
	(function() {
		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 250;
	})();

	it("Value of simulated menu click with user defined delay of 3 secs should return correct text in under 3500 ms", function() {
		
		var delay2500ms = 2500;
	    runs(function(){
			$('<a></a>').attr('id', '1').appendTo($('#details'));
			$('<input>').attr({id:'inputDelay', type:"text", value:3}).appendTo($('#details'));
			$('<div></div>').attr('id', 'contentTxt').appendTo($('#details'));
			$('#1').click(utils.getQuote);
			$('#1').click();
			$('#1').remove();
			$('#inputDelay').remove();
	    });
	    
		waits(delay2500ms);
	
		waitsFor(function() {
			return Boolean($('#contentTxt').text().length);
			}, "Text should be present", 1000);
	
		runs(function() {
			var retVal = $('#contentTxt').text();
			//console.log('final value of retVal: ' + retVal)
			expect(retVal).toEqual('Mae West "I used to be Snow White, but I drifted." I\'m No Angel (1933)');
			$('#contentTxt').remove();
		});
	
	});
});

describe("Test of progress bar functionality", function() {

	var minWaitTime = 1000;

	it("Test of ajaxProgress function to ensure that progress bar does nothing if user-defined delay is zero", function(){
		
		var userDefinedInput = 0;
		runs(function() {
			$('<div></div>').attr({id:'delayIndicator', class:'sliderDiv'}).appendTo($('#details'));
			$('#delayIndicator').css({"height":"5px", "width":"100px"});
			$('#delayIndicator').progressbar({value:0});
			$('<input>').attr({id:'inputDelay', type:"text", value:userDefinedInput}).appendTo($('#details'));
			utils.ajaxProgress();
		});
		
		//utils.ajaxProgress will cause change after minimum 1000 msec so wait
		waits(minWaitTime);
		
		waitsFor(function() {
			return ($("#delayIndicator").progressbar("value") == 0);
			}, "Progress bar should not be activated when user defined input is zero", 100);
			
		runs(function() {
			expect($("#delayIndicator").progressbar("value")).toEqual(0);
			$('#inputDelay').remove();
			$('#delayIndicator').remove();
		});
	});
	
	it("Test of ajaxProgress function to ensure that progress bar reacts if user-defined delay one or greater", function(){
		
		var userDefinedInput = 1;
		runs(function() {
			$('<div></div>').attr({id:'delayIndicator', class:'sliderDiv'}).appendTo($('#details'));
			$('#delayIndicator').css({"height":"5px", "width":"100px"});
			$('#delayIndicator').progressbar({value:0});
			$('<input>').attr({id:'inputDelay', type:"text", value:userDefinedInput}).appendTo($('#details'));
			utils.ajaxProgress();
		});
		
		//utils.ajaxProgress will cause change after minimum 1000 msec so wait
		waits(minWaitTime);
		
		waitsFor(function() {
			return ($("#delayIndicator").progressbar("value") > 0);
			}, "Progress bar should be activated when user defined input is one or greater", 100);
			
		runs(function() {
			expect($("#delayIndicator").progressbar("value")).toBeGreaterThan(0);
			$('#inputDelay').remove();
			$('#delayIndicator').remove();
		});
	});
	
	it("Test of ajaxProgress function to ensure that progress bar completes after used defined delay has passed and returns to zero within one second", function(){
		
		userDefinedInput = 5;
		minWaitTime = 5000;
		runs(function() {
			$('<div></div>').attr({id:'delayIndicator', class:'sliderDiv'}).appendTo($('#details'));
			$('#delayIndicator').css({"height":"5px", "width":"100px"});
			$('#delayIndicator').progressbar({value:0});
			$('<input>').attr({id:'inputDelay', type:"text", value:userDefinedInput}).appendTo($('#details'));
			utils.ajaxProgress();
		});
		
		//Wait 5 secs before evaluating
		waits(minWaitTime);
		
		//evaluate value of progress bar after 5000ms but
		//fail test if expected value not detected within 100ms
		waitsFor(function() {
			//console.log($("#delayIndicator").progressbar("value"));
			return ($("#delayIndicator").progressbar("value") > 99);
			}, "Progress bar should be activated when user defined input is one or greater", 100);
			
		//Check that progress bar value is greater than 99
		runs(function() {
			expect($("#delayIndicator").progressbar("value")).toBeGreaterThan(99);
			//console.log($("#delayIndicator").progressbar("value"));
		});
		
		//Wait further 1000ms for progress bar to be reset
		waits(1000);
		
		runs(function() {
			expect($("#delayIndicator").progressbar("value")).toBeLessThan(1);
			console.log($("#delayIndicator").progressbar("value"));
			$('#inputDelay').remove();
			$('#delayIndicator').remove();
		});
	});
});