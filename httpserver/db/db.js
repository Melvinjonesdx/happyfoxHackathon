const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize (Database Connection)
const sequelize = new Sequelize('happyfox', 'root', 'Manickam@2005', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Test Connection
sequelize.authenticate()
  .then(() => console.log("Connected to MySQL!"))
  .catch(err => console.error("Connection failed:", err));

// Business Model
const Building = sequelize.define('Building', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false
});

const Rooms = sequelize.define('Rooms', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buildingID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Building,
      key: 'id',
    },
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  event_description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  timestamps: false
});

Building.hasMany(Rooms, { foreignKey: "buildingID" });
Rooms.belongsTo(Building, { foreignKey: "buildingID" });


// Sync Database
sequelize.sync({ force: false })  
  .then(() => console.log("Database tables are ready!"))
  .catch(err => console.error("Sync failed:", err));

module.exports = { sequelize, Building,Rooms };
