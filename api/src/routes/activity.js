const {Router} = require ('express');
const router = Router();

const {Activity, Country} = require('../db');

router.post('/', async (req,res)=>{
    const {name, duration, season, difficulty, code} = req.body;
        
    const activityCreated = await Activity.create({
        name,
        duration,
        season,
		difficulty
		
    });


await activityCreated.setCountries(code);
const find = await Activity.findOne({
    where:{
        name
    },
    include:{
        model:Country,
         attributes:['id'],
         through: {
            attributes: [],
        },
    }
    })
    return res.json({Mensaje:'Se ha agregado con éxito la actividad', actividadCreada:find});
})
module.exports= router;