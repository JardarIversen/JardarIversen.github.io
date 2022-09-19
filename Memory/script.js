main = document.getElementById("main")
    
    generatePics()
    function generatePics(){
        /*Lager variabler for å telle at riktig mengde kort blir generert*/
        var count0 = 0;var count1 = 0;var count2 = 0;var count3 = 0;var count4 = 0;
        var count5 = 0;var count6 = 0;var count7 = 0;var count8 = 0;var count9 = 0;
        
        
        for(var i=0;i<20;i++){
            /*Legger til 20 kort, hvor det er to av hver type, i tilfeldig rekkefølge*/
            var num = Math.floor(Math.random() * 10)
            
            if((num == 0) && (count0 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/antilope.jpg)"
                count0++
            }
            else if((num == 1) && (count1 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/elefant.jpg)"
                count1++
            }
            else if((num == 2) && (count2 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/flodhest.jpg)"
                count2++
            }
            else if((num == 3) && (count3 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/gepard.jpg)"
                count3++
            }
            else if((num == 4) && (count4 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/giraffe.jpg)"
                count4++
            }
            else if((num == 5) && (count5 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/hyene.jpg)"
                count5++
            }
            else if((num == 6) && (count6 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/krokodille.jpg)"
                count6++
            }
            else if((num == 7) && (count7 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/løve.jpg)"
                count7++
            }
            else if((num == 8) && (count8 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/meerkat.jpg)"
                count8++
            }
            else if((num == 9) && (count9 != 2)){
                main.children[i].style.backgroundImage = "url(media/dyr/zebra.jpg)"
                count9++
            }
            else{
                i--
            }
            
            main.children[i].style.backgroundSize = "100% 100%"
            
        }
    }   
    /*Gjør klar variabler for å snu kortene, og holde styr på 
    hvem som kan og ikke, og for å vite hvem som skal holdes snudd*/
    var score = document.getElementById("cardCount")
    var scoreAdder = 0
    var activeCards = 0; 
    var cardHistory = []
    var finishedCards = []
    var x = 0;

    function turnCard(i){
        while(x<1){
            console.log(x)
            startTimer() /*Starter timeren bare første gang et kort snus*/
            x++
        }
        
        if(i != cardHistory.slice(-1)){
            
            
            if(!(finishedCards.includes(i))){ /*Tester om man prøver å snu et kort som allerede har funnet sitt par, og lar deg ikke gjøre det*/
                main.children[i].children[0].classList.remove("innerDIV") /*Fjerner elementet som gjør at mønsteret er der*/
                activeCards++
                cardHistory.push(i) /*Legger til kortnummer i historikken*/
                if((activeCards == 2) && (main.children[cardHistory[0]].style.backgroundImage == main.children[cardHistory[1]].style.backgroundImage)){
                    /*Legger til score hvis de to forrige kortene du snudde har samme bilde kilde*/
                    scoreAdder += 2;
                    score.innerText = scoreAdder;
                    if(scoreAdder == 20){
                        pauseTimer()
                    }
                }
                
            }
            
            
            if(activeCards >= 3){
                /*Sjekker, når det er tre kort om de to første skal snus igjen eller holdes oppe*/
                if(main.children[cardHistory[0]].style.backgroundImage == main.children[cardHistory[1]].style.backgroundImage){
                    activeCards = 1;
                    main.children[cardHistory[0]].classList.remove("innerDIV") /*Fjerner elementet som gir kortmønsteret*/
                    main.children[cardHistory[1]].classList.remove("innerDIV")
                    finishedCards.push(cardHistory[0]) /*Legger kortene til i samlingen med de funnede parene for senere testing*/
                    finishedCards.push(cardHistory[1])
                }
                else{
                    /*Snur tilbake kortene hvis de ikke var et par*/
                    main.children[cardHistory[0]].children[0].classList.add("innerDIV")
                    main.children[cardHistory[1]].children[0].classList.add("innerDIV")
                    
                
                    activeCards = 1;
                    
                }
                cardHistory.shift();cardHistory.shift() /*Fjerner de to tidligste kortene fra korthistorikken*/
            }
            
        }
    }


    function refresh(){
        /*Funksjon som lar knappen refreshe spillet*/
        location.reload()
        /*
        generatePics()
        var scoreAdder = 0
        score.innerText = scoreAdder
        var activeCards = 0; 
        var cardHistory = []
        var finishedCards = []
        var x = 0;
        resetTimer()
        for(var i = 0; i<main.children.length;i++){
            main.children[i].children[0].classList.add("innerDIV")
        }
        */
    }

    var elapsed = 0;
    var interval;
    var timerDisplay = document.getElementById("timer");

    
    function startTimer() {
        var startTime = Date.now() - elapsed;
        interval = setInterval(() => {
            elapsed = Date.now() - startTime;
            displayTime(elapsed);
        }, 100);
    }

    function pauseTimer() {
        clearInterval(interval);
    }

    function resetTimer() {
        clearInterval(interval);
        elapsed = 0;
        displayTime(0);
    }
    

    function displayTime(time) {
        var seconds = Math.floor(time / 1000) % 60;
        var minutes = Math.floor(time / 60000) % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        timerDisplay.innerHTML =
             minutes + ":" + seconds
    }   

    settingsMenu = document.getElementById("settingsMenu")
    statsMenu = document.getElementById("statsMenu")

    function tab(type){
        if(type == "settings"){
            if(settingsMenu.style.display == "block"){
                settingsMenu.style.display = "none"
            }
            else{
                statsMenu.style.display = "none"
                settingsMenu.style.display = "block"
            }
        }
        else if (type == "stats"){
            if(statsMenu.style.display == "block"){
                statsMenu.style.display = "none"
            }
            else{
                settingsMenu.style.display = "none"
                statsMenu.style.display = "block"
            }
        }
    }

    backgroundColor1 = document.getElementById("backgroundColor1")
    backgroundColor2 = document.getElementById("backgroundColor2")
    cardColor1 = document.getElementById("cardColor1")
    cardColor2 = document.getElementById("cardColor2")
    cardStyling = document.getElementsByClassName("innerDIV")

    function saveBackgroundSettings(){
        document.body.style.backgroundImage = " linear-gradient(-30deg," + backgroundColor1.value + "," + backgroundColor2.value + ")"
    }
    
    function saveCardSettings(){
        for(var x = 0;x<cardStyling.length;x++){
            cardStyling[x].style.backgroundImage = "repeating-linear-gradient(45deg," + cardColor1.value + "," + cardColor1.value + " 20px, " + cardColor2.value + " 20px," + cardColor2.value + " 25px)"
        } 
    }