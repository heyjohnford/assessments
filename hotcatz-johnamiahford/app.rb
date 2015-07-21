require 'rubygems'
require 'sinatra/base'
require 'mongo'
require 'handlebars'
require 'json/ext'
require 'bcrypt'
require 'yaml'
require 'time'
require 'rdiscount'

# Include the mongo beast
include Mongo

class App < Sinatra::Base

  configure do
    # Let's get things started!
    set :public_folder, File.dirname(__FILE__) + '/public'
    set :app_file, __FILE__
    # Connect to mongo
    connect = MongoClient.new("localhost", 27017)
    set :mongo_connection, connect
    set :mongo_db, connect.db('hotcatz')
    # Enable the sessions
    enable :sessions
  end

  # Helpers - a little help goes a long way
  helpers do
    def read_h(file)
      File.read("views/#{file}.html")
    end

    # Is the user authenticated
    def login?
      if session[:user_email]
        return true
      else
        return false
      end
    end

    def user_email
      return session[:user_email]
    end

    # a helper method to turn a string ID
    # representation into a BSON::ObjectId
    # def object_id(val)
    #   BSON::ObjectId.from_string(val)
    # end

    # def cat_by_id(id)
    #   id = object_id(id) if String === id
    #   settings.mongo_db['cats'].find_one(:_id => id).to_json
    # end

    # def user_by_id(id)
    #   id = object_id(id) if String === id
    #   settings.mongo_db['users'].find_one(:_id => id).to_json
    # end

  end

  # Bootstrap the database with 10 fur balls
  catz = [
    {
      _id: '1',
      name: 'Big',
      picture: '/uploads/big.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '2',
      name: 'Fatz',
      picture: '/uploads/fatz.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '3',
      name: 'Fluffy',
      picture: '/uploads/fluffy.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '4',
      name: 'Hair Ball',
      picture: '/uploads/hair-ball.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '5',
      name: 'Tiny',
      picture: '/uploads/tiny.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '6',
      name: 'Scarface',
      picture: '/uploads/scarface.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '7',
      name: 'Pig',
      picture: '/uploads/pig.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '8',
      name: 'Matz',
      picture: '/uploads/matz.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '9',
      name: 'Charlie',
      picture: '/uploads/charlie.jpg',
      vote: 0,
      created_at: Time.now
    },
    {
      _id: '10',
      name: 'Sam',
      picture: '/uploads/sam.jpg',
      vote: 0,
      created_at: Time.now
    }
  ]

  isCatzPresent = settings.mongo_db['cats'].find.to_a
  if isCatzPresent.length < 1
    settings.mongo_db['cats'].insert(catz)
  end

  get '/' do
    read_h('index')
  end

   get '/cats/?' do
    content_type :json
    settings.mongo_db['cats'].find.to_a.to_json
  end

  get '/cats/:id/?' do
    content_type :json
    settings.mongo_db['cats'].find_one(:_id => params[:id]).to_json
  end

  post '/cats/?' do
    content_type :json
    new_cat = {
      _id: (settings.mongo_db['cats'].find.to_a.length + 1).to_s,
      name: params[:cat_name].strip,
      picture: '/uploads/' + params[:file_upload],
      vote: 0,
      created_at: Time.now
    }
    settings.mongo_db['cats'].insert(new_cat)
  end

  put '/cats/?' do
    content_type :json
    name = params[:name]
    new_vote = params[:vote]

    settings.mongo_db['cats'].update({:name => params[:name]}, {'$set' => {:vote => new_vote}})
    'Record updated!'
  end

  post '/upload/?' do
    # Save the new cat to the database
    puts params[:file_upload][:filename]

    cat = {
      _id: (settings.mongo_db['cats'].find.to_a.length + 1).to_s,
      name: params[:cat_name].strip,
      picture: '/uploads/' + params[:file_upload][:filename].strip,
      vote: 0,
      created_at: Time.now
    }

    File.open('public/uploads/' + params[:file_upload][:filename], "w") do |f|
      f.write(params[:file_upload][:tempfile].read)
    end

    return settings.mongo_db['cats'].insert(cat)
  end

  post '/login/?' do
    active_user = settings.mongo_db['users'].find_one(:user_email => params[:user_email]).to_json
    user_data = JSON.parse(active_user)

    if active_user

      if user_data['passwordhash'] == BCrypt::Engine.hash_secret(params[:password], user_data['salt'])
        session[:user_email] = params[:user_email]
      else
        'error'
      end

    end

  end

  post '/signup/?' do
    password_salt = BCrypt::Engine.generate_salt
    password_hash = BCrypt::Engine.hash_secret(params[:password], password_salt)

    # Save new user to database
    user = {
      salt: password_salt,
      passwordhash: password_hash,
      email: params[:user_email],
      created_at: Time.now
    }

    settings.mongo_db['users'].insert(user)

    session[:user_email] = params[:user_email]
    # redirect '/'
  end

  get '/logout/?' do
    session[:user_email] = nil
    # redirect '/'
  end

end
