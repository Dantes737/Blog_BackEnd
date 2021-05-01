const Comments = require('../models/comment.js')

class CommentController {

    getComments(req, res, next) {
        Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, comments: docs });
        });
    };
    async getOnlyUserComments(req, res, next) {
        await Comments.find({ userNick: req.params.nick }, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, comments: docs });
        });
    };
    async addComments(req, res, next) {
        let currentDate = (new Date()).toLocaleDateString().split("/");
        //5. Створення документа
        const comment = new Comments({
            text: req.body.text,
            userNick: req.body.nick,
            post_ID: req.body.postID,
            data: currentDate[0]
        });
        //6. Збереження документа
        await comment.save();
        await Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, comments: docs });
        });

    };

    deleteComment(req, res, next) {
        console.log(req.params.id);
        Comments.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
            if (err)
                return res
                    .status(500)
                    .json({ success: false, err: { msg: "Saving faild!" } });
            res.json({ success: true, msg: "Comment deleted!" });
        });
    };

};

module.exports = new CommentController();
