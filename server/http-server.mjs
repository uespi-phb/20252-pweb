import http from "http";
import chalk from "chalk";

const server = http.createServer((req, res) => {
  let body = "";
  req.setEncoding("utf-8");

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log(chalk.yellow("--- HTTP REQUEST BEGIN ---"));

    // Linha da requisição
    console.log(
      chalk.green(`${req.method} ${req.url} HTTP/${req.httpVersion}`)
    );

    // Headers
    Object.entries(req.headers).forEach(([key, value]) => {
      const header = chalk.blue(key + ":");
      const val = chalk.white(value);
      console.log(`${header} ${val}`);
    });

    console.log(chalk.magenta(body));

    console.log(chalk.yellow("--- HTTP REQUEST END -----"));

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Request received successfully. Check the terminal.\n");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(chalk.cyanBright(`Servidor ouvindo em http://localhost:${PORT}`));
});
