import { getPlaiceholder } from "plaiceholder";
import { glob } from "glob";
import fs from "fs/promises";

export const getImages = async (pattern: string) =>
  Promise.all(
    glob.sync(pattern).map(async (file: string) => {
      const src = file.replace("./public", "");
      const buffer = await fs.readFile(file);

      const {
        metadata: { height, width },
        ...plaiceholder
      } = await getPlaiceholder(buffer);

      return { ...plaiceholder, img: { src, height, width } };
    })
  );
