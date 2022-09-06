/*
 * File: index.tsx
 * Project: React example
 * Created: Thursday, 1st September 2022
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©©Flowplayer
 * -----
 */

import React from "react";
import ReactDom from "react-dom";
import Player from "./player";

const container = document.querySelector("#main");
ReactDom.render(<Player />, container);
