require 'rubygems'
require 'bundler'
require 'rack/cache'
require './app'
use Rack::Cache

Bundler.require

run App
