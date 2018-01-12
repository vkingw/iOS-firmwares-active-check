# iOS-firmwares-active-check
use node js check ios firmwares active

When the required version is activated, email will be sent.
## Installation

npm i

## Custom

### Configuration send email

````
var mailTransport = nodemailer.createTransport({
  host: 'smtp address',
  secureConnection: true, // use SSL
  auth: {
    user: 'send Email address',
    pass: 'password'
  },
})
````

````
 var options = {
    from: '"name" <mai@mail.com>',
    to: '"name" <mai@mail.com>,"name" <mai@mail.com>',
    subject: 'iPhone6 firmwares open on ios10',
    text: 'iPhone6 firmwares open on ios10',
    html: `${firmwares.join(',')} is open.`
  };
````


### Configuration version

````
//10 minutes ,The cycle time
const time = 10 * 60 * 1000

// iphone6

const firmwares_type = 'iPhone7,2'

// ios 10.X.X

const version = 'iPhone_4.7_10'

````

## Run

Mac、Linux、Win
````
node ipsw-check.js > check.log &
````

Raspberry Pi
````
sudo node ipsw-check.js > check.log &
````

Perfect operation in Raspberry Pi.
