const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Hero = sequelize.define("hero", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
  real_name: { type: DataTypes.STRING, unique: true, allowNull: false },
  origin_description: { type: DataTypes.STRING },
  superpowers: { type: DataTypes.STRING },
  catch_phrase: { type: DataTypes.STRING },
  images: { type: DataTypes.STRING },
  // Images: {type: DataTypes.ARRAY(DataTypes.STRING)},
});

module.exports = {
  Hero,
};
