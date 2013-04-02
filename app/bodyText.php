<?php
	
    if(!empty($_GET)) $sleep = ($_GET['sleep']);
    
    if($sleep > 0) sleep($sleep);

    $itmId = $_GET['MnuItm'];
        
    switch($itmId) {
        case "1":
            echo 'Mae West "I used to be Snow White, but I drifted." I\'m No Angel (1933)';
            break;
        case "2":
            echo 'Woody Allen "My brain: it\'s my second favorite organ." Sleeper (1973)';
            break;
        case "3":
            echo 'Kenneth Williams "Infamy! Infamy. They\'ve all got it in for me!" Carry on Cleo (1964)';
            break;
        case "4":
            echo 'Carleton Young "When the legend becomes fact, print the legend." The Man Who Shot Liberty Valance (1962)';
            break;
        case "5":
            echo 'Hunter S. Thompson "We were somewhere around Barstow on the edge of the desert when the drugs began to take hold." Fear and Loathing in Las Vegas';
            break;
        case "6":
            echo 'L.P. Hartley "The past is a foreign country; they do things differently there." The Go-Between';
            break;
        case "7":
            echo 'William Gibson "The sky above the port was the color of television, tuned to a dead channel" Neuromancer';
            break;
        case "8":
            echo 'J.M. Barrie "All children, except one, grow up." Peter Pan';
            break;
        case "9":
            echo 'Robert Frost "Two roads diverged in a wood, and I - I took the one less traveled by, And that has made all the difference." The Road Not Taken';
            break;
        case "10":
            echo 'Allen Ginsburg "I saw the best minds of my generation destroyed by madness." Howl';
            break;
        case "11":
            echo 'William Blake "Tyger! Tyger! burning bright in the forests of the night. What immortal hand or eye could frame thy fearful symmetry?" Tyger! Tyger!';
            break;
        case "12":
            echo 'Philip Larkin "They f*** you up, your mom and dad" This be the verse';
            break;
        case "13":
            echo '"Louis, I think this is the beginning of a beautiful friendship." Casablanca (1942) ';
            break;
        case "14":
            echo '"Sing it out, men! Higher, you animals, higher! We open in Leavenworth Saturday night!" The Producers (1968)';
            break;
        case "15":
            echo '"All right, Mr. DeMille, I\'m ready for my closeup" Sunset Boulevard (1950)';
            break;
        case "16":
            echo '"Roads? Where we\'re going, we don\'t need roads!" Back to the future (1985)';
            break;
        case "17":
            echo 'F. Scott Fitzgerald "So we beat on, boats against the current, borne back ceaselessly into the past." The Great Gatsby';
            break;
        case "18":
            echo 'Arthur C. Clarke "Overhead, without any fuss, the stars were going out." The Nine Billion Names of God';
            break;
        case "19":
            echo 'George Orwell "He loved Big Brother" 1984';
            break;
        case "20":
            echo '"I should never have switched from Scotch to Martinis."';
            break;
        case "21":
            echo '"You got me."';
            break;
        case "22":
            echo '"All my possessions for a moment of time."';
            break;
        case "23":
            echo '"I should have drunk more Champagne."';
            break;
        case "24":
            echo '"To love oneself is the beginning of a lifelong romance."';
            break;
        case "25":
            echo '"I find television very educational. Every time someone switches it on I go into another room and read a good book."';
            break;
        case "26":
            echo '"What fresh hell can this be?"';
            break;
        case "27":
            echo '"Can we actually know the universe? My God, it\'s hard enough finding your way around in Chinatown."';
            break;
        default:
            echo "No corresponding menu selection";
        }
        
?>