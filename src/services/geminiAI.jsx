import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyC3m-XiCai6A-F_cojf2dY4FO5p5apPV3Y");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processTitleMood(titles) {
  let prompt = `for each sentence of the following sentences, 
    give a score based on sentiment analysis, ranging from 0 to 10,
    0 being the most friendly, supportive and empathetic, while 10
    is the most aggressive and charged. return only a list of numbers,
    without any further explanations. make sure that the number of scores
    you return match the numbers of sentences. the sentences are:  `;
  prompt += JSON.stringify(titles);
  const result = await model.generateContent(prompt);
  const answer = result.response.text();
  console.log("answer", answer);
  return JSON.parse(answer);
}
export async function changeMood(data, number) {
  const prompt = `i will give you a title , descreption and a number. you need to 
    make them both positive if the number is between 1-4, do it medium  if its 4-7 and if its between 7-10 do it aggressive - without loosing
    any of the important existing facts.  the title is: ${data.title}.
    The description is: ${data.description}.
    The number is ${number}}
    Return the new value as a an object, with the format: {
        title: <new updated title here>,
        description: <new updated description here>
    }.
    return ONLY this object, without any additional text or explanations.
    dont and anything before or after the {} of the object. dont return markdown.`;
  const result = await model.generateContent(prompt);
  const answer = result.response.text().trim();
  return JSON.parse(answer);
}
// const data = {
//   title: "hello",
//   description: "wowwww",
// };
// console.log(await changeMood(data));
