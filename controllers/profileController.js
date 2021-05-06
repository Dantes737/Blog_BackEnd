const Profile = require('../models/profile.js');
const ApiError = require('../error/ApiError.js');


class ProfileController {
    async getAllProfiles(req, res, next) {
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
            next(ApiError.dataBaseErrors('Bad Gateway'));
            return;
        }
    };

    async getOneProfile(req, res, next) {
        console.log(req.params.id);
        await Profile.findOne({ _id: req.params.id }, function (err, doc) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, user: doc });
        });
    };

    async updateStatus(req, res, next) {
        await Profile.findByIdAndUpdate({ _id: req.body.userId },
            { $set: { status: req.body.status } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving status!", profile: doc });
            });

    };
    async updateName(req, res, next) {
        await Profile.findByIdAndUpdate({ _id: req.body.userId },
            { $set: { name: req.body.name } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving name!", profile: doc });
            });

    };
    async updateProfile(req, res, next) {
        await Profile.findByIdAndUpdate({ _id: req.body.profileID },
            {
                $set: {
                    age: req.body.age,
                    country: req.body.country,
                    city: req.body.city
                }
            }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving image!", profile: doc });
            });

    };
    async updateImage(req, res, next) {
        await Profile.findByIdAndUpdate({ _id: req.body.userId },
            { $set: { avatarIMG: req.body.image } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving image!", profile: doc });
            });

    };

    followUpdate(req, res) {
        // Знаходимо і оновлюємо
        Profile.findOneAndUpdate({ _id: req.body.authId },
            { $push: { friends: req.body.userNick } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();
                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving follow status!", profile: doc });
            });
    };

    unfollowUpdate(req, res) {
        Profile.findByIdAndUpdate({ _id: req.body.authId },
            { $pull: { friends: req.body.userNick } }, { new: true }, function (err, doc) {
                // mongoose.disconnect();

                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true, message: "Saving unfollow status!", profile: doc });
            });
    };
    async getAllUsers(req, res, next) {
        await Profile.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, users: docs });
        });
    };
};

module.exports = new ProfileController();