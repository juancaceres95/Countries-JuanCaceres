const {Router} = require ('express');
const router = Router();
const {Op}= require("sequelize");
const {Country, Activity} = require('../db');

router.get ('/', async (req, res) =>{
    let {name, page} = req.query;

    try{
    if(name){
        const country = await Country.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        return res.status(200).json(country);
    }
    else {
        country = await Country.findAndCountAll({ offset: page * 10, limit: 10 })
        return res.status(200).json({ content: country.rows, totalPages: Math.ceil(country.count / 10) })
  
      }
    } catch (err) {
      res.status(500).json({ messaje: err })
    }
});


router.get('/all', async(req,res)=>{
    let country= await Country.findAll(
      {include:[Activity]}
    );
    return res.status(200).json(country)
  })

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    let country = await Country.findByPk(id,{include: Activity});
    res.send(country);
})

//ver porque esto me devuelve un json vacio
module.exports = router;