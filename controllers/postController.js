const Posts = require('../models/post.js');

class PostController {

    getPosts(req, res, next) {
        Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, posts: docs });
        });
    };
    getOnlyUserPosts(req, res, next) {
        Posts.find({userNick:req.params.nick}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, posts: docs });
        });
    };

    async addPost(req, res, next) {
        let currentDate = (new Date()).toLocaleDateString().split("/");

        const post = new Posts({
            text: req.body.text,
            data: currentDate[0],
            img: req.body.imageSrc,
            userNick: req.body.nick,
            title: req.body.title,
            coments: [],
        });
        //6. Збереження документа
        await post.save(function (err, userPost) {
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
        });

        await Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, posts: docs });
        });

    };

    addCom(req, res) {
        // Знаходимо і оновлюємо
        Posts.findByIdAndUpdate({ _id: '60253a8d79009b5084ee8693' },
            {
                $push: { comments: req.body.comment_text }
            }, function (err, doc) {
                // mongoose.disconnect();

                if (err)
                    return res
                        .status(500)
                        .json({ success: false, err: { msg: "Saving faild!" } });
                res.json({ success: true });
            });
    };

    deletePost(req, res, next) {
        Posts.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
            if (err)
                return res
                    .status(500)
                    .json({ success: false, err: { msg: "Saving faild!" } });
            res.json({ success: true,post:doc });
        });
    };

};

module.exports = new PostController();
