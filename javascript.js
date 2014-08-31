$(function() {

    //Play Button
    $('.play').click(function(){
        //Reset score
        $('.rounds li.round-count').css('display','none');
        $('.play-image').css('display', 'none');
        $('.score').html(" " + 0); 
     
        //Set tournament series
        seriesNum = $('#tourney-num').val(); //no :selected here
        $("#tourney-num").change(function() {
            seriesNum = $(this).val(); 
        });

        if (seriesNum == "") {
            alert("Please select a Tournament Length from the dropdown.");
        } else {
            play(seriesNum); 
        }
    });  

	function play(series){
        //Set variables and remove any previous Round counts 
       var playerScore = 0;
       var CPUScore = 0;
       var playRound = 1;
       var rock = "<img src='/assets/rock_paper_scissors/rock.jpg' class='play-image' />";
       var scissors = "<img src='/assets/rock_paper_scissors/scissors.jpg' class='play-image' />";
       var paper = "<img src='/assets/rock_paper_scissors/paper.jpg' class='play-image' />";
       
        //Play Loop
        while(playRound<series) {
            var playerResponse = prompt("Player1: Rock, Paper, or Scissors? You can just type the letter 'R', 'P' or 'S'.");
            
            /*var buttonPress = function(){
                $('.move-button').click(function(){
                    var pressed = $(this).data('value');  
                    playerResponse(pressed);              
                });         
            }*/
            
            //Downcase for comparison
            var playerResponse = playerResponse.toLowerCase();
            /*playerResponse = function(press){
                return press.toLowerCase;
            }*/
            
            //Responses 
            var responseArray = ["r","p","s"];
            
            //Fair Play Check
            function fairPlayCheck(){             
                for (var i=0;i<responseArray.length;i++){
                    if(playerResponse == responseArray[i]){
                        return true;
                    } 
                }
            }
            
            //Play Continue
            if(fairPlayCheck() != true){
              
                alert("Please pick the appropriate letter 'R', 'P' or 'S' to play the game.");
            } else {
                //Pick by random number by pulling from array
                var CPUResponse = responseArray[Math.floor(Math.random() * responseArray.length)].toLowerCase();    
                
                // Human Player 2
                //var CPUResponse = prompt("Player2: Rock, paper, or scissors? You can just type the letter 'R', 'P' or 'S'.");
                
                //Convert Responses to words and insert image
                function convertResponse(move,player){
                    var playImage;
                    switch(move){
                        case move = 'r':
                            move = 'ROCK';
                            playImage = rock;
                            break;
                        case move = 'p':
                            move = 'PAPER';
                            playImage = paper;
                            break;
                        case move = 's':
                            move = 'SCISSORS';
                            playImage = scissors;
                            break;
                        default:
                    }
                    if(player == 'user'){
                        playerResponse = move;
                        $('#player').html(playImage);
                    } else if (player == 'CPU'){
                        CPUResponse = move;
                        $('#CPU').html(playImage);
                    }                    
                }
                
                //Winners
                var winner1 = "USER WINS!";
                var winner2 = "CPU WINS!";
                var tie = "It's a TIE - Round do-over!";
                
                // Alerts
                var alertWin = function(result){
                    var user = 'user';
                    var CPU = 'CPU';
                    convertResponse(playerResponse,user);
                    convertResponse(CPUResponse,CPU);
                    alert("YOU chose " + playerResponse + " , CPU chose " + CPUResponse + " . " + result);
                }
                
                function scoreCheck(){
                     //Round Check to Terminate Tournament
                    if( playerScore / (series -1) > 0.5 || CPUScore / (series - 1) > 0.5){
                        playRound = series;
                    } else {
                        playRound++;   
                    }
                }
                
                //Update Scores and Advance Round Display
                function scoreUpdates(winner){
                    $('.player-score').html(" " + playerScore);
                    $('.CPU-score').html(" " + CPUScore);
                    $('.rounds').append("<li class='round-count'>Round " + playRound + "<span class='player-win'> " + winner + '</span></li>');
                    scoreCheck();                    
                }            
                
                //Play Algorithm
                var playerWin = "Player 1";
                var CPUWin = "CPU";
                
                //CPU Win Function
                function CPUWinner(){
                   alertWin(winner2);
                    CPUScore++;                    
                    scoreUpdates(CPUWin); 
                }
                //Player Win Function
                function playerWinner(){
                    alertWin(winner1);
                    playerScore++;                    
                    scoreUpdates(playerWin);    
                }
                
                if(playerResponse == 'r' && CPUResponse == 'p') {
                    CPUWinner();
                } else if(playerResponse == 'r' && CPUResponse == 's') {
                    playerWinner();               
                } else if(playerResponse == 'p' && CPUResponse == 's') {
                    CPUWinner();                
                } else if(playerResponse == 'p' && CPUResponse == 'r') {
                    playerWinner();
                } else if(playerResponse == 's' && CPUResponse == 'r') {
                    CPUWinner();                
                } else if(playerResponse == 's' && CPUResponse == 'p') {
                    playerWinner();                
                } else {
                    alertWin(tie);
                }
            } //End Fairplay Check 

            //Remove playImage
            $('.play-image').css('display', 'none');



        }//End Play Loop
        
        //Alert which Player won the Tournament
        if(playerScore > CPUScore){
         alert("HOORAY! YOU Won the Tournament!");        
        } else {
         alert("Too bad! CPU Won the Tournament!");   
        }
        
        //Change Play Button
        $('.play span').html("Again");
    }//End Play Function    
    
      

});