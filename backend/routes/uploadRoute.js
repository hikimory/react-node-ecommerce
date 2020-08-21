const {Router} = require('express')
const multer = require('multer')
const router = Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
const upload = multer({ storage });
  
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

module.exports = router