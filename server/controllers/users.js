const database = require('./database');
const joi = require('joi');



module.exports={
    getAllUsers: async function(req, res, next){
        const sql = 'SELECT * FROM users'

        try{
            const result = await database.query(sql);
            res.json(result[0])
        }catch(err){
            console.log(err);
        }
    },

    addUser: async function(req,res,next){
        const reqBody = req.body;
        

        const schema = joi.object({
            full_name:joi.string().required().min(2).max(255),
            email: joi.string().required().regex(/^[^@]+@[^@]+$/),
            status:joi.string().required().min(6).max(8)
        })

        const {error, value} = schema.validate(reqBody);

        if (error){
            res.status(400).send('Error with adding user');
             console.log(error.details[0].message);
            return;
        }

        const sql ='INSERT INTO users (full_name, email, status)' + 'VALUES (?,?,?);';

        try{
            const result = await database.query(sql,
                [value.full_name, value.email, value.status]);
                value.user_id = result[0].insertId;
                console.log(value);
                res.json(value);
        }catch(err){
            console.log(err);
        }

    },

    deleteUser: async function(req,res,next){
        const param = req.body
        console.log(param);
        

        const schema= joi.object({
            user_id: joi.number().required(),
        })

        const {error, value} = schema.validate(param)
        


        if (error){
             console.log(error.details[0].message);
             return;
        }

        const sql= "DELETE FROM users WHERE user_id=?"

        try{
            await database.query(sql, [value.user_id]);
            res.json({user_id: req.body.user_id });
            console.log('User was successfuly deleted');

        }catch(err){
            res.status(400).send('Error while deleting user');
             console.log(err);
        }
    }
}