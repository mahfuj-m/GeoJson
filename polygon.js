

import poly1 from './SE_State_Management_Polygons_1.json' assert {type: 'json'};
//console.log(poly1);
import poly2 from './SE_State_Management_Polygons_2.json' assert {type: 'json'};

var map;

function generate(key){
    var coor;
    switch(key){
        case 1:
            coor=poly1.features[2];   // Accesing the 3rd index of 1st file polygon features
            break;
        case 2:
            coor=poly2.features[1];  // Accesing the 2rd index of 2nd file polygon features
            break;
        case 3: //intersection
        var p1=poly1.features[2];
        var  p2=poly2.features[1];
        coor=turf.intersect(p1,p2);   // Performing intersection operation on the selected polygon using turfjs
        break;
        case 4: //Union
            var p1=poly1.features[2];
            var  p2=poly2.features[1];
            coor=turf.union(p1,p2);    // Performing union operation on the selected polygon using turfjs
            break;
            break;
    }
    if (typeof map !== 'undefined')   // Handling the error that created by JS "Map object is already initialized"
    {
        map.remove();  // Remove the previous map object.
        document.getElementById("Map").innerHTML = "";    // Remove the html content
    }
    
    map=new L.map('Map');   // Reinitilize the map object from leafletjs

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);        // Original map

        L.geoJson(coor,1).addTo(map);   // Presenting polygon to the map
        L.control.scale().addTo(map);   // Adding the zooming scale. although, this is not essential
        var area=turf.area(coor)  // Calculating area of the polygon using turfjs. This function returns measurement as square meteres.
        document.getElementById("area").innerHTML = "Area:  "+(area/1000000).toFixed(3)+ " Square Kilometer"; 
        map.setView([48.854783383117244,2.2956061363220215], 15);  // Set the specific latitude and longitude with zoom level 15 to the view.
   
}

/* Function for calling the specific plots */
window.call=function( key ) {
    switch(key) {
        case 1:
         
          var decider = document.getElementById('switch');
          if(decider.checked){
            generate(key);
                } 
          break;
        case 2:
          
          var decider = document.getElementById('switch1');
          if(decider.checked){
            generate(key);
                } 
          break;
          case 3:
            var decider = document.getElementById('switch2');
            if(decider.checked){
              generate(key);
                  } 
                  break;
            case 4:
                var decider = document.getElementById('switch3');
                if(decider.checked){
                  generate(key);
                      } 
                      break;
      }
}
