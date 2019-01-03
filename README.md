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

## ./amp-server 
contains node scripts which are used to update amp-ad static server. **note:** js files are written in es6 syntax and then compiled for node compatibility

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
go to gulp output directory and run index.js. 

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
 
























