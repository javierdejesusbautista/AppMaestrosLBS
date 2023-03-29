class List_notasyfavoritosLbs extends componentBase { 
	
	constructor() {
        super();
		this.dropdownContent;
		this.dataListaContent;
    }

	async getData() {
        // console.log('GET DATA');
        var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                txt = xmlhttp.responseText;
                this.shadowRoot.innerHTML = txt;
                // this._itemLbs = this.shadowRoot.querySelector("input");
                // this._logicData(this);
				this.dropdownContent = this.shadowRoot.querySelector('#dropdown-menu-btns');
				this.dataListaContent = this.shadowRoot.querySelector('#data-lista-content');
				
				this._containerFavoritosYListaHandler('favoritos', 'cerrar');
				this._containerFavoritosYListaHandler('notas', 'cerrar');

				this.shadowRoot.querySelector('#btn-select-tipo-lista').addEventListener('click', this._btnDropdownHandler.bind(this));
				this.shadowRoot.querySelector('#btn-ver-lista-favoritos').addEventListener('click', this._btnListaFavoritosHandler.bind(this));
				this.shadowRoot.querySelector('#btn-ver-lista-notas').addEventListener('click', this._btnListaNotasHandler.bind(this));
				this.shadowRoot.querySelector('#btn-close').addEventListener('click', this._closeLista.bind(this));
				this.shadowRoot.querySelector('#btn-close-b').addEventListener('click', this._closeLista.bind(this));


				// console.log(this.shadowRoot.querySelector('#btn-select-tipo-lista'));
				// this.shadowRoot.querySelector("#btnCerrarIndice").addEventListener("click",this._attachEventHandlers.bind(this));
                // this.shadowRoot.querySelector("#btnTacha").addEventListener("click",this._attachEventHandlers.bind(this));
                
                
                // this.shadowRoot.querySelector("input").addEventListener('blur', this._saveData.bind(this));
                this.updateStyle(this);
            }
        };
        xmlhttp.open("GET","components/list_notasyfavoritosLbs/list_notasyfavoritosLbs.html", true);
        xmlhttp.send();
    }


	updateStyle(elem) {
		const shadow = elem.shadowRoot;
		const linkBootstrapCss = document.createElement("link");
		linkBootstrapCss.setAttribute("rel", "stylesheet");
		linkBootstrapCss.setAttribute("href", "assets/bootstrap.min.css");

		const linkCompontCss = document.createElement("link");
		linkCompontCss.setAttribute("rel", "stylesheet");
		linkCompontCss.setAttribute("href", "components/list_notasyfavoritosLbs/list_notasyfavoritosLbs.css");
		// Attach the created element to the shadow DOM
		shadow.insertBefore(linkBootstrapCss, shadow.firstChild);
		shadow.insertBefore(linkCompontCss, shadow.firstChild);
	}

	
	/**
	 * Dropdown handlers
	 */
	_btnDropdownHandler() {
		const styles = window.getComputedStyle(this.dropdownContent);
		const isHidden = styles.getPropertyValue('display') === 'none';

		this.dropdownContent.style.display = isHidden ? 'unset' : 'none';
	}

	_btnListaFavoritosHandler() {
		// this.dataListaContent.empty();
		this._btnDropdownHandler();
		this._containerFavoritosYListaHandler('favoritos', 'abrir');
		this._containerFavoritosYListaHandler('notas', 'cerrar');
		const favoritosListaTemp = Visor.store.getState().bookReducer.filter(a => a.elemento.includes('lista'));
       
		this.shadowRoot.querySelector('.modal-body').classList.add('entrance-down');
		// this.classList.add('entrance-down');

		var favoritos;
		if(favoritosListaTemp.length > 0) {
			favoritos = favoritosListaTemp[0].data.sort((a, b) => a - b);
		}

		var bookmarkPanel = this.shadowRoot.querySelector('#outlinePanel');
		bookmarkPanel.innerHTML = '';
		
		var makeThumbnailClickHandler = (pg) => {
            return function() {
                IDRViewer.goToPage(pg);
				this._closeLista();
				this._containerFavoritosYListaHandler('favoritos', 'cerrar');
				bookmarkPanel.innerHTML = ' ';
                return false;
            };
        }

        
        favoritos.forEach(function(Pagina) {
			var numPagEle = document.createElement("p");
			numPagEle.className = "numero-pagina text-monospace";
			numPagEle.style.marginBottom = '0';
			numPagEle.style.textAlign = "center";
			numPagEle.innerHTML = `<span class="badge badge-light" style="border-radius: 10px;">Pagina ${Pagina}</span>`;
			bookmarkPanel.appendChild(numPagEle);

            var ele = document.createElement("a");
            ele.className = "thumbnail";
            ele.href = "?page=" +  Pagina;
            ele.id = "thumb" +  Pagina;
            ele.onclick = makeThumbnailClickHandler(Pagina);
            ele.setAttribute('title', 'Page ' + Pagina);
            ele.innerHTML = '<img src="thumbnails/'+ Pagina+'.png"/>';
            bookmarkPanel.appendChild(ele);
        });


		setTimeout(() => {
			this.shadowRoot.querySelector('.modal-body').classList.remove('entrance-down');
			// this.classList.remove('entrance-down');
		}, 1000);
	}

	_btnListaNotasHandler() {
		this._btnDropdownHandler();
		this._containerFavoritosYListaHandler('notas', 'abrir');
		this._containerFavoritosYListaHandler('favoritos', 'cerrar');
		const notas = this.Visor.store.getState().bookReducer.filter(elemento => elemento.elemento.includes('nota')).sort((a, b) => a.pagina - b.pagina);; 
		console.log(notas);
		this.shadowRoot.querySelector('.modal-body').classList.add('entrance-down');

		const notasLista = notas.reduce((result, item) => {
			const key = item.pagina;
			if (!result[key]) {
				result[key] = [];
			}
			result[key].push(item);
			return result;
		}, {});

		const notasHtml = `<div class="container">
		${Object.entries(notasLista).map(([key, value]) => this._renderNotaPage(key, value)).join('')}
		</div>`;
		
		setTimeout(() => { 
			this.dataListaContent.innerHTML = notasHtml;
			this.shadowRoot.querySelectorAll('.ctn-nota').forEach(element => {
				element.addEventListener('click', this._irANotaHandler.bind(this));
			}); 
		}, 100);

		setTimeout(() => {
			this.shadowRoot.querySelector('.modal-body').classList.remove('entrance-down');
			// this.classList.remove('entrance-down');
		}, 1000);
	}


	_irANotaHandler(evt) {
		const pagina = evt.target.getAttribute('pagina');
		const idNota = evt.target.getAttribute('nota-id');
		
		IDRViewer.goToPage(pagina);

		setTimeout(() => {
			document.getElementById(idNota).scrollIntoView({ block: 'center',  behavior: 'smooth' });

			setTimeout(() => {

				document.getElementById(idNota).classList.add('focused');	
				var eventTouchStart = new Event('touchstart');
				
				document.getElementById(idNota).dispatchEvent(eventTouchStart);
				
				this._closeLista();
			}, 100);
		}, 100);

	
		
	}

	 _renderNotaItem(item) {
		return `
		  <div pagina="${item.pagina}" nota-id="${item.elemento}" class="ctn-nota my-2 d-flex flex-grow-1 animacion-200ms" style="background-color: #f7f7f7; border-radius: 5px; padding: 10px;">
			<img class="avatar rounded-circle float-start margin-right-5rem" src="./assets/user-img.png" alt="avatar">
			<div class="nota-user">
			  <div class="mb-2 d-sm-flex d-flex">
				<h6 class="margin-right-5rem">${item.userCreate}</h6>
				<span class="me-3 small">June 11, 2022, ejemplo</span>
			  </div>
			  <p>${item.data}</p>
			</div>
		  </div>
		`;
	  }

	_renderNotaPage(key, value) {
		return `<div class="row" style="flex-direction: column; ">
			<p class="text-monospace" style="margin: auto;"><span class="badge badge-pill badge-light" style="border-radius: 3px;">Pagina ${key}</span></p>
			${value.map(this._renderNotaItem).join('')}
		</div>`;
	}

	_closeLista() {
		this._containerFavoritosYListaHandler('notas', 'cerrar');
		this._containerFavoritosYListaHandler('favoritos', 'cerrar');
		this.style.display = 'none';
	}
	
	_containerFavoritosYListaHandler(container, accion) {
		const { shadowRoot } = this;
		switch (container) {
			case 'notas': {
				const listaContent = shadowRoot.querySelector('#data-lista-content');
				switch (accion) {
				case 'abrir': {
					listaContent.style.display = '';
					break;
				}
				case 'cerrar': {
					listaContent.style.display = 'none';
					listaContent.innerHTML = '';
					break;
				}
				}
				break;
			}
			case 'favoritos': {
				const outlinePanel = shadowRoot.querySelector('#outlinePanel');
				switch (accion) {
				case 'abrir': {
					outlinePanel.style.display = '';
					break;
				}
				case 'cerrar': {
					outlinePanel.style.display = 'none';
					outlinePanel.innerHTML = '';
					break;
				}
				}
				break;
			}
		}
	}
   
	connectedCallback() {      
        this.getData();
    }

    disconnectedCallback() {
        //this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
        //this.shadowRoot.querySelector("#btnFabButton").removeEventListener('click', this._showModal);
        // this.shadowRoot.querySelector("input").removeEventListener('blur', this._saveData);
        this._unsubscribe();
    }
}

customElements.define('list-notas-y-favoritos', List_notasyfavoritosLbs);