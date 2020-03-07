function getMatchDetails(){
    
}

document.addEventListener('DOMContentLoaded', function(){
    
    
    var xhr = new XMLHttpRequest();

    
    xhr.open('GET','https://www.google.com/search?q=manchester united', true);
    xhr.send();

    function processRequest(e){
    
        var todayDate = new Date();
        var todayDateInMilliseconds = Date.now();

        if(xhr.readyState == 4 && xhr.status == 200){
            
            var detailElement = document.createElement('html');
            detailElement.innerHTML = xhr.responseText;
            
            let fixtures;

            if(detailElement.getElementsByClassName('imso_mh__tm-scr imso_mh__mh-bd imso-hov imso_mh__nma')[0]){
                let timeOfTheMatch = detailElement.getElementsByClassName('imso_mh__lr-dt-ds')[0]?.innerHTML || "today, "+ todayDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                let amOrpm = timeOfTheMatch.split(',')[1].trim().split(' ')[1];
                let timeOfTheMatchIn24Hr;
                if(amOrpm.toLocaleLowerCase() == 'pm'){
                    timeOfTheMatchIn24Hr = parseInt(timeOfTheMatch.split(',')[1].trim().split(' ')[0]) + 12 ;
                }
                else{
                    timeOfTheMatchIn24Hr = parseInt(timeOfTheMatch.split(',')[1].trim().split(' ')[0])
                }
                
                todayDate.setHours(timeOfTheMatchIn24Hr);
                
                //less than 5 hours
                if(todayDateInMilliseconds - todayDate.setMinutes(00)< 10800000){
                
                    let data = detailElement.getElementsByClassName('imso_mh__tm-scr imso_mh__mh-bd imso-hov imso_mh__nma')[0];
                    let nodesToRemove = data?.getElementsByClassName("imso_mh__t-l-cont kno-fb-ctx") || []

                    while(nodesToRemove.length>0){
                        nodesToRemove[0].parentNode.removeChild(nodesToRemove[0]);
                    }

                    document.getElementById("details").innerHTML = data?.outerHTML;
                
                }
                else{
                    
                    if(detailElement.getElementsByClassName('imso-loa imso-ani')){
                        fixtures = detailElement.getElementsByClassName('imso-loa imso-ani');
                    }

                for(let fixturesIndex=0; fixturesIndex<fixtures.length; fixturesIndex++){
                    if(todayDateInMilliseconds-(Date.parse(fixtures[fixturesIndex].getAttribute("data-start-time")))<0){
                        document.getElementById("details").innerHTML = fixtures[fixturesIndex]?.outerHTML;
                        break;
                    }
                }
                }

            }
            else{
                
                //code duplicated , implement a function and call it wherever necessary

                if(detailElement.getElementsByClassName('imso-loa imso-ani')){
                    fixtures = detailElement.getElementsByClassName('imso-loa imso-ani');
                }

                
                
                for(let fixturesIndex=0; fixturesIndex<fixtures.length; fixturesIndex++){
                    if(todayDateInMilliseconds-(Date.parse(fixtures[fixturesIndex].getAttribute("data-start-time")))<0){
                        document.getElementById("details").innerHTML = fixtures[fixturesIndex]?.outerHTML;
                        break;
                    }
                }
            }

            

            //correcting the link for the src value
            for(let imgIndex=0; imgIndex<document.getElementsByTagName('img').length; imgIndex++){
                document.getElementsByTagName("img")[imgIndex].src= "https://" +  document.getElementsByTagName("img")[imgIndex].src.substring(19);
            }

            //Figuring Out if the fixture is home or away
            var stadium = 'Away';
            if(document.getElementsByClassName("ellipsisize kno-fb-ctx").length>0 ){
                if(document.getElementsByClassName("ellipsisize kno-fb-ctx")[0].firstChild.innerHTML == 'Man United'){
                    stadium = 'Home';
                    document.getElementById("stadium").innerHTML = stadium;
                }
            }
            
        }
    }

    xhr.addEventListener("readystatechange",processRequest,false);
    
}, false);

   

    /* 

    Value	State	            Description
    0	    UNSENT	            The open method hasn't been called yet
    1	    OPENED	            The send method has been called
    2	    HEADERS_RECEIVED	The send method has been called and the HTTP request has returned the status and headers
    3	    LOADING	            The HTTP request response is being downloaded
    4	    DONE	            Everything has completed

    */


    
