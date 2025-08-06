import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const Signup = async (req, res) => {
    const { name, email, password, bio } = req.body;

    if (!name || !email || !password) return res.json({ message: 'All fields are required!' });

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.json({ message: 'User already exists!' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            bio,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        return res.status(200).json({
            message: `${user.name} You Registered successfull 🎉`,
            user,
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user)
            return res.status(401).json({
                message: `User Not Found`,
            });

        // compare password
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if (match) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({
                message: `${user.name} You Loged in .`,
                user,
                token,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error🙅' });
    }
};

export { Signup, Login };
