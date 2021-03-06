const cryptoRandomString = require("crypto-random-string");
const express = require("express");
const multer  = require("multer");
const os = require("os");

const storage = multer.diskStorage({
    destination: ".",
    filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage: storage });

const get_path = cryptoRandomString({length: 5, type: "distinguishable"});
const post_path = cryptoRandomString({length: 80, type: "url-safe"});

const app = express();

const printExternalIP = () => {
    const nics = os.networkInterfaces();

    let address = null;

    for (const nic of Object.keys(nics)) {
        for (const net of nics[nic]) {
            if (!net.internal && net.family === "IPv4") {
                address = net.address;
                break;
            }
        }
        if (address !== null) {
            break;
        }
    }

    if (typeof(address) === "string") {
        console.log(`visit "${address}:3000/${get_path}" to upload file.`);
    } else {
        console.log("WARNING: cannot find an external network connection.");
    }
};


const UPLOAD_PAGE = `
<html lang="en">
<head>
<meta charset="UTF-8" >
<title>IR Upload</title>

<body>
<h1>Select a file to upload</h1>
<form action="/${post_path}" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" />
</form>
</body>

</html>
`;

const SUCCESS_PAGE = `
<html lang="en">
<head>
<meta charset="UTF-8" >
<title>IR Upload</title>

<body>
<h1>Uploaded</h1>
<h2>Select another file to upload</h2>
<form action="/${post_path}" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" />
</form>
</body>

</html>
`;


app.get(`/${get_path}`, (req, res) => {
    res.send(UPLOAD_PAGE);
});

app.post(`/${post_path}`, upload.single("file"), (req, res) => {
    console.log(`received "${req.file.path}".`);
    res.send(SUCCESS_PAGE);
});

app.listen(3000, () => {
    console.log("upload server running.  will shut down after two minutes.");
    printExternalIP();
    setTimeout(() => {
        console.log("two minutes have passed.  shutting down upload server.");
        process.exit(0);
    }, 120000);
});


