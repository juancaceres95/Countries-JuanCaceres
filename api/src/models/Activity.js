const {DataTypes} = require ('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("activity", {
        
        actId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.ENUM,
            values:['High', 'Medium High', 'Medium', 'Medium Low', 'Low'],
            allowNull: false, 
        },
        duration:{
            type: DataTypes.STRING,
        
        },
        season:{
            type: DataTypes.ENUM,
            values: ["summer", "autumn","winter","spring"],
            allowNull:false 
        }
    })
}