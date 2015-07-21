Skookum Web App Dev Challenge
=============================

Greetings, Internet Earthling. 

Resumes, interviews, and portfolios tell us a bit, but they don't show us how you creatively solve problems. That's pretty much the job. We want to be wowed and surprised by your code, so we came up with a really quick demo project that we'd like you to build. 

Here, you're looking at HotCatz‚ a metaphor of the types of applications we build on the reg. So this is your chance to show off how you'd approach a typical problem we'd field. 

HotCatz is a fantastic new startup that is totally going to be the next AppGoogFaceAzon‚ right after they raise some VC funding. Yep. Our job is to get them off the ground; take their initial investment and build out their first functional and working product. We do this with smart and nimble teams at Skookum Digital Works, and today, you're in charge.

Completion is the #1 priority for this project, our client doesn't want something that doesn't work.  It's up to you to balance what can be realisitically accomplished against additional features (example: ajax and viewmodels on front-end vs static page with a standard POST form).  It's better to submit a bug free and complete app, than to have more features but the app be incomplete.

Here's what we need from you to turn HotCatz from an idea into a product:


STEPS

1.	Clone this git repository.

2.	Use the PSD in the /assets directory (it has layer comps) to create a web app with the following functional requirements, non-functional requirements, and (optional) bonuses. This is designed to take 1-3 days.

3. 	Deploy your app to the Linode VPS. This is your box, so do whatever you like with it:

		ip: 72.14.190.58
		user: root
		password: Pb6TPfageD7opx



FUNCTIONAL REQUIREMENTS (max 18 pts)
-----------------------

When your application is handed to another developer after you're done, they should be able to say "YES" to everything on this list. You will be scored with 0-2 points by each developer that reviews your submission.  0 will mean the requirement is not met. 1 will mean the requirement is basically met, but there are definite problems with it. 2 means the requirement meets all needs and standards.

1.  App should be deployed on an open-source stack on given server.

2.	User should be able to click on a cat picture in the 'VS' section to vote on that cat in the matchup. 

3.	User should see a new cat vs. cat matchup in the voting box after each vote. 

4.	User should be able to hover over any of the small icons or text cat names in 'Current Results' to see a popup with the cat's full image. 

5.	User should be able to select a local image file to upload. 

6.	User should be able to input his/her cat's name which should be unique.

7.	User should be able to upload the name/image file pair. 

8.  Images should be cropped to be a uniform size (but not stretched). 

9.  User should see her cat added to the list of contestants after upload.



NON-FUNCTIONAL REQUIREMENTS (max 12 pts)
-------

These are the types of things our devs, your client, will be looking at when judging your app to determine how well you met the functional requirement. You will be given up to 3 bonus points for each item that is deemed to have been done well.

1.  Markup should be semantic and SEO-friendly. CSS should be clean and simple.

2.  Server code should be only what is needed for the app without an unnecessarily complicated architecture design.

3.  Design of the page matches original design as closely as possible. This will be mostly tested in Chrome and Safari. Should also look good in other browsers including at least being not completely broken in IE8.

4.  Overall, the site is bug free (WARNING: we will try to break it to see how this holds up).



BONUSES  (max 60 pts, 24 if not all functional requirements complete with at least 1 point)
-------

These are additional options that you can choose from to express your strengths and make your app stand out. These will count for up to 5 points for each item if all functional requirements are met above (at least 1 point), or 2 if they are not. Make sure to note in your submission all the items you believe you have completed to make sure we don't miss anything. Also make sure any additional forms, buttons, etc fit into the site design.

### Mostly front-end

1.	Site runs as a one-page app without refreshes. For example, if user A is on the site and user B is voting, it would be great for A to see the the leaderboard update in realtime. Same goes for new cats being added by other users.

2.	Cat photo preview and/or cropping functionality before submitting the new cat contestant.

3.  Responsive, mobile UI. Make sure the responsive design doesn't break the desktop browser experience.

4.  Implement "Current Results" section seen in PSD file (there is a layer comp) with graph to show votes for current contestants as well as a button to move into upload mode.

5.  CSS3 animations for any state change like voting, new contestants, current results graph (from #4) or anywhere else that makes sense. Will be graded on appropriateness of animations used and execution of the implementation.

6.  User sessions and/or authentication.
    * Some ideas for uses for this (these are just some ideas, feel free to add anything that makes sense):
        * A banner on any cats that the user has uploaded themselves.
        * A way for the user to track all of their votes (maybe a toggle on the leaderboard between public results and the user's results from their own votes)
    * These can be done in many ways, here are some options:
        * Complete user registration and login workflows
        * Local storage or cookie to hold the user's session

### Mostly back-end

1.  Fully tested data models

2.  Build back-end as fully featured API that the front end interfaces with. A basic API documentation page will be nice as well.

3.  Admin interface with login to edit cats (names, votes, etc.) or delete them from the app.

4.  Caching system for ajax calls

5.  Email notifications (if there is user auth built) for when a user's cat gets voted on, reaches #1, etc.

6.  Alternative vote counting strategies or algorithms. Examples:
    * We think cats who's name starts with the letter Z are way cooler than other cats. Create a voting strategy that doubles the weight of their votes, but in order to keep the cat electorate from an uprising, a voter can only vote for Zcats during the first 10 mins of each hour.
    * Instead of simply counting how many votes a cat has, devise a more complex algorithm that takes into account the current rank of each cat in the vote.
    * Make the voting a bracket tournament when the cats move forward through the rounds before decing on the ultimate victor.


DEVELOPMENT & DEPLOYMENT
------------------------

1.	Development is totes your call. Ruby, node, Python, PHP, Clojure, Erlang - use whatever open-source stack shows you off the best. We recommend though you use whatever you feel most comfortable with. This project is not the project to learn a whole new framework. If you are concerned about your stack just check with mark@skookum.com

2.  Please try to commit frequently (around an hour). This is both good practice (we encourage frequent small commits in our own projects) and so we can see your project come to life.

3.  If you have any questions, get in touch with mark@skookum.com. There are no points lost for clarification.

4.	Once you're done, deploy it to the VPS server and email an IP link to mark@skookum.com.


All of the above fun should show off plenty of your programming techniques and style. As always, feel free to surprise us with tricks and ideas of your own. HotCatz very much exemplifies the breadth of projects we take on at Skookum Digital Works. We're building businesses from the ground up, and we're hoping you can help build our team. 



