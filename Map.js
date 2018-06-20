var Mapy={
	map: null,
	velibApi: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=68d0fdedc682e3b29a86f2b8c6892ee6cbe7cf98',
	stationName: $('#stationName'),
	stationAddress: $('#stationAddress'),
	status: $('#status'),
	available_bike_stands: $('#available_bike_stands'),
	availableBikes: $('#availableBikes'),
    form: $('#reservation'),
    reservationButton: $('#reservationButton'),
    container: $('.container'),

	initMap: function() {
		Mapy.map = new google.maps.Map(document.getElementById('map'), {
	  		center: {lat: 45.75, lng: 4.85},
	  		zoom: 15
		});

		if(typeof sessionStorage!='undefined') {
            ChronoBis.initChronoBis();
        };

		Mapy.callApiVelib();
		Mapy.hideInfoStation();
        Resa.cancelButton.hide();
	},

	hideInfoStation: function(){
		Mapy.stationName.hide();
        Mapy.stationAddress.hide();
        Mapy.available_bike_stands.hide();
        Mapy.availableBikes.hide();
        Mapy.container.hide();
        Mapy.reservationButton.html('');
        Resa.submitButton.html('');
        
	},

	callApiVelib: function(){
		ajaxGet(Mapy.velibApi, function (reponse) {
			var stations = JSON.parse(reponse);
			markers = [];
			stations.forEach(function (station) {
	        	var marker = new google.maps.Marker({
	          		position: station.position,
	          		map: Mapy.map,
	          		title: station.name,
        		});
        		markers.push(marker);

        		marker.addListener("click", function(){
        			Mapy.hideInfoStation();
        			Mapy.stationName.text("n°"+station.name),
        			Mapy.stationAddress.text(station.address),
        			Mapy.status.text("Etat: "+station.status),
        			Mapy.available_bike_stands.text('Place(s) libre(s) disponible(s): '+station.available_bike_stands);
        			Mapy.availableBikes.text('Vélo(s) disponible(s): ' + station.available_bikes);
                    if (station.available_bikes === 0) {
                        Mapy.availableBikes.text('Pas de vélo disponible');
                    } else if(station.available_bikes > 0) {
                        Mapy.reservationButton.html('<button class="btn btn-default" >Reservez</button>');
                    };
        			Mapy.stationName.fadeIn('slow');
        			Mapy.stationAddress.fadeIn('Slow');
        			Mapy.available_bike_stands.fadeIn('slow');
        			Mapy.availableBikes.fadeIn('slow');

        			Mapy.reservationButton.click(function(){
                        sessionStorage.removeItem("temps restant:");
                        sessionStorage.setItem("name", station.name);
                        sessionStorage.setItem("avail", station.available_bikes);
                        Resa.initResa();
        			});
        		});
        	});
        	Mapy.displayMarkerCluster(map, markers);
        });
    },
    displayMarkerCluster: function(map, markers){
		var markerCluster = new MarkerClusterer(Mapy.map, markers,{
			imagePath: 'img/m',
		});
	},
}

Mapy.initMap();