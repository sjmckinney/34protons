//Production location: demo_1_3
//Initialise test object
var utils = new Utils();
//var serverErrMsg = 'Failed to contact server';
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
var undef;

describe("Test of validateNumeric function in utils.js: failing values", function() {

	it("Test of validateNumeric function; parameter: -1" , function(){
		expect(utils.validateNumeric(-1)).toBe(false)
	});
	
	it("Test of validateNumeric function; parameter: 0.1" , function(){
		expect(utils.validateNumeric(0.1)).toBe(false)
	});
	
	it("Test of validateNumeric function; parameter: undefined" , function(){
		expect(utils.validateNumeric(undef)).toBe(false)
	});
	
	it("Test of validateNumeric function; parameter: \'1a\'" , function(){
		expect(utils.validateNumeric('1a')).toBe(false)
	});
	
	it("Test of validateNumeric function; parameter: empty string" , function(){
		expect(utils.validateNumeric("")).toBe(false)
	});
	
	it("Test of validateNumeric function; parameter: spaces" , function(){
		expect(utils.validateNumeric("  ")).toBe(false)
	});
});

describe("Test of validateNumeric function in utils.js: passing values", function() {

	it("Test of validateNumeric function; parameter: 1" , function(){
		expect(utils.validateNumeric(1)).toBe(true)
	});
	
	it("Test of validateNumeric function; parameter: 10" , function(){
		expect(utils.validateNumeric(10)).toBe(true)
	});
	
	it("Test of validateNumeric function; parameter: \'1\'" , function(){
		expect(utils.validateNumeric('1')).toBe(true)
	});
	
	it("Test of validateNumeric function; parameter: \"2\"" , function(){
		expect(utils.validateNumeric("2")).toBe(true)
	});
});

describe("Test of displayText function in utils.js", function() {
	it("Displayed text should equal test parameter", function(){
		$('<div></div>').attr('id', 'test').appendTo($('#details'));
		utils.displayText('test', 'dummy text');
		expect($('#test').html()).toEqual("dummy text");
		$('#test').remove();
    })
});

describe("Test that correct error message displayed when server error occurs", function() {

	it("Setup", function(){
		runs(function() {
		utils.url = './apppppp/bodyText.php';
		$('<a></a>').attr('class', 'menuItem').appendTo($('#details'));
		$('<input>').attr({id:'inputDelay', type:"text", value:0}).appendTo($('#details'));
		$('<div></div>').attr('id', 'contentTxt').appendTo($('#details'));
		$('.menuItem').click(utils.getQuote);
		$('.menuItem').click();
		});
    });
    
    waits(1500);
    
	it("Displayed text should equal " + utils.ajaxErrMsg, function(){
		expect($('#contentTxt').html()).toEqual(utils.ajaxErrMsg);
    });
    
    it("Teardown",function () {
    	$('#contentTxt').remove();
    	$('#inputDelay').remove();
    	$('#menuItem').remove();
    	utils.url = "./app/bodyText.php?sleep=";
    });
    
});

describe("Test of Jamine spyOn function in conjunction with utils.displayText function", function() {

	beforeEach(function () {
		
		spyOn(utils, 'displayText');
		
		utils.displayText('arg1', 'arg2');
		utils.displayText('arg3', 'arg4');
	});
		
	it("tracks that the spy was called", function() {
		expect(utils.displayText).toHaveBeenCalled();
	});
	
	it("tracks the number of calls made to the displayText", function() {
		expect(utils.displayText.calls.length).toEqual(2);
	});
	
	it("tracks all the arguments of the calls", function() {
		expect(utils.displayText).toHaveBeenCalledWith('arg1', 'arg2');
	});
	
	it("allows access to the arguments of the most recent call", function() {
		expect(utils.displayText.mostRecentCall.args[0]).toEqual('arg3');
	});
	
	it("allows access to the arguments of the other calls", function() {
		expect(utils.displayText.calls[0].args[0]).toEqual('arg1');
	});

});


describe("Test that bodyTest.php returns correct text", function() {

    var expectedQuotes = [
	    "Mae West \"I used to be Snow White, but I drifted.\" I'm No Angel (1933)",
	    "Woody Allen \"My brain: it's my second favorite organ.\" Sleeper (1973)" ,
	    "Kenneth Williams \"Infamy! Infamy. They\'ve all got it in for me!\" Carry on Cleo (1964)",
	    "Carleton Young \"When the legend becomes fact, print the legend.\" The Man Who Shot Liberty Valance (1962)",
	    "Hunter S. Thompson \"We were somewhere around Barstow on the edge of the desert when the drugs began to take hold.\" Fear and Loathing in Las Vegas",
	    "L.P. Hartley \"The past is a foreign country; they do things differently there.\" The Go-Between",
	    "William Gibson \"The sky above the port was the color of television, tuned to a dead channel\" Neuromancer",
	    "J.M. Barrie \"All children, except one, grow up.\" Peter Pan",
	    "Robert Frost \"Two roads diverged in a wood, and I - I took the one less traveled by, And that has made all the difference.\" The Road Not Taken",
	    "Allen Ginsburg \"I saw the best minds of my generation destroyed by madness.\" Howl",
	    "William Blake \"Tyger! Tyger! burning bright in the forests of the night. What immortal hand or eye could frame thy fearful symmetry?\" Tyger! Tyger!",
	    "Philip Larkin \"They f*** you up, your mom and dad\" This be the verse"
    ];

    it("Setup fixtures", function(){
        runs(function(){
            $('<a></a>').attr('class', 'menuItem').appendTo($('#details'));
            $(".menuItem").click(utils.getQuote);
            $('<input>').attr({id:'inputDelay', type:"text", value:0}).appendTo($('#details'));
            $('<div></div>').attr('id', 'contentTxt').appendTo($('#details'));
        });
    });

        for(var i = 1; i <= expectedQuotes.length; i++) {
    
        (function(expected, x) {
        
            it("Validate that quote returned from server matches the value for menu item " + i, function(){
            
                runs(function(){
                    $('#contentTxt').html("");
                    $(".menuItem").attr('id', x);
                    $(".menuItem").click();
                })
                
                waits(1000);//extended 350 to 1000 to cope with test failures
                
                waitsFor(function(){
                    return Boolean($('#contentTxt').text().length);
                    }, "Text should be present", 1000 //extend 250 to 1000 to cope with test failures
                );
                
                runs(function(){
                    expect($('#contentTxt').html()).toEqual(expected[x-1]);
                });
                
            });
        })(expectedQuotes, i);
    };
    
    it("Tear down fixtures", function(){
        runs(function(){
            $(".menuItem").remove();
            $("#inputDelay").remove();
            $('#contentTxt').html("");
            $("#contentTxt").remove();
        });
    });
});

describe("Test of user defined delay in getQuote function", function() {
	
	(function() {
		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 250;
	})();

	it("Value of simulated menu click with user defined delay of 3 secs should return correct text in under 3500 ms", function() {
		
		var delay2500ms = 2500;
	    runs(function(){
			$('<a></a>').attr('id', '1').appendTo($('#details'));
			//console.log('i: ' + $("#1").attr('id'));
			$('<input>').attr({id:'inputDelay', type:"text", value:3}).appendTo($('#details'));
			$('<div></div>').attr('id', 'contentTxt').appendTo($('#details'));
      			$('#contentTxt').text("");
			$('#1').click(utils.getQuote);
			$('#1').click();
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
			$('#1').remove();
			$('#inputDelay').remove();
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
			//console.log($("#delayIndicator").progressbar("value"));
			$('#inputDelay').remove();
			$('#delayIndicator').remove();
		});
	});
});