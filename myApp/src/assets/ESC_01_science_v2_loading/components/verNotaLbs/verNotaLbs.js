class verNotaLbs extends componentBase {
	constructor() {
		super();
		this._notaActual;
		this._paginaActial;
		this._textoNota;
		this._autorNota;
		this._fechaNota;
		this._documentHammer;
	}

	async getData() {
		var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
          if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            txt = xmlhttp.responseText;
            this.shadowRoot.innerHTML = txt;

			this._textoNota = this.shadowRoot.querySelector("#txt-ver-nota");
			this._autorNota = this.shadowRoot.querySelector("#autor-nota");
			this._fechaNota = this.shadowRoot.querySelector("#fecha-nota");
			this._btnBorrarNotaElement = this.shadowRoot.querySelector("#delete-nota");
			
			
			this.shadowRoot.querySelector("#btn-next-nota").addEventListener("click", this._nextNota.bind(this));
			this.shadowRoot.querySelector("#btn-previous-nota").addEventListener("click", this._previousNota.bind(this));
			this.shadowRoot.querySelector("#delete-nota").addEventListener("click", this._deleteDataFirestore.bind(this));
			
			

            this.updateStyle(this);
          }
        };
        xmlhttp.open("GET","components/verNotaLbs/verNotaLbs.html",true);
        xmlhttp.send();
	}

	updateStyle(elem) {
        const shadow = elem.shadowRoot;

        shadow.querySelector("style").textContent = `
		:host {
			background-color: var(--white); 
			max-width: 100% !important; 
			padding-left: 0 !important; 
			padding-right: 0 !important; 
			border-color: #000000; 
			position: fixed; 
			bottom: 0; 
			width: 100% !important; 	
			display: none;
			animation: fadeInUp;
			animation-duration: 400ms;
		}

		.container-toolbar-notas {
			border: 2px solid var(--light);
			padding: 0 2%;
    		background-color: #ffffff;
    
		}
		
		.container-toolbar-notas button {
			color: var(--dark) !important;
			font-size: 1.3em;
			text-align: justify;
			margin-top: 0;
			margin-bottom: 0;
			
		}

		.btn {
			background-color: transparent !important;
		}

		.avatar {
			height: 1rem;
			width: 1rem;
			position: relative;
			display: inline-block;
			-ms-flex-negative: 0 !important;
			flex-shrink: 0 !important;
		}
		.margin-right-5rem {
			margin-right: 0.5rem !important;
		}
		.animacion {
			animation-duration: 400ms;
		}
		.animacion-200ms { 
			animation-duration: 200ms;
		}
		
		/* Fade in entrnace */
		.animacion.fadeInUp {
			animation-name: fadeInUp;
			animation-timing-function: ease;
		}
		@-webkit-keyframes fadeInUp {
			0% {
				opacity: 0;
				-webkit-transform: translate3d(0,100%,0);
				transform: translate3d(0,100%,0)
			}

			to {
				opacity: 1;
				-webkit-transform: translateZ(0);
				transform: translateZ(0)
			}
		}

		@keyframes fadeInUp {
			0% {
				opacity: 0;
				-webkit-transform: translate3d(0,100%,0);
				transform: translate3d(0,100%,0)
			}

			to {
				opacity: 1;
				-webkit-transform: translateZ(0);
				transform: translateZ(0)
			}
		}


		/* Fade out down exit */
		:host(.animacion.fadeOutDown) {
			animation-name: fadeOutDown;
		}
		@keyframes fadeOutDown {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
				transform: translate3d(0, 100%, 0);
			}
		}
		/* Fade in left entrance */
		
		@keyframes fadeInLeft {
			from {
			  opacity: 0;
			  transform: translate3d(-80%, 0, 0);
			}
		  
			to {
			  opacity: 1;
			  transform: translate3d(0, 0, 0);
			}
		  }
		  
		.fadeInLeft {
			animation-name: fadeInLeft;
		}

		/* Fade in right entrance */
		@keyframes fadeInRight {
			from {
			  opacity: 0;
			  transform: translate3d(80%, 0, 0);
			}
		  
			to {
			  opacity: 1;
			  transform: translate3d(0, 0, 0);
			}
		  }
		  
		  .fadeInRight {
			animation-name: fadeInRight;
		  }
		`;
	}

	_logicData() {
		console.log("logicData verNotaLbs");
	}

	_showComponent(noteData) {
		
		this._notaActual = noteData[0].elemento;
		this._paginaActial = noteData[0].pagina;
		this._textoNota.innerHTML = noteData[0].data;
		this._autorNota.innerHTML = noteData[0].userCreate;
		this._fechaNota.innerHTML = "fecha";
		this._documentHammer = new Hammer(document);
		this._documentHammer.on('tap',  this._hideComponent);
		

		
		this.style.display = 'unset';
	}


	_hideComponent = (event) => {		
		document.getElementById(this._notaActual).classList.remove('focused');
		if(event.target.tagName === 'NOTA-LBS') {
			
		} else if(!this.contains(event.target) ){
			
			this.classList.add('fadeOutDown');
			
			if(this._documentHammer !== undefined) {
				this._documentHammer.stop();
				this._documentHammer.off('tap');
				this._documentHammer.destroy();
				this._documentHammer = undefined;
			}
			setTimeout(() => {
				this.classList.remove('fadeOutDown');
				this.style.display = 'none';
			}, 400);
			
		}

		// console.log(event);	
		// document.getElementById("page"+this._paginaActial).firstChild.contentWindow.document.getElementById(this._notaActual).classList.remove('focused');
		// // if(event.target.tagName === 'VER-NOTA-LBS') {
		// // 	console.log("here ver notalbs")
		// // } else
		// console.log(document.contains(event.target));
		// console.log("containes !", !document.contains(event.target));
		// if(!event.composedPath().includes(this)) {
		// 	console.log("entro if esconder container");	
		// 	this.classList.add('fadeOutDown');
			
		// 	if(this._documentHammer !== undefined) {
		// 		this._documentHammer.stop();
		// 		this._documentHammer.off('tap');
		// 		this._documentHammer.destroy();
		// 		this._documentHammer = undefined;
		// 	}
		// 	setTimeout(() => {
		// 		this.classList.remove('fadeOutDown');
		// 		this.style.display = 'none';
		// 	}, 400);
			
		// }

	}

				
	// _nextNota() {
	// 	console.log("next nota");
	// 	const notas = this.Visor.store.getState().bookReducer.filter(elemento => elemento.elemento.includes('nota')); 
	// 	const indexNotaActual = notas.findIndex(elemento => elemento.elemento === this._notaActual); // find the index
	// 	const dataNextNota = notas[indexNotaActual + 1];

	// 	console.log(dataNextNota);
	// 	if(dataNextNota !== undefined) {
	// 		this._notaActual = dataNextNota.elemento;
	// 		this._textoNota.innerHTML = dataNextNota.data;
	// 		this._autorNota.innerHTML = dataNextNota.userCreate;
	// 		this._fechaNota.innerHTML = "fecha";
	// 		if(this._paginaActial !== dataNextNota.pagina) {
	// 			IDRViewer.goToPage(dataNextNota.pagina);
	// 			this._paginaActial = dataNextNota.pagina;
	// 			document.getElementById(this._notaActual).focus()
	// 		}
	// 	}

	// }

	// _previousNota() {
	// 	console.log("previous nota");
	// 	const notas = this.Visor.store.getState().bookReducer.filter(elemento => elemento.elemento.includes('nota')); 
	// 	const indexNotaActual = notas.findIndex(elemento => elemento.elemento === this._notaActual); // find the index
	// 	const dataPreviousNote = notas[indexNotaActual - 1];

	// 	console.log(dataPreviousNote);
	// 	if(dataPreviousNote !== undefined) {
	// 		this._notaActual = dataPreviousNote.elemento;
	// 		this._textoNota.innerHTML = dataPreviousNote.data;
	// 		this._autorNota.innerHTML = dataPreviousNote.userCreate;
	// 		this._fechaNota.innerHTML = "fecha";
	// 		if(this._paginaActial !== dataPreviousNote.pagina) {
	// 			IDRViewer.goToPage(dataPreviousNote.pagina);
	// 			this._paginaActial = dataPreviousNote.pagina;
	// 			document.getElementById(this._notaActual).focus()
	// 		}
	// 	}
	// }





	_handlerCambiarNota(direccion) {
		console.log(direccion + " nota");
	  
		const animacion = direccion === 'next' ? 'fadeInRight' :
						  direccion === 'previous' ? 'fadeInLeft': '';
		

		const notas = this.Visor.store.getState().bookReducer.filter(elemento => elemento.elemento.includes('nota')).sort((a, b) => a.pagina - b.pagina);; 
		const indexNotaActual = notas.findIndex(elemento => elemento.elemento === this._notaActual);
		
		//console.log(notasSorted);
		console.log(notas);

		let dataNota = undefined;
		if (direccion === "next" && indexNotaActual < notas.length - 1) {
		  dataNota = notas[indexNotaActual + 1];
		} else if (direccion === "previous" && indexNotaActual > 0) {
		  dataNota = notas[indexNotaActual - 1];
		}
	  
		console.log(dataNota);
		if (dataNota !== undefined) {

		this.shadowRoot.querySelector("#container-nota-data").classList.add(animacion);
		document.getElementById(this._notaActual).classList.remove('focused');
		

		
		setTimeout(() => {
			
			this._notaActual = dataNota.elemento;
			this._textoNota.innerHTML = dataNota.data;
			this._autorNota.innerHTML = dataNota.userCreate;
			this._fechaNota.innerHTML = "fecha";
		
			if (this._paginaActial !== dataNota.pagina) {
			  IDRViewer.goToPage(dataNota.pagina);
			  this._paginaActial = dataNota.pagina;
			  
			}
			document.getElementById(this._notaActual).scrollIntoView();
			document.getElementById(this._notaActual).classList.add('focused');
			this.shadowRoot.querySelector("#container-nota-data").classList.remove(animacion);
		}, 200);
	  }
	// 	console.log(direccion + " nota");
	  
	// 	const animacion = direccion === 'next' ? 'fadeInRight' :
	// 					  direccion === 'previous' ? 'fadeInLeft': '';
		

	// 	const notas = this.Visor.store.getState().bookReducer.filter(elemento => elemento.elemento.includes('nota')).sort((a, b) => a.pagina - b.pagina);; 
	// 	const indexNotaActual = notas.findIndex(elemento => elemento.elemento === this._notaActual);
		
	// 	//console.log(notasSorted);
	// 	console.log(notas);

	// 	let dataNota = undefined;
	// 	if (direccion === "next" && indexNotaActual < notas.length - 1) {
	// 	  dataNota = notas[indexNotaActual + 1];
	// 	} else if (direccion === "previous" && indexNotaActual > 0) {
	// 	  dataNota = notas[indexNotaActual - 1];
	// 	}
	  
	// 	console.log(dataNota);
	// 	if (dataNota !== undefined) {

	// 	this.shadowRoot.querySelector("#container-nota-data").classList.add(animacion);
	// 	document.getElementById("page"+this._paginaActial).firstChild.contentWindow.document.getElementById(this._notaActual).classList.remove('focused');
		

		
	// 	setTimeout(() => {
			
	// 		this._notaActual = dataNota.elemento;
	// 		this._textoNota.innerHTML = dataNota.data;
	// 		this._autorNota.innerHTML = dataNota.userCreate;
	// 		this._fechaNota.innerHTML = "fecha";
		
	// 		if (this._paginaActial !== dataNota.pagina) {
	// 		  IDRViewer.goToPage(dataNota.pagina);
	// 		  this._paginaActial = dataNota.pagina;
			  
	// 		}
	// 		document.getElementById("page"+this._paginaActial).firstChild.contentWindow.document.getElementById(this._notaActual).scrollIntoView();
	// 		document.getElementById("page"+this._paginaActial).firstChild.contentWindow.document.getElementById(this._notaActual).classList.add('focused');
	// 		this.shadowRoot.querySelector("#container-nota-data").classList.remove(animacion);
	// 	}, 200);
	//   }
	}
	  
	_nextNota() {
	this._handlerCambiarNota("next");
	}
	
	_previousNota() {
	this._handlerCambiarNota("previous");
	}

	_deleteDataFirestore() {
		console.log("_deleteDataFirestore");

		// const promiseBorrarNota = new Promise((resolve, reject) => {

		const claveLibro = IDRViewer.config.fileName.replace(".pdf",'');
		const { usuario } = this.Visor.tokenUser;
		
		this.Visor.dbFirestore.collection(usuario)
			.doc('libros')
			.collection(claveLibro)
			.doc(this._notaActual)
			.delete()
		.then(()=> {
			console.log("deleted");
			this.classList.add('fadeOutDown');
			
			if(this._documentHammer !== undefined) {
				this._documentHammer.stop();
				this._documentHammer.off('tap');
				this._documentHammer.destroy();
				this._documentHammer = undefined;
			}
			setTimeout(() => {
				this.classList.remove('fadeOutDown');
				this.style.display = 'none';
				document.getElementById(this._notaActual).remove();
				// document.getElementById("page"+this._paginaActial).firstChild.contentWindow.document.getElementById(this._notaActual).remove();
			}, 400);
			
		})
		.catch(error => console.error("Error deleting document: ", error));

		
	};
	  


	connectedCallback() {
        this.getData();
    }
    disconnectedCallback() {
        
        //this._unsubscribe();
    }
}

customElements.define('ver-nota-lbs', verNotaLbs);