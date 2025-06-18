import type { NextApiRequest, NextApiResponse } from "next";
import { TextDecoder } from "util";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Encoding": "none",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  try {
    const upstream = await fetch("http://43.200.17.139:8080/api/news/stream");

    const reader = upstream.body?.getReader();

    if (!reader) {
      res.write("event: error\ndata: No response stream from upstream\n\n");
      res.end();
      return;
    }

    const decoder = new TextDecoder();

    const sendChunk = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        // console.log(chunk);

        res.write(chunk + "\n");
        // res.flush?.();
      }
    };

    await sendChunk();
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
    res.end();
  }
}
