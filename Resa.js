var Resa={
	form: $('#reservation'),
    reservationButton: $('#reservationButton'),
    submitButton: $('#submitButton'),
	chrono: $('#chrono'),
	stationName: $('#stationName'),
	footerMessage: $('#footerMessage'),
    cancelButton: $('#cancel'),
    container: $('.container'),

    initResa: function(){
    	Resa.container.css("display","block");
        Resa.submitButton.html('<button class="btn btn-default" id="submitButton">Confirmez votre reservation</button>');
        sessionStorage.removeItem("temps restant:");
    	Resa.submitButton.click(function(){
    		if(Canvas.signature === false){
	            alert('Vous devez signer');	
			} else{
				sessionStorage.removeItem("temps restant:");
	            ajaxGet(Mapy.velibApi, function (reponse) {
					var stations = JSON.parse(reponse);
					markers = [];
						stations.forEach(function (station) {
							var avail = sessionStorage.getItem('avail');
                        	Mapy.availableBikes.text('Vélo(s) disponible(s): ' + (avail = avail - "1"));  
							Resa.reservationButton.html('');
							Resa.container.css('display',"none");
							Resa.submitButton.html('');
							var stat = sessionStorage.getItem('name');
							Resa.footerMessage.text("Vous avez reservé un vélo à la station : " + stat);					
							Chrono.initChrono();
							Resa.cancelButton.html('<button class="btn btn-default" id="cancelButton">Annulez reservation</button>');
							Resa.cancelButton.show();
							Resa.cancelButton.click(function(){
								Resa.footerMessage.text("");
								Resa.chrono.text("Vous avez annulé votre reservation");
								Resa.chrono.hide();
								Resa.cancelButton.html('');
				                sessionStorage.removeItem("temps restant:");
				                sessionStorage.removeItem("name");
							});
						});
				});
			}
		})
		
    }     			
}