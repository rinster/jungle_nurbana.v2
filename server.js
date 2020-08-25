const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

app.use(flash());
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());

// nodemailer----------------------------------
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@address.com",
    pass: "yourpassword"
  }
});

// session
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 36000000 } //1hour
  })
);

////////MONGOOSE --------------------------------------------------
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/jungle_nurbana_test",
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);
mongoose.Promise = global.Promise;

/////////MONGOOSE SCHEMA
const UserProfileSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      maxlength: [50, "Header must be less than 50 characters"]
    },
    Expertise: {
      type: String,
      maxlength: [150, "This field must less than 150 characters"]
    },
    bio: {
      type: String,
      maxlength: [500, "Keep it simple, 500 characters or less please"]
    },
    imageUrl: { type: String }
  },
  { timestamps: true }
);
mongoose.model("UserProfile", UserProfileSchema);
const UserProfile = mongoose.model("UserProfile");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name must be entered"],
      minlength: [1, "Name must have more than 1 character"]
    },
    email: {
      type: String,
      required: [true, "An email must be entered"],
      unique: [true, "Email already exists on file"]
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [6, "Password must be 6 characters or more"]
    },
    profile: [UserProfileSchema]
  },
  { timestamps: true }
);
mongoose.model("User", UserSchema);
const User = mongoose.model("User");
UserSchema.plugin(uniqueValidator);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title must be entered"],
      maxlength: [150, "Titles should be less than 150 characters"]
    },
    name: {
      type: String,
      required: [true, "A subtitle must be entered"],
      maxlength: [150, "Subtitle must be 150 characters or less."]
    },
    type: { type: String, required: [true, "A plant type must be entered"] },
    location: { type: String, required: [true, "A location must be entered"] },
    postText: {
      type: String,
      trim: false,
      required: [true, "Please enter a blog post"],
      minlength: [50, "Post should be 50 characters or longer"]
    },
    imageUrl1: { type: String, required: [true, "Please include one image"] },
    imageUrl2: { type: String },
    imageUrl3: { type: String },
    author: { type: String }
  },
  { timestamps: true }
);
mongoose.model("Post", PostSchema);
const Post = mongoose.model("Post");

const FavSchema = new mongoose.Schema(
  {
    favPostId: { type: String, required: [true, "A post ID must be entered"] },
    favoriterId: {
      type: String,
      required: [true, "A Favoriters ID must be entered"]
    }
  },
  { timestamps: true }
);
mongoose.model("Favorite", FavSchema);
const Fav = mongoose.model("Favorite");

////////ROUTING HERE ------------------------------------
// // // Create New User
app.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save(function(err) {
      if (err) {
        console.log("Error in creating user");
        res.json({ message: "Error in creating user", error: err });
      } else {
        res.json({ message: "Success in creating user!" });
      }
    });
  });
});
// // // Login & Activate Session
app.post("/session", async (req, res, next) => {
  console.log(" req.body: ", req.body);
  console.log("Grabbing user");
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ error: "This account does not exist." });
    } else {
      let checkpw = await bcrypt.compare(req.body.password, user.password);
      if (checkpw == false) {
        return res.json({
          error: "Authentication failed. Email or password do not match."
        });
      } else {
        req.session.user_id = user._id;
        req.session.email = user.email;
        req.session.name = user.name;
        console.log(req.session.id);
        console.log(req.session.cookie);
        return res.json({
          message: "Successfully Authenticated",
          userID: user._id,
          email: user.email,
          session: req.session
        });
      }
    }
  } catch (err) {
    res.json({ message: "Unexpected error occurred", error: err });
  }
});
// // // Logout
app.post("/clear", (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Session cleared");
      return res.json({ message: "Session cleared" });
    }
  });
});

// //GET USER BY ID --------
app.get("/retrieve/:id", function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log("Could not get User", err);
    } else {
      // console.log("Successfully retrieved the User", data.name);
      res.json({ name: data.name, userprofile: data.profile });
    }
  });
});

// // // USER UPDATE PROFILE METHOD
app.post("/editProfile/:id", function(req, res) {
  console.log("Editing User", req.body, "With ID:", req.params.id);
  UserProfile.create(req.body, function(err, data) {
    if (err) {
      res.json({ Message: "Error updating Profile", err: error });
    } else {
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { profile: data } },
        function(err, data) {
          if (err) {
            res.json({
              Message: "something went wrong",
              errors: message.errors
            });
          } else {
            res.json({ message: "Success profile updated" });
          }
        }
      );
    }
  });
});

// // //NEW POST HERE ------
app.post("/new", function(req, res) {
  console.log("Reached the server!", req.body);
  const newPost = new Post(req.body);
  console.log("making new Pet");
  newPost.save(function(err) {
    if (err) {
      console.log("error creating new Post");
      res.json({ message: "error creating new Post", error: err });
    } else {
      res.json({ message: "Success", id: newPost._id });
    }
  });
});

