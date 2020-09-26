.PHONY: all

export PATH := bin:$(PATH)
export SHELL := /usr/bin/env bash

all: web

generate:
	generate.sh > dist/data.json

web:
	cp -r assets dist/
	cp -r songs dist/
	cp -r pics dist/
	cp favicon.ico dist/
	cp play.html dist/index.html
