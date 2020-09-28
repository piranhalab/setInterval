import {Server} from "./Server.js"
import {Chat} from "./Chat.js"
import {Scene} from "./Scene.js"
import {Streaming} from "./Streaming.js"
import {bgGradient} from "./Scene/bg-gradients.js"

bgGradient.init()
Server.init()
Chat.init()
Scene.init()
Streaming.init()
