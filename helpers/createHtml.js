module.exports.createHtmlFile = (data) => {
  let dom = "";
  data.forEach((e) => {
    if (e !== "") {
      dom += `<p>${e}</p>`;
    } else {
      dom += "\n\n";
    }
  });
  const result = `
  <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Filename</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        ${dom}
    </body>
    </html>
    `;

  return result;
};
