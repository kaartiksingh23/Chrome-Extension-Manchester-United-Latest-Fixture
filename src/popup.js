document.addEventListener('DOMContentLoaded', function(){
    var getDetailsButton = document.getElementById('getDetailsButton');
    
    var xhr = new XMLHttpRequest();

    
    xhr.open('GET','https://www.google.com/search?q=manchester+united', true);
    xhr.send();

    function processRequest(e){
    
        if(xhr.readyState == 4 && xhr.status == 200){
            
            var detailElement = document.createElement('html');
            detailElement.innerHTML = xhr.responseText;
            
            let data = detailElement.getElementsByClassName('imso_mh__tm-scr imso_mh__mh-bd imso-hov imso_mh__nma')[0];
            let nodesToRemove = data?.getElementsByClassName("imso_mh__t-l-cont kno-fb-ctx") || []

            while(nodesToRemove.length>0){
                nodesToRemove[0].parentNode.removeChild(nodesToRemove[0]);
            }

            document.getElementById("details").innerHTML = data?.outerHTML;

            //correcting the link for the src value
            document.getElementsByClassName("imso_gs__icon")[0].src= "https://" + document.getElementsByClassName("imso_gs__icon")[0].src.substring(19);
            
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


    
