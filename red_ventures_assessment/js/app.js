$(function() {
    var $body = $('body'),
        $timeCheck = $('.time_check'),
        timeChecker = function() {
            var today = new Date(),
                timeUpHours = 23 - today.getHours(),
                timeUpMinutes = 59 - today.getMinutes(),
                timeUpSeconds = 59 - today.getSeconds(),
                timeArray = [
                    {
                        "id": "hours",
                        "time": timeUpHours
                    },
                    {
                        "id": "minutes",
                        "time": timeUpMinutes
                    },
                    {
                        "id": "seconds",
                        "time": timeUpSeconds
                    }
                ],
                timePaste = function(element, time) {
                    $timeCheck.find('.' + element).text(time);
                };
            for ( var i in timeArray ) {
                timePaste(timeArray[i].id, timeArray[i].time);
            }
        };

    setInterval(function() {
        timeChecker();
    }, 1000);

    setTimeout(function() {
        $timeCheck.animate({
            'opacity': 1,
            'right': 0
        });
    }, 800);

    var currentHero = 1,
        heroSwitcher = function() {
            var getHero = function(num) {
                /* $heroHight = $('.hero').height(); */
                $('.hero_bg').css({
                    'background-image': 'url("img/hero' + num + '.jpg")'
                    /* 'height': $heroHight + 'px' */
                });
            };

            if ( currentHero === 3 ) {
                currentHero = 0;
                getHero(currentHero);
            }

            currentHero++;
            return getHero(currentHero);

        };

    setInterval(function() {
        heroSwitcher();
    }, 9500);

    /* Show and hide login or sign up modal. */
    var $account = $('#account'),
        $showAccount = $('#showAccount');

    $account.on('click', function(e) {
        e.preventDefault();
        $showAccount.addClass('show');
    }).off('click', function(e) {
        e.preventDefault();
        $showAccount.addClass('hide');
    });

    /*
    Form Validation
    Store number only, alpha numeric and required fields in an array.
    */
    var numberArray = [
        $('#zipCode'),
        $('#zipCode2'),
        $('#enterPhone')
    ],
        alphaArray = [
           $('#enterFirstName'),
           $('#enterLastName')
        ],
        requireArray = numberArray.concat(alphaArray),
        allDoneCount = 0,
        /* Form number field(s) validations. */
        mustBeNumber = function(element) {
            var allNumbers = /^[0-9]+$/,
                phoneNumbers = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            element.on('change', function() {
                if( element.val().match(allNumbers) || element.val().match(phoneNumbers) ) {
                    if ( element.attr('id') === 'zipCode' || element.attr('id') === 'zipCode2' ) { allDoneCount--; }
                    allDoneCount++;
                    return true;
                }
                alert('Field must be a valid number.');
                element.focus();
            });
        },
        alphaNumeric = function(element) {
            var alpha = /^[a-zA-Z0-9]{2,10}$/;
            element.on('change', function() {
                if ( element.val().length !== 0 && element.val().match(alpha) ) {
                    allDoneCount++;
                    return true;
                }
                alert('No special characters or incorrect format. \nPlease correct field.');
                element.focus();
            });
        },
        noEmptyFields = function(element) {
            var $contactForm = $('#contactForm');
            $contactForm.on('submit', function(e) {
                e.preventDefault();
                if ( element.val().length === 0 ) {
                    alert('Hey! You forgot to fill out a required field.');
                    element.focus();
                    return true;
                }
                var allDone = function() {
                    /* Say thank you to our user for filling out the form. */
                    var userName = $('#enterFirstName').val() + ' ' + $('#enterLastName').val();
                    $('#userName').text(userName);
                    $contactForm.find('button').attr('disabled', 'disabled').addClass('disable');
                };
                if ( requireArray[0].val().length !== 0 && requireArray[1].val().length !== 0 && requireArray[2].val().length !== 0 ) {
                    if ( allDoneCount >= 3 ) {
                        allDone();
                        $('.thank_you').removeClass('hide').addClass('show').animate({
                            'margin-top': '1em'
                        });
                    }
                }
            });
        };

    /* Loop through various validation proposals */
    for ( var numId in numberArray ) {
        mustBeNumber(numberArray[numId]);
    }

    for ( var alphaId in alphaArray ) {
        alphaNumeric(alphaArray[alphaId]);
    }

    requireArray.splice(0,2);

    for ( var requireId = 0; requireId < requireArray.length; requireId++ ) {
        noEmptyFields(requireArray[requireId]);
    }

    /* Placeholder fallback */
    if ( !('placeholder' in document.createElement('input')) ) {
        $('input[placeholder]').each(function() {
            var $this = $(this),
                val = $this.attr('placeholder');
            if ( this.value === '' ) {
                this.value = val;
            }
            $this.focus(function() {
                if ( this.value == val ) {
                    this.value = '';
                }
            }).blur(function() {
                if ( $.trim(this.value) === '' ) {
                    this.value = val;
                }
            });
        });

        /* Clear the default placeholder values on form submit */
        $('form').on('submit', function() {
            $this.find('input[placeholder]').each(function() {
                if ( this.value == $this.attr('placeholder') ) {
                    this.value = '';
                }
            });
        });
    }

    /* Begin animations on featured icons when scroll position is near nav */
    $(window).on('scroll', function() {
        var yScrollPos = window.pageYOffset,
            scrollPosTarget = 520;

        if( yScrollPos > scrollPosTarget ) {
            $('.checks, .zoom_circle, .wind_time, .needle, .pin, .pin2').addClass('effect');
        }
    });

    var stopDeadLinks = function() {
        $body.on('click', 'a[href="#"]', function(e) {
          /* Since this is a project, stop the dead links! */
          e.preventDefault();
        });
    };
    stopDeadLinks();

});
