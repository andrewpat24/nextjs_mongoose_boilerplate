import { NextApiRequest, NextApiResponse } from "next";
import { HTTPMethod } from "../../../types/api";
import * as fs from "fs";

const parseTSV = async (path: string): Promise<any> => {
  const data = new Array();
  let rawStringData = "";

  try {
    const fsResult = await fs.promises.readFile(path);
    rawStringData = fsResult.toString();
    // console.log(fsResult.toString());
  } catch (error: any) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }

  if (rawStringData) {
    const splitLines = rawStringData.split("\n");
    splitLines.forEach((line, index) => {
      const searchItem = line.split("\t")[1];
      if (index !== 0) {
        data.push(searchItem);
      }
    });
    return { data };
  }

  return [[""]];
};

const postLogic = async (searchString: string, limit: number) => {
  const parsedTSVResult = await parseTSV(
    "/Users/andrew/Projects/Interview/interview-repo/pages/api/auto-complete/data.tsv"
  );
  const parsedTSV = parsedTSVResult.data;

  // Split search string up into separate queries
  const searchWords = searchString.toLocaleLowerCase().split(" ");

  // remove empty 'words'
  const parsedSearchWords = searchWords.filter((searchWord) => {
    if (searchWord.length > 0) {
      return true;
    }
    return false;
  });

  const results: any = {};
  let result: string[] = [];

  // If there is more than one word in the search query, only save the overlapping results from the first word to the following words.
  // if there is only one word, save and return all results.
  parsedSearchWords.forEach((searchWord, searchWordIndex) => {
    for (let tsvIndex = 0; tsvIndex < parsedTSV.length; tsvIndex++) {
      const searchItem = parsedTSV[tsvIndex];

      if (searchItem.includes(searchWord)) {
        if (parsedSearchWords.length > 1) {
          if (searchWordIndex === 0) {
            results[searchItem] = true;
          } else if (results[searchItem]) {
            result.push(searchItem);
          }
        } else {
          result.push(searchItem);
        }
      }
    }
  });

  return result.slice(0, limit);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, searchString, limit } = req.body;
  let value: any;

  switch (method) {
    // Get all Projects
    case HTTPMethod.GET: {
      try {
      } catch (e) {
        console.error(e);
      }
      break;
    }
    case HTTPMethod.POST: {
      try {
        value = await postLogic(searchString, limit);
      } catch (e) {}
      break;
    }
    case HTTPMethod.PUT: {
      try {
      } catch (e) {}
      break;
    }
    case HTTPMethod.DELETE: {
      try {
      } catch (e) {}
      break;
    }
    default: {
      // return res.status(400).json({ status: 'error', error: 'Invalid HTTP Method' });
    }
  }

  return res.status(200).json({ data: value });
};

export default handler;
