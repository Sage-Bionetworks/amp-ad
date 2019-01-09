# AMP AD  

### Project folder structure 
```
.
├── ./amp-server
│   ├── ./amp-server/dist
│   │   ├── ./amp-server/dist/synapse
│   │   └── ./amp-server/dist/public
│   └── ./amp-server/src
│       └── ./amp-server/src/synapse
└── ./amp-ad-portal
    ├── ./amp-ad-portal/storybook-static
    │   └── ./amp-ad-portal/storybook-static/static
    │       └── ./amp-ad-portal/storybook-static/static/media
    ├── ./amp-ad-portal/public
    ├── ./amp-ad-portal/build
    │   └── ./amp-ad-portal/build/static
    │       ├── ./amp-ad-portal/build/static/css
    │       ├── ./amp-ad-portal/build/static/js
    │       └── ./amp-ad-portal/build/static/media
    └── ./amp-ad-portal/src
        ├── ./amp-ad-portal/src/controller
        ├── ./amp-ad-portal/src/defaultData
        ├── ./amp-ad-portal/src/synapse
        ├── ./amp-ad-portal/src/tests
        ├── ./amp-ad-portal/src/view
        ├── ./amp-ad-portal/src/model
        ├── ./amp-ad-portal/src/stories
        ├── ./amp-ad-portal/src/images
        │   └── ./amp-ad-portal/src/images/favicon_package
        ├── ./amp-ad-portal/src/library
        ├── ./amp-ad-portal/src/style
        │   └── ./amp-ad-portal/src/style/bootstrap-3.3.7-dist
        │       ├── ./amp-ad-portal/src/style/bootstrap-3.3.7-dist/css
        │       ├── ./amp-ad-portal/src/style/bootstrap-3.3.7-dist/fonts
        │       └── ./amp-ad-portal/src/style/bootstrap-3.3.7-dist/js
        ├── ./amp-ad-portal/src/components
        │   └── ./amp-ad-portal/src/components/unused
        └── ./amp-ad-portal/src/queries
 
```

## ./amp-server (not actually a server) 
This project contains node scripts which are used to update amp-ad portal static server amazon s3 bucket. **note:** js files are written in es6 syntax and then compiled for node compatibility. **Also note that this is not an actual server!** – it is merely a collection of scripts which are used to update the s3 bucket. The s3 bucket is the server which contains the static files.

#### how to compile with gulp
First install gulp if you don't have it already:  
**[if you don't know what gulp is, first go to gulp website to learn more and install](https://gulpjs.com/)** 

or install like this...

```
$ npm install gulp-cli -g
```

#### how to compile with gulp
`example scenario:` changes are made to ./amp-server/src/index.js

```  
$ gulp 
[11:56:01] Working directory changed to ~/sites/amp-ad/amp-server  
[11:56:01] Using gulpfile ~/sites/amp-ad/amp-server/gulpfile.js  
[11:56:01] Starting 'default'...  
[11:56:02] Finished 'default' after 259 ms  
```

#### how to update static server with new files  
In order to complete this operation and update the server a series of scripts must be run with node. These scripts will download the json files to the public local directory.

The nf-portal-server/dist/index.js contains the scripts that will pull down the json files already in use on the portal from synapse.

`example scenario:` users update a synapse table already in use on the portal site.

1) Only after compiling (compile with the gulp command above) can you run the index.js with node. Gulp automatically outputs to the dist folder. When the index.js is compiled to es5 it can then be run by node.
  
2) go to the dist folder and run index.js. 

``` 
$ cd amp-ad/amp-server/dist
$ node index.js  
SELECT * FROM syn17024173
SELECT * FROM syn17024229
SELECT * FROM syn17024229 where ( ( "Program" = 'AMP-AD' ) )
SELECT * FROM syn17024229 where ( ( "Program" = 'MODEL-AD' ) )
SELECT * FROM syn17024229 where ( ( "Program" = 'M2OVE-AD' ) )
SELECT * FROM syn17024229 where ( ( "Program" = 'Resilience-AD' ) )
tools.json has been saved
whatsNew.json has been saved
programResilienceAD_wiki.json has been saved
programModelAD_wiki.json has been saved
programModelAD_wiki.json has been saved
about.json has been saved
programM2OVEAD_wiki.json has been saved
...
```

