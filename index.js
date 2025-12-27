'use strict';

/*A. Part 1: Coding Questions (7.5 Grade): */
const path = require('node:path');
const fs = require('node:fs');
const { EventEmitter } = require('node:events');
const eventEmitter = new EventEmitter();
const os = require('node:os');

/* Task 1 Write a function that logs the current file path and directory. (0.5 Grade)
• Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}*/

const getFilePath = function () {
  const filePath = __filename;
  const directoryPath = __dirname;
  console.log({ File: filePath, Dir: directoryPath });
};
getFilePath();

/* Task 2 Write a function that takes a file path and returns its file name. (0.5 Grade)
• Input Example: /user/files/report.pdf
• Output Example:"report.pdf" */

const getFileName = (pathFile) => path.basename(pathFile);
console.log(getFileName(__filename));

/* Task 3 Write a function that builds a path from an object (0.5 Grade)
• Input Example: { dir: "/folder", name: "app", ext: ".js"}
• Output Example: “/folder/app.js” */
const buildPath = function (objectPaths) {
  const { dir, name, ext } = objectPaths;
  return path.resolve(dir, name, ext);
};
console.log(buildPath({ dir: '/folder', name: 'app', ext: '.js' }));

/* Write a function that returns the file extension from a given file path. (0.5 Grade)
• Input Example: /docs/readme.md"
• Output Example: “.md” */

const getExtension = (pathFile) => path.extname(pathFile);
console.log(getExtension('/docs/readme.md'));

/* Task 5 Write a function that parses a given path and returns its name and ext. (0.5 Grade)
• Input Example: /home/app/main.js
• Output Example: { Name: “main”, Ext: “.js” }  */

const parsTrasform = function (pathFile) {
  //more readable
  const parseResult = path.parse(pathFile);
  const { name, ext } = parseResult;
  return { name, ext };
  //2
  // const {name,ext}=path.parse(pathFile);
  // return {name,ext};
};
console.log(parsTrasform('/home/app/main.js'));

/* Task 6 Write a function that checks whether a given path is absolute. (0.5 Grade)
• Input Example: /home/user/file.txt
• Output Example: true */

const checkIsAbsolutePath = (pathFile) => path.isAbsolute(pathFile);
console.log(checkIsAbsolutePath('/home/user/file.txt'));
/* Task 7  Write a function that joins multiple segments (0.5 Grade)
• Input:"src","components", "App.js"
• Output Example: src/components/App.js */

const buildPathRelative = (...pathFile) => path.join(...pathFile);
console.log(buildPathRelative('src', 'components', 'App.js'));

/* Task 8 Write a function that resolves a relative path to an absolute one. (0.5 Grade)
• Input Example: ./index.js
• Output Example: /home/user/project/src/index.js */

const transformToAbsolutePath = (pathFile) => path.resolve(pathFile);
console.log(transformToAbsolutePath('./index.js'));

/* Task 9 Write a function that joins two paths. (0.5 Grade)
• Input Example: /folder1, folder2/file.txt
• Output Example: /folder1/folder2/file.txt*/
const joinTwoPaths = function (pathFile) {
  // const cleanPath=pathFile.replaceAll(' ','').split(',')
  if (typeof pathFile !== 'string') {
    return 'invaild type of input';
  } else {
    const cleanPath = pathFile.split(',').map((path) => path.trim());
    return path.join(...cleanPath);
  }
};
console.log(joinTwoPaths('/folder1, folder2/file.txt'));

/* Task 10. Write a function that deletes a file asynchronously. (0.5 Grade)
• Input Example: /path/to/file.txt
• Output Example: The file.txt is deleted. */

const deleteFile = (pathFile) =>
  fs.unlink(pathFile, (err) => {
    err ? console.log(err.message) : console.log('The file.txt is deleted');
  });
deleteFile('./test.js');

/* Task 11. Write a function that creates a folder synchronously. (1 Grade)
• Output Example: “Success”*/
const creatFolder = function (pathFile) {
  try {
    fs.mkdirSync(pathFile, { recursive: true });
    return console.log('succes');
  } catch (err) {
    console.log(err.message);
  }
};
creatFolder('./newFolder1/profile/pic');

/* Task 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
• Output Example: Welcome event triggered! */

eventEmitter.on('start', () => {
  console.log('Welcome event triggered!');
});

eventEmitter.emit('start');

/* Task 13 Emit a custom "login" event with a username parameter. (0.5 Grade)
• Input Example:"Ahmed"
• Output Example: “User logged in: Ahmed” */

eventEmitter.on('login', (usserName) => {
  console.log(`User logged in : ${usserName}`);
});
eventEmitter.emit('login', 'Ahmed');

/* Task 14   Read a file synchronously and log its contents. (1 Grade)
• Input Example:"./notes.txt"
• Output Example: the file content => “This is a note.” */
try {
  const data = fs.readFileSync('./notes.txt', { encoding: 'utf-8' });
  console.log(data);
} catch (err) {
  console.log(err.message);
}
/* Task 15. Write asynchronously to a file. (1 Grade)
• Input: path:"./async.txt", content:"Async save" */
const writeFile = function (obj) {
  const { path, data } = obj;

  return new Promise((resolve, reject) => {
    if (!path || typeof path !== 'string' || !data || typeof data !== 'string')
      return reject('ivailed input');
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err);
      else {
        return resolve('succes');
      }
    });
  });
};
async function asyncCall() {
  try {
    const result = await writeFile({ path: './async.txt', data: 'Async save' });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
asyncCall();

/* Task 16. Check if a directory exists. (0.5 Grade)
• Input Example: "./notes.txt"
• Output Example: true */
fs.exists('./async.txt', (exists) => {
  console.log(exists);
  //way more readable
  // exists ? console.log('found') : console.log('not found');
});
// another way
// fs.access('./async.txt', fs.constants.F_OK, (err) => {
//   err ? console.log(false) : console.log(true);
// });

/**17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
• Output Example: {Platform: “win32”, Arch: “x64”} */

const getInformationSystem = () => ({
  Platform: os.platform(),
  Arch: os.arch(),
});

//another way

// const getInformationSystem = function () {

//   another way
//   const osPltatform = os.platform();
//   const architecture = os.arch();
//   return { osPltatform, architecture };
// };

console.log(getInformationSystem());
