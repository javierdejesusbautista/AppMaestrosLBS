//import htmlDOC from './player.html'
class audioLbs extends componentBase {

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
            this._itemLbs = this.shadowRoot.querySelector("object");

            var audio = this.getAttribute("audio");
            const esto = this.shadowRoot.querySelector("div");
            // console.log(audio);
            // console.log(this);
            // console.log(esto);
            
            this.shadowRoot.querySelector("div").addEventListener('touchstart', this._playAudio.bind(this,audio,esto));
            
            this.updateStyle(this);

        }
    };
    xmlhttp.open("GET","components/audioLbs/audioLbs.html",true);
    xmlhttp.send();
}

updateStyle(elem) {
    const shadow = elem.shadowRoot;
    
        shadow.querySelector("style").textContent = `
        object {
            position: relative;
            top: 46px;
            z-index: -1;
        }
        
        `;
        

    elem.style.cssText += 'display: inline-table';    
    
    var div = shadow.querySelector("div")
    div.setAttribute("id", this.getAttribute("id"));
    div.setAttribute("class", this.getAttribute("class"));
    div.style.cssText += 'display: table-row';    
    
}

_playAudio(audio, bocina){

    // console.log(audio);
    // console.log(bocina);

    bocina = bocina.querySelector("#playTriangle").contentDocument.getElementById("playTriangle");
    
    var audio = new Audio('assets/audio/'+ audio);
    audio.play();
    /*bocina.style.color = "rgb(42, 255, 42)";
    bocina.style.fontSize= (parseFloat(window.getComputedStyle(bocina).fontSize)+30)+"px";*/
    bocina.setAttribute("fill","rgb(0 222 1)");
    audio.addEventListener('loadedmetadata', function(){
        var fin=window.setInterval(function(){
           /*bocina.style.color = "red";
           bocina.style.fontSize= "inherit";*/
           bocina.setAttribute("fill","rgb(255 76 136)");

        },audio.duration*1000);
    })
};

    connectedCallback() {
        this.getData();

    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("object").removeEventListener('ontouchstart', this);
        this._unsubscribe();
    }
}

customElements.define('audio-lbs',audioLbs);