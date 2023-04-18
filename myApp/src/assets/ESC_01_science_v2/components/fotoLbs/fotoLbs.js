//import htmlDOC from './player.html'
class fotoLbs extends componentBase {

    constructor() {
        super();
    }

    async getData() {
        var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
          if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            txt = xmlhttp.responseText;
            this.shadowRoot.innerHTML = txt;
            this._itemLbs = this.shadowRoot.querySelector("span");

            this.shadowRoot.querySelectorAll('span[aria-hidden="true"]').forEach(occurence => {
                occurence.addEventListener('touchstart', (e) => {
                    if(e.target.className == "fa fa-camera"){
                        console.log(e.target.className);
                        console.log("camera clicked");
                        this._TomarFoto(this.shadowRoot.getElementById(this._idImg));

                    }
                    else if(e.target.className == "fa fa-trash"){
                        console.log(e.target.className);
                        console.log("trash clicked");
                        this._EliminarFoto(this.shadowRoot.getElementById(this._idImg));
                    }
                    
                });
            });
            this.updateStyle(this);
          }
        };
        xmlhttp.open("GET","components/fotoLbs/fotoLbs.html",true);
        xmlhttp.send();
    }

    updateStyle(elem) {
        const shadow = elem.shadowRoot;

        // shadow.querySelector("style").textContent = `
        //     div {
        //         position: absolute;
        //         z-index: 3;
        //         font-size: 87px;
        //         width: 563px;
        //         height: 390px;
        //     }

        //     div.span {
        //         position: absolute;
        //         bottom: 8px;
        //         color: #ffffff;
        //         font-size: 42px;
        //     }

        //     div.img {
        //         width:100%;
        //         height:100%;
        //         background:black;
        //         object-fit:cover;
        //         object-position:center;
        //         text-indent: -10000px;
        //     }

                
        // `;

        this._id = elem.getAttribute("id");
        this._pagina = elem.getAttribute("pagina");
        this._idImg = elem.getAttribute("id-img");

        var imagen = shadow.querySelector("img");
        imagen.setAttribute("id",this._idImg);
        
        this.observers();
        this.loadData();
    }

    _TomarFoto(img) {
        //Tomar foto
        console.log(img.id);
        console.log("Tomar Foto");
        var message = ["INVALID","ModusEcho","_TomarFoto",[img.id]];
        window.webkit?.messageHandlers.cordova.postMessage(message);
    }

    _EliminarFoto(img) {
        console.log(img.id);
        console.log("Eliminar Foto");
        if(img.src=="")
            return;
        var message = ["INVALID","ModusEcho","_EliminarFoto",[img.id]];
        window.webkit.messageHandlers.cordova.postMessage(message);
    }

    loadData(){
        const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento == this._id);

        if(search != 0) {
            this._itemLbs.value = search[0].data;
        } 
    }

    observers(){
        //console.log("observers txtlbs");
        this._unsubscribe = this.Visor.store.subscribe(()=>{
            
            const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento == this._id);

            if(search != 0) {
                this._itemLbs.value = search[0].data;
            }

        });
    }

    connectedCallback() {
        this.getData();
    }
    disconnectedCallback() {
        //this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
        //this.shadowRoot.querySelector("#btnFabButton").removeEventListener('click', this._showModal);
        this.shadowRoot.querySelector("span").removeEventListener('touchstart', this._saveData);
        this._unsubscribe();
    }
}

customElements.define('foto-lbs',fotoLbs);