// // // GET ALL POSTS sort by recent first
app.get("/getAll", function(req, res) {
  console.log("Getting all posts...");
  Post.find({})
    .sort({ createdAt: -1 })
    .exec(function(err, data) {
      console.log(data);
      if (err) {
        res.json({ message: "Not able to get all!", error: err });
      } else {
        res.json({ message: "Success", posts: data });
      }
    });
});
// // // GET ALL POSTS BY AUTHOR ID sort by recent first
app.get("/getAllPosts/:id", function(req, res) {
  console.log("Post authorID: ", req.params.id);
  Post.find({ author: req.params.id })
    .sort({ createdAt: -1 })
    .exec(function(err, data) {
      console.log(data);
      if (err) {
        res.json({ message: "Not able to get all!", error: err });
      } else {
        res.json({ message: "Success", posts: data });
      }
    });
});
// // // GET ONE POST BY ID
app.get("/getPost/:id", function(req, res) {
  // console.log("Post ID: ", req.params.id);
  Post.find({ _id: req.params.id }, function(err, data) {
    // console.log(data);
    if (err) {
      res.json({ message: "Not able to get post!", error: err });
    } else {
      res.json({ message: "Success", post: data });
    }
  });
});

// // //PUT: UPDATE HERE ------
// //PUT: Update a POST by ID
app.put("/updatePost/:id", function(req, res) {
  console.log("Made it to the server! EDITING", req.body);
  console.log(req.params.id);
  Post.findById(req.params.id).exec((err, t) => {
    if (err) {
      console.log("Something went wrong!", err);
      res.json({ message: "Error", error: err });
    } else {
      t.title = req.body.title;
      t.name = req.body.name;
      t.type = req.body.type;
      t.location = req.body.location;
      t.postText = req.body.postText;
      t.imageUrl1 = req.body.imageUrl1;
      t.imageUrl2 = req.body.imageUrl2;
      t.imageUrl3 = req.body.imageUrl3;
      t.save().then(() => {
        console.log("Saved!!");
        res.json({ message: "Updated Post!" });
      });
    }
  });
});

// // //Add Like by Updating - it does not exist create new document
app.put("/addlike", function(req, res) {
  console.log("Adding like...", req.body);
  Fav.update(
    { favPostId: req.body.favPostId, favoriterId: req.body.favoriterId },
    {
      $setOnInsert: {
        favPostId: req.body.favPostId,
        favoriterId: req.body.favoriterId
      }
    },
    { upsert: true },
    function(err) {
      if (err) {
        res.json({ message: "Not able to get all!", error: err });
      } else {
        res.json({ message: "Success" });
      }
    }
  );
});

// // //Get Favorites by specific liker's ID
app.get("/getLikes/:id", function(req, res) {
  console.log("Obtaining favorites...");
  Fav.find({ favoriterId: req.params.id }, function(err, data) {
    console.log(data);
    if (err) {
      res.json({ message: "Not able to get all!", error: err });
    } else {
      res.json({ message: "Success", favs: data });
    }
  });
});

// // //Post Data to get all the favorited articles by ID
app.post("/favBlogs", function(req, res) {
  console.log("Getting blogs...", req.body);
  Post.find({ _id: { $in: req.body.ids } }, function(err, docs) {
    console.log("Data posts: ", { data: docs });
    if (err) {
      return res.json({ error: err });
    } else {
      return res.json({ Messsage: "Success!", favPosts: docs });
    }
  });
});

// // // Query to see if specific favorite exists
app.post("/getFavorite", function(req, res) {
  console.log("Querying favorites", req.body);
  Fav.find(
    {
      $and: [
        { favPostId: req.body.favPostId },
        { favoriterId: req.body.favoriterId }
      ]
    },
    function(err, data) {
      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ Message: "Success!", favorite: data });
      }
    }
  );
});
// //DELETE HERE ------
// // // DELETE FAVORITE METHOD
app.delete("/removeFavorite/:id", function(req, res) {
  console.log("DELETING Favorite:", req.params);
  Fav.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      console.log("An error occurred", err);
      res.json({ message: "Error", error: err });
    } else {
      console.log("Successfully deleted Favorite");
      res.json({ message: "Successfully Deleted Favorite!" });
    }
  });
});

// // // DELETE POST METHOD
app.delete("/delete/:id", function(req, res) {
  console.log("DELETING POST ID:", req.params.id);
  Post.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      console.log("An error occurred", err);
      res.json({ message: "Error", error: err });
    } else {
      console.log("Successfully deleted Post");
      res.json({ message: "Successfully Deleted!" });
    }
  });
});

//NODEMAILER METHOD
app.post("/sendMail", function(req, res) {
  const mailOptions = {
    from: "jungleNurbana@email.com",
    to: "req.body.email", 
    subject: "Thank you for subscribing!",
    html: "<p>Welcome to the Jungle Nurbana</p>"
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err)  {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});

//Default Angular Routing - Hit the index html of Angular
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"));
});

app.listen(8000, function() {
  console.log("Magic happens on port 8000");
});
