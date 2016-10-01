var nameMbox = 'Spam';

var fs = require('fs')
var MailParser  = require('mailparser').MailParser;
var Mbox        = require('node-mbox');
var mbox        = new Mbox('data/'+nameMbox+'.mbox');

var header = 'date\tfrom\tto\tcc\tbcc\tsubject\tgmail_label\n'

fs.writeFileSync('data/parsed-'+nameMbox+'.tsv', header);

// wait for message events
mbox.on('message', function(msg) {
  
  var tsv = '';

  // parse message using MailParser
  var mailparser = new MailParser({ streamAttachments : true });
  mailparser.on('headers', function(headers) {

    tsv = headers.date+'\t'+headers.from+'\t'+headers.to+'\t'+headers.cc+'\t'+headers.bcc+'\t'+headers.subject+'\t'+headers['x-gmail-labels']+'\n'

    fs.appendFileSync('data/parsed-'+nameMbox+'.tsv', tsv)

  });

  mailparser.write(msg);
  mailparser.end();
});

mbox.on('end', function() {
  console.log('Done. Go to ./data/parsed-'+nameMbox+'.tsv');
});