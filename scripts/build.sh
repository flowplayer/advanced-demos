#!/bin/bash
parcel build --no-minify --public-url=. -d docs/cloud-spa demos/cloud-spa/index.html
parcel build --no-minify --public-url=. -d docs/react demos/react/index.html
parcel build --no-minify --public-url=. -d docs/chapters demos/chapters/index.html
parcel build --no-minify --public-url=. -d docs/loader demos/loader/index.html