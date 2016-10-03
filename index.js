var nameMbox = 'Spam.mbox';

var fs = require('fs')
var MailParser  = require('mailparser').MailParser;
var Mbox        = require('node-mbox');
var mbox        = new Mbox('data/'+nameMbox);

var header = 'date\tfrom\tto\tcc\tbcc\tsubject\tgmail_label\tattachments\n'

fs.writeFileSync('data/parsed-'+nameMbox+'.tsv', header);

// Wait for "message events"
mbox.on('message', function(msg) {

    var tsv = '';

    // parse message using MailParser
    var mailparser = new MailParser({ streamAttachments : true });

    // One the headers have been detected, get basic information
    mailparser.on('headers', function(headers) {
        tsv += headers.date+'\t'+headers.from+'\t'+headers.to+'\t'+headers.cc+'\t'+headers.bcc+'\t'+headers.subject+'\t'+headers['x-gmail-labels']
    });

    // Save attached files
    mailparser.on("attachment", function(attachment, mail){
        var folder = 'data/attachments-'+nameMbox+'-mailbox/'
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
        var output = fs.createWriteStream(folder + attachment.generatedFileName);
        attachment.stream.pipe(output);
    });

    // Once the whole message has been read, extract the attachment file names
    mailparser.on("end", function(mail_object){
        var attachmentsData = '';
        if (mail_object.attachments) {
            mail_object.attachments.forEach(function(attachment,i){
                // Put a comma after name, only if this is not the last element.
                // Grab the attachment names into quotation marks to get a sturdier dataset
                if (i < mail_object.attachments.length-1) {
                    attachmentsData += '"'+attachment.fileName+'", '
                } else {
                    attachmentsData += '"'+attachment.fileName+'"'
                }
            })
        }
        tsv += '\t'+attachmentsData

        // Close the line before appending
        tsv += '\n'
        // Append line to dataset
        fs.appendFileSync('data/parsed-'+nameMbox+'.tsv', tsv)

    });

    mailparser.write(msg);
    mailparser.end();

});

mbox.on('end', function() {
    console.log('Done. Go to data/parsed-'+nameMbox+'.tsv');
});
