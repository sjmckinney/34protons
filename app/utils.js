
var Utils = function(){

	var that = this;
	var nonNumericErrMsg = 'Value is not positive and numeric; zero value assumed';
	
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
		var inputDelay = that.getInputValue();
		var delay = Number(that.validateNumeric(inputDelay));
		//return if value  is zero
		if(!delay > 0) {
			return
			};
		//Since progress bar is 100 pixels wide calc number of px to be added each sec
		var max = 100;
		var delayPerSec = max/delay;
		var secsPassed = 0;
			var innerFunc = function() {
					//check that progress bar length has not completed i.e. is not greater than 99 (max - 1).
					//If completed then clear timeout, reset value of progress bar to 0 and return from innerfunc
					if($("#delayIndicator").progressbar( 'value') > (max - 1)) {
						$( "#delayIndicator" ).progressbar( 'value', 0 );
						clearTimeout(te);
						return;
					}
					//calc number of pixels to be displayed in progress bar and apply
					//until secsPassed counter is greater that user defined delay
					secsPassed++;
					if(secsPassed > delay) {
						return;
					}
					var delayPassed = secsPassed * delayPerSec;
					$("#delayIndicator").progressbar('value', delayPassed);
				};
		//recursively call the innerFunc to set or clear progress bar every sec
		var te = setInterval(innerFunc, 1000);
	};
	
	/*
	* Validate input is numeric
	*/
	this.validateNumeric = function(inputDelay){
		that.displayText('validateError', null);
		//initialize the match expression
	    var numericExpression = /^[0-9]+$/;
	    //var numericExpression = /^\d+$/; //- use of meta character does not preclude decimals, negative and numbers as strings;
		//test input value is numeric
		if (!numericExpression.test(inputDelay)) {
			//and write error message to page if not
			that.displayText('validateError', nonNumericErrMsg);
			inputDelay = 0;
		}
		return inputDelay;
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
		var URL = "./app/bodyText.php?sleep=" + sleepTime + "&MnuItm=" + src.id;
		$.get(URL, function(data){
			that.displayText('contentTxt', data)
			});
	};
}

//end of utils object declaration

/*
 *jQuery document.ready function wrapped in try/catch block for reasons I can't remember
 *
 *
 *
 */
try{
	var utils = new Utils();
    $(document).ready(function(){
    
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
			$(evt.currentTarget).css('visibility', 'hidden');
		}
		$('ul.drop ul').css('visibility', 'hidden');
	});
	
	//assign function to menu items
    $('.menuItem').click(utils.getQuote);
    //assign delay indicator function to menu items
    $('.menuItem').click(utils.ajaxProgress);
    //assign input validation to events on input field
    $('#inputDelay').blur(function(){
	var input = utils.getInputValue();
	utils.validateNumeric(input);
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

