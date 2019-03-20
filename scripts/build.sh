#!/bin/bash
parcel build --no-minify --public-url=. -d docs/cloud-spa cloud-spa/index.html
parcel build --no-minify --public-url=. -d docs/react react/index.html