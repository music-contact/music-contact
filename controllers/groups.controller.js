const mongoose = require("mongoose");

const Artist = require("../models/artist.model");
const Group = require("../models/group.model");
const ArtistGroup = require("../models/artist-group.model");
const Images = require("../models/image.model");

const SpotifyApi = require("../config/spotify.config");

module.exports.detail = (req, res, next) => {
  console.log("group detail > ", req.params.id);
  // console.log("detail > ", req.artist?.id);

  function getTracks(group) {
    if (group.socialMedia?.spotify) {
      const spotifyId = group.socialMedia.spotify.split("/").pop();
      return SpotifyApi.getArtistTopTracks(spotifyId, "GB").then((data) => {
        group.topTracks = data.body.tracks.map((track) => ({
          name: track.name,
          url: track.preview_url,
        }));
        return group;
      });
    }

    return Promise.resolve(group);
  }

  Group.findById(req.params.id)
    .populate({
      path: "artistOwners",
      match: {
        artistId: { $eq: req.artist?.id },
      },
      populate: {
        path: "artistId",
      },
    })
    .populate({
      path: "artists",
      populate: {
        path: "artistId",
      },
    })
    .populate({
      path: "images",
    })
    .then((group) => {
      console.log("group > ", group.toJSON({ virtuals: true }));
      // console.log('req.artist?.id > ', req.artist?.id)
      // console.log('group.artists[0]?.artistId > ', group.artists[0]?.artistId)
      return getTracks(group).then((group) => {
        // res.send('done!')
        // console.log('group > ', group.toJSON({ virtuals: true }))
        const top3Images = JSON.parse(JSON.stringify(group.images.slice(0,2)))
        top3Images.forEach((image, index) =>  image.index = index)
        res.render("groups/group", { group, top3Images });
      });
    })
    .catch(next);
};

module.exports.new = (req, res, next) => {
  // delete res.locals.currentGroup;
  res.render("groups/group-profile", {});
};

module.exports.doNew = (req, res, next) => {
  // console.log('groups doNew req.files > ', req.files)
  if (req.files.length === 1) {
    req.body.image = req.files[0].path;
  }
  const newGroup = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    image: req.body.image,
  };

  // console.log('group doNew > ', newGroup )
  Group.findOne({ email: newGroup.email })
    .then((group) => {
      if (!group) {
        return Group.create(newGroup).then((group) => {
          return ArtistGroup.create({
            artistId: req.artist.id,
            groupId: group.id,
            role: "admin",
          }).then((artistGroup) => {
            res.redirect(`/groups/${group.id}`);
          });
        });
      } else {
        // console.log('email already exists!')
        res.render("groups/group-profile", {});
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
  Group.findById(req.params.id).then((currentGroup) => {
    console.log("group edit > ", currentGroup);
    return Artist.find({ _id: { $ne: mongoose.Types.ObjectId(req.artist?.id) } }).then((candidates) => {
      console.log('candidates to group > ', candidates)
      res.render("groups/group-profile", { currentGroup, candidates });
    })
  })
    .catch(next);
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
      // TODO: SI HAY CANDIDATOS, AÑADIR DOCS CORRESPONDIENTES EN ARTISTGROUPS CON ROLE NULL 
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
    Images.deleteMany({ author: req.params.id }),
  ])
    .then(([group, artistGroup, images]) => {
      // devuelve un array
      res.redirect(`/artists/${req.artist.id}`);
    })
    .catch(next);
};
