/*
 *httpRequest factory method
 */

function httpRequestFactory() {

    try {return new XMLHttpRequest();}
        catch(e){}
    try{return new ActiveXObject("Msxml2.XMLHTTP");}
        catch(e){}
    alert("XMLHttpRequest not supported");
    return null;
}

/*
*Return input value from field
*/
function getInputValue() {
	return $('#inputDelay').attr('value');
}

/*
 *Animate progress bar underneath input field
 */
function ajaxProgress() {
	var delay = Number(validateNumeric());
	//return if value  is zero
	if(!delay > 0) {
		return
		};
    var max = 100;
    //Since progress bar is 100 pixels wide calc number of px to be added each sec
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
            secsPassed++;
            //calc number of pixels to be displayed in progress bar and apply
            var delayPassed = secsPassed * delayPerSec;
            $("#delayIndicator").progressbar('value', delayPassed);
        };
    //recursively call the innerfunc to set or clear progress bar every sec
    var te = setInterval(innerFunc, 1000);
}
/*
Validate input is numeric
*/
function validateNumeric() {
    
	//clear the error display field
    $('#validateError').html('');
	//initialize the match expression
    var numericExpression = /^[0-9]+$/;
	//get the input value
	var sleepTime = getInputValue();
	//test input value is numeric
	if (!sleepTime.match(numericExpression)) {
		//and write error message to page if not
		showErrorMsg();
		sleepTime = 0;
	}
	return sleepTime;
}

/*
*
*/
function showErrorMsg() {
	$('#validateError').html('Value is not positive and numeric; zero value assumed');
}

function getBodyText(URL) {
    var ajax = httpRequestFactory();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
			$('#contentTxt').html("");
			$('#contentTxt').html(ajax.responseText);
        }
    }
    ajax.open("GET", URL, true);
    ajax.send();
}
    
function menuItemClick(e) {
    
    e = e||window.event;
    var src = e.target||e.srcElement;
	var sleepTime = getInputValue();
    getBodyText("bodyText.php?sleep=" + sleepTime + "&MnuItm=" + src.id);
    //console.log("bodyText.php?sleep=" + sleepTime + "&MnuItm=" + src.id); 
}

/*
 *jQuery document.ready function wrapped in try/catch block for reasons I can't remember
 *
 *
 *
 */
try{
    $(document).ready(function(){
    
    var dropped = 0;
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
    $('.menuItem').click(menuItemClick);
    //assign delay indicator function to menu items
    $('.menuItem').click(ajaxProgress);
    //assign input validation to events on input field
    $('#inputDelay').blur(validateNumeric);
    $('#inputDelay').keydown(function(){
		$('#validateError').html('');
		});
    //$('#inputDelay').keyup(validateNumeric);
    
    //assign draggble, droppable and progress bar
    //properties to associated page elements
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
                        $('#dropCount').html(msg);
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

