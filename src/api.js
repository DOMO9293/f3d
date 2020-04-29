import { API } from "./config";
import NewsAPI from "newsapi";
const newsapi = new NewsAPI(API);
let date = new Date();
let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default async function api(callback) {
  try {
    const result = await newsapi.v2.everything({
      q: `racism OR discrimination OR racial`,
      sources:
        "abc-news,al-jazeera-english,ars-technica,associated-press,axios,bleacher-report,bloomberg,breitbart-news,business-insider,buzzfeed,cbs-news,cnbc,cnn,crypto-coins-news,engadget,entertainment-weekly,espn,espn-cric-info,fortune,fox-news,fox-sports,google-news,hacker-news,ign,mashable,medical-news-today,msnbc,mtv-news,national-geographic,national-review,nbc-news,new-scientist,newsweek,new-york-magazine,next-big-future,nfl-news,nhl-news,politico,polygon,recode,reddit-r-all,reuters,techcrunch,techradar,the-american-conservative,the-hill,the-huffington-post,the-next-web,the-verge,the-wall-street-journal,the-washington-post,the-washington-times,time,usa-today,vice-news,wired",
      from: today,
      to: today,
      language: "en",
      sortBy: "relevancy",
      pageSize: 100,
    });
    console.log(result);
    callback(result);
  } catch (e) {
    console.log(e);
  }
}
