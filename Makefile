.PHONY: all

export PATH := bin:$(PATH)
export SHELL := /usr/bin/env bash

all: web

generate:
	generate.sh > dist/data.json

clean:
	rm -rf dist

web:
	@mkdir -p dist
	cp -r assets/* dist/
	cp -r songs dist/
	cp -r pics dist/
	cp play.html dist/index.html
