const User =require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config =require('../utils/config');


const SECRET_KEY =config.SECRET_KEY;


const authController ={
        signup: async (req,res) => {
            try{
                const { username, password } = req.body;
                
                //check if the user already exists
                const existingUser = await User.findOne({username});

                if(existingUser){
                    return res.status(409).json({message:'User already exists'})
                }

                //hash psw before saving

                const hashedPassword= await bcrypt.hash(password, 10);

                //create a new user
                const newUser = new User ({
                    username,
                    password: hashedPassword,
                });

                //save the user
                await newUser.save();

                res.status(201).json({message: 'user created successfully'})

            } catch(error) {
                console.error('Error signing up user',error);
                res.status(500).json({message:'Internal server error'});
            }
        },

        signin: async (req, res) => {
            try {
                const { username, password } = req.body;
        
                // find the user by username
                const user = await User.findOne({ username });
                console.log('User:', user);
        
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
        
                // compare password
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log('Password Match:', passwordMatch);
        
                if (!passwordMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
        
                // generate and send the jwt token
                const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, {
                    expiresIn: '1h',
                });
        
                // Log the generated token
                console.log('Generated Token:', token);
        
                res.json({ token });
            } catch (error) {
                console.error('Error signing in user', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }}


module.exports =authController;