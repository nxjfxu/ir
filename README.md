# ir

`ir` is a simple file upload server for sending files across a LAN.
I wrote it because sending photos from my mobile phone to my Linux machine is a pain.

"`ir`" means "infrared" which was used to exchange information between mobile devices
once upon a time.


## Security Warning

`ir` is only intended to be used in a relatively secure LAN.
Anyone in the same network can upload file through `ir`,
and it does not encrypt any file sent over it.
**Use with caution.**


## Running `ir`

You need NodeJS and NPM to run `ir`.

First, clone this repository and install the dependencies:
```
git clone https://github.com/nxjfxu/ir.git
cd ir
npm install
```

After that, you can start the server with
```
npm start
```

The server will display the URL of the upload page,
which should be accessible within the same LAN.
Uploaded files will be saved in the same directory as `ir`.
After two minutes the server will shut down automatically.
