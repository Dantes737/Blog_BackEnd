const Comments = require('../models/comment.js');
const ApiError = require('../error/ApiError.js');

class CommentController {

    async getComments(req, res, next) {
        await Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, comments: docs });
        });
    };
    async getOnlyUserComments(req, res, next) {
        await Comments.find({ userNick: req.params.nick }, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, comments: docs });
        });
    };
    async addComments(req, res, next) {
        let currentDate = (new Date()).toLocaleDateString().split("/");

        const comment = new Comments({
            text: req.body.text,
            userNick: req.body.nick,
            post_ID: req.body.postID,
            data: currentDate[0]
        });
        await comment.save();
        await Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, comments: docs });
        });

    };

    async deleteComment(req, res, next) {
        console.log(req.params.id);
        await Comments.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
            if (err) {
                next(ApiError.dataBaseErrors('Saving faild'));
                return;
            };
            res.json({ success: true, comment: doc });
        });
    };
};

module.exports = new CommentController();
