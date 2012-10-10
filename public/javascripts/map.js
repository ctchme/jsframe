var poly, map, markers = [], path = [], service = new google.maps.DirectionsService();
    $(document).ready(function(){
    initialize();
    });

function initialize() {
        var lovePark = new google.maps.LatLng(39.954328,-75.165676);
        var mapOptions = {
          zoom: 18,
          center: lovePark,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map($(".map")[0], mapOptions);

        var polyOptions = {
          strokeColor: '#a5a08c',
          strokeOpacity: 1.0,
          strokeWeight: 3
        }
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        google.maps.event.addListener(map, 'click', addLatLng);
}
var justForUniqueness = 0;
function addLatLng(event) {
      
      if (path.length == 0) {
        path.push(event.latLng);
        poly = new google.maps.Polyline({ map: map });
        poly.setPath(path);

         marker = new google.maps.Marker({
            position: path[path.length - 1],
            title: 'uid' + (justForUniqueness + 1),
            map: map
          }); 

          markers.push(marker);
          google.maps.event.addListener(marker, 'click', function() {
        
            marker.setMap(null);
            removeFromLineArray(marker.position);                  
          }); 
    } 
    else {
        service.route({
          origin: path[path.length - 1],
          destination: event.latLng,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            path = path.concat(result.routes[0].overview_path);
            poly.setPath(path);
           
           marker = new google.maps.Marker({
              position: path[path.length - 1],
              title: 'uid' + (justForUniqueness + 1),
              map: map
           }); 

            markers.push(marker);
            google.maps.event.addListener(marker, 'click', function() {
        
              marker.setMap(null);
              removeFromLineArray(marker.position);                  
            }); 
        }});
    }
    

}

//This function is crappy I will have to find a better way to remove the marker
//As of right now we cannot remove all the poly line fractions necessary
//Perhaps I would need to get directions again..going from all points in my markers array
function removeFromLineArray(position){
  var path = poly.getPath();
  var foundIndex;
  path.forEach(function(p, index){
      if(p == position){
           foundIndex = index;   
      }                
  });
  path.removeAt(foundIndex);};