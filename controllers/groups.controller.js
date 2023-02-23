const Group = require("../models/group.model");
const ArtistGroup = require("../models/artist-group.model");
const Images = require('../models/image.model');
const mongoose = require("mongoose");

module.exports.list = (req, res, next) => {};

// find({ artistId: { $eq: artist.id}})

module.exports.detail = (req, res, next) => {
  console.log('detail > ', req.params.id)
  console.log('detail > ', req.artist?.id)
  // console.log('req.artist > ', req.artist)
  // console.log('req.params > ', req.params)
  ArtistGroup.find({ artistId: req.artist?.id, groupId:  req.params.id })
    .populate('groupId')
    .then((artistGroup) => {
      // console.log("group detail artistGroup > ", artistGroup);
      console.log('group detail > ', artistGroup)
      return Images.find({ author: { $eq: artistGroup.groupId?.id}})
      .then((images) => {
        res.render("groups/group", { artistGroup, images });
      }) 
    })
    .catch(next);
};

module.exports.new = (req, res, next) => {
  // delete res.locals.currentGroup;
  res.render("groups/group-profile", {});
};

module.exports.doNew = (req, res, next) => {
  const newGroup = {
    name: req.body.name,
    email: req.body.email,
  };
  // console.log("newGroup > ", newGroup);
  Group.findOne({ email: newGroup.email })
    .then((group) => {
      if (!group) {
        return Group.create(newGroup).then((group) => {
          return ArtistGroup.create({
            artistId: req.artist.id,
            groupId: group.id
          }).then((artistGroup) => {
            res.redirect(`/groups/${group.id}`);
          });
        });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('groups/group-profile', {errors: error.errors, currentGroup: newGroup})
      } else {
        next(error)
      }
    });
};

module.exports.edit = (req, res, next) => {
  // res.locals.currentGroup
  Group.findById(req.params.id)
  .then(group => {
    res.render("groups/group-profile", { currentGroup: group });
  })
};

module.exports.doEdit = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  if (!req.body.forActing) {
    req.body.forActing = 'false'
  }
  Group.findByIdAndUpdate(req.params.id, req.body)
  .then(group => {
    res.redirect(`/groups/${group.id}`)
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('groups/group-profile', {errors: error.errors})
    } else {
      next(error)
    }
  })
};
