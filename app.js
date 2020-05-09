var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    Product               = require("./views/models/product"),
    User                  = require("./views/models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");



mongoose.connect("mongodb://localhost:27017/getindie",{ useNewUrlParser: true, useUnifiedTopology: true });

var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.use(require("express-session")({
    secret: "getindie is the best site",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req, res) {
    console.log(req.user);
    Product.find({},function(err, allProducts) {
    if(err) {
    console.log(err);
    } else {
    // console.log(req);
    res.render("home", {products: allProducts, currentUser: req.user});
    }
    });
    });
    
    

app.post("/", function(req,res) {
    var addedProduct = {
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        price:req.body.price
    };
    Product.create(addedProduct, function(err, product){
        if(err) {
            console.log(err);
        }else {
            console.log("new product added");
            res.redirect("/");
        }
    });
});


app.get("/newProduct",isLoggedIn,function(req,res) {
    res.render("newProduct",{currentUser:req.user});
})

//------------------------------------
//----all routes from here on ---------
//--------------------------------------

// app.get("/secret",isLoggedIn,function(req,res) {
//    console.log(req.user);
//     res.send("home");
// });

// app.get("/:id", function(req, res) {
//     Product.findById(req.params.id, function(err, foundProduct) {
//     if(err) {
//     console.log(err);
//     }
//     else {
//     res.render("show", {product: foundProduct});
//     }
//     });
//     });


// app.get("/:id",function(req,res) {
//     Product.findById(req.params.id, function(err ,foundProduct) {
//         if(err) {
//             console.log(err);
//         }else {
//             res.render("show",{product:foundProduct});
//         }
//     });
// });


//---auth routes---------------------------


app.get("/register" , function(req,res) {
    res.render("register");
});




app.post("/register" , function(req,res) {
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user) {
         if(err) {
             console.log(err);
             return res.render('register');
         }
         passport.authenticate("Local")(req,res,function(){
                 res.redirect("/");
         });
    });
 });
 
 app.get("/h",function(req,res) {
     res.render("newProduct");
 })

app.get("/login",function(req,res) {
    res.render("login",{currentUser:req.user});
})

app.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res) {
});

app.get("/logout", function(req,res) {
    req.logOut();
    res.redirect("/");
})






function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
























productsDb = [
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},
{
name: "A",
price: 100,
image: "https://www.thehindubusinessline.com/info-tech/h25mez/article28212918.ece/alternates/LANDSCAPE_660/BL29P3TRIFED",
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
category: "painting"
},

];


// productsDb.forEach(function(product) {
// Product.create(product, function(err, addedProduct) {
// if(err) {
// console.log(err);
// } else {
// console.log("New Product Added");
// console.log(addedProduct);
// }
// });
// });


	
	
	

















app.listen("3000",function() {
    console.log("server has started....");
})




