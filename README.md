# cv-ssg

CV-SSG is a command line tool that will produce **.html** files from **.txt** and **.md** files

# Built with

[Nodejs](https://nodejs.org/en/)

# Features

- Generate **.html** files from a folder of **.txt** and **.md** files
- Recursively read a folder if there's any
- Allow stylesheets or default stylesheet
- Parse **Heading1** Markdown syntax into correct HTML syntax for input file of type **.md**

# Option keys

| Options            | Functions                              |
| ------------------ | -------------------------------------- |
| -v or --version    | prints the current version             |
| -h or --help       | prints a list of options to the screen |
| -i or --input      | accepts either a file or a folder      |
| -s or --stylesheet | accepts a url link to the stylesheet   |

# Usage

1.  Clone this project
2.  Install [node](https://nodejs.org/en/) on your machine
3.  Redirect to the project folder
4.  Install cv-ssg globally by using `npm install -g .`
5.  Use command line tool and type `cv-ssg -i <file name> -s <stylesheet link>`
6.  The dist folder will be placed right where you're at

# Example

**./example/files/sample.txt**

```
This is line 1
This is line 2

This is line 3
```

After running `cv--ssg -i ./example/files -s default`

**./dist/sample.html**

```
<!doctype  html>
<html  lang="en">
	<head>
		<meta  charset="utf-8">
		<title>Filename</title>
		<meta  name="viewport"  content="width=device-width, initial-scale=1">
		<link  rel='stylesheet'  href='https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'>
	</head>
	<body>
		<p>This is line 1</p>
		<p>This is line 2</p>

		<p>This is line 3</p>
	</body>
</html>
```

# License

[MIT](https://choosealicense.com/licenses/mit/)
