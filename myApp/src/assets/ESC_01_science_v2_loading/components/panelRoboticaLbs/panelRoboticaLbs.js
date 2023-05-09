class panelRoboticaLbs extends componentBase {

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
            
            this.updateStyle(this);
          }
        };
        xmlhttp.open("GET","components/panelRoboticaLbs/panelRoboticaLbs.html",true);
        xmlhttp.send();
    }

	updateStyle(elem) {
        const shadow = elem.shadowRoot;

		const linkBootstrapCss = document.createElement("link");
		linkBootstrapCss.setAttribute("rel", "stylesheet");
		linkBootstrapCss.setAttribute("href", "assets/bootstrap.min.css");
		
		const linkFontAwesomeCss = document.createElement("link");
		linkBootstrapCss.setAttribute("rel", "stylesheet");
		linkBootstrapCss.setAttribute("href", "assets//font-awesome.min.css");

		const linkCompontCss = document.createElement("link");
		linkCompontCss.setAttribute("rel", "stylesheet");
		linkCompontCss.setAttribute("href", "components/panelRoboticaLbs/panelRoboticaLbs.css");
		// Attach the created element to the shadow DOM
		shadow.insertBefore(linkBootstrapCss, shadow.firstChild);
		shadow.insertBefore(linkCompontCss, shadow.firstChild);

        // this.loadData();
    }

	connectedCallback() {
        this.getData();
    }
    disconnectedCallback() {
        console.log("disconnected panel robotica lbs");
    }
}

customElements.define('panel-robotica-lbs',panelRoboticaLbs);