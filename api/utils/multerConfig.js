import multer from "multer";

export const multerConfig = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/importedFiles");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.fieldname);
    },
  });
};
