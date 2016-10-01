# Node.js .mbox parser
This script accepts a `.mbox` archive as input and parses it returning the following:
- data wrapped into a CSV file:
	- date
	- from
	- to
	- cc
	- bcc
	- subject
	- gmail_label
	- attachments
- a folder where it saves messages attachments
	- data/attachments-my-messages.mbox-mailbox

### How to use
0. Install [node.js](https://nodejs.org) and [Github Desktop](https://desktop.github.com)
1. Clone the repo: click on the green button **Clone or Download** > **Open in Desktop**
2. Open the terminal and navigate to the repo folder: `cd path/to/repo/`
3. Install dependencies: `npm install`
3. create a folder and name it **data**: `mkdir data`
4. Place your **.mbox** file into the **data** folder
3. Open the file called **index.js** and change the variable on first line (`var nameMbox = 'Spam.mbox';`) with the name of your **.mbox** file
6. Run: `node index.js`

### Credits
Tiny scripts realised for student of DensityDesign Integrated Course Final Synthesis Studio.
Made use of cool stuff:
- [MailParser](https://github.com/andris9/mailparser)
- [node-mbox](https://github.com/robertklep/node-mbox)