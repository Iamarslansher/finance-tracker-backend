import express from "express";
import Users from "../modles/User.mjs";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const users = await Users.find();
  res.send({ data: users });
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.create(req.body);
    const token = user.generateToken();
    await Users.findByIdAndUpdate(user._id, {
      token,
    });
    const crntuser = await Users.findOne({ email });
    res.send({ message: "User created successfully!", user: crntuser });
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.send({ message: "Invalid email" });
    }

    //Step 2: Compare Password
    const isCorrectPass = user.comparePassword(password);
    if (!isCorrectPass) {
      res.send({ message: "Invalid Password" });
      return;
    }

    //Step 3: GENRATE TOKEN
    const token = user.generateToken();
    // UPDATE USER TOKEN
    await Users.findByIdAndUpdate(user._id, {
      token,
    });

    const cruentUser = await Users.findOne({ email });

    res.send({ message: "logged", user: cruentUser });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/updateprofile", upload.single("image"), async (req, res) => {
  try {
    const { name, email, userId } = req.body;
    const path = req.file;
    console.log(path);
    if (!path) {
      await Users.findByIdAndUpdate(userId, {
        userName: name,
        email: email,
        // image: req.file.path,
      });
    } else {
      await Users.findByIdAndUpdate(userId, {
        userName: name,
        email: email,
        image: req.file.path,
      });
    }

    const user = await Users.findOne({ email });

    res.send({ message: "update profile successfully", user });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
