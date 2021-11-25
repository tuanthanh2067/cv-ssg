# cv-ssg

CV-SSG is a command line tool that will produce **.html** files from **.txt** and **.md** files

# Built with

[Nodejs](https://nodejs.org/en/)

# How to use

Step 1: `npm i -g cv-ssg` to install static site generator globally
Step 1A: In case you don't have node installed, you can install it [here](https://nodejs.org/en/)
Step 2: `cv-ssg <option> <filename>` to convert files
Step 2A: For options, please see option keys sector below.

# Features

- Generate **.html** files from a folder of **.txt** and **.md** files
- Recursively read a folder if there's any
- Allow stylesheets or default stylesheet
- Parse **Heading1** Markdown syntax into correct HTML syntax for input file of type **.md**

# Option keys

| Options            | Functions                                                   |
| ------------------ | ----------------------------------------------------------- |
| -v or --version    | prints the current version                                  |
| -h or --help       | prints a list of options to the screen                      |
| -i or --input      | accepts either a file or a folder                           |
| -s or --stylesheet | accepts a url link to the stylesheet                        |
| -c or --config     | accepts a config.json file containing other options' values |

# License

[MIT](https://choosealicense.com/licenses/mit/)
