var nameMbox = 'mailbox';

var fs = require('fs')
var MailParser  = require('mailparser').MailParser;
var Mbox        = require('node-mbox');
var mbox        = new Mbox('data/'+nameMbox+'.mbox');

var header = 'date\tfrom\tto\tcc\tbcc\tsubject\n'

fs.writeFileSync('data/mailbox-'+nameMbox+'.tsv', header);

// wait for message events
mbox.on('message', function(msg) {
  // parse message using MailParser
  var mailparser = new MailParser({ streamAttachments : true });
  mailparser.on('headers', function(headers) {
    
    // console.log('Date   :', headers.date);
    // console.log('From   :', headers.from);
    // console.log('To   :', headers.to);
    // console.log('Cc   :', headers.cc);
    // console.log('Bcc   :', headers.bcc);
    // console.log('Subject:', headers.subject);
    // console.log('References   :', headers.to);
    // console.log('In reply to   :', headers.inReplyTo, '\n');

    var tsv = headers.date+'\t'+headers.from+'\t'+headers.to+'\t'+headers.cc+'\t'+headers.bcc+'\t'+headers.subject+'\n'

    fs.appendFileSync('data/mailbox-'+nameMbox+'.tsv', tsv)

  });

  mailparser.write(msg);
  mailparser.end();
});

mbox.on('end', function() {
  console.log('done - CTRL + C to quit');
});

// pipe stdin to mbox parser
process.stdin.pipe(mbox);