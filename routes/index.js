var express = require('express');
var firebase=require('firebase');
var nodemailer = require("nodemailer"); 
var multer=require('multer')
const checksum = require('./models/checksum');
const config = require('./config');
var router = express.Router();
var storage=multer.diskStorage({
  destination:(req,file,path)=>
  {path(null,'public/images1')}
  ,
  filename:(req,file,path)=>{
   path(null,file.originalname)}
   });
  var upload=multer({storage:storage})
//let smtpTransport = nodemailer.createTransport({
 // host: 'smtp.gmail.com',
 //// port: 465,
 /// secure: true,
 // auth: {
 //     type: 'login',
 //     user: 'mohineshsharma9999@gmail.com',
 //     pass: 'namomks9@'
//  }
//});
let smtpTransport=nodemailer.createTransport({
  secure: true,
  port: 465,
  host: 'smtp.gmail.com',
  service: 'Gmail',
  auth: {
      user: 'mohineshsharma9999@gmail.com',
      pass: 'namomks9@'
  }
});
var firebaseConfig = {
  apiKey: "AIzaSyDqqF00b4WHIKQFqbEYf1RszmxSCv19rLk",
  authDomain: "test1-21f34.firebaseapp.com",
  databaseURL: "https://test1-21f34.firebaseio.com",
  projectId: "test1-21f34",
  storageBucket: "gs://test1-21f34.appspot.com",
  messagingSenderId: "591509825226",
  appId: "1:591509825226:web:5742dfbe549c8f2553b633"
};

router.get('/test',function(req,res,next){
  //firebase.database().ref('hackshetra2/').set({id:'22'})
  //res.send('hi')
  //firebase.database().ref('2').set({a:'geeeek',b:'for',c:'geeks'})
  //res.send('hello')
  req.body.email='elad@gmail.com'
  firebase.database().ref('hackshetra3/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
  req.body.email.slice(0,req.body.email.length-4)+'1')
  .set({email:'elad@gmail.com',password:'elad'})
})
  // Initialize Firebase
  var sa= firebase.initializeApp(firebaseConfig);
/* GET home page. */
router.get('/stdlogin',function(req,res,next){
res.render('stdlogin',{msg:'see here'});
})
router.post('/stdloginverify',function(req,res,next){
  console.log(req.body.a)
 if(req.body.a!='forgot'){ firebase.database().ref('hackshetra/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
  req.body.email.slice(0,req.body.email.length-4)+'1')
  .once('value',function(snapshot){
    console.log(snapshot.val(),req.body)
    if(snapshot.val()==null || snapshot.val().verified=='no'){
      res.render('stdlogin',{msg:'email incorrect'})

    }
else if(snapshot.val().password==req.body.pass){
  req.session.email=req.body.email;
  req.session.verified='yes';
  res.render('main',{a:snapshot.val()})

}
else{
  res.render('stdlogin',{msg:'password incorrect'})
}


  })
}
else{
  firebase.database().ref('hackshetra/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
  req.body.email.slice(0,req.body.email.length-4)+'1')
  .once('value',function(snapshot){
  let smtpTransport=nodemailer.createTransport({
    secure: true,
    port: 465,
    host: 'smtp.gmail.com',
    service: 'Gmail',
    auth: {
        user: 'mohineshsharma9999@gmail.com',
        pass: 'namomks9@'
    }
  });
   var otp = Math.random();
   otp = otp * 1000000;
   otp = parseInt(otp);
   console.log(otp);
  
   var mailOptions={
    to : req.body.email,
    subject : "password",
    html : "<h3>password for your account  is </h3>"  + "<h1 style='font-weight:bold;'>" + snapshot.val().password +"</h1>"
  }
  
  smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
  console.log(error);
  res.send('error')
  
  }
  else{ res.render('stdlogin',{msg:'your password is send on your emailid'})}
  })
  })
}
})
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/offlogin', function(req, res, next) {
  res.render('offlogin', { msg: '' });
});
router.get('/signup',function(req,res,next){
  res.render('signUp',{msg:'see here',a:{}})
 // res.send('hi')
})
router.post('/home',upload.single('pic'),function(req,res,next){
  firebase.database().ref('hackshetra/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
  req.body.email.slice(0,req.body.email.length-4)+'1')
  .once('value',function(snapshot){
    console.log(snapshot.val(),'check1',req.body)
  if(snapshot.val()==null  ){
  firebase.database().ref('hackshetra/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
  req.body.email.slice(0,req.body.email.length-4)+'1')
  .set({name:req.body.name,email:req.body.email,year:req.body.year,hostel:req.body.hostel,
    pic:req.file.filename,roll:req.body.roll,password:req.body.password,verified:'no'
  })
  //console.log(req.session)
 req.session.email=req.body.email
  req.session.verified='no'
  //res.send('otp1')
 // res.render('main',{a:req.body})
 req.session.email=req.body.email
 req.session.verified='no'
 firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
 req.session.email.slice(0,req.session.email.length-4)+'1').set({bill:'3100'});
// res.redirect('/otp')
// res.send('otp')
let smtpTransport=nodemailer.createTransport({
 secure: true,
 port: 465,
 host: 'smtp.gmail.com',
 service: 'Gmail',
 auth: {
     user: 'mohineshsharma9999@gmail.com',
     pass: 'namomks9@'
 }
});
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

var mailOptions={
 to : req.body.email,
 subject : "OTP Verification",
 html : "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
}

smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.send('error')

}
else{ res.render('otp',{b:otp})}
})
}

