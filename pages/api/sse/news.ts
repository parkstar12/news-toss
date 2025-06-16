import type { NextApiRequest, NextApiResponse } from "next";
import { TextDecoder } from "util"; // ✅ 여기 TextDecoder로 변경

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

    const decoder = new TextDecoder(); // ✅ 여기서 디코더 사용

    const sendChunk = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        console.log(chunk);

        res.write(chunk + "\n");
        // res.flush?.(); // Vercel에선 필요 없을 수도 있지만 있으면 좋음
      }
    };

    await sendChunk();
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
    res.end();
  }
}