## ./amp-ad-portal  
**Node packages to be aware of:** 

- [ReactGA](https://github.com/react-ga/react-ga) - used to interface with google analytics. This was chosen because of the ease integration with google analytics. 
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start) - used to handle page routing. Has many features.
- [Source Map Explorer](https://www.npmjs.com/package/source-map-explorer) - used to examine js files for code bloat. 
- [React Markdown](https://github.com/rexxars/react-markdown) - the first version of the AMP-AD site (V0) used this to process markdown. The site has since switched to using the [Synapse React Client](https://www.npmjs.com/package/synapse-react-client) to process all markdown. The React Markdown package has been retained because there are still functions in the project that use it... however none of those functions are being used. These could be eliminated in future releases.  
- [React Accessible Accordion](https://github.com/springload/react-accessible-accordion) - all the dropdowns in the main navigation use the accordion package.  
- [React Burger Menu](https://github.com/negomi/react-burger-menu) - burger menu on mobile view 
- [React Spinners](https://www.npmjs.com/package/react-spinners) - loading bar and other "spinners". [see all the different options here](http://www.davidhu.io/react-spinners/)  
 
### how to build and deploy

**to build** 

```
$ cd amp-ad-portal 
$ yarn build
File sizes after gzip:

  839.81 KB  build/static/js/4.fd57c941.chunk.js
  437.59 KB  build/static/js/main.01e61786.js
  39.19 KB   build/static/js/3.d8104305.chunk.js
  17.33 KB   build/static/js/0.161958e2.chunk.js
  16.11 KB   build/static/js/1.11afe167.chunk.js
  14.07 KB   build/static/js/2.4e9374a4.chunk.js
  10.33 KB   build/static/css/main.def1ea16.css
  1.32 KB    build/static/js/7.5ea3a65f.chunk.js
  1.28 KB    build/static/js/9.cd4902cb.chunk.js
  1.26 KB    build/static/js/5.a7135f4f.chunk.js
  1.25 KB    build/static/js/8.23176ad5.chunk.js
  500 B      build/static/js/6.1d570e65.chunk.js   
...
```
**to deploy to staging:**  

``` 
$ aws s3 sync --delete --cache-control max-age=0 ./build s3://staging.ampadportal.org
```

or run the script that already exists

```
$ ./sync-with-s3-staging
```



**to deploy to production:**  

```
$ aws s3 sync --delete --cache-control max-age=3000 ./build s3://ampadportal.org
```
or run the script that already exists

``` 
$ ./WARNING-sync-with-s3-production
```

### how is data (data meaning SRC props) routed to the synapse react client?  

```
├── Explore.js
	 ├── SelectorRow.js
	 │		└── Button.js
	 ├── SynapseChartAndCards.js
	 │		├── SynapseComponents (Synapse React Client) 
	 │		└── SynapseConstants (Synapse React Client)
	 └── synapseObjects.js

```

- **Explore.js** - is the explore page. It's loaded by the application when the user visits any explore page.  
- **SelectorRow.js** - the row of buttons above the explore charts, tables and cards.
- **synapseObjects.js** - contains all the data required to power the Synapse React Client, this includes the SQL needed to set up all the queryWrapperMenus in the SRC.


**what does explore.js do? how does it work?**  
Explore.js reads the url and determines what to display on screen. It automatically selects the synId based on the url path with a switch statement. Then it routes the synapseId and the synapseObject to the SynapseChartAndCards.js. The selected synapseObject is passed into the SynapseChartAndCards as a single prop.

**what does selectorRow.js do? how does it work?**  
selectorRow.js has the synIds hardcoded into each button. When the user presses the button it calls a function that has been passed down from explore.js. This function call passes the necessary data down to the SynapseChartAndCards.js

**what does synapseChartAndCards.js do? How does it work?**  
SynapseChartAndCards recieves the active synapse objects and loads them into the Synapse React Client. 
























