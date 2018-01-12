/**
 * Created : vincent
 * Date : 12/01/2018  8:14 AM
 * Email : alfa.king+git@gmail.com
 */
var request = require('request');
var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
  host: 'smtp address',
  secureConnection: true, // use SSL
  auth: {
    user: 'send Email address',
    pass: 'password'
  },
})

function sendMail(firmwares) {
  var options = {
    from: '"name" <mai@mail.com>',
    to: '"name" <mai@mail.com>,"name" <mai@mail.com>',
    subject: 'iPhone6 firmwares open on ios10',
    text: 'iPhone6 firmwares open on ios10',
    html: `${firmwares.join(',')} is open.`
  };
  mailTransport.sendMail(options, function (err, msg) {
    if (err) {
      console.log(err);
      res.render('index', {title: err});
    }
    else {
      console.log(msg);
      res.render('index', {title: "已接收：" + msg.accepted});
    }
  });
}

//10 minutes
const time = 10 * 60 * 1000

// iphone6
const firmwares_type = 'iPhone7,2'

// ios 10.X.X
const version = 'iPhone_4.7_10'

function check() {
  try {
    request(`https://ipsw.me/api/ios/v3/device/${firmwares_type}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)[firmwares_type]
        const firmwares = data.firmwares.filter(v => v.filename.indexOf(version) != -1 && v.signed)
        if (firmwares && firmwares.length > 0) {
          sendMail(firmwares)
          console.log(`${new Date()} : ios10 is open.`)
        } else {
          console.log(`${new Date()} : ios10 not open.`)
        }
      } else {
        console.error('get firmwares error , message : ' + error)
      }
    }.bind(this));
  } catch (e) {
    console.error('get firmwares error , message : ' + e)
  }
}

//when run check
check()

setInterval(() => {
  check()
}, time)