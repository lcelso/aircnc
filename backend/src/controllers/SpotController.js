const fs = require("fs");
const path = require("path");

const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ erro: "Usuario não existe" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  },

  async delete(req, res) {
    const { id } = req.params;

    const spot = await Spot.find({ _id: id });
    const pathThumbnail = path.resolve(
      __dirname,
      "..",
      "..",
      "uploads",
      spot[0].thumbnail
    );

    fs.unlink(pathThumbnail, err => {
      if (err) {
        console.error(err);
        return;
      }
      res.json("Successfully image removed");
    });

    Spot.findByIdAndRemove(req.params.id, err => {
      if (err) {
        return next(new Error("Todo was not found!"));
      }
      res.json("Successfully removed");
    });
  }
};
