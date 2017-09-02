## Dhol Baaje
## How to get the paxis project up and running in your local dev machine
Let's walk you through step-by-step on how to set up the AngularJS project on your environment.

## 1. Create a workspace
Create a directory where the source code for this application will reside.

## 2. Install [Git](https://www.git-scm.com/) if you haven't already
Verify Git is properly installed by running "git --version" in your bash shell or command prompt

## 3. Clone [this repo](), Create Gitlab account if it does not exist. Request access to get repo access. Contact Team.
In the root of your project directory, run this command - **

This should get the latest version of the source from Gitlab.

## 4. Install [NodeJS](http://nodejs.org)
This should automatically install NPM as well, which is the package ecosystem for node. Our project uses a lot of open source libraries that are hosted there.

## 5. Install all the dependencies listed in package.json
From the root directory that contains package.json file, run this command - *npm install*

This command will fetch all the dependency libraries from NPM and add it to your project under the node_modules directory.

## 6. Run GULP
From the root directory, run this command - *gulp*

This will run a bunch of tasks behind the scenes. For example, we use SASS as the CSS preprocessor that converts .scss files to .css files. Other tasks include JavaScript & CSS bundling and minification,
test runners, clean delete, versioning, etc. Check out gulpfile.js for more information.

## 7. Set to Launch App
Launch url **http://localhost:2000** in browser. There you go!

**-> watch[task]\(gulpfile.js) -> browserfy[task]\(browserfy.js) **

*Have fun with coding!* 