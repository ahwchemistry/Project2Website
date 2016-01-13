function insertclasses() {
    var request = new XMLHttpRequest();

    request.onload = function() {

        string = request.responseText;


        var dataset = JSON.parse(string);

        /* document.getElementById("Classtabs").innerHTML += "<ul>"; */
        
        



        //Creating the list elements for each of the tabs.
        for (i = 0; i < dataset.length; i++) {
            document.getElementById("classlist").innerHTML += "<li id='tabhead" + (i + 1) + "'><a href=' #tab" + (i + 1) + "'>" + dataset[i]["requirement"] + "</a></li>"
        }

        //Creating div's for each of the tabs.
        for (n = 0; n < dataset.length; n++) {
            document.getElementById("Tabs1").innerHTML += "<div id='tab" + (n + 1) + "'></div>"
        }

        //Creating a div for each class in every single requirement tab.
        for (q = 0; q < dataset.length; q++) {


            var currenttab = "#tab" + (q + 1);

            for (y = 0; y < dataset[q]['courses'].length; y++) {


                currentid = dataset[q]['courses'][y].id;

                currentid = currentid.replace(/\s+/g, '');
                /*
                console.log(currentid);
                */
                currentparagraph = currentid + "para";


                $(currenttab).append(

                    "<div id='" + (currentid + "container") + "' class='bubblecontainer " + currentid + "' targetname='" + currentid + "' assc='" +currentparagraph+ "' > <div class='classbubble' assc='" + currentparagraph + "' time='" + dataset[q]['courses'][y].when + "' id='" + currentid + "bubble" + "' tabheader='tabhead" + (q+1) + "' currenttab='" + currenttab + "' > <p>" + dataset[q]['courses'][y].id + "</p> </div></div>"

                );

                hit = "#" + currentid + "container";



                /*
                console.log(hit);

                console.log(dataset[q]['courses'][y].description);

                console.log("<p> " + dataset[q]['courses'][y].description + " </p>");
                */

                currentparagraph = currentid + "para";

                $(hit).append(

                    "<p id='" + currentparagraph + "'style='display:none ' class='description'> " + dataset[q]['courses'][y].description + " </p>"


                );



                /*
		        $("#"+currentid+"container").prepend()
		    
		        {
			        "<p> " + dataset[q]['courses'][y].description + "</p>"
		        };
		        */




            }


        }


        /* Deprecated
        //Adding accordions to the divs, containing the information.

        for (j = 0; j < dataset.length; j++) {
            var currenttab = "#tab" + (j + 1)

           

            $(currenttab).append(

                "<div id='Accordion" + (j + 1) + "'></div>"

            );
            var currentacc = "#Accordion" + (j + 1);

            //Creating the accordions for each class.  
            $(function() {
                $(currentacc).accordion();
            });
        }


        //Adding the information of eachcourse to the correct accordion.
        for (u = 0; u < dataset.length; u++) 
        {
            

            //For each class within each requirement within the json file.
            for (l = 0; l != dataset[u]["courses"].length; l++) {
                
                
                currentaccordion = "#Accordion" + (u+1)

                $(currentaccordion).append("<div><h3>" + dataset[u]['courses'][l].name + "</h3><div>");

                $(currentaccordion).append("<div>" + dataset[u]['courses'][l].description + "<div>");

                $(currentaccordion).accordion("refresh");
                


            }
        }
        */




        //Creating all of the tabs and refreshing them to create all of the required elements.
        $(function() {
            $("#Tabs1").tabs();
        });

        $("div#Tabs1").tabs("refresh");
        
        
        //Handler for the descriptions to drop down on click. Tried hover to no avail.
        $('.bubblecontainer').on("click",function(){
	        
	        target = "#" + $(this).attr("assc");
	        
	        
	        /*
	        console.log(target);
	        */
            
            
	        $(target).slideDown("slow");
	
	        
	        
        });
    
        


        $(".classbubble").draggable({



            revert: "invalid",




        });
        $(".droppable").droppable({

            drop: function(event, ui) {

                $("<li></li>").text(ui.draggable.text() + ": " + ui.draggable.attr("time")).appendTo(this);
                $(ui.draggable).hide();

                classname = ui.draggable.parent().attr("targetname");

                tabheadname = ui.draggable.attr("tabheader");

                tabname = ui.draggable.attr("currenttab");
                
                /*
                console.log(tabname);
                console.log(tabheadname);
                */
                

                $("#" + tabheadname).hide();
                
                
                $(tabname).hide();



                $("." + classname).hide();

                target = $(this).attr("id");

                targetname = "#" + target
                
                
                addCourse((ui.draggable.attr("id")),ui.draggable.attr("time"),ui.draggable.attr("currenttab"),$(this).attr("id"));



				/*
                localStorage.setItem(target, "");

                console.log(localStorage.getItem("blah"));

                if ((localStorage).getItem(target) == "") {
                    console.log("Hello!")

                    console.log($(targetname).html());

                    currentarray = [$(targetname).html()];

                    console.log(currentarray);

                    jsonfile = JSON.stringify(currentarray);

                    console.log(jsonfile);

                    localStorage.setItem(target, jsonfile);
                }

                console.log(localStorage.getItem(target));

                getitem = localStorage.getItem(target)

                text = JSON.parse(getitem);

                console.log(text);
                */




            }



        });
        
        
        console.log(localStorage.length);
        loadCourses();
        
        $("#resetcourses").on("click", function()
        {
            localStorage.clear();
            
            console.log("Local Storage Items: " + localStorage.length())
        })




    };


    request.open("GET", "Classes.json", true);
    request.send();

}

function addCourse(courseid, time, tab, year)
{
    
    courseid = courseid.replace('bubble','')
    
    console.log(courseid);
    
    
    coursejson = '{"courseid":"' + courseid + '" , "time":"' + time + '" , "tab":" ' + tab + '" , "year":"' + year + '" }'
  
    jsontext = JSON.parse(coursejson);
    
    console.log(jsontext.courseid);
    
    localStorage.setItem(courseid, coursejson);
    
    console.log("Length is" + localStorage.length);
    
    
  
}

function loadCourses()
{
    for(i=0; i< localStorage.length; i++)
        {
            console.log("Key is " + localStorage.key(i));
            
            currentjson = localStorage.getItem(localStorage.key(i));
            
            currentjson = JSON.parse(currentjson);
            
            console.log(currentjson.courseid);
            
            if(currentjson.courseid != undefined)
                {
                    targetyear = "#" + currentjson.year;
                    
                    courselisting = "<li>" + currentjson.courseid + " : " + currentjson.time +"</li>"
                    
                    $(targetyear).append(courselisting);
                    
                    $("#" + currentjson.courseid+ "bubble").hide();
                    
                    $(currentjson.tab).hide();
                    
                    tabname = (currentjson.tab).replace('#tab',"")
                    
                    tabname = tabname.replace(/\s/g, '');
                    
                    tabname = "#tabhead" + tabname;
                    
                    console.log(tabname);
                    
                    $(tabname).hide();
                 
                    
                }
            
        }
}

