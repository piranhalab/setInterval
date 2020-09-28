import { Users } from "./Users.js"

export interface API {
	[key: string]: Function
}

export const API:API = {
	"/mesh": function(data){
		console.debug("cambian2 mesh porfa usar eventtossi",data)
		Users.me.mesh = data[0][0]
		/*Users.me.change.prop = "mesh"
		Users.me.change.value = data[0][0]
		dispatchEvent(Users.me.change)
	       */
	},
	"/bg":function(data){
		console.debug("changing bg", data)
		Users.me.bg = data[0][0]
	}
}
