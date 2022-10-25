// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {

    res.render("faculties/add", {
      title: "Add Faculties",
      displayName: req.user ? req.user.displayName : "",
});
  

});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let newFaculty = faculty({
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  faculty.create(newFaculty, (err, faculty) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the faculties list
      res.redirect("/faculties");
    }
  });
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object
  faculty.findById(id, (err, facultytoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("faculties/details", { title: "Edit Faculty", faculties: facultytoedit });
    }
  });


  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatefaculty = faculties({
    _id: id,
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  faculty.updateOne({ _id: id }, updatefaculty, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the faculty list
      res.redirect("/faculties");
    }
  });


  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {

  let id = req.params.id;
  faculty.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh faculty list
      res.redirect("/faculties");
    }
  });

  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
