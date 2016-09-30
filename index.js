var fs = require('fs'),
    byline = require('byline'),
    stream = byline(fs.createReadStream('mail.mbox', { encoding: 'utf8' })),
    mails = [],
    obj = {},
    line2tsv = 'date\tfrom\tto\tlabel\tsubject\n';

fs.writeFileSync('mail.tsv', line2tsv);

stream.on('data', function(line) {
  //console.log(line);

	if (line.startsWith('From ')) {
    var line2tsv = obj.date+'\t'+obj.from+'\t'+obj.to+'\t'+obj.googleLabel+'\t'+obj.subject+'\n';
    fs.appendFile('mail.tsv', line2tsv, function (err) {
      console.log('something went wrong');
    });
    console.log('done');
		obj = {};
	} else if (line.startsWith('X-Gmail-Labels: ')) {
    obj.googleLabel = line;
	} else if (line.startsWith('Date: ')) {
    obj.date = line;
	} else if (line.startsWith('From: ')) {
    obj.from = line;
	} else if (line.startsWith('To: ')) {
    obj.to = line;
	} else if (line.startsWith('Subject: ')) {
    obj.subject = line;
	}

	// mails.push(obj);

  // console.log('');
});
