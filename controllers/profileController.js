const Profile = require('../models/profile.js');

class ProfileController {
    async getAllProfiles(req, res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        results.totalCount = await Profile.countDocuments().exec();
        if (endIndex < await Profile.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await Profile.find().limit(limit).skip(startIndex).exec()
            // res.paginatedResults = results;
            res.json(results)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    };


    async getOneProfile(req, res, next) {
        console.log(req.params.id);
        Profile.findOne({ _id: req.params.id }, function (err, doc) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

            res.status(200).json({ success: true, user: doc });
        });
    };

    async updateStatus(req, res, next) {
        await Profile.findOneAndUpdate({ _id: req.body.userId },
            { $set: { status: req.body.status } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err)
                    return res
                        .status(500)
                        .json({ success: false, err: { msg: "Saving fail!" } });
                res.json({ success: true, message: "Saving status!", profile: doc });
            });

    };

    async followUpdate(req, res) {
        // Знаходимо і оновлюємо
        Profile.findByIdAndUpdate({ _id: req.body.userId },
            { $set: { followed: true } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err)
                    return res
                        .status(500)
                        .json({ success: false, err: { msg: "Saving fail!" } });
                res.json({ success: true, message: "Saving follow status!", profile: doc });
            });
    };

    async unfollowUpdate(req, res) {
        Profile.findByIdAndUpdate({ _id: req.body.userId },
            { $set: { followed: false } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();

                if (err)
                    return res
                        .status(500)
                        .json({ success: false, err: { msg: "Saving fail!" } });
                res.json({ success: true, message: "Saving follow status!", profile: doc });
            });
    };
};

module.exports = new ProfileController();