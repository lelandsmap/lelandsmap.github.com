// Initialization stuff
var site_url = 'some_website_here.com';
function update_rightbar(location){
    //alert('location:'+location.name+'category:'+location.category);
    $("#rightbar_title").html(location.name);
    
}

$(function() {

    //
    var infowindow = new google.maps.InfoWindow({
        //content: contentString,
        maxWidth: 200
    });

    var latlng = new google.maps.LatLng(37.427, -122.172);
    var myOptions = {
        zoom: 15,
        minZoom: 14,
        maxZoom: 18,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(37.4014, -122.1854), // 37: the lower, the lower on the screen
            new google.maps.LatLng(37.4435, -122.1600) //122: the lower the negative value, the more
            );
    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())){ 
            // still within valid bounds, so save the last valid position
            lastValidCenter = map.getCenter();
            return; 
        }

        // not valid anymore => return to last valid position
        map.panTo(lastValidCenter);
    });

    //alert("page loaded.\n");
    $.getJSON('data/data.json', function(data) {
        //alert("loaded json file.\n");
        //alert('locations:'+data.locations);
        $.each(data.locations, function(i, location){
            //alert('index:' + i + 'description:' + location.description + '\n');
            
            //var myLatlng = new google.maps.LatLng(37.42310,-122.16880);
            var myLatlng = new google.maps.LatLng(location.lat,location.long);
            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">'+ location.name+'</h1>'+
                '<div id="bodyContent">'+
                location.description +
                '</div>'+
                '</div>';

            

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Columbae'
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
                //alert("clicked on me:"+location.name);
                update_rightbar(location);
            });
            
        });
    }); 

    $('#pulldown').hide();

    $('#topbar').hover(function() {
        if($('#pulldown').is(':hidden')) {
            $('#pulldown').show("slide", { direction: "up" }, 500);
        }
    }, function() {
        if($('#pulldown').is(':visible')) {
            $('#pulldown').hide("slide", { direction: "up" }, 500);
        }
    });
    
    // Start of marker code
    

});

