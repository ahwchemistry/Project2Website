function insertclasses() {
    var request = new XMLHttpRequest();

    request.onload = function() {

        string = request.responseText;


        var dataset = JSON.parse(string);

        /* document.getElementById("Classtabs").innerHTML += "<ul>"; */

        console.log(dataset[0].name);
        console.log(dataset.length)

        //Creating the list elements for each of the tabs.
        for (i = 0; i < dataset.length; i++) {
            document.getElementById("classlist").innerHTML += "<li><a href=' #tab" + (i + 1) + "'>" + dataset[i]["RequirementName"] + "</a></li>"
        }

        //Creating div's for each of the tabs.
        for (n = 0; n < dataset.length; n++) {
            document.getElementById("Tabs1").innerHTML += "<div id='tab" + (n + 1) + "'</div>"
        }

        //Adding accordions to the divs, containing the information.

        for (j = 0; j < dataset.length; j++) {
            var currenttab = "#tab" + (j + 1)

            console.log(currenttab);

            $(currenttab).append(

                "<div id='Accordion" + (j + 1) + "'></div>"

            );
            var currentacc = "#Accordion" + (j + 1);

            //Creating the accordions for each class.  
            $(function() {
                $(currentacc).accordion();
            });
        }
        
        
        //Adding the information of each
        
        console.log("Dataset length" + dataset.length)
        
        
        for(u=0; u<dataset.length; u++)
            {
                console.log("Going through the loop!")
                
                //For each class within each array within the json file.
                for(l=0;l!=dataset[0]["classes"].length;l++)
                    {
                        console.log("Appending!")
                        currentaccordion = "#Accordion" + (u)
                        
$(currentaccordion).append("<div><h3>"+dataset[0]['classes'][l].classname+"</h3><div>");
                        
$(currentaccordion).append("<div>"+dataset[0]['classes'][l].classname + "<div>");                        

                        $(currentaccordion).accordion("refresh");
                        
                        
                        
                    }
            }



        //Creating all of the tabs and refreshing them to create all of the required elements.
        $(function() {
            $("#Tabs1").tabs();
        });

        $("div#Tabs1").tabs("refresh");
        
        

    };


    request.open("GET", "Classes.json", true);
    request.send();




}