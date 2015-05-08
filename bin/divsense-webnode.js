#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var webnode = require("../lib/index.js");

var port = argv.p || "8181";
var root = argv.r || ".";

var pseudo_root_path = path.join( process.cwd(), path.normalize( root ) );

webnode( port, pseudo_root_path );

