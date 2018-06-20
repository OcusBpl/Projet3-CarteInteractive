var ChronoBis={
	chrono: $('#chrono'),
	

	initChronoBis: function(){
		// Récupération de la valeur dans web storage
        var time = sessionStorage.getItem('temps restant:');
        // Vérification de la présence du compteur
        if(time!=null) {
			setInterval(function(){
				time--;
	            sessionStorage.setItem("temps restant:",time);
	            ChronoBis.chrono.show();
	            Resa.cancelButton.html('<button class="btn btn-default" id="cancelButton">Annulez reservation</button>');
	            if (time>59){
	                m=Math.floor(time/60);
	                s=time-m*60;
	                if (s<10){
	                    s="0"+s;
	                } else if(m<10){
	                    m="0"+m;
	                }
	                Resa.footerMessage.text('Vous avez déjà une reservation en cour, annulez celle ci avant de reserver une autre');
	                Resa.chrono.text("Temps restant avant expiration: "+m+" min "+s+" s.");
	            }else if (time<=59 && time>0){
	                Resa.chrono.text("Temps restant: "+"00"+" min "+duration+" s.");
	            } else if (time ===0){
	                Resa.footerMessage.text('Temps expiré, reservation annulé!');
	                ChronoBis.chrono.text("");
	                Resa.cancelButton.html('');
	            }
	            Resa.cancelButton.click(function(){
	                Resa.footerMessage.text("");
	                Resa.cancelButton.html('');
	                Resa.cancelButton.hide();
	                Resa.chrono.text("Vous avez annulé votre reservation");
	                Resa.chrono.hide();
	                sessionStorage.removeItem("temps restant:");
	                time=null;
	            });
		    },1000);
		};
	},
}