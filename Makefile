.PHONY: all

export PATH := bin:$(PATH)
export SHELL := /usr/bin/env bash

all: data web

dist:
	@mkdir -p dist

copy-core: dist
	cp assets/style.css dist/
	cp assets/script.js dist/
	cp play.html dist/index.html

copy-media: dist
	cp -r songs dist/
	cp -r pics dist/

data: dist
	generate.sh > dist/data.json

web: copy-core copy-media
	cp -r assets/favicon.ico dist/

clean:
	rm -rf dist

