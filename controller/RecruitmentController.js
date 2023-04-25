class RecruitmentController {
    async addRecruitment (req, res, next) {
        console.log(req.body)
        //console.log(req.file.filename)
    }
}

module.exports = new RecruitmentController ()