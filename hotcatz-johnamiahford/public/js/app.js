(function (window, document, undefined) {
    'use strict';

    // Main application
    window.App = Ember.Application.create();
    // App name constant
    App.NAME = 'Hot Catz';

    // Routes
    App.IndexRoute = Ember.Route.extend({
        model: function () {
            return this.store.find('cat');
        },
        // Post model load
        afterModel: function () {
            App.randomCatz();
        }
    });

    App.randomCatz = function () {
        // Returns the length of all records
        var recordLength = App.Cat.store.all('cat').get('length'),
            twoCatsPlease = [],
            i;

        for (i = 0; i < 2; i += 1) {
            // Push two random records to array for the voting area
            twoCatsPlease.pushObject(App.Cat.store.all('cat').objectAt(Math.floor(Math.random() * recordLength)));
        }

        // Further process the array by passing to the global name space
        App.voteCat(twoCatsPlease);
    };

    // @param twoCatArr is array
    App.voteCat = function (twoCatArr) {
        App.firstCat = twoCatArr[0];
        App.secondCat = twoCatArr[1];
    };

    // Define the app's routes - index and application routes are freebies
    App.Router.map(function () {
        this.resource('cats', function () {
            this.resource('cat', {
                path: ':cat_id'
            });
        });
    });

    // Cats route returns model
    App.CatsRoute = Ember.Route.extend({
        model: function () {
            return this.store.find('cat');
        }
    });

    // Views
    App.IndexView = Ember.View.extend({
        // Once the view has completely rendered, do something
        didInsertElement: function () {
            // Get a list of the competitors
            var contestants = this.$('.contestants').find('li');

            // this._super();

            // Loop through and add class 'top-competitors' to the first 3 cats
            Array.prototype.forEach.call(contestants, function (item, i, arr) {
                var rank;

                // Add necessary classes to append rank ribbons
                if (i === 0) {
                    rank = 'top-competitors one';
                } else if (i === 1) {
                    rank = 'top-competitors two';
                } else if (i === 2) {
                    rank = 'top-competitors three';
                } else {
                    rank = '';
                }
                item.className = rank;
            });
        }
    });

    // Controllers
    App.IndexController = Ember.ArrayController.extend({
        sortProperties: ['vote'],
        sortAscending: false,
        actions: {
            mainVote: function (name, vote) {
                // Update the selected cats vote in the main event area
                Ember.$.ajax({
                    type: 'PUT',
                    url: '/cats',
                    dataType: 'jsonp',
                    data: {
                        name: name,
                        vote: vote += 1
                    },
                    context: this
                }).done(function (data, textStatus, jqXHR) {
                    console.log('Your vote has been logged');
                    this.store.find('cat');
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // Not sure why this is responding with failure
                    console.log('Voting failed');
                    this.store.find('cat');
                }).complete(function () {
                    // Set hard reload after action -- this was a last resort :(
                    window.location.reload();
                });
            },
            addVote: function (name, vote) {
                var self = this;
                // Repeated code from the view rendered -- this is inefficient
                var updateTopCats = function () {
                    // Get a list of the competitors
                    var contestants = this.$('.contestants').find('li');

                    // Loop through and add class 'top-competitors' to the first 3 cats
                    Array.prototype.forEach.call(contestants, function (item, i, arr) {
                        var rank = 'test';

                        console.log(i);
                        if (i === 0) {
                            rank = 'top-competitors one';
                        } else if (i === 1) {
                            rank = 'top-competitors two';
                        } else if (i === 2) {
                            rank = 'top-competitors three';
                        } else {
                            rank = '';
                        }
                        item.className = rank;
                    });
                };

                // Update the selected cats vote in the leader board area
                Ember.$.ajax({
                    type: 'PUT',
                    url: '/cats',
                    dataType: 'jsonp',
                    data: {
                        name: name,
                        vote: vote += 1
                    },
                    context: this
                }).done(function (data, textStatus, jqXHR) {
                    console.log('Your vote has been logged');
                    return this.store.find('cat');
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // Not sure why this is responding with failure
                    console.log('Voting failed');
                    return this.store.find('cat');
                }).complete(function () {
                    $('.contestants').find('li').removeClass('top-competitors');
                    // Timeout needed while fetching the updated models - this is inefficient
                    setTimeout(updateTopCats, 1000);
                });

            }
        },
    });

    App.CatsController = Ember.ArrayController.extend({
        sortProperties: ['vote'],
        sortAscending: false
    });

    // Models
    App.Store = DS.Store.extend({
        revision: 12,
        addapter: DS.RESTAdapter.create()
    });

    // REST adapter talks to the database via JSON, this was need due to my cats array being at the root level
    App.ApplicationSerializer = DS.RESTSerializer.extend({
        primaryKey: '_id',
        normalizePayload: function (type, payload) {
            return {
                cats: payload
            };
        }
    });

    // Cat data types
    App.Cat = DS.Model.extend({
        name: DS.attr('string'),
        picture: DS.attr('string'),
        vote: DS.attr('number')
    });

    // App front-end specific code
    $(function () {
        App.submitNewCat = function (file, name) {
            var urlThumb = window.location.origin + '/uploads/',
                imageFilename = file,
                imageFilenameArr = imageFilename.split('\\'),
                size = imageFilenameArr.length;

            // Couldn't figure out how to pass an image file through ajax - defaulted to a jquery plugin
            // $.ajax({
            //     type: 'POST',
            //     url: '/upload',
            //     dataType: 'json',
            //     processData: false,
            //     data: formData
            // }).done(function (data, textStatus, jqXHR) {
            //     urlThumb += imageFilenameArr[size - 1];
            //     $('.preview').find('img').attr('src', '');
            //     App.getNewCatThumb(urlThumb);
            //     App.Cat.store.find('cat');
            //     console.log('Upload complete!');
            // }).fail(function (jqXHR, textStatus, errorThrown) {
            //     console.log('Upload failed');
            // });
            $('.upload-form').ajaxSubmit(function () {
                var imageFilename = $('.file-upload').val(),
                    imageFilenameArr = imageFilename.split('\\'),
                    size = imageFilenameArr.length,
                    preview = $('.preview');

                urlThumb += imageFilenameArr[size - 1];
                preview.find('img').attr('src', '');
                preview.css('height', 'auto');
                App.getNewCatThumb(urlThumb);
                App.Cat.store.find('cat');
            });

        };

        App.getNewCatThumb = function (url) {
            // Go grab the uploaded image
            $.ajax({
                type: 'GET',
                url: url
            }).done(function (data, textStatus, jqXHR) {
                var preview = $('.preview');

                preview.append('<img class="preview-thumb" src="' + url + '" alt="">');
                preview.find('.instructions').text('Look at that cute cat!');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log('Thumb error');
            });
        };

        $(document).on('change', '.file-upload', function () {
            $('.preview').find('.instructions').text($(this).val());
        });

        $(document).on('submit', '.upload-form', function (e) {
            var file = $('.file-upload').val(),
                catName = $('.cat-name-upload'),
                catNameValue = $('.cat-name-upload').val(),
                preview = $('.preview'),
                removeError = function (element) {
                    element.removeClass('upload-error');
                },
                addError = function (element) {
                    element.addClass('upload-error');
                },
                // Validation
                isAlphaNumeric = function (value) {
                    var pattern = /^[A-Za-z0-9' ']+$/;
                    return pattern.test(value);
                };

            e.preventDefault();
            // Validate the cat name input field and ensure a file is in queue for upload
            if (isAlphaNumeric(catNameValue) && (file.length > 1)) {
                preview.css('background', '#e8e9e5');
                App.submitNewCat(file, catNameValue);
            } else {
                if (isAlphaNumeric(catNameValue)) {
                    preview.find('.instructions').text('Please upload a photo of your cat.');
                    preview.css('background', '#f4cbcb');
                    removeError(catName);
                    return;
                }
                addError(catName);
                catName.attr('placeholder', 'Please enter a valid cat name.');
            }
        });

        // Trigger file upload dialog
        $(document).on('click', '.preview', function (e) {
            e.preventDefault();
            $('.file-upload').trigger('click');
        });

    });

}(window, document));
