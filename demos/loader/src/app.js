import {my_loader, MY_CUSTOM_TYPE} from "./loader"

flowplayer(my_loader)

const my_ovp_src =
  { src  : "some-fake-id"
  , type : MY_CUSTOM_TYPE
  }

flowplayer("#player", 
  { src   : [my_ovp_src]
  , token : process.env.TOKEN
  })