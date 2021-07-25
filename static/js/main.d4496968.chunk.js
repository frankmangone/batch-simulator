(this["webpackJsonpbatch-simulator"]=this["webpackJsonpbatch-simulator"]||[]).push([[0],{146:function(n,e,o){},153:function(n,e){},155:function(n,e){},165:function(n,e){},167:function(n,e){},194:function(n,e){},195:function(n,e){},200:function(n,e){},202:function(n,e){},209:function(n,e){},228:function(n,e){},251:function(n,e,o){"use strict";o.r(e);var t,r,i=o(0),c=o.n(i),a=o(135),l=o.n(a),s=(o(146),o(38)),d=o(8),u=o(2),b=o(3),p=Object(b.a)(t||(t=Object(u.a)(["\n  :root {\n    --color-primary-darkest: hsl(213,48%,15%);\n    --color-primary-darker: hsl(213,48%,30%);\n    --color-primary-dark: hsl(213,48%,50%);\n    --color-primary-normal: hsl(213,48%,70%);\n    --color-primary-light: hsl(213,48%,85%);\n    --color-primary-lighter: hsl(213,48%,95%);\n\n    --color-triadic-green-darker: hsl(93,40%,30%);\n    --color-triadic-green-dark: hsl(93,40%,45%);\n    --color-triadic-green-normal: hsl(93,40%,70%);\n    --color-triadic-green-light: hsl(93,40%,85%);\n    --color-triadic-green-lighter: hsl(93,40%,95%);\n\n    --color-triadic-red-darker: hsl(333,48%,30%);\n    --color-triadic-red-dark: hsl(333,48%,45%);\n    --color-triadic-red-normal: hsl(333,48%,70%);\n    --color-triadic-red-light: hsl(333,48%,85%);\n    --color-triadic-red-lighter: hsl(333,48%,95%);\n\n    --color-grey-dark: hsl(213, 20%, 30%);\n    --color-grey-normal: hsl(213, 20%, 45%);\n    --color-grey-light: hsl(213, 20%, 70%);\n    --color-grey-lighter: hsl(213, 20%, 85%);\n    --color-grey-lightest: hsl(213, 20%, 95%);\n  }\n  \n  body {\n    margin: 0;\n    margin-top: 30px;\n    background-color: var(--color-grey-lighter);\n    font-family: 'Mulish', sans-serif;\n  }\n\n  a, button {\n    cursor: pointer;\n  }\n\n  a, button, input {\n    transition: all 0.15s ease-in-out;\n  }\n\n  input {\n    background-color: rgba(0, 0, 0, 0.1);\n    border: none;\n    border-radius: 5px;\n    flex-grow: 1;\n    font-family: 'Mulish', sans-serif;\n    min-width: 0;\n    width: 0;\n    margin-left: 1rem;\n    outline: none;\n    padding: 0.5rem 1rem;\n\n    &:hover,\n    &:focus {\n      background-color: rgba(255, 255, 255, 0.2);\n    }\n\n    &:autofill {\n      background-color: rgba(255, 255, 255, 0.2);\n    }\n\n    &:focus {\n      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);\n    }\n  }\n\n  /**\n   * Remove arrows from number inputs\n   */\n  \n  /* Chrome, Safari, Edge, Opera */\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  /* Firefox */\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n\n  @keyframes slide-in {\n    from {\n      opacity: 0;\n      transform: translateY(-20px);\n    }\n\n    to {\n      opacity: 1;\n      transform: translateY(0px);\n    }\n  }\n\n  @keyframes slide-out {\n    from {\n      opacity: 1;\n      transform: translateY(0px);\n    }\n    \n    to {\n      opacity: 0;\n      transform: translateY(-20px);\n    }\n  }\n"]))),m=o(22),j=o(10),f=o(47),g=o.n(f),x=["blue1","pink3","yellow","skyBlue2","red2","green1","skyBlue1","orange","violet1","pink1","lime","waterGreen2","red1","blue2","green2","pink2","waterGreen1","violet2"],h={orange:"hsl(30, 80%, 65%)",yellow:"hsl(50, 80%, 65%)",lime:"hsl(70, 80%, 65%)",green1:"hsl(90, 80%, 65%)",green2:"hsl(110, 80%, 65%)",waterGreen1:"hsl(130, 80%, 65%)",waterGreen2:"hsl(150, 80%, 65%)",skyBlue1:"hsl(170, 80%, 65%)",skyBlue2:"hsl(190, 80%, 65%)",blue1:"hsl(210, 80%, 65%)",blue2:"hsl(230, 80%, 65%)",violet1:"hsl(250, 80%, 65%)",violet2:"hsl(270, 80%, 65%)",pink1:"hsl(290, 80%, 65%)",pink2:"hsl(310, 80%, 65%)",pink3:"hsl(330, 80%, 65%)",red1:"hsl(350, 80%, 65%)",red2:"hsl(10, 80%, 65%)"},O=["A","B","D","E","F","G","H","I","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"],v=o(1);!function(n){n[n.Reactant=0]="Reactant",n[n.Product=1]="Product"}(r||(r={}));var y,k,C,w,R,S,I,z,T,E,F,M,D,B,N,J,P,V,Y,L,A,G,U,q,H,K,Q,W,X,Z,$,_,nn,en,on,tn,rn,cn={compounds:[],addCompound:function(){},editCompound:function(){},updateCompound:function(){},removeCompound:function(){},editedCompoundId:void 0,reactions:[],addReaction:function(){},editReaction:function(){},updateReaction:function(){},removeReaction:function(){},editedReactionId:void 0},an=Object(i.createContext)(cn),ln=function(){return Object(i.useContext)(an)},sn=function(n){var e=n.children,o=Object(i.useState)(0),t=Object(j.a)(o,2),r=t[0],c=t[1],a=Object(i.useState)([]),l=Object(j.a)(a,2),s=l[0],d=l[1],u=Object(i.useState)([]),b=Object(j.a)(u,2),p=b[0],f=b[1],h=Object(i.useState)(void 0),y=Object(j.a)(h,2),k=y[0],C=y[1],w=Object(i.useState)(void 0),R=Object(j.a)(w,2),S=R[0],I=R[1],z=function(){var n=new Array(O.length).fill(!1);s.forEach((function(e){var o=O.indexOf(e.symbol);-1!==o&&(n[o]=!0)}));for(var e=0;e<n.length;e++)if(!n[e])return O[e];return""};return Object(v.jsx)(an.Provider,{value:{compounds:s,addCompound:function(){var n=Object(m.a)(s);n.push({id:g.a.generate(8),color:x[r],concentration:0,symbol:z(),name:""}),c(r!==x.length-1?r+1:0),d(n)},editCompound:function(n){if("undefined"!==typeof n){var e=s[n].id;C(e)}else C(void 0)},updateCompound:function(n,e){var o=Object(m.a)(s);o[n]=e,d(o)},removeCompound:function(n){var e=s[n].id,o=JSON.parse(JSON.stringify(p));o.forEach((function(n){n.reactants=n.reactants.filter((function(n){return n.compoundId!==e})),n.products=n.products.filter((function(n){return n.compoundId!==e}))})),f(o),d([].concat(Object(m.a)(s.slice(0,n)),Object(m.a)(s.slice(n+1,s.length))))},editedCompoundId:k,reactions:p,addReaction:function(){var n=Object(m.a)(p);n.push({id:g.a.generate(8),reactants:[],products:[],kineticModel:0,kineticConstants:{}}),f(n)},editReaction:function(n){if("undefined"!==typeof n){var e=p[n].id;I(e)}else I(void 0)},updateReaction:function(n,e){var o=JSON.parse(JSON.stringify(p));o[n]=e,f(o)},removeReaction:function(n){f([].concat(Object(m.a)(p.slice(0,n)),Object(m.a)(p.slice(n+1,p.length))))},editedReactionId:S},children:e})},dn=o(6),un=b.b.div(y||(y=Object(u.a)(["\n  position: relative;\n  background-color: var(--color-grey-normal);\n  border-radius: 5px;\n  height: 220px;\n  margin-bottom: 40px;\n"]))),bn=b.b.div(k||(k=Object(u.a)(["\n  position: absolute;\n  top: 10px;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n\n  background-color: var(--color-grey-lighter);\n  border-radius: 2px;\n  overflow: hidden;\n"]))),pn=b.b.div(C||(C=Object(u.a)(["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  transition: background-color 0.2s ease-in-out;\n\n  background-color: var(--color-grey-lightest);\n  height: 70%;\n  width: 100%;\n"]))),mn=function(){return Object(v.jsx)(un,{children:Object(v.jsx)(bn,{children:Object(v.jsx)(pn,{id:"liquid"})})})},jn=function(n){var e=n.children;return Object(v.jsxs)(fn,{children:[Object(v.jsxs)(gn,{children:[Object(v.jsx)(mn,{}),Object(v.jsxs)("nav",{children:[Object(v.jsxs)(s.b,{to:"/compounds",children:[Object(v.jsx)("p",{children:"Compounds"}),Object(v.jsx)(dn.c,{})]}),Object(v.jsxs)(s.b,{to:"/reactions",children:[Object(v.jsx)("p",{children:"Reactions"}),Object(v.jsx)(dn.c,{})]}),Object(v.jsxs)(s.b,{to:"/results",children:[Object(v.jsx)("p",{children:"Results"}),Object(v.jsx)(dn.c,{})]})]})]}),Object(v.jsx)(xn,{children:e})]})},fn=b.b.div(w||(w=Object(u.a)(["\n  display: flex;\n  justify-content: center;\n  margin-left: 20px;\n  margin-right: 20px;\n"]))),gn=b.b.div(R||(R=Object(u.a)(["\n  flex-basis: 180px;\n  flex-shrink: 0;\n  margin-right: 20px;\n\n  nav {\n    display: flex;\n    flex-direction: column;\n\n    a {\n      align-items: center;\n      background-color: var(--color-grey-light);\n      border-radius: 5px;\n      color: var(--color-grey-lightest);\n      display: flex;\n      font-size: 1.2rem;\n      justify-content: space-between;\n      margin-bottom: 10px;\n      padding: 5px 10px;\n      text-decoration: none;\n\n      &:hover {\n        background-color: var(--color-grey-dark);\n      }\n\n      p {\n        margin: 0;\n      }\n    }\n  }\n"]))),xn=b.b.div(S||(S=Object(u.a)(["\n  background: var(--color-grey-light);\n  border-radius: 5px;\n  flex-basis: 750px;\n  min-height: 600px;\n  padding: 20px;\n  position: relative;\n"]))),hn=b.b.button(I||(I=Object(u.a)(["\n  align-items: center;\n  border-radius: 5px;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  font-size: 1.1rem;\n  justify-content: space-between;\n  padding: 5px 10px;\n  text-decoration: none;\n\n  ","\n\n  &:hover {\n    ","\n  }\n"])),(function(n){return On(n.color)}),(function(n){return vn(n.color)})),On=function(n){switch(n){case"green":return"\n        background-color: var(--color-triadic-green-normal);\n        color: var(--color-grey-lightest);\n      ";default:return"\n        background-color: var(--color-primary-dark);\n        color: var(--color-grey-lightest);\n      "}},vn=function(n){switch(n){case"green":return"\n        background-color: var(--color-triadic-green-dark);\n      ";default:return"\n        background-color: var(--color-primary-darker);\n      "}},yn=b.b.h2(z||(z=Object(u.a)(["\n  color: var(--color-grey-lightest);\n  font-size: 20px;\n  margin-top: 0;\n"]))),kn=o(15),Cn=b.b.button(T||(T=Object(u.a)(["\n  align-items: center;\n  align-self: stretch;\n  background-color: unset;\n  border: none;\n  border-radius: 5px;\n  color: var(--color-grey-dark);\n  cursor: pointer;\n  display: flex;\n  opacity: 0;\n  font-size: 1.5em;\n  margin-left: 0.2rem;\n  padding: 0.5rem;\n  transition: all 0.15s ease-in-out;\n  z-index: 2;\n\n  &:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n"]))),wn=function(n){return""!==n&&("number"===typeof n||!!n)},Rn=function(n){var e=n.compound,o=n.editCompound,t=n.updateCompound,r=n.removeCompound,c=n.validateUnicity,a=Object(i.useState)(e.symbol),l=Object(j.a)(a,2),s=l[0],d=l[1],u=Object(i.useRef)();Object(i.useEffect)((function(){u.current=document.getElementById("liquid")||void 0}),[]),Object(i.useEffect)((function(){d(e.symbol)}),[e]);return Object(v.jsx)(Sn,{children:Object(v.jsxs)(In,{onMouseEnter:function(){u.current.style.backgroundColor=h[e.color]},onMouseLeave:function(){u.current.style.backgroundColor="hsl(213, 20%, 95%)"},children:[Object(v.jsx)(Tn,{value:s,onBlur:function(){if(wn(s)&&c("symbol",s)){var n=Object(kn.a)({},e);n.symbol=s,t(n)}else d(e.symbol)},onChange:function(n){d(n.target.value)}}),Object(v.jsx)(Cn,{onClick:o,children:Object(v.jsx)(dn.d,{})}),Object(v.jsx)(Cn,{onClick:r,children:Object(v.jsx)(dn.f,{})}),Object(v.jsx)(zn,{className:"bullet",color:e.color})]})})},Sn=b.b.li(E||(E=Object(u.a)(["\n  flex-basis: 33%;\n"]))),In=b.b.div(F||(F=Object(u.a)(["\n  margin: 5px;\n  padding: 20px;\n  position: relative;\n\n  align-items: center;\n  animation-name: slide-in;\n  animation-timing-function: ease-in-out;\n  animation-duration: 0.25s;\n  animation-iteration-count: 1;\n  background-color: var(--color-grey-lighter);\n  border-radius: 5px;\n  display: flex;\n  color: var(--color-grey-lightest);\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.15s ease-in-out;\n\n  &:hover {\n    & {\n      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n      transform: translateY(-2px);\n    }\n\n    & > button {\n      opacity: 1;\n    }\n\n    & > .bullet {\n      transform: scale(25);\n      border-color: var(--color-grey-lighter);\n    }\n    & > .symbol-input:after {\n      margin-left: 0%;\n      width: auto;\n    }\n  }\n\n  button {\n    padding: 0.8rem;\n  }\n"]))),zn=b.b.div(M||(M=Object(u.a)(["\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: 10px;\n  right: 10px;\n  border-radius: 50%;\n  transition: all 0.2s ease-in-out;\n  z-index: 1;\n\n  background-color: ",";\n  border: 1px solid var(--color-grey-light);\n"])),(function(n){return h[n.color]})),Tn=b.b.input(D||(D=Object(u.a)(["\n  font-size: 2rem;\n  margin-left: 0;\n  margin-right: 0.5rem;\n  z-index: 2;\n"]))),En=o(141),Fn=b.b.div(B||(B=Object(u.a)(["\n  position: absolute;\n  bottom: 0rem;\n  right: 0rem;\n\n  background-color: var(--color-triadic-red-dark);\n  border-radius: 5px;\n  box-shadow: 0px 0px 4px var(--color-triadic-red-darker);\n  color: white;\n  padding: 0.5rem;\n  pointer-events: none;\n  opacity: 0;\n  transform: translateY(105%);\n  z-index: 4;\n"]))),Mn=function(n){var e=n.children;return Object(v.jsx)(Fn,{className:"error",children:e})},Dn=b.b.input(N||(N=Object(u.a)(["\n  ","\n"])),(function(n){return n.errors?"\n    box-shadow: 0px 0px 4px 1px var(--color-triadic-red-dark),\n      inset 0px 0px 0px 1px var(--color-triadic-red-dark) !important;\n  ":""})),Bn=function(n){var e=n.children,o=n.closing,t=n.setClosing,r=n.handleClose,c=function(){t(!0),setTimeout((function(){r()}),250)};return Object(i.useEffect)((function(){o&&c()}),[o]),Object(v.jsx)(Nn,{closing:o,children:Object(v.jsxs)(Jn,{closing:o,children:[Object(v.jsx)(Pn,{onClick:c,closing:o,children:Object(v.jsx)(dn.g,{})}),e]})})},Nn=b.b.div(J||(J=Object(u.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  min-height: 100%;\n  background-color: var(--color-grey-light);\n\n  animation-name: dim-in;\n  animation-timing-function: ease-in-out;\n  animation-duration: 0.25s;\n  animation-iteration-count: 1;\n  border-radius: 5px;\n  display: flex;\n\n  /* Override animation upon modal close */\n  ","\n\n  @keyframes dim-in {\n    from {\n      background-color: rgba(0, 0, 0, 0);\n    }\n\n    to {\n      background-color: rgba(0, 0, 0, 0.2);\n    }\n  }\n\n  @keyframes dim-out {\n    from {\n      background-color: rgba(0, 0, 0, 0.2);\n    }\n\n    to {\n      background-color: rgba(0, 0, 0, 0);\n    }\n  }\n"])),(function(n){return n.closing?"\n    animation-name: dim-out;\n    animation-timing-function: ease-in-out;\n    animation-duration: 0.25s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards;\n  ":""})),Jn=b.b.div(P||(P=Object(u.a)(["\n  align-self: stretch;\n  animation-name: slide-in;\n  animation-timing-function: ease-in-out;\n  animation-duration: 0.25s;\n  animation-iteration-count: 1;\n  background-color: var(--color-grey-lighter);\n  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n  border-radius: 5px;\n  flex-grow: 1;\n  margin: 10px;\n  padding: 2rem;\n  padding-top: 3.5rem;\n  position: relative;\n  z-index: 3;\n\n  /* Override animation upon modal close */\n  ","\n\n  label {\n    color: var(--color-grey-dark);\n  }\n\n  input {\n    background-color: rgba(0, 0, 0, 0.1);\n    border-radius: 5px;\n    flex-grow: 1;\n    min-width: 0;\n    margin-left: 1rem;\n    padding: 0.5rem 1rem;\n\n    &:hover,\n    &:focus {\n      background-color: rgba(255, 255, 255, 0.2);\n    }\n\n    &:autofill {\n      background-color: rgba(255, 255, 255, 0.2);\n    }\n\n    &:focus {\n      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);\n    }\n  }\n"])),(function(n){return n.closing?"\n    animation-name: slide-out;\n    animation-timing-function: ease-in-out;\n    animation-duration: 0.25s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards;\n  ":""})),Pn=b.b.button(V||(V=Object(u.a)(["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n\n  align-items: center;\n  background-color: unset;\n  border: none;\n  border-radius: 5px;\n  display: flex;\n  ","\n  font-size: 1.3rem;\n  padding: 0.5rem;\n\n  &:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n"])),(function(n){return n.closing?"disabled: true;":""})),Vn=Object(b.b)(hn)(Y||(Y=Object(u.a)(["\n  font-size: 1.2rem;\n  justify-content: center;\n  margin-top: 2rem;\n  margin-left: 10%;\n  padding: 0.5rem;\n  width: 80%;\n"]))),Yn=function(n){var e=n.compound,o=n.closeModal,t=ln(),r=t.compounds,c=t.updateCompound,a=Object(i.useState)(!1),l=Object(j.a)(a,2),s=l[0],d=l[1],u=r.findIndex((function(n){return n.id===e.id})),b=function(n,e){for(var o=0;o<r.length;o++)if(o!==u&&r[o][n]===e)return!1;return!0},p=Object(En.a)({initialValues:{symbol:e.symbol,concentration:e.concentration,name:e.name},validate:function(n){var e,o,t,r={};return wn(n.symbol)?b("symbol",n.symbol)||(r.symbol="Symbol is already used"):r.symbol="Symbol cannot be empty",wn(n.concentration)?(e=n.concentration,o=0,t=!0,"number"===typeof e&&(e>o||e===o&&t)||(r.concentration="Concentration cannot be lower than 0")):r.concentration="Concentration cannot be empty",r},onSubmit:function(n){var o=Object(kn.a)(Object(kn.a)({},e),n);c(u,o),d(!0)}});return Object(v.jsx)(Bn,{closing:s,setClosing:d,handleClose:o,children:Object(v.jsxs)("form",{onSubmit:p.handleSubmit,children:[Object(v.jsxs)(An,{color:e.color,children:[Object(v.jsx)("label",{htmlFor:"symbol",children:"Symbol:"}),Object(v.jsx)(Dn,{errors:!!p.errors.symbol,name:"symbol",autoComplete:"off",color:e.color,onChange:p.handleChange,value:p.values.symbol}),p.errors.symbol&&Object(v.jsx)(Mn,{children:p.errors.symbol})]}),Object(v.jsxs)(Ln,{children:[Object(v.jsx)("label",{htmlFor:"concentration",children:"Concentration [mol/L]:"}),Object(v.jsx)(Dn,{errors:!!p.errors.concentration,name:"concentration",type:"number",onChange:p.handleChange,value:p.values.concentration}),p.errors.concentration&&Object(v.jsx)(Mn,{children:p.errors.concentration})]}),Object(v.jsxs)(Ln,{children:[Object(v.jsx)("label",{htmlFor:"name",children:"Compound name (optional):"}),Object(v.jsx)("input",{name:"name",autoComplete:"off",onChange:p.handleChange,value:p.values.name})]}),Object(v.jsx)(Vn,{color:"green",type:"submit",children:"Done"})]})})},Ln=b.b.div(L||(L=Object(u.a)(["\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n  padding: 0.5rem;\n  position: relative;\n\n  &:hover > .error {\n    opacity: 1 !important;\n  }\n"]))),An=Object(b.b)(Ln)(A||(A=Object(u.a)(["\n  align-items: flex-start;\n  background-color: ",";\n  border-radius: 5px;\n  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n  margin-bottom: 0.5rem;\n  padding: 1rem;\n\n  label {\n    font-size: 1.5rem;\n  }\n\n  input {\n    font-size: 3rem;\n    margin-left: 1rem;\n    width: 0;\n  }\n"])),(function(n){return h[n.color]})),Gn=function(n){var e=n.compounds,o=ln(),t=o.editedCompoundId,r=o.editCompound,i=o.updateCompound,c=o.removeCompound,a=t?e.find((function(n){return n.id===t})):void 0;return Object(v.jsxs)(Un,{children:[e.map((function(n,o){return Object(v.jsx)(Rn,{compound:n,editCompound:function(){r(o)},updateCompound:function(n){i(o,n)},removeCompound:function(){c(o)},validateUnicity:function(n,t){for(var r=0;r<e.length;r++)if(r!==o&&e[r][n]===t)return!1;return!0}},o)})),t&&Object(v.jsx)(Yn,{compound:a,closeModal:function(){return r()}})]})},Un=b.b.ul(G||(G=Object(u.a)(["\n  align-self: stretch;\n  display: flex;\n  flex-wrap: wrap;\n  list-style-type: none;\n  padding-left: 0;\n"]))),qn=function(){var n=ln(),e=n.compounds,o=n.addCompound,t=n.editCompound;return Object(i.useEffect)((function(){return function(){t()}}),[]),Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(yn,{children:"Compounds"}),Object(v.jsxs)(hn,{color:"green",onClick:o,children:["Add ",Object(v.jsx)(dn.e,{})]}),Object(v.jsx)(Gn,{compounds:e})]})},Hn=b.b.p(U||(U=Object(u.a)(["\n  color: var(--color-grey-normal);\n  font-style: italic;\n  margin: 0.5rem;\n"]))),Kn=function(n){var e=n.reaction,o=ln().compounds;return Object(v.jsxs)(Qn,{children:[0===e.reactants.length&&0===e.products.length&&Object(v.jsx)(Hn,{children:"No reaction data"}),e.reactants.map((function(n,e){var t=o.find((function(e){return e.id===n.compoundId}));return Object(v.jsxs)(i.Fragment,{children:[0!==e&&Object(v.jsx)(dn.e,{size:25}),Object(v.jsxs)(Wn,{children:[Object(v.jsx)("p",{children:n.stoichiometricCoefficient}),Object(v.jsx)(Xn,{color:t.color,children:t.symbol})]})]},n.compoundId)})),e.reactants.length>0&&e.products.length>0&&Object(v.jsx)(dn.a,{size:25}),e.products.map((function(n,e){var t=o.find((function(e){return e.id===n.compoundId}));return Object(v.jsxs)(i.Fragment,{children:[0!==e&&Object(v.jsx)(dn.e,{size:25}),Object(v.jsxs)(Wn,{children:[Object(v.jsx)("p",{children:n.stoichiometricCoefficient}),Object(v.jsx)(Xn,{color:t.color,children:t.symbol})]})]},n.compoundId)}))]})},Qn=b.b.div(q||(q=Object(u.a)(["\n  align-items: center;\n  display: flex;\n  flex-grow: 1;\n"]))),Wn=b.b.div(H||(H=Object(u.a)(["\n  align-items: flex-end;\n  display: flex;\n  margin: 0 0.5rem;\n\n  p {\n    color: var(--color-grey-dark);\n    font-size: 1.6rem;\n    margin: 0 0 0.2rem 0;\n  }\n"]))),Xn=b.b.div(K||(K=Object(u.a)(["\n  background-color: ",";\n  border-radius: 5px;\n  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n  color: var(--color-grey-dark);\n  font-size: 1.6rem;\n  margin: 0 0.5rem;\n  padding: 0.5rem 0.9rem;\n"])),(function(n){return h[n.color]})),Zn=function(n){var e=n.reaction,o=n.editReaction,t=n.removeReaction;return Object(v.jsxs)($n,{children:[Object(v.jsx)(Kn,{reaction:e}),Object(v.jsx)(Cn,{onClick:o,children:Object(v.jsx)(dn.d,{})}),Object(v.jsx)(Cn,{onClick:t,children:Object(v.jsx)(dn.f,{})})]})},$n=b.b.div(Q||(Q=Object(u.a)(["\n  margin: 10px;\n  padding: 20px;\n  position: relative;\n\n  align-items: center;\n  align-self: stretch;\n  animation-name: slide-in;\n  animation-timing-function: ease-in-out;\n  animation-duration: 0.25s;\n  animation-iteration-count: 1;\n  background-color: var(--color-grey-lighter);\n  border-radius: 5px;\n  display: flex;\n  color: var(--color-grey-dark);\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.15s ease-in-out;\n\n  &:hover {\n    background-color: var(--color-grey-lightest);\n\n    & {\n      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n      transform: translateY(-2px);\n    }\n\n    & > button {\n      opacity: 1;\n    }\n\n    & > .bullet {\n      transform: scale(20);\n      border-color: var(--color-grey-lighter);\n    }\n    & > .symbol-input:after {\n      margin-left: 0%;\n      width: auto;\n    }\n  }\n\n  p {\n    flex-grow: 1;\n    margin: 0;\n  }\n"]))),_n=["Simple","Reversible","Hiperbolic"],ne=function(n){var e=n.compound,o=n.reactionCompound,t=n.updateCompound,r=n.removeCompound,c=Object(i.useState)(o.stoichiometricCoefficient),a=Object(j.a)(c,2),l=a[0],s=a[1];return Object(v.jsxs)(ee,{color:e.color,children:[Object(v.jsx)("h1",{children:e.symbol}),Object(v.jsx)("input",{value:l,type:"number",onChange:function(n){""!==n.target.value?s(parseFloat(n.target.value)):s("")},onBlur:function(){wn(l)?t(Object(kn.a)(Object(kn.a)({},o),{},{stoichiometricCoefficient:l})):s(o.stoichiometricCoefficient)}}),Object(v.jsx)(Cn,{onClick:r,children:Object(v.jsx)(dn.f,{})})]})},ee=b.b.div(W||(W=Object(u.a)(["\n  margin: 5px;\n  padding: 20px;\n  position: relative;\n\n  align-items: center;\n  animation-name: slide-in;\n  animation-timing-function: ease-in-out;\n  animation-duration: 0.25s;\n  animation-iteration-count: 1;\n  background-color: ",";\n  border-radius: 5px;\n  color: var(--color-grey-dark);\n  display: flex;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n\n  &:hover {\n    & {\n      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);\n      transform: translateY(-2px);\n    }\n  }\n\n  h1 {\n    flex-grow: 1;\n    font-size: 1.8rem;\n    margin: 0;\n  }\n\n  input {\n    font-size: 1.3rem;\n    width: 0px;\n  }\n\n  button {\n    opacity: 1;\n    margin-left: 0.5rem;\n  }\n"])),(function(n){return h[n.color]})),oe=function(n){var e=n.reactionCompounds,o=n.removeCompound,t=n.updateCompound,r=n.compoundType,i=ln().compounds;return Object(v.jsx)(v.Fragment,{children:e.map((function(n){var c=i.find((function(e){return e.id===n.compoundId})),a=e.findIndex((function(e){return e.compoundId===n.compoundId}));return Object(v.jsx)(ne,{compound:c,reactionCompound:n,updateCompound:function(n){t(a,r,n)},removeCompound:function(){o(a,r)}},n.compoundId)}))})},te=function(n){var e=n.alignment,o=n.defaultDisplayValue,t=n.initialValue,r=n.onSelectionChange,c=n.selectOptions,a=Object(i.useState)(!1),l=Object(j.a)(a,2),s=l[0],d=l[1],u=Object(i.useState)((null===t||void 0===t?void 0:t.value)||void 0),b=Object(j.a)(u,2),p=b[0],m=b[1],f=Object(i.useRef)(g.a.generate(8)),x=Object(i.useRef)(null);Object(i.useEffect)((function(){t&&m(t.value),x.current=document.getElementById(f.current)}),[]),Object(i.useEffect)((function(){x.current=s?document.getElementById(f.current):null}),[s]);var h=Object(i.useCallback)((function(n){var e;(null===(e=x.current)||void 0===e?void 0:e.contains(n.target))||(O(),d(!1))}),[]),O=function(){s?window.removeEventListener("click",h,!0):window.addEventListener("click",h,!0),d(!s)},y=function(n){O(),m(n),r(n)},k=c.find((function(n){return n.value===p}));return Object(v.jsxs)(re,{id:f.current,children:[Object(v.jsxs)(ie,{selecting:s,onClick:O,children:[Object(v.jsx)("p",{children:(null===k||void 0===k?void 0:k.collapsedDisplayText)||o}),Object(v.jsx)(dn.b,{size:10})]}),s&&Object(v.jsxs)(ce,{alignment:e||"left",children:[o&&Object(v.jsx)(ae,{onClick:function(){return y(void 0)},children:Object(v.jsx)("p",{children:o})}),c.map((function(n){var e=n.value,o=n.displayText;return Object(v.jsx)(ae,{onClick:function(){y(e)},children:Object(v.jsx)("p",{children:o})},e)}))]})]})},re=b.b.div(X||(X=Object(u.a)(["\n  position: relative;\n  flex-grow: 1;\n"]))),ie=b.b.div(Z||(Z=Object(u.a)(["\n  align-items: center;\n  background-color: var(--color-grey-lightest);\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  display: flex;\n  font-size: 1.1rem;\n  outline: none;\n  padding: 5px 10px;\n  transition: all 0.15s linear;\n  ","\n\n  & > p {\n    margin: 0;\n    flex-grow: 1;\n  }\n\n  & > svg {\n    margin-left: 0.5rem;\n  }\n"])),(function(n){return n.selecting?"box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15),\n    0px 0px 2px var(--color-grey-normal);":""})),ce=b.b.div($||($=Object(u.a)(["\n  position: absolute;\n  top: 100%;\n\n  align-items: stretch;\n  ","\n  ","\n  background-color: var(--color-grey-lightest);\n  border: none;\n  border-radius: 5px;\n  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15),\n    0px 0px 2px var(--color-grey-normal);\n  display: flex;\n  flex-direction: column;\n  font-size: 1.2rem;\n  margin-top: 0.5rem;\n  max-height: 400px;\n  overflow-y: scroll;\n  padding: 0.5rem;\n  transition: all 0.05s linear;\n  width: auto;\n  z-index: 20;\n"])),(function(n){return"left"===n.alignment?"left: 0;":""}),(function(n){return"right"===n.alignment?"right: 0;":""})),ae=b.b.button(_||(_=Object(u.a)(["\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 1rem;\n  text-align: left;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n\n  &:hover {\n    background-color: var(--color-grey-lighter);\n  }\n\n  & > p {\n    white-space: nowrap;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    margin: 0;\n  }\n"]))),le=function(n){var e=n.compounds,o=n.reaction,t=n.closeModal,c=ln(),a=c.reactions,l=c.updateReaction,s=Object(i.useState)(!1),d=Object(j.a)(s,2),u=d[0],b=d[1],p=a.findIndex((function(n){return n.id===o.id})),f=Object(i.useState)(JSON.parse(JSON.stringify(o))),g=Object(j.a)(f,2),x=g[0],h=g[1],O=Object(i.useState)(void 0),y=Object(j.a)(O,2),k=y[0],C=y[1],w=Object(i.useState)(void 0),R=Object(j.a)(w,2),S=R[0],I=R[1],z=function(n){return n===r.Reactant?"reactants":"products"},T=function(n,e){var o=z(e),t=Object(kn.a)({},x);t[o].push({compoundId:n,stoichiometricCoefficient:1}),h(t)},E=function(n,e,o){var t=z(e),r=Object(kn.a)({},x);r[t][n]=o,h(r)},F=function(n,e){var o=z(e),t=Object(kn.a)({},x);t[o]=[].concat(Object(m.a)(t[o].slice(0,n)),Object(m.a)(t[o].slice(n+1,t[o].length))),h(t)},M=k?{value:k,displayText:e[k].symbol,collapsedDisplayText:e[k].symbol}:void 0,D=S?{value:S,displayText:e[S].symbol,collapsedDisplayText:e[S].symbol}:void 0;return Object(v.jsxs)(Bn,{closing:u,setClosing:b,handleClose:t,children:[Object(v.jsx)(Kn,{reaction:x}),Object(v.jsxs)(se,{children:[Object(v.jsxs)(ue,{children:[Object(v.jsx)("h2",{children:"Reactants"}),Object(v.jsxs)(pe,{children:[Object(v.jsx)(te,{defaultDisplayValue:"Compound...",initialValue:M,selectOptions:e.map((function(n,e){return{value:e,displayText:n.symbol,collapsedDisplayText:n.symbol}})),onSelectionChange:function(n){return C(n)}}),Object(v.jsxs)(hn,{color:"green",onClick:function(){void 0!==k&&T(e[k].id,r.Reactant)},children:["Add ",Object(v.jsx)(dn.e,{})]})]}),Object(v.jsx)(be,{children:0!==x.reactants.length?Object(v.jsx)(oe,{reactionIndex:p,reactionCompounds:x.reactants,removeCompound:F,updateCompound:E,compoundType:r.Reactant}):Object(v.jsx)(Hn,{children:"No compounds..."})})]}),Object(v.jsxs)(ue,{children:[Object(v.jsx)("h2",{children:"Products"}),Object(v.jsxs)(pe,{children:[Object(v.jsx)(te,{defaultDisplayValue:"Compound...",initialValue:D,selectOptions:e.map((function(n,e){return{value:e,displayText:n.symbol,collapsedDisplayText:n.symbol}})),onSelectionChange:function(n){return I(n)}}),Object(v.jsxs)(hn,{color:"green",onClick:function(){void 0!==S&&T(e[S].id,r.Product)},children:["Add ",Object(v.jsx)(dn.e,{})]})]}),Object(v.jsx)(be,{children:0!==x.products.length?Object(v.jsx)(oe,{reactionIndex:p,reactionCompounds:x.products,removeCompound:F,updateCompound:E,compoundType:r.Product}):Object(v.jsx)(Hn,{children:"No compounds..."})})]})]}),Object(v.jsxs)(de,{children:[Object(v.jsx)("h2",{children:"Kinetics"}),Object(v.jsx)(te,{initialValue:{value:x.kineticModel,displayText:_n[x.kineticModel],collapsedDisplayText:_n[x.kineticModel]},selectOptions:_n.map((function(n,e){return{value:e,displayText:n,collapsedDisplayText:n}})),onSelectionChange:function(n){h(Object(kn.a)(Object(kn.a)({},x),{},{kineticModel:n}))}})]}),Object(v.jsx)(Vn,{color:"green",onClick:function(){l(p,x),b(!0)},children:"Done"})]})},se=b.b.div(nn||(nn=Object(u.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 2rem;\n\n  h2 {\n    color: var(--color-grey-dark);\n    font-size: 20px;\n    margin-top: 0;\n  }\n"]))),de=Object(b.b)(se)(en||(en=Object(u.a)(["\n  flex-direction: column;\n  flex-wrap: nowrap;\n"]))),ue=b.b.div(on||(on=Object(u.a)(["\n  flex-basis: 50%;\n  margin-bottom: 1.5rem;\n\n  @media (max-width: 700px) {\n    flex-basis: 100%;\n  }\n"]))),be=b.b.div(tn||(tn=Object(u.a)(["\n  background-color: var(--color-grey-lightest);\n  border-radius: 5px;\n  margin: 0.5rem 0.3rem;\n  padding: 0.5rem;\n"]))),pe=b.b.div(rn||(rn=Object(u.a)(["\n  display: flex;\n  margin: 0.3rem;\n\n  & > button {\n    margin-left: 0.5rem;\n  }\n"]))),me=function(){var n=ln(),e=n.compounds,o=n.reactions,t=n.editedReactionId,r=n.editReaction,i=n.removeReaction,c=t?o.findIndex((function(n){return n.id===t})):void 0,a=t?o[c]:void 0;return Object(v.jsxs)(v.Fragment,{children:[o.map((function(n,e){return Object(v.jsx)(Zn,{reaction:n,editReaction:function(){r(e)},removeReaction:function(){i(e)},children:"Reaction"},e)})),t&&Object(v.jsx)(le,{compounds:e,reaction:a,closeModal:function(){return r()}})]})},je=function(){var n=ln(),e=n.addReaction,o=n.editReaction;return Object(i.useEffect)((function(){return function(){o()}}),[]),Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(yn,{children:"Reactions"}),Object(v.jsxs)(hn,{color:"green",onClick:e,children:["Add ",Object(v.jsx)(dn.e,{})]}),Object(v.jsx)(me,{})]})},fe=function(){return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(yn,{children:"Results"})})},ge=function(){return Object(v.jsx)(sn,{children:Object(v.jsxs)(s.a,{children:[Object(v.jsx)(p,{}),Object(v.jsx)(jn,{children:Object(v.jsxs)(d.d,{children:[Object(v.jsx)(d.b,{path:"/",exact:!0,component:qn}),Object(v.jsx)(d.b,{path:"/compounds",component:qn}),Object(v.jsx)(d.b,{path:"/reactions",component:je}),Object(v.jsx)(d.b,{path:"/results",component:fe}),Object(v.jsx)(d.b,{path:"/batch-simulator",children:Object(v.jsx)(d.a,{to:{pathname:"/"}})})]})})]})})},xe=function(n){n&&n instanceof Function&&o.e(3).then(o.bind(null,252)).then((function(e){var o=e.getCLS,t=e.getFID,r=e.getFCP,i=e.getLCP,c=e.getTTFB;o(n),t(n),r(n),i(n),c(n)}))};l.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(ge,{})}),document.getElementById("root")),xe()}},[[251,1,2]]]);
//# sourceMappingURL=main.d4496968.chunk.js.map