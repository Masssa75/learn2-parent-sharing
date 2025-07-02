(()=>{var e={};e.id=622,e.ids=[622],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},9070:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>c,serverHooks:()=>g,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{POST:()=>u});var s=r(2706),n=r(8203),a=r(5994),i=r(9187),p=r(4543);let l=process.env.GEMINI_API_KEY||"";async function u(e){try{let{description:t,linkUrl:r,category:o}=await e.json();if(!t)return i.NextResponse.json({error:"Missing description"},{status:400});if(!l)return i.NextResponse.json({error:"Gemini API key not configured"},{status:500});let s=`You are an expert parent content curator. Based on this parent's experience/tip, generate 5 compelling titles.

The parent's experience: "${t}"
${r?`They're sharing: ${r}`:""}
${o?`Category: ${o}`:""}

Generate exactly 5 different titles that:
- Are engaging and highlight the key benefit
- Are specific and concrete (avoid generic phrases)
- Are under 60 characters
- Would make other parents want to read more

IMPORTANT: Your response must be valid JSON with this exact format:
{
  "titles": [
    "Title option 1",
    "Title option 2", 
    "Title option 3",
    "Title option 4",
    "Title option 5"
  ]
}

Good title examples:
- "Khan Academy Kids: Free Learning That Actually Works"
- "The LEGO Set That Kept My 5yo Busy for Hours"
- "Screen-Free Activity That Saved Our Rainy Day"
- "Why My Toddler Stopped Crying at Bedtime"
- "The $10 Toy That Teaches Colors Better Than Apps"`,n=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${l}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:s}]}],generationConfig:{temperature:.9,maxOutputTokens:300}})});if(!n.ok){let e=await n.text();return console.error("Gemini API error:",e),i.NextResponse.json({error:"Failed to generate titles"},{status:500})}let a=await n.json(),u=a.candidates?.[0]?.content?.parts?.[0]?.text;if(!u)return i.NextResponse.json({error:"No response from AI"},{status:500});try{let e=u.match(/\{[\s\S]*\}/);if(!e)throw Error("No JSON found in response");let t=JSON.parse(e[0]).titles.map(e=>(0,p.S)(e));return i.NextResponse.json({titles:t})}catch(e){return console.error("Failed to parse AI response:",e),i.NextResponse.json({titles:[(0,p.S)("My parenting discovery"),(0,p.S)("What worked for us today"),(0,p.S)("A tip every parent should know"),(0,p.S)("How we solved this parenting challenge"),(0,p.S)("The thing that made parenting easier")]})}}catch(e){return console.error("Title generation error:",e),i.NextResponse.json({error:"Failed to generate titles"},{status:500})}}let c=new s.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/ai/generate-titles/route",pathname:"/api/ai/generate-titles",filename:"route",bundlePath:"app/api/ai/generate-titles/route"},resolvedPagePath:"/Users/marcschwyn/Desktop/projects/Learn2/app/api/ai/generate-titles/route.ts",nextConfigOutput:"standalone",userland:o}),{workAsyncStorage:d,workUnitAsyncStorage:h,serverHooks:g}=c;function m(){return(0,a.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:h})}},6487:()=>{},8335:()=>{},4543:(e,t,r)=>{"use strict";function o(e){let t=["a","an","and","as","at","but","by","for","from","in","into","nor","of","on","or","so","the","to","up","with","yet"],r=["AI","API","CEO","CTO","FAQ","HR","ID","IT","URL","USA","UK","LEGO"];return e.split(" ").map((e,o)=>(e=e.trim())?r.find(t=>t.toLowerCase()===e.toLowerCase())||(o>0&&t.includes(e.toLowerCase())?e.toLowerCase():e.includes("-")?e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join("-"):e.includes("'")?e.split("'").map((e,t)=>0===t?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase()).join("'"):e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()):e).join(" ")}r.d(t,{S:()=>o})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[989,452],()=>r(9070));module.exports=o})();