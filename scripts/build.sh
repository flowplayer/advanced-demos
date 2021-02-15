#!/bin/bash
rm -rf docs/
parcel build --no-minify --public-url=. -d docs/cloud-spa demos/cloud-spa/index.html
parcel build --no-minify --public-url=. -d docs/react demos/react/index.html
parcel build --no-minify --public-url=. -d docs/chapters demos/chapters/index.html
parcel build --no-minify --public-url=. -d docs/loader demos/loader/index.html
parcel build --no-minify --public-url=. -d docs/background-video demos/hls-background/index.html
parcel build --no-minify --public-url=. -d docs/float-on-scroll demos/float-on-scroll/index.html