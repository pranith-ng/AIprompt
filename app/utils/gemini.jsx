import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = async (promptinput) => {

  function formattedText(input) {
    
    // Replace code blocks wrapped in triple backticks with <pre> and <code> tags
    let formattedText = input.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

    // Use regular expression to replace ''' with <b> and move the text inside the <b> tag
    formattedText = formattedText.replace(/^'''(.*)/gs, '<p style="color: green;">$1</p>');
    
    // Replace text surrounded by '**' with <b> tags for bold
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Replace text surrounded by '*' with <i> tags for italic
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<i>$1</i>');
    
    // Replace '*' at the beginning of a line with <br> (line break)
    formattedText = formattedText.replace(/^\*/gm, '<br>');
    
   
    
    return formattedText;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = promptinput;
    const result = await model.generateContent(prompt);
    const resultofapi = result.response.text()
    console.log(resultofapi)
    return formattedText(resultofapi); 
  } catch (err) {
    console.error(err);
    return null; 
  }
};
