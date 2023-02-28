const Group = require("../models/group.model");
const ArtistGroup = require("../models/artist-group.model");
const Images = require("../models/image.model");
const mongoose = require("mongoose");

module.exports.list = (req, res, next) => { };

// find({ artistId: { $eq: artist.id}})

module.exports.detail = (req, res, next) => {
  console.log("detail > ", req.params.id);
  console.log("detail > ", req.artist?.id);

  Group.findById(req.params.id)
    .then((group) => {
      if (group) {
        return ArtistGroup.findOne({ artistId: req.artist?.id, groupId: group.id })
          .populate("groupId")
          .then(artistGroup => {
            // console.log('artistGroup > ', artistGroup)
            if (!artistGroup) {
              artistGroup = {
                artistId: null,
                groupId: group
              }
            }
            return Images.find({ author: { $eq: group.id } })
              .then((images) => {
                // console.log('artistGroup after > ', artistGroup)
                res.render("groups/group", { artistGroup, images });
              })
          })
      }
    })
    .catch(next)

  //******************* */

  // ArtistGroup.find({ artistId: req.artist?.id, groupId: req.params.id })
  //   .populate("groupId")
  //   .then((artistGroups) => {
  //     // console.log("group detail artistGroup > ", artistGroup);
  //     console.log("group detail > ", artistGroups);
  //     const artistGroup = artistGroups[0];
  //     return Images.find({ author: { $eq: artistGroup?.groupId?.id } }).then(
  //       (images) => {
  //         res.render("groups/group", { artistGroup, images });
  //       }
  //     );
  //   })
  //   .catch(next);
};

module.exports.new = (req, res, next) => {
  // delete res.locals.currentGroup;
  res.render("groups/group-profile", {});
};

module.exports.doNew = (req, res, next) => {
  console.log('groups doNew req.files > ', req.files)
  if (req.files.length === 1) {
    req.body.image = req.files[0].path;
  }
  const newGroup = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    image: req.body.image
  };
  Group.findOne({ email: newGroup.email })
    .then((group) => {
      if (!group) {
        return Group.create(newGroup).then((group) => {
          return ArtistGroup.create({
            artistId: req.artist.id,
            groupId: group.id,
          }).then((artistGroup) => {
            res.redirect(`/groups/${group.id}`);
          });
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("groups/group-profile", {
          errors: error.errors,
          currentGroup: newGroup,
        });
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {
  // res.locals.currentGroup
  Group.findById(req.params.id).then((group) => {
    res.render("groups/group-profile", { currentGroup: group });
  });
};

module.exports.doEdit = (req, res, next) => {
  if (req.files.length === 1) {
    req.body.image = req.files[0].path;
  }
  if (!req.body.forActing) {
    req.body.forActing = "false";
  }
  Group.findByIdAndUpdate(req.params.id, req.body)
    .then((group) => {
      res.redirect(`/groups/${group.id}`);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("groups/group-profile", { errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
   Promise.all([
    Group.findByIdAndDelete(req.params.id),
    ArtistGroup.deleteMany({ groupId: req.params.id }),
    Images.deleteMany({ author: req.params.id })
   ]).then(([group, artistGroup, images]) => { // devuelve un array
    res.redirect(`/artists/${req.artist.id}`)
   })
   .catch(next)
}