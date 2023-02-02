import { format } from "prettier";
import { transformSync } from "@babel/core";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { code, language } = JSON.parse(req.body);

  const transpiled = transformSync(code, {
    filename: `file.${language}`,
    retainLines: true,
    presets: [require("@babel/preset-typescript")],
  });

  if (!transpiled?.code) {
    res.status(500).send("Failed to transpile code");
    return;
  }

  const formattedCode = format(transpiled.code, {
    printWidth: Number.POSITIVE_INFINITY,
    parser: "typescript",
  });

  res.status(200).send(formattedCode.trim());
};

export default handler;
