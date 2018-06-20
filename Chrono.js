var Chrono={
	chrono: $('#chrono'),
	

	initChrono: function(){
		var duree = 1200;
		setInterval(function(){
			duree--;
			Chrono.chrono.show();
	        
			if (duree>59){
				m=Math.floor(duree/60);
				s=duree-m*60;
				if (s<10){
					s="0"+s;
				} else if(m<10){
					m="0"+m;
				}
				Chrono.chrono.text("Temps restant avant expiration: "+m+" min "+s+" s.");
			}else if (duree<=59 && duree>0){
				Chrono.chrono.text("Temps restant: "+"00"+" min "+duree+" s.");
			} else if (duree ===0){
				Resa.footerMessage.text('Temps expiré, reservation annulé!');
				Chrono.chrono.text("");
				Resa.cancelButton.html('');
			}
		 	Resa.submitButton.click(function(){
		 		duree=1200;
		 		sessionStorage.removeItem("temps restant:");
		 	})
		 	Resa.cancelButton.click(function(){
		 		duree=0;
		 		sessionStorage.removeItem("temps restant:");
		 		Chrono.chrono.hide();
		 	})
	        sessionStorage.setItem("temps restant:", duree);
	    },1000);
	},
}
