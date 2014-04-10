# Breezi
famo.us demo of the Breezi UI demo on capptivate.co I did in private beta at famo.us headquarters

##Dependencies
node.js, grunt-cli, and bower.

```
brew install node
npm install -g grunt-cli bower
```

If you are installing node for the fist time you will most likely need to add npm to your path

```
$ export PATH="/usr/local/share/npm/bin:$PATH"
```

You will probably want to add that to you .bash_profile.  I'll assume if you are using any other shell that you know what you are doing already :P

##Getting Started

```
npm install && bower install
```

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

## Release History
 * 2014-04-10   v0.1.0   W. Hosseini
