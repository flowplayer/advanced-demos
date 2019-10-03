/**
 * this is an example event based logical branching
 * it is a good idea to isolate your branches to events 
 * so that it's easier to handle separation of concerns
 * as integrations grow
 */
export const OK  = "my_api:ok"
export const ERR = "my_api:err"