const Comments = require('../models/comment.js')

class CommentController {

    getComments(req, res, next) {
        Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, comments: docs });
        });
    };

    async addComments(req, res, next) {
        //5. Створення документа
        const comment = new Comments({
            text: req.body.text,
            userNick: req.body.nick,
            post_ID: req.body.postID,
            data: "00-00-00"
        });
        //6. Збереження документа
        await comment.save();
        await Comments.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, comments: docs });
        });

    };

    deletePost(req, res, next) {
        console.log(req.query);
        console.log(req.body);
        //axios.delete(apiEndpoints.products.delete,{data:{id}})
        Comments.findOneAndDelete({ _id: req.body.id }, function (err, doc) {
            if (err)
                return res
                    .status(500)
                    .json({ success: false, err: { msg: "Saving faild!" } });
            res.json({ success: true });
        });
    };

};

module.exports = new CommentController();
