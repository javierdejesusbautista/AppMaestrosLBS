"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2242],{2242:(m,c,n)=>{n.r(c),n.d(c,{EstadisticasPageModule:()=>h});var d=n(6895),r=n(603),s=n(5892),o=n(4650);let l=(()=>{class t{constructor(e){this.router=e}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(s.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["card-usuarios"]],decls:44,vars:0,consts:[[2,"display","flex","height","100%"],[1,"col-1-card-usuarios"],[2,"width","100%"],[2,"display","flex","height","30%","justify-content","space-between"],[1,"title-card-usuarios"],[2,"margin-top","23px","margin-right","17px"],[1,"label-input-select"],["type","text","placeholder","Desde - Hasta",1,"input-select"],["size","12",2,"width","100%","height","70%"],[2,"width","100%","height","100%","padding-left","33px","padding-bottom","45px","border","1px solid blue"],[1,"col-2-card-usuarios"],["size","12",2,"display","flex","flex-direction","column","align-items","center"],[1,"label-input-select",2,"margin-top","23px"],["type","text","placeholder","Alumno",1,"input-select",2,"margin-bottom","17px"],[1,"tabla-usuarios"],[1,"texto-tabla"],[1,"numeros-usuarios"],[1,"numeros-usuarios-anterior"],[1,"ver-mas-boton"]],template:function(e,i){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"ion-row",2)(3,"ion-col",3)(4,"div",4)(5,"p"),o._uU(6,"Usuarios Activos."),o._UZ(7,"br"),o._uU(8,"Tipo: "),o.TgZ(9,"span"),o._uU(10,"Alumno."),o.qZA()()(),o.TgZ(11,"div",5)(12,"p",6),o._uU(13,"Periodo."),o.qZA(),o._UZ(14,"input",7),o.qZA()(),o.TgZ(15,"ion-col",8)(16,"div",9),o._uU(17," grafica "),o.qZA()()()(),o.TgZ(18,"div",10)(19,"ion-row")(20,"ion-col",11)(21,"div")(22,"p",12),o._uU(23," Tipo de usuario. "),o.qZA(),o._UZ(24,"input",13),o.qZA()(),o.TgZ(25,"ion-col",11)(26,"div",14)(27,"p",15)(28,"span",16),o._uU(29,"3,500"),o.qZA(),o._UZ(30,"br"),o._uU(31,"Usuarios activos."),o._UZ(32,"br"),o.qZA(),o._UZ(33,"hr"),o.TgZ(34,"p",15)(35,"span",17),o._uU(36,"3,311"),o.qZA(),o._UZ(37,"br"),o._uU(38,"Usuarios activos"),o._UZ(39,"br"),o._uU(40,"periodo anterior."),o.qZA()()(),o.TgZ(41,"ion-col",11)(42,"button",18),o._uU(43,"Ver m\xe1s"),o.qZA()()()()())},dependencies:[r.wI,r.Nd],styles:[".col-1-card-usuarios[_ngcontent-%COMP%]{display:flex;width:70%;height:100%}.col-1-card-usuarios[_ngcontent-%COMP%]   .title-card-usuarios[_ngcontent-%COMP%]{width:296px;height:66px;margin-left:30px;margin-top:30px}.col-1-card-usuarios[_ngcontent-%COMP%]   .title-card-usuarios[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#03c1ea;font-size:20px;font-family:Volte-bold;font-weight:700;word-wrap:break-word}.col-1-card-usuarios[_ngcontent-%COMP%]   .title-card-usuarios[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#525252;font-size:20px;font-family:Volte-bold;font-style:italic;font-weight:700;word-wrap:break-word}.col-2-card-usuarios[_ngcontent-%COMP%]{width:30%;height:100%}.input-select[_ngcontent-%COMP%]{background:rgba(255,255,255,0);border-radius:11.93px;border:1px #606060 solid;width:162px;height:24px}.label-input-select[_ngcontent-%COMP%]{color:#606060;font-size:11px;font-family:Volte-bold;font-weight:700;word-wrap:break-word;margin-left:15px;margin-bottom:4px}.label-input-select[_ngcontent-%COMP%]::placeholder{color:#606060;font-size:11px;font-family:Volte-Regular;font-weight:400;word-wrap:break-word;padding-left:10px}.tabla-usuarios[_ngcontent-%COMP%]{background:#e6e6e6;border-radius:8px;width:200px;height:247px;padding-right:39px;padding-left:26px;display:flex;flex-direction:column;justify-content:center;align-items:center}.texto-tabla[_ngcontent-%COMP%]{color:#606060;font-size:10px;font-family:Volte-Regular;font-weight:500;word-wrap:break-word}.numeros-usuarios[_ngcontent-%COMP%]{color:#03c1ea;font-size:36px;font-family:Volte-Regular;font-weight:700;word-wrap:break-word}.numeros-usuarios-anterior[_ngcontent-%COMP%]{color:#606060;font-size:36px;font-family:Volte-Regular;font-weight:700;word-wrap:break-word}.ver-mas-boton[_ngcontent-%COMP%]{background:#03c1ea;font-family:Volte-Semibold;border-radius:77px;color:#fff;width:129px;height:29px;margin-top:5px;transition:background-color .3s ease}.ver-mas-boton[_ngcontent-%COMP%]:active{background-color:#199fbe;transform:scale(.95)}.ver-mas-boton[_ngcontent-%COMP%]:focus{background-color:#199fbe}"]}),t})();var p=n(2468);let g=(()=>{class t{constructor(e,i){this.router=e,this.dataService=i,this.items=[1,2,3,4],this.pocentaje0a39="#FF6464",this.pocentaje40a69="#FFD464",this.pocentaje70a100="#00DE80",this.librosDescargadosSelect={cssClass:"librosDescargados-select",animated:!0,mode:"ios",dismissOnSelect:!1,side:"bottom",alignment:"center",arrow:!1,size:"cover"}}ngOnInit(){const e=document.getElementById("LibrosDescargados");new Chart(e,{type:"doughnut",data:{labels:["Descargados","No descargados"],datasets:[{data:[76,23],backgroundColor:["#00DE80","transparent"]}]},options:{cutout:"70%",plugins:{legend:{display:!1},tooltip:{enabled:!0}}}})}navigateTo(){this.dataService.rutaActual("/home/estadisticas/libros-descargados"),this.router.navigate(["/home/estadisticas/libros-descargados"])}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(s.F0),o.Y36(p.D))},t.\u0275cmp=o.Xpm({type:t,selectors:[["card-libros-descargados"]],decls:47,vars:2,consts:[[2,"width","100%","height","25%","display","flex","justify-content","space-between"],[1,"title-card"],["interface","popover","placeholder","Todos",1,"input-select",3,"multiple","interfaceOptions"],["value","Mazatlan"],["value","Culiacan"],["value","San Luis Potosi"],["value","Zacatecas"],["value","Durango"],["value","Torreon"],[2,"width","100%","height","60%","display","flex","justify-content","center","align-items","center"],[1,"no-descargados"],[1,"numero-no-descargado"],[1,"espacio"],[1,"porcentaje-no-descargado"],["id","LibrosDescargados"],[1,"texto-centrado"],[1,"texto-libros"],[1,"numero-centrado"],[1,"descargados"],[1,"numero-descargado"],[1,"porcentaje-descargado"],[2,"width","100%","height","15%"],[1,"ver-mas-boton",3,"click"]],template:function(e,i){1&e&&(o.TgZ(0,"div",0)(1,"p",1),o._uU(2,"Libros descargados."),o.qZA(),o.TgZ(3,"ion-select",2)(4,"ion-select-option",3),o._uU(5,"Mazatl\xe1n"),o.qZA(),o.TgZ(6,"ion-select-option",4),o._uU(7,"Culiac\xe1n"),o.qZA(),o.TgZ(8,"ion-select-option",5),o._uU(9,"San Luis Potosi"),o.qZA(),o.TgZ(10,"ion-select-option",6),o._uU(11,"Zacatecas"),o.qZA(),o.TgZ(12,"ion-select-option",7),o._uU(13,"Durango"),o.qZA(),o.TgZ(14,"ion-select-option",8),o._uU(15,"Torre\xf3n"),o.qZA()()(),o.TgZ(16,"div",9)(17,"p",10)(18,"span",11),o._uU(19,"334"),o.qZA(),o._UZ(20,"br"),o._uU(21,"No descargados"),o._UZ(22,"span",12)(23,"br")(24,"hr"),o.TgZ(25,"span",13),o._uU(26,"23%"),o.qZA()(),o._UZ(27,"canvas",14),o.TgZ(28,"div",15)(29,"p",16)(30,"span",17),o._uU(31,"1,389"),o.qZA(),o._uU(32,"Libros asignados"),o.qZA()(),o.TgZ(33,"p",18)(34,"span",19),o._UZ(35,"span",12),o._uU(36,"1,055"),o.qZA(),o._UZ(37,"br")(38,"span",12),o._uU(39,"Descargados"),o._UZ(40,"br")(41,"hr"),o.TgZ(42,"span",20),o._uU(43,"76%"),o.qZA()()(),o.TgZ(44,"div",21)(45,"button",22),o.NdJ("click",function(){return i.navigateTo()}),o._uU(46,"Ver m\xe1s"),o.qZA()()),2&e&&(o.xp6(3),o.Q6J("multiple",!0)("interfaceOptions",i.librosDescargadosSelect))},dependencies:[r.t9,r.n0,r.QI],styles:[".row[_ngcontent-%COMP%]{width:100%;height:100%}.title-card[_ngcontent-%COMP%]{color:#03c1ea;font-size:20px;font-family:Volte-bold;font-weight:700;word-wrap:break-word;margin-left:30px;margin-top:30px}.input-select[_ngcontent-%COMP%]{background:rgba(255,255,255,0);border-radius:11.93px;border:1px #606060 solid;width:217px;height:24px;margin-top:30px;margin-right:23px;padding-left:12px;color:#606060;font-size:11px;font-family:Volte-Regular;font-weight:400;word-wrap:break-word;--placeholder-opacity: 1}.ver-mas-boton[_ngcontent-%COMP%]{background:#03c1ea;font-family:Volte-Semibold;border-radius:77px;color:#fff;width:129px;height:29px;margin-bottom:30px;margin-left:30px;transition:background-color .3s ease}.ver-mas-boton[_ngcontent-%COMP%]:active{background-color:#199fbe;transform:scale(.95)}.ver-mas-boton[_ngcontent-%COMP%]:focus{background-color:#199fbe}.no-descargados[_ngcontent-%COMP%]{color:#606060;font-size:14px;font-family:Volte-Semibold;font-weight:700;word-wrap:break-word}.numero-no-descargado[_ngcontent-%COMP%]{color:#606060;font-size:14px;font-family:Volte-bold;font-weight:700;word-wrap:break-word}.porcentaje-no-descargado[_ngcontent-%COMP%]{color:#606060;font-size:20px;font-family:Volte-bold;font-weight:700;word-wrap:break-word}.descargados[_ngcontent-%COMP%]{color:#03c1ea;font-size:14px;font-family:Volte-Semibold;font-weight:700;word-wrap:break-word;text-align:right}.numero-descargado[_ngcontent-%COMP%]{color:#03c1ea;font-size:14px;font-family:Volte-bold;font-weight:700;word-wrap:break-word}.porcentaje-descargado[_ngcontent-%COMP%]{color:#606060;font-size:20px;font-family:Volte-bold;font-weight:700;word-wrap:break-word;display:flex;justify-content:right}.espacio[_ngcontent-%COMP%]{padding-right:15px;padding-left:15px}.texto-centrado[_ngcontent-%COMP%]{position:absolute;margin-left:18px}.numero-centrado[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-bottom:0;color:#606060;font-size:20px;font-family:Volte-bold;font-weight:700;word-wrap:break-word}.texto-libros[_ngcontent-%COMP%]{color:#606060;font-size:10px;font-family:Volte-Regular;font-weight:400;word-wrap:break-word}.option-select[_ngcontent-%COMP%]{background-color:#606060;border-top-left-radius:13px;border-top-right-radius:13px}"]}),t})();const u=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-page-estadisticas"]],decls:10,vars:0,consts:[[2,"width","100%","height","100%","padding","20px"],["size","12"],[1,"row-1"],[1,"card-usuarios-activos"],[1,"card-top-10"],[1,"row-2"],[1,"card-libros-descargados"],[1,"card-porcentaje"]],template:function(e,i){1&e&&(o.TgZ(0,"ion-row",0)(1,"ion-col",1)(2,"div",2)(3,"div",3),o._UZ(4,"card-usuarios"),o.qZA(),o._UZ(5,"div",4),o.qZA(),o.TgZ(6,"div",5)(7,"div",6),o._UZ(8,"card-libros-descargados"),o.qZA(),o._UZ(9,"div",7),o.qZA()()())},dependencies:[r.wI,r.Nd,l,g],styles:[".row-1[_ngcontent-%COMP%]{display:flex;padding-bottom:30px}.row-2[_ngcontent-%COMP%]{display:flex}.card-usuarios-activos[_ngcontent-%COMP%]{display:flex;width:75%;height:412px;margin-right:29px;background:#f5f5f5;border-radius:25px;box-shadow:8px 8px 15px rgba(0,0,0,.15)}.card-top-10[_ngcontent-%COMP%]{width:25%;height:412px;background:#f5f5f5;border-radius:25px;box-shadow:8px 8px 15px rgba(0,0,0,.15)}.card-libros-descargados[_ngcontent-%COMP%]{width:50%;height:337px;margin-right:27px;background:#f5f5f5;border-radius:25px;box-shadow:8px 8px 15px rgba(0,0,0,.15)}.card-porcentaje[_ngcontent-%COMP%]{width:50%;height:337px;background:#f5f5f5;border-radius:25px;box-shadow:8px 8px 15px rgba(0,0,0,.15)}"]}),t})()},{path:"libros-descargados",loadChildren:()=>n.e(8121).then(n.bind(n,8121)).then(t=>t.librosDescargadosModule)}];let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[s.Bz.forChild(u),s.Bz]}),t})();var b=n(433);let h=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[f,d.ez,r.Pc,b.u5]}),t})()}}]);