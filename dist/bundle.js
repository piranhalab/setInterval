!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){return!!(t.hasOwnProperty("x")&&t.hasOwnProperty("y")&&t.hasOwnProperty("z")&&"number"==typeof t.x&&"number"==typeof t.y&&"number"==typeof t.z&&t!=i[e].rot)}n.r(t);class o{constructor({uuid:e="",nickname:t="",pos:n={},rot:r={},room:o}){n.hasOwnProperty("x")&&"number"==typeof n.x&&n.hasOwnProperty("y")&&"number"==typeof n.y&&n.hasOwnProperty("z")&&"number"==typeof n.z||(n={x:0,y:0,z:0}),r.hasOwnProperty("x")&&"number"==typeof r.x&&r.hasOwnProperty("y")&&"number"==typeof r.y&&r.hasOwnProperty("z")&&"number"==typeof r.z||(r={x:0,y:0,z:0}),o||(o="default"),e&&13==e.length||(e=Math.random().toString(16).substr(2)),this.uuid=e,this.nickname=t,this.pos=n,this.rot=r,this.room=o,this.props={avatar:0,pass:0},this.add=new CustomEvent("addUser",{detail:{uuid:e}}),this.leave=new CustomEvent("removeUser",{detail:{uuid:this.uuid,nickname:this.nickname,pos:this.pos,rot:this.rot,room:this.room}}),this.rename=new CustomEvent("renameUser",{detail:{uuid:e,oldName:t}}),this.move=new CustomEvent("moveUser",{detail:{uuid:e,pos:n}}),this.rotate=new CustomEvent("rotateUser",{detail:{uuid:e,rot:r}}),this.change=new CustomEvent("changeUser",{detail:{uuid:e,prop:"",value:""}})}}const i=new Proxy({},{get:function(e,t){return"me"!=t||e.hasOwnProperty("me")?e[t]:new o({})},set:function(e,t,n){return"me"==t?(n.add.detail.uuid="me",n.rename.detail.uuid="me",n.leave.detail.uuid="me",n.change.detail.uuid="me",n.move.detail.uuid="me",n.rotate.detail.uuid="me",n.change.detail.uuid="me",e[t]=new Proxy(n,{get:function(e,t){return"pos"==t?new Proxy(e.pos,{get:function(e,t){return e[t]},set:function(t,n,r){return!(!t.hasOwnProperty(n)||"number"!=typeof r)&&(t[n]=r,e.move.detail.pos=t,dispatchEvent(e.move),!0)}}):"rot"==t?new Proxy(e.rot,{get:function(e,t){return e[t]},set:function(t,n,r){return!(!t.hasOwnProperty(n)||"number"!=typeof r)&&(t[n]=r,e.rotate.detail.rot=t,dispatchEvent(e.rotate),!0)}}):e.props.hasOwnProperty(t)?e.props[t]:e[t]},set:function(e,t,n){if("uuid"==t||"room"==t)return!1;if("nickname"==t&&e.nickname!=n)return e.rename.detail.oldName=e.nickname,e.nickname=n,dispatchEvent(e.rename),!0;if("pos"==t&&e.pos!=n){if(!function(e,t){return!!(t.hasOwnProperty("x")&&t.hasOwnProperty("y")&&t.hasOwnProperty("z")&&"number"==typeof t.x&&"number"==typeof t.y&&"number"==typeof t.z&&t!=i[e].pos)}("me",n))return;return e.pos=n,e.move.detail.pos=n,dispatchEvent(e.move),!0}if("rot"==t&&e.rot!=n){if(console.debug(r("me",n),"asdfsdfdsf"),!r("me",n))return;return e.rot=n,e.rotate.detail.rot=n,dispatchEvent(e.rotate),!0}return e.props[t]=n,e.change.detail.prop=t.toString(),e.change.detail.value=n,dispatchEvent(e.change),!0}})):e[t]=n,!0},has:function(e,t){return e.hasOwnProperty(t)},deleteProperty:function(e,t){return t in e&&delete e[t],!0}});window.Users=i,window.addEventListener("addUser",(function(e){const t=e.detail.uuid;console.info(`User '${i[t].nickname}' (${t}) enter.`)})),window.addEventListener("removeUser",(function(e){const t=e.detail.uuid;e.detail.uuid;console.info(`User '${i[t].nickname}' (${t}) left.`)})),window.addEventListener("renameUser",(function(e){const t=e.detail.uuid;let n=e.detail.oldName;"me"!=t&&console.info(`\tUser '${n}' (${t}) renamed to ${i[t].nickname}`)})),window.addEventListener("changeUser",(function(e){const t=e.detail.uuid;let n=e.detail.prop,r=e.detail.value;console.debug("chasdf",n,r),"me"!=t&&console.info(`\tUser '${i[t].nickname}' (${i[t].uuid}) changed ${n} to ${r}`)}));const a="edges",u={x:0,y:14,z:0},s={x:0,y:0,z:0};window.addEventListener("renameUser",(function(e){"me"==e.detail.uuid&&localStorage.setItem("nickname",i.me.nickname)})),window.addEventListener("changeUser",(function(e){const t=e.detail.uuid;let n=e.detail.prop,r=e.detail.value;if("me"==t){let e=localStorage.getItem("props");if(e)e={};else try{e=JSON.parse(e)}catch(t){e={}}e[n]=r,localStorage.setItem("props",JSON.stringify(e))}}));const d={socket:null,reconnect:!0,init:function(){let{nickname:e,uuid:t}=function(){let e=localStorage.getItem("uuid"),t=localStorage.getItem("nickname"),n=localStorage.getItem("props");if(e&&13==e.length||(e=Math.random().toString(16).substr(2)),t||(t="anon-"+Math.random().toString(16).substr(2,4)),n)try{n=JSON.parse(n)}catch(e){n={}}let r=new URL(window.location.href),o=r.searchParams.get("nickname"),i=r.searchParams.get("props");if(o&&(t=o),i)try{i=JSON.parse(o)}catch(e){i={}}return n=i,localStorage.setItem("uuid",e),localStorage.setItem("nickname",t),localStorage.setItem("props",n),{uuid:e,nickname:t,props:n}}(),n=new o({uuid:t,nickname:e,pos:u,rot:s,room:a});const r=io("http://localhost:3000",{query:`uuid=${n.uuid}&room=${n.room}&nickname=${n.nickname}&pos=${JSON.stringify(n.pos)}&rot=${JSON.stringify(n.rot)}`});i.me=n,r.on("connect",(function(e){d.socket=r,r.on("add",(function(e){let t=function(e){if(!e)return!1;if(!Array.isArray(e)||9!=e.length)return!1;const t=e[0],n=e[1],r={x:e[2],y:e[3],z:e[4]},o={x:e[5],y:e[6],z:e[7]},i=e[8];return"string"==typeof t&&"string"==typeof n&&n.length>0&&n.length<30&&"string"==typeof i&&13==t.length&&(!!(r.hasOwnProperty("x")&&"number"==typeof r.x&&r.hasOwnProperty("y")&&"number"==typeof r.y&&r.hasOwnProperty("z")&&"number"==typeof r.z)&&(!!(o.hasOwnProperty("x")&&"number"==typeof o.x&&o.hasOwnProperty("y")&&"number"==typeof o.y&&o.hasOwnProperty("z")&&"number"==typeof o.z)&&{uuid:t,nickname:n,room:i,pos:r,rot:o}))}(e);if(!t)return;let{room:n,pos:r,rot:a,nickname:u,uuid:s}=t;if(!i.hasOwnProperty(s)&&i.me.uuid!=s){let e=new o({uuid:s,nickname:u,pos:r,rot:a,room:n});i[s]=e,dispatchEvent(e.add)}})),r.on("leave",(function(e){i.me.uuid!=e&&(dispatchEvent(i[e].leave),delete i[e])})),r.on("rename",(function(e){let t=function(e){if(!Array.isArray(e)||2!=e.length||"string"!=typeof e[0]||13!=e[0].length||!("string"==typeof e[1]&&e[1].length>0&&e[1].length<30))return!1;let t=e[0],n=e[1];return!!i.hasOwnProperty(t)&&(t!=i.me.uuid&&(n!=i[t].nickname&&{nickname:n,uuid:t}))}(e);if(!t)return;let{uuid:n,nickname:r}=t;i[n].rename.detail.oldName=i[n].nickname,i[n].nickname=r,dispatchEvent(i[n].rename)})),r.on("move",(function(e){let t=function(e){if(!Array.isArray(e)||4!=e.length||"string"!=typeof e[0]||13!=e[0].length||"number"!=typeof e[1]||"number"!=typeof e[2]||"number"!=typeof e[3])return!1;let t=e[0],n={x:e[1],y:e[2],z:e[3]};return!!i.hasOwnProperty(t)&&(t!=i.me.uuid&&(n!=i[t].pos&&{uuid:t,pos:n}))}(e);if(!t)return;let{uuid:n,pos:r}=t;i[n].move.detail.pos=r,i[n].pos=r,dispatchEvent(i[n].move)})),r.on("rotate",(function(e){let t=function(e){if(!Array.isArray(e)||4!=e.length||"string"!=typeof e[0]||13!=e[0].length||"number"!=typeof e[1]||"number"!=typeof e[2]||"number"!=typeof e[3])return!1;let t=e[0],n={x:e[1],y:e[2],z:e[3]};return!!i.hasOwnProperty(t)&&(t!=i.me.uuid&&(n!=i[t].rot&&{uuid:t,rot:n}))}(e);if(!t)return;let{uuid:n,rot:r}=t;i[n].rotate.detail.rot=r,i[n].rot=r,dispatchEvent(i[n].rotate)})),r.on("change",(function(e){let t=function(e){if(!Array.isArray(e)||3!=e.length||"string"!=typeof e[0]||13!=e[0].length||"string"!=typeof e[1])return!1;let t=e[0],n=e[1],r=e[2];return!!i.hasOwnProperty(t)&&(t!=i.me.uuid&&(!!i[t].props.hasOwnProperty(n)&&(r!=i[t].props[n]&&{uuid:t,prop:n,value:r})))}(e);if(!t)return;let{uuid:n,prop:r,value:o}=t;i[n].change.detail.prop=r,i[n].change.detail.value=o,i[n].props[r]=o,dispatchEvent(i[n].change)})),r.on("chat",(function(e){console.debug("CHAT",e);let t=function(e){if(!Array.isArray(e)||2!=e.length||"string"!=typeof e[0]||13!=e[0].length||"string"!=typeof e[1])return!1;let t=e[0],n=e[1];return t!=i.me.uuid&&(!(n.length>200)&&{uuid:t,msg:n})}(e);if(console.debug("CHAT",t),!t)return;let{uuid:n,msg:r}=t,o=new CustomEvent("chat",{detail:{uuid:n,msg:r}});dispatchEvent(o)})),r.on("disconnect",(function(){d.socket.socket.reconnect()}))}))},disconnect:function(){}};window.Server=d,window.addEventListener("renameUser",(function(e){const t=e.detail.uuid;e.detail.oldName;"me"==t&&d.socket&&d.socket.emit("rename",i[t].nickname)})),window.addEventListener("moveUser",(function(e){const t=e.detail.uuid;let n=e.detail.pos;"me"==t&&d.socket&&d.socket.emit("move",[n.x,n.y,n.z])})),window.addEventListener("rotateUser",(function(e){const t=e.detail.uuid;let n=e.detail.rot;"me"==t&&d.socket&&d.socket.emit("rotate",[n.x,n.y,n.z])})),window.addEventListener("changeUser",(function(e){const t=e.detail.uuid;let n=e.detail.prop,r=e.detail.value;"me"==t&&d.socket&&d.socket.emit("change",[n,r])})),window.addEventListener("chat",(function(e){const t=e.detail.uuid;let n=e.detail.msg;console.debug("asfsdf","eventochat"),"me"==t&&d.socket&&d.socket.emit("chat",n)}));const c={init:function(){},send:function(e){c.chat.detail.uuid="me",c.chat.detail.msg=e,dispatchEvent(c.chat)},receive:function(e,t){console.info(`${e} -> "${t}"`)},log:function(){},chat:new CustomEvent("chat",{detail:{uuid:"me",msg:""}})};window.addEventListener("chat",(function(e){const t=e.detail.uuid;let n=e.detail.msg;"me"!=t&&c.receive(t,n)})),window.Chat=c;d.init(),c.init()}]);