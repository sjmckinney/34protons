
var Utils = function(){

	this.nonNumericErrMsg = 'Value is not positive and numeric; zero value assumed';
	this.ajaxErrMsg = 'Failed to contact server';
	this.url = "./app/bodyText.php?sleep=";
	var that = this;
	this.nosClicks = 0;
	
	/*
	*Return input value from field
	*/
	this.getInputValue = function(){
		return $('#inputDelay').attr('value');
	};
	
	/*
	 * Animate progress bar underneath input field
	 */
	this.ajaxProgress = function(){
	
		//validate input is valid before casting it to number
		var delay = Number(that.validateInputDelay());
		//return if value  is zero
		if(!delay > 0) {
			return
			};
		//Since progress bar is 100 pixels wide calculate
		//number of pixels to be displayed each sec
		var max = 100;
		var pixelsPerSec = max/delay;
		var secsPassed = 0;
		//Create closure so that can track secsPassed
			var setPixels = function() {
					//check that progress bar length has not completed i.e. is not greater than 99 (max - 1).
					//If completed then clear timeout, reset value of progress bar to 0 and return from setPixels()
					if($("#delayIndicator").progressbar('value') > (max - 1)) {
						$( "#delayIndicator" ).progressbar('value', 0 );
						clearTimeout(te);
						return;
					}
					//calc number of pixels to be displayed in progress bar and apply
					//until secsPassed counter is greater that user defined delay
					secsPassed++;
					if(secsPassed > delay) {
						return;
					}
					var delayPassed = secsPassed * pixelsPerSec;
					$("#delayIndicator").progressbar('value', delayPassed);
				};
		//Call setPixels() at second intervals
		var te = setInterval(setPixels, 1000);
	};
	
	/*
	* Get input time delay and display
	* error message and return zero value
	*/
	this.validateInputDelay = function(){
		//clear input field
		that.displayText('validateError', null);
		
		//get input field value
		var input = that.getInputValue();

		if (!that.validateNumeric(input)) {
			//write error message to page if not numeric
			that.displayText('validateError', that.nonNumericErrMsg);
			input = 0;
		}
		return input;
	};
	
	/*
	* Validate input is numeric
	*/
	this.validateNumeric = function(inputDelay){

	    var numericExpression = /^[0-9]+$/;
	    //set regex to /^[0-9]+$/ rather than /^\d+$/ as use of meta
		//character does not preclude decimals, negative and numbers as strings;
		//test input value is numeric
		return numericExpression.test(inputDelay);
	};
	
	/*
	* Pass in element id and text to display within that element
	*/
	this.displayText = function(elementId, text){
		var jQueryId = '#' + elementId + "";
		$(jQueryId).html("");
		$(jQueryId).html(text);
	};
	    
	/*
	* Generates URL to return quote linked to menu item
	* making ajax call to php page and setting displayed
	* content after default or user defined delay
	*/
	this.getQuote = function(e){
	    e = e||window.event;
	    var src = e.target||e.srcElement;
		var sleepTime = that.getInputValue();
		var URL = that.url + sleepTime + "&MnuItm=" + src.id;
		$.get(URL, function(data){
			that.displayText('contentTxt', data)
			})
			.fail(function() {
			that.displayText('contentTxt', that.ajaxErrMsg)
			});
	};

	/*
	*/
	this.countButtonClicks = function() {
		utils.nosClicks ++;
		utils.displayText('nosClicks', utils.nosClicks);
	};

	this.toggleDisabled  = function () {
		var select = $("#fruitSelect");
		if (select.attr('disabled')) {
        		select.removeAttr("disabled");
    		}
    	else{
        		select.prop('disabled', 'disabled');
    		}
	};
};

//end of utils object declaration

/*
 *jQuery document.ready function wrapped in try/catch block
 */
try{
	var utils = new Utils();
    $(document).ready(function(){

    //assign function to count clicks button click event
    $('#clickMe').click(utils.countButtonClicks);

    //assign function to disalble select button click event
    $('#toggleDisabled').click(utils.toggleDisabled);
    
    //hide child menu items
    $('ul.drop ul').css('visibility', 'hidden');
    
    //hide and unhide child menu items on mouseover and mouseout
    $('li.menuParent').mouseover(function(){
        $(this).children().css('visibility', 'visible');
        $(this).children().find('li').mouseover(function(){
            $(this).children().find('li').css('visibility', 'visible')
            })
        });
        
    $('li.menuParent').mouseout(function(){
        $(this).children().css('visibility', 'hidden')
        $(this).children().find('li').mouseout(function(){
            $(this).children().find('li').css('visibility', 'hidden')
            })
        });
        
	//hide the menu items once clicked
	$('li.menuParent li').click(function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		//Prevent the event target from being hidden if immediate parent class is 'menuParent'
		//Would be simpler to assign value like 'submenuParent' to those menus with subitems
		if(!$(evt.currentTarget).parent().parent().is('.menuParent')){
			$(evt.currentTarget).siblings().css('visibility', 'hidden');
			$(evt.currentTarget).css('visibility', 'hidden');
		}
		//Hide child menu items if intermediate rather than child menu clicked
		$('ul.drop li li li').css('visibility', 'hidden');
		//Hide intermediate menu items
		$('ul.drop ul').css('visibility', 'hidden');
	});
	
	//assign function to menu items
    $('.menuItem').click(utils.getQuote);
    //assign delay indicator function to menu items
    $('.menuItem').click(utils.ajaxProgress);
    //assign input validation to events on input field
    $('#inputDelay').blur(function(){
		var input = utils.getInputValue();
		utils.validateInputDelay(input);
    });
    
    //assign draggble, droppable and progress bar
    //properties to associated page elements
	var dropped = 0;
	$(function() {
		try{	
		$('#draggable').draggable({
			helper: "clone"
			});
		$('#droppable').droppable({
			drop: function(event, ui){
							var msg;
							if (dropped < 5) {
								ui.draggable.clone(true).css('position', 'inherit').appendTo($(this));
								//alert("I've been dropped!");
								dropped++
								msg = " - " + dropped;
							} else {
								msg = " - No further drops permitted; drop area is full";
							}
							utils.displayText('dropCount', msg);
				}
		    });
			$('#delayIndicator').progressbar({
					value:0
					});
		} catch(e) {
			console.log(e.message);
			}
		});
	});
} catch(e) {
	console.log(e.message);
}

