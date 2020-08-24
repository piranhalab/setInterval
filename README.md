# Multiplayer Websockets

Todo lo necesario para el backend y las conexiones del lado de frontend para multiplayer

| Carpeta | descripción  |
|---|---|
| `src/`  | Contiene todas las fuentes de typescript del backend  |
| `dist/` | Contiene el código compilado de typescript  |
| `static/` | Contiene los archivos estáticos, index.html y archivos .js |
| `static/js` | Contiene los archivos de typescript y compilados para el frontend |


## src/

- **Server.ts**: Archivo que inicia el servidor websocket y el servidor web, lo inicia en el puerto 3000, además corre redis para tener multiples nodos de websockets y distribuir el tráfico.
- **Users.ts**: Archivo que indica la estructura de cada usuario

## static/js

- **main.ts** Aqui se inicializa todo, se inicializa el server y se inicializa la escena gráfica, así como el chat y demas
- **Server.ts** contiene la información del servidor, inicia la transacción del usuario y genera los eventos que esperan señales websockets
- **Users.ts** Contiene la información de los usuarios y del usuario `me`, contiene funciones para renombrar, moverse, rotar y cambiar propiedades como el avatar
- **Environment.ts** Contiene información del entorno, por ejemplo el room en el que está el juego, offsets del avatar, etc;


## Para compilarlo

para compilar el servidor, typescript va a leer automáticamente el archivo tsconfig.json y va a compilar lo que esté en src y lo va a poner en dist
```
tsc
```

Para compilar el frontend, en static/js, esto va a compilar `main.ts` a `main.js` y en cadena todas las dependencias, en formato es6
```
tsc main.ts --target es6
```

## Para ejecutarlo

Una vez compilado correr en la raiz del repo:
```
node dist/Server.js
```

y abrir 127.0.0.1:3000


## Como funciona 

1.- El server inicia y levanta el server web y el server websocket
2.- El cliente se conecta en 127.0.0.1:3000 y manda un handshake inicial al servidor
3.- El servidor registra el nuevo usuario y le avisa a los demás de su existencia (`io.to(room).emit("add", [uuid, nickname, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, room])`)
4.- El servidor le avisa al nuevo usuario los usuarios registrados en ese proceso 
```
Object.keys(Users).forEach(function(_uuid){
		let user = Users[_uuid]
		if(user.uuid != uuid){
			conn.emit("add", [
				user.uuid,
				user.nickname,
				user.pos.x, 
				user.pos.y, 
				user.pos.z, 
				user.rot.x, 
				user.rot.y, 
				user.rot.z, 
				user.room
			])
		}
	})
```
5.- El servidor le avisa a los demás procesos de la existencia del nuevo usuario y éstos le responden con una lista de sus usuarios para avisar al nuevo usuario
6.- en este punto el nuevo usuario conoce a todos los usuarios y todos los usuarios conocen de su existencia


### Para renombrar

1.-Desde la consola
```
Users.me.nickname = "nuevonickname"
```
2.-Esto lanza un evento llamado `Users.me.rename` que es recibido por el frontend 
```
window.addEventListener("renameUser", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let oldName = event.detail.oldName
	if(uuid == "me" && Server.socket){
		Server.socket.emit("rename",[Users[uuid].uuid, Users[uuid].nickname])
	}
})
```

3.- El frontend le avisa al Servidor que el usuario cambió de nombre
4.- El servidor obtiene el evento "rename" y le avisa a todos que el usuario cambió de nombre
```
	conn.on('rename', function(data){
		let res = checkName(data)

		if(!res) return 

		let {uuid, nickname} = res

		console.info(`\tUser '${Users[nickname]}' (${uuid}) renamed to '${nickname}'.`)
		Users[uuid].nickname= nickname

		io.to(room).emit("rename", [uuid, nickname])
	})

```
5.- Los demás usuarios reciben el mensaje "rename" desde el frontend y actualizan su objeto Users
```
			socket.on("rename",function(data){
				let res = checkName(data)
				if(!res) return

				let {uuid, nickname} = res

				Users[uuid].rename.detail.oldName = Users[uuid].nickname
				Users[uuid].nickname = nickname

				dispatchEvent(Users[uuid].rename)
			})	
```
6..- Los demás usuarios internamente lanzan un evento "renameUser" con datos sobre el viejo nickname, si se necesita hacer algo cuando algún usuario cambie de nombre, se debe de cachar con:
```
window.addEventListener("renameUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	let oldName = event.detail.oldName
	if(!(uuid == "me")) console.info(`\tUser '${oldName}' (${uuid}) renamed to ${Users[uuid].nickname}`)
})
```


## Eventos

- **renameUser** sucede cuando algún usuario se cambia el nombre
- **addUser** sucede cuando algún usuario llega
- **removeUser** sucede cuando algún usuario se va
- **changeUser** sucede cuando un usuario cambia una prop






