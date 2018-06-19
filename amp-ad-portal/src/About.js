import React from 'react'
//import Markdown from 'markdown-to-jsx'

const md = require('markdown-it')({
	html:         true,        // Enable HTML tags in source
	xhtmlOut:     true,        // Use '/' to close single tags (<br />).
	breaks:       true,        // Convert '\n' in paragraphs into <br>
	langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
	linkify:      true,        // Autoconvert URL-like text to links
	typographer:  true,
	quotes: '“”‘’',
	highlight: function (/*str, lang*/) { return ''; }
});

const ReactMarkdown = require('react-markdown')

//const ReturnSynapseMd = markdown => {
	//md.use(require('markdown-it-synapse'))
	//return md.render( markdown, 'unique-id' )
//}

const formatMarkdown = markdown => {
	markdown = markdown.replace(new RegExp("\\*\\*Grant Abstract\\*\\*:", 'g'), "**Grant Abstract**")
	markdown = md.render(markdown)
	markdown = markdown.replace('!Team, Study and Grant Information', '')
	markdown = markdown.replace('${toc}', '')
	markdown = markdown.replace(new RegExp('AMP-AD: ', 'g'), '')
	markdown = markdown.replace(new RegExp('<h3>', 'g'), "<div class='program'><h3>")
	markdown = markdown.replace(new RegExp('---', 'g'), '</p></div></div>')
	markdown = markdown.replace(new RegExp('Grant Abstract', 'g'), "</ul><div class='grant-abstract'><h4>Grant Abstract</h4><p>")
	markdown = markdown.replace(new RegExp("\\{row\\}", 'g'), "")
	markdown = markdown.replace(new RegExp("\\{column\\}", 'g'), "")
	markdown = markdown.replace(new RegExp("\\{column width=3\\}", 'g'), "")
	console.log(markdown)
	//markdown = markdown.replace(new RegExp("<br />", 'g'), '')
	//let count = 0;
	//for(let index = 0; index < markdown.length; index++){
		//if( markdown[index] === '<' && markdown[index+1] === '/' && markdown[index+2] === 'd' && count === 0 ){
      //markdown = markdown.slice( 0, index) + ` ` + markdown.slice(index + 6, markdown.length)
			//count++	
		//}			
		//if(count > 0 ){
			//break
		//}
	//}
	return markdown;
}

const About = props => {
  return (
    <div className="row about">
      <div className="col-xs-12">
        <section className="row child-page-hero">
          <div className="col-xs-12 col-sm-8 content">
            <h2>Programs</h2>
            <p>The following NIA programs and contributors have support the content provided.</p>
          </div>
        </section>
        <section className="row about-section-content center-xs">
          <div className="about-col programs-col col-xs-12 col-sm-8">
            <ReactMarkdown source={props.programData} />
						<ReactMarkdown source={formatMarkdown(props.contributorData)} escapeHtml={false}/>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
