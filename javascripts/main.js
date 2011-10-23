// Initialization stuff
$(function() {
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
        //alert('index:' + i + 'category:' + location.category + '\n');
    });


}); 

    // Start of marker code
    var myLatlng = new google.maps.LatLng(37.42310,-122.16880);
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Columbae</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Columbae</b>, home of the naked people, is also home to Kapil and Alex'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Columbae'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

});

