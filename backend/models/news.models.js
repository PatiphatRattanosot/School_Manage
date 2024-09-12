const { DataTypes } = require('sequelize');
const sequelize = require('./db.models'); 

const News = sequelize.define('news', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  newsImage: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  newsType: {
    type: DataTypes.STRING,
    allowNull: false, 
  }
});

News.sync({ force: false })
  .then(() => {
    console.log("-----------------------");
    console.log('News Table Created');
    console.log("-----------------------");
  })
  .catch((err) => {
    console.error('Error creating table:', err);
  });

module.exports = News;
