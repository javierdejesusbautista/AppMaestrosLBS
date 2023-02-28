class componentBase extends HTMLElement { 

	constructor(){
		super();
		this._itemLbs;
		this._id = 0;
        this._value = "";
        this._pagina = 0;
        this._unsubscribe = undefined;
        this.attachShadow({ mode: 'open' });
        //const url = (window.location != window.parent.location) ? document.referrer : document.location.href;
        //console.log("url:",url);
        this._isAndroid = window.location.protocol == "file:" ? true : false;
        this.Visor = this._isAndroid ? parent.Visor :  Visor;
	}


	_saveData() {
		console.log("_saveData");
        const { usuario } = this.Visor.tokenUser;
        const idLibro     = this.Visor.idLibro;
        const claveLibro  = this._isAndroid ? parent.IDRViewer.config.fileName.replace(".pdf",'') : IDRViewer.config.fileName.replace(".pdf",'');

        const widgetData = {
            data: this._itemLbs.value, 
            ejercicio : "0",
            elemento: this._id,
            estado : 2,
            libroid : idLibro,
            pagina : this._pagina
        }
		console.log(widgetData);
        this.Visor.saveDataFireStore({...widgetData});
        
        /*this.Visor.dbFirestore.doc(`${usuario}/libros`)
                         .collection(claveLibro)
                         .doc(this._id)
                         .set(widgetData)
		.then(()=> console.log)
        .catch(error => console.error("Error adding document: ", error));*/
    }
}