else if(snapshot.val().verified=='no'){
  
  req.session.email=req.body.email
  req.session.verified='no'
  firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
  req.session.email.slice(0,req.session.email.length-4)+'1').set({bill:'3100'});
 // res.redirect('/otp')
 // res.send('otp')
 let smtpTransport=nodemailer.createTransport({
  secure: true,
  port: 465,
  host: 'smtp.gmail.com',
  service: 'Gmail',
  auth: {
      user: 'mohineshsharma9999@gmail.com',
      pass: 'namomks9@'
  }
});
 var otp = Math.random();
 otp = otp * 1000000;
 otp = parseInt(otp);
 console.log(otp);

 var mailOptions={
  to : req.body.email,
  subject : "OTP Verification",
  html : "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
}

smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.send('error')

}
else{ res.render('otp',{b:otp})}
})}
else{
  res.render('signUp',{msg:'account already exist',a:{}}) 
}
})

})
router.post('/otp',function(req,res,next){
  if(req.session.email!=null){
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);

  var mailOptions={
   to : req.session.email,
   subject : "OTP Verification",
   html : "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
}

smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");


}}
)
res.render('otp',{a:req.session,b:otp})}
})
router.post('/otpverify',function(req,res,next){
  if(req.session.email!=null){
  console.log(req.body.otp,req.body.otpt)
  console.log(req.session)
  if(req.body.otp==req.body.otpt){
    firebase.database().ref('hackshetra/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
  req.session.email.slice(0,req.session.email.length-4)+'1')
  .once('value',function(snapshot){

  firebase.database().ref('hackshetra/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
  req.session.email.slice(0,req.session.email.length-4)+'1')
      .set({name:snapshot.val().name,email:snapshot.val().email,year:snapshot.val().year,hostel:snapshot.val().hostel,
        pic:snapshot.val().pic,roll:snapshot.val().roll,password:snapshot.val().password,verified:'yes'})
//res.send('verify')
res.render('main',{a:snapshot.val()})
      })
    }
    else{
      //res.redirect('/login')
      res.render('signUp',{msg:'',a:{}})
    }}
    else{
      res.redirect('/')
    }
  })
  router.post('/login',function(req,res,next){
  res.render('login')
  })
  router.get('/profile',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
  req.session.email.slice(0,req.session.email.length-4)+'1')
  .once('value',function(snapshot){
        res.render('profile',{a:snapshot.val()})
      })}
      else{
        res.redirect('/')
      }
  })
  router.get('/edit',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
    req.session.email.slice(0,req.session.email.length-4)+'1')
    .once('value',function(snapshot){
    res.render('signUp1',{a:snapshot.val(),msg:''})
    })}
    else{
      res.redirect('/')
    }
  })
  router.post('/change',upload.single('pic'),function(req,res,next){
    if(req.session.email!=null){
    console.log('hi',req.body)
    firebase.database().ref('hackshetra/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
    req.body.email.slice(0,req.body.email.length-4)+'1')
    .set({name:req.body.name,year:req.body.year,roll:req.body.roll,hostel:req.body.hostel,email:req.body.email,password:req.body.pass,pic:req.file.filename})}
    else{
      res.redirect('/')
    }
  })
  router.get('/main',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
    req.session.email.slice(0,req.session.email.length-4)+'1')
    .once('value',function(snapshot){
    res.render('main',{msg:'',a:snapshot.val()})})}
    else{
      res.redirect('/')
    }
  })
  router.get('/messcalc',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
    req.session.email.slice(0,req.session.email.length-4)+'1').once('value',function(snapshot){
      res.render('messcalc',{a:snapshot.val().bill})
    })
  }
  else{
    res.redirect('/')
  }
   // res.render('messcalc')
  })
  router.post('/messcalc1',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
    req.session.email.slice(0,req.session.email.length-4)+'1').once('value',function(snapshot){
var x=parseInt(snapshot.val().bill)
 x=x+parseInt(req.body.a)-70*parseInt(req.body.b)
 x=''+x
 firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
 req.session.email.slice(0,req.session.email.length-4)+'1').set({bill:x})
 res.render('messcalc',{a:x})
    })}
    else{
      res.redirect('/')
    }
  })

  router.get("/paywithpaytm", (req, res) => {
    if(req.session.email!=null){
    const initPayment = function(amount) {

      return new Promise((resolve, reject) => {
        let paymentObj = {
          ORDER_ID: amount.id,
          CUST_ID: '2',
          INDUSTRY_TYPE_ID: 'student',
          CHANNEL_ID: 'WEB',
          TXN_AMOUNT: amount.bill,
          MID: config.MID,
          WEBSITE: config.WEBSITE,
          CALLBACK_URL: config.CALLBACK_URL,
        };
    
        checksum.genchecksum(
          paymentObj,
          config.PAYTM_MERCHANT_KEY,
          (err, result)=>{
          
              //paymentObj.CHECKSUMHASH = result;
              console.log(result,result.length,'hello jncsdl')
              res.render("paytm.ejs", {
                        resultData: paymentObj,csh:result
                        })

              //return resolve(paymentObj);
              
            }
          
        );
      });
    }
   // });
    firebase.database().ref('hackshetra1/'+req.session.email.slice(0,req.session.email.length-4)+'/'+
  req.session.email.slice(0,req.session.email.length-4)+'1').once('value',function(snapshot){
    firebase.database().ref('hackshetra2/').once('value',function(snapshot1){
      firebase.database().ref('hackshetra2/').set({id:parseInt(snapshot1.val().id)+1});
      initPayment({bill:snapshot.val().bill,id:snapshot1.val().id})
    })
  })

}
else{
  res.redirect('/')
}
  //})
   // initPayment('1');
  })
  router.post("/paytmreq", (req, res) => {
    if(req.session.email!=null){
    responsePayment(req.body).then(
        success => {
          console.log(success,req.body,'response')
            res.render("paytmres.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );}
    
      else{
        res.redirect('/')
      }
    
  });
  router.post('/offloginverify',function(req,res,next){
    firebase.database().ref('hackshetra3/'+req.body.email.slice(0,req.body.email.length-4)+'/'+
    req.body.email.slice(0,req.body.email.length-4)+'1')
    .once('value',function(snapshot){
      if(snapshot.val()==null){
        res.render('offlogin',{msg:'email doesnt exist'})
      }
      else if(snapshot.val().password!=req.body.pass){
        res.render('offlogin',{msg:'password doesnt match'})
      }
      else{
        req.session.offemail=req.body.email
        req.session.offpass=req.body.pass
        console.log(req.session)
        res.render('offmain',{a:req.session})
      }
    })
  })
  router.get('/offprofile',function(req,res,next){
    if(req.session.offemail!=null){
    var x=req.session.offemail.slice(0,req.session.offemail.indexOf('@'))
    res.render('offprofile',{a:x})}
    else{
      res.redirect('/')
    }
  })
  router.post('/data',upload.single('pics'),function(req,res,next){
    if(req.session.offemail!=null){
    console.log(req.body)
      firebase.database().ref('hackshetra4/'+req.file.filename.slice(0,5)).set({desc:req.body.desc,pic:req.file.filename})
      res.render('offmain')}
    else{  res.redirect('/')}
  })
  router.get('/offlogout',function(req,res,next){
    req.session.destroy();
    res.redirect('/')
  })
  router.get('/announcement',function(req,res,next){
    if(req.session.email!=null){
    firebase.database().ref('hackshetra4/').once('value',function(snapshot){
      console.log(snapshot.val())
      res.render('announcement',{a:snapshot.val()})
    })}
    else{res.redirect('/')}
  })
  router.get('/logout',function(req,res,next){
    req.session.destroy()
    res.redirect('/')
  })
  module.exports = router;