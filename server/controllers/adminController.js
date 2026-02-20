import User from '../models/userModel.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
async function getUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Cannot delete admin user' });
        }

        await User.deleteOne({ _id: user._id });

        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.isBlocked =
            req.body.isBlocked !== undefined
                ? req.body.isBlocked
                : user.isBlocked;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isBlocked: updatedUser.isBlocked,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
