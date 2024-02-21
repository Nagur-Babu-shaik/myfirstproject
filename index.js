const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/student');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.post('/search',function(req,res){
    console.log(req.body)
    return res.redirect('back');
})

app.get('/', function(req, res){ 
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
     
    })
  
})
app.post('/create-list', function(req, res){
     
    Contact.create({
        name: req.body.name,
        roll: req.body.roll,
        place: req.body.place
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});
app.post('/search', function(req, res){


    Contact.find({'name': req.body.search}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-stu/', function(req, res){
    console.log(req.query);
    let id = req.query.id
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log(`error in deleting an object from database`)
            return
        }

    })
    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactList.splice(contactindex, 1);
    // }

    return res.redirect('back');
});
