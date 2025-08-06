import User from '../models/User.js';
import Post from '../models/Post.js';

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        const posts = await Post.find({ user: req.params.id }).sort({
            createdAt: -1,
        });

        if (user) {
            res.json({ user, posts });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export default getUserProfile;
