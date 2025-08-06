import Post from '../models/Post.js';

const getPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name');
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error',
            success: false,
        });
    }
};

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.create({
            user: req.user._id,
            text,
        });
        // console.log(post);
        const populatedPost = await Post.findById(post._id).populate('user', 'name');
        // console.log(populatedPost);
        return res.status(200).json({
            populatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error',
            success: false,
        });
    }
};

export { getPost, createPost };
