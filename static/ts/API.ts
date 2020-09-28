import { Users } from "./Users.js"

export interface API {
	[key: string]: Function
}

export const API:API = {
	"/mesh": function(data){
		console.debug("cambian2 mesh porfa usar eventtoss")
	"/bg":function(data){
		console.debug("changing bg", data)
	}
}
