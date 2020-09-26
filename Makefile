.PHONY: all

export PATH := bin:$(PATH)
export SHELL := /usr/bin/env bash

all: data web

copy-core:
	cp assets/style.css dist/
	cp assets/script.js dist/
	cp play.html dist/index.html

copy-media:
	cp -r songs dist/
	cp -r pics dist/

data:
	generate.sh > dist/data.json

web: copy-core copy-media
	@mkdir -p dist
	cp -r assets/favicon.ico dist/

clean:
	rm -rf dist

