import mailbox
import csv
writer = csv.writer(open(("clean_mail.csv", "wb"))
for message in mailbox.mbox('data/mailbox.mbox'):
    if message.is_multipart():
        content = ''.join(part.get_payload() for part in message.get_payload())
    else:
        content = message.get_payload()
    writer.writerow([message['subject'], message['from'], message['date'],content])