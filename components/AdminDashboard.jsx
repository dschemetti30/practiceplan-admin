/* PracticePlan Admin v2.8 */
import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* ======== COLORS - THEME AWARE ======== */
const lightC={blue:"#0076BB",green:"#00A84F",orange:"#F15A29",blueDk:"#005A8E",blueL:"#EDF6FC",greenL:"#E6F7ED",orangeL:"#FEF0EB",red:"#DC2626",redL:"#FEE2E2",purple:"#0076BB",purpleL:"#EDF6FC",amber:"#D97706",amberL:"#FEF3C7",g50:"#F8FAFB",g100:"#F0F2F5",g200:"#E3E8EE",g300:"#CDD4DC",g400:"#9BA5B3",g500:"#6B7684",g600:"#4A5464",g700:"#2D3540",g800:"#1A2030",w:"#fff",bg:"#F5F7FA",cardBg:"#fff",cardBorder:"#E3E8EE",cardShadow:"0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.02)"};
const darkC={blue:"#3B9FD9",green:"#34C06E",orange:"#FF7A4D",blueDk:"#2A8CBF",blueL:"#0D2847",greenL:"#0D2A1A",orangeL:"#2A1A10",red:"#F87171",redL:"#3B1616",purple:"#3B9FD9",purpleL:"#0D2847",amber:"#FBBF24",amberL:"#2A2008",g50:"#1E2530",g100:"#252D38",g200:"#2F3A48",g300:"#3D4B5C",g400:"#6B7A8D",g500:"#8B97A7",g600:"#B0B9C6",g700:"#D1D7E0",g800:"#EDF0F5",w:"#161C24",bg:"#0F1318",cardBg:"#1A2030",cardBorder:"#2F3A48",cardShadow:"0 1px 2px rgba(0,0,0,0.2), 0 1px 6px rgba(0,0,0,0.1)"};
let C={...lightC};
const ThemeCtx=createContext({dark:false,toggle:()=>{}});
const LOGO=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 396.37 66.7"><path fill="#f15a29" d="M.72,49.7c-.24-.04-.48-.09-.72-.14.24.05.48.09.72.14Z"/><path fill="#00a84f" stroke="#fff" stroke-miterlimit="10" stroke-width="1.4" d="M38.52,31.97l-18.72-7.88c-1.03-.43-1.86-1.68-1.86-2.8v-8.53c0-1.11.83-1.67,1.86-1.23l20.95,8.82c3.5,1.47,5.25,3.41,5.25,5.34,0,1.93-1.75,3.87-5.25,5.34l-2.23.94Z"/><path fill="#00a84f" stroke="#fff" stroke-miterlimit="10" stroke-width="1.4" d="M29.74,48.22v11.43c0,1.11-.83,2.37-1.86,2.8l-8.08,3.4c-1.03.43-1.86-.12-1.86-1.23v-21.97c0-1.11.83-2.37,1.86-2.8l20.95-8.82c3.5-1.47,5.25-3.41,5.25-5.34v10.81c0,3.03-1.75,5.61-5.25,7.09l-11.01,4.64Z"/><path fill="#0076bb" stroke="#fff" stroke-miterlimit="10" stroke-width="1.4" d="M24.43,21.29L5.71,13.41c-1.03-.43-1.86-1.68-1.86-2.8V2.08c0-1.11.83-1.67,1.86-1.23l20.95,8.82c3.5,1.47,5.25,3.41,5.25,5.34,0,1.93-1.75,3.87-5.25,5.34l-2.23.94Z"/><path fill="#0076bb" stroke="#fff" stroke-miterlimit="10" stroke-width="1.4" d="M15.65,37.54v11.43c0,1.11-.83,2.37-1.86,2.8l-8.08,3.4c-1.03.43-1.86-.12-1.86-1.23v-21.97c0-1.11.83-2.37,1.86-2.8l20.95-8.82c3.5-1.47,5.25-3.41,5.25-5.34v10.81c0,3.03-1.75,5.61-5.25,7.09l-11.01,4.64Z"/><path fill="#0076bb" d="M87.8,38.08h-11.64l-1,5.69h-6.85l2-11.38h19.16c2.39,0,3.86-1.23,3.86-2.96,0-1.3-1.03-2.13-2.96-2.13h-19.16l1.32-5.79h18.24c6.19,0,9.58,2.89,9.58,7.15,0,5.52-4.82,9.41-12.54,9.41Z"/><path fill="#0076bb" d="M130.29,43.77h-9.21l-3.92-5.89h-10.58l-1.03,5.89h-6.88l2-11.38h19.36c2.29,0,4.29-1.1,4.29-2.89,0-1.46-1.26-2.2-3.39-2.2h-19.36l1.33-5.79h18.5c4.66,0,10.18,1.43,10.18,6.75,0,4.02-2.89,7.42-7.18,8.25.63.57,1.33,1.36,2.56,2.93l3.36,4.32Z"/><path fill="#0076bb" d="M138,43.77l5.19-5.72h5.55c1.36,0,2.89,0,3.96.07-.47-.8-1.16-2.16-1.7-3.23l-2.96-5.89-13.04,14.77h-8.15l17.83-20.12c1.16-1.3,2.73-2.49,4.89-2.49s3.23,1.1,3.96,2.49l10.34,20.12h-25.88Z"/><path fill="#0076bb" d="M190.18,38.05l-5.42,5.72h-11.18c-6.95,0-11.57-4.19-11.57-9.81,0-7.32,6.98-12.44,15.5-12.44h15.6l-5.45,5.79h-11.18c-4.09,0-7.55,2.63-7.55,6.15,0,2.76,2.29,4.59,5.65,4.59h15.6Z"/><path fill="#0076bb" d="M216.65,21.52l-1.08,5.79h-8l-2.93,16.46h-6.88l2.89-16.46h-10.44l5.52-5.79h20.93Z"/><path fill="#0076bb" d="M221.18,43.77h-6.88l3.96-22.25h6.85l-3.93,22.25Z"/><path fill="#0076bb" d="M251.47,38.05l-1.64,5.72h-14.05c-6.95,0-11.57-4.19-11.57-9.81,0-7.32,6.98-12.44,15.5-12.44h14.93l-1.83,5.79h-14.14c-4.09,0-7.55,2.63-7.55,6.15,0,2.76,2.29,4.59,5.65,4.59h14.69Z"/><path fill="#0076bb" d="M278.35,38.05l-4.59,5.72h-21.42l3.96-22.25h24.88l-4.62,5.79h-14.4l-.47,2.66h16.73l-3.92,5.06h-13.7l-.53,3.03h18.09Z"/><path fill="#0076bb" d="M298.05,38.08h-11.64l-1,5.69h-6.85l2-11.38h19.16c2.39,0,3.86-1.23,3.86-2.96,0-1.3-1.03-2.13-2.96-2.13h-19.16l4.14-5.79h15.42c6.19,0,9.58,2.89,9.58,7.15,0,5.52-4.82,9.41-12.54,9.41Z"/><path fill="#0076bb" d="M334.61,38.05l-5.49,5.72h-19.66l3.96-22.25h6.85l-2.93,16.53h17.26Z"/><path fill="#0076bb" d="M342.3,43.77l5.19-5.72h5.55c1.36,0,2.89,0,3.96.07-.47-.8-1.16-2.16-1.7-3.23l-2.96-5.89-13.04,14.77h-8.15l17.83-20.12c1.16-1.3,2.73-2.49,4.89-2.49s3.23,1.1,3.96,2.49l10.34,20.12h-25.88Z"/><path fill="#0076bb" d="M386.02,42.94l-11.47-12.24-2.3,13.07h-6.25l3.23-18.46c.5-2.96,2.46-4.16,4.52-4.16.83,0,1.66.2,2.56,1.2l11.47,12.24,2.33-13.07h6.25l-3.29,18.43c-.53,2.96-2.49,4.19-4.49,4.19-.93,0-1.63-.2-2.56-1.2Z"/></svg>`)}`;
const FAVICON=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.58 179.72"><path fill="#00a84f" stroke="#fff" stroke-miterlimit="10" stroke-width="1.62" d="M95.35,86.09l-51.05-21.49c-2.8-1.18-5.07-4.59-5.07-7.63v-23.26c0-3.04,2.27-4.54,5.07-3.36l57.14,24.06c9.55,4.02,14.33,9.29,14.33,14.56,0,5.27-4.78,10.54-14.33,14.56l-6.09,2.56Z"/><path fill="#00a84f" stroke="#fff" stroke-miterlimit="10" stroke-width="1.62" d="M71.41,130.43v31.17c0,3.04-2.27,6.45-5.07,7.63l-22.04,9.28c-2.8,1.18-5.07-.33-5.07-3.36v-59.93c0-3.04,2.27-6.45,5.07-7.63l57.14-24.06c9.55-4.02,14.33-9.29,14.33-14.56v29.49c0,8.26-4.78,15.31-14.33,19.33l-30.03,12.64Z"/><path fill="#0077bc" stroke="#fff" stroke-miterlimit="10" stroke-width="1.62" d="M56.93,56.96L5.88,35.47c-2.8-1.18-5.07-4.59-5.07-7.63V4.58C.81,1.54,3.08.03,5.88,1.21l57.14,24.06c9.55,4.02,14.33,9.29,14.33,14.56,0,5.27-4.78,10.54-14.33,14.56l-6.09,2.56Z"/><path fill="#0077bc" stroke="#fff" stroke-miterlimit="10" stroke-width="1.62" d="M32.98,101.3v31.17c0,3.04-2.27,6.45-5.07,7.63l-22.04,9.28c-2.8,1.18-5.07-.33-5.07-3.36v-59.93c0-3.04,2.27-6.45,5.07-7.63l57.14-24.06c9.55-4.02,14.33-9.29,14.33-14.56v29.49c0,8.26-4.78,15.31-14.33,19.33l-30.03,12.64Z"/></svg>`)}`;
const DISTRICT_LOGO=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 191"><path fill="#fff" d="M76,31c-.89-1.01-.89-.9-1.05-2.4-.96-8.9.82-19.5.05-28.6h93.5c.11,0,1.5,1.39,1.5,1.5v86c0,.54-1.55,2.22-1,3.5h-31v-34c-54.19,17.28-82.06,80.36-81,134H0v-31h26.5c1.25,0,4.25-17.25,4.99-20.01,13.09-48.88,38.06-82.11,81.51-106.99.82-.47,2.82-.06,3-1.99-11.65.14-23.35-.22-35,0-.67.01-1.33-.02-2,0h-3Z"/><path fill="#fff" d="M169,104v87h-30v-56h-59c3.41-11.28,9.59-21.56,16.5-31h72.5Z"/><path fill="#fff" d="M81,31c11.64-.21,23.35.15,35,0-.17,1.93-2.17,1.52-3,1.99l-32-2Z"/><path fill="#fff" d="M79,31c-.51.01-1.11,2.15-3,0h3Z"/></svg>`)}`;/* ======== ASCENSION PARISH SCHOOL DISTRICT DATA ======== */
/* Campuses (locations) */
const campuses=[
  {id:"dths",name:"Dutchtown High School",short:"Dutchtown HS",city:"Geismar"},
  {id:"eahs",name:"East Ascension High School",short:"East Ascension HS",city:"Gonzales"},
  {id:"sahs",name:"St. Amant High School",short:"St. Amant HS",city:"St. Amant"},
  {id:"phs",name:"Prairieville High School",short:"Prairieville HS",city:"Prairieville"},
  {id:"dohs",name:"Donaldsonville High School",short:"Donaldsonville HS",city:"Donaldsonville"},
];
const facilities={
  "Dutchtown HS":["DT Gym","DT Stadium","DT Fields"],
  "East Ascension HS":["EA Gym","EA Cafeteria","EA Pool","Spartan Stadium","Gator Stadium"],
  "St. Amant HS":["SA Gym","SA Fields"],
  "Prairieville HS":["PV Complex","PV Gym"],
  "Donaldsonville HS":["DO Gym"],
};
const facilityFull={"DT Gym":"Dutchtown Gymnasium","DT Stadium":"Dutchtown Stadium","DT Fields":"Dutchtown Fields","EA Gym":"East Ascension Gym","EA Cafeteria":"EA Cafeteria","EA Pool":"East Ascension Pool","Spartan Stadium":"Spartan Stadium","Gator Stadium":"Gator Stadium","SA Gym":"St. Amant Gymnasium","SA Fields":"St. Amant Fields","PV Complex":"Prairieville Complex","PV Gym":"Prairieville Gymnasium","DO Gym":"Donaldsonville Gym","District Office":"District Office","District":"District","Away":"Away","All Campuses":"All Campuses"};
const tabs=["Dashboard","Rentals","Organization","Reporting","Users","Promote"];
const monthlyRev=[{m:"Aug",r:3420},{m:"Sep",r:7850},{m:"Oct",r:11240},{m:"Nov",r:9680},{m:"Dec",r:5840},{m:"Jan",r:14220},{m:"Feb",r:8761}];
const facMix=[
  {n:"Dutchtown High School",v:18296,c:"#0076BB",assets:3,bookings:62,topAsset:"Dutchtown Gymnasium"},
  {n:"East Ascension High School",v:14700,c:"#1A8FCE",assets:3,bookings:48,topAsset:"Spartan Stadium"},
  {n:"St. Amant High School",v:11865,c:"#4DA8D8",assets:2,bookings:35,topAsset:"St. Amant Gymnasium"},
  {n:"Prairieville High School",v:9450,c:"#80C1E2",assets:2,bookings:28,topAsset:"Prairieville Gymnasium"},
  {n:"Donaldsonville High School",v:6700,c:"#B3D9ED",assets:2,bookings:19,topAsset:"Tiger Stadium"},
];
const assetPerfData={
  day:[{a:"Dutchtown Gymnasium",r:425,b:3,u:72},{a:"Spartan Stadium",r:0,b:0,u:0},{a:"St. Amant Gymnasium",r:275,b:2,u:58},{a:"Prairieville Gymnasium",r:150,b:1,u:45},{a:"Gator Stadium",r:0,b:0,u:0},{a:"Tiger Stadium",r:0,b:0,u:0}],
  week:[{a:"Dutchtown Gymnasium",r:2346,b:14,u:74},{a:"Spartan Stadium",r:1865,b:6,u:48},{a:"St. Amant Gymnasium",r:1475,b:10,u:62},{a:"Prairieville Gymnasium",r:1130,b:8,u:51},{a:"Gator Stadium",r:850,b:3,u:22},{a:"Tiger Stadium",r:720,b:4,u:34}],
  month:[{a:"Dutchtown Gymnasium",r:8460,b:42,u:68},{a:"Spartan Stadium",r:6765,b:22,u:52},{a:"St. Amant Gymnasium",r:5700,b:30,u:58},{a:"Prairieville Gymnasium",r:4450,b:24,u:55},{a:"Gator Stadium",r:3200,b:10,u:31},{a:"Tiger Stadium",r:2436,b:14,u:38}],
  year:[{a:"Dutchtown Gymnasium",r:18296,b:62,u:68},{a:"Spartan Stadium",r:14700,b:48,u:52},{a:"St. Amant Gymnasium",r:11865,b:35,u:58},{a:"Prairieville Gymnasium",r:9450,b:28,u:55},{a:"Gator Stadium",r:6700,b:19,u:31},{a:"Tiger Stadium",r:5200,b:22,u:38}],
};
const heatmap=[{h:"6AM",d:[0,1,0,0,1,3,2]},{h:"8AM",d:[2,3,1,2,3,5,4]},{h:"10AM",d:[1,2,2,1,2,6,5]},{h:"12PM",d:[3,1,3,2,1,4,3]},{h:"2PM",d:[2,2,1,3,2,5,3]},{h:"4PM",d:[5,4,5,5,6,6,4]},{h:"6PM",d:[6,5,6,4,5,5,3]},{h:"8PM",d:[4,3,4,3,4,3,1]}];
const topCustData=[
  {n:"Bayou City Volleyball",b:18,s:6840,t:"up",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",since:"Aug 2025",fav:"Dutchtown Gymnasium",photo:"BC",
   hist:[{id:"37538201",asset:"Dutchtown Gymnasium",date:"2/7/2026",time:"8-10 AM",rev:350},{id:"54148775",asset:"Dutchtown Gymnasium",date:"2/9/2026",time:"6-8 PM",rev:350},{id:"10293847",asset:"East Ascension Gymnasium",date:"1/18/2026",time:"9-11 AM",rev:400},{id:"29384756",asset:"Dutchtown Gymnasium",date:"1/5/2026",time:"4-6 PM",rev:350},{id:"38475610",asset:"Dutchtown Gymnasium",date:"12/12/2025",time:"8-10 AM",rev:350},{id:"47561029",asset:"East Ascension Gymnasium",date:"11/22/2025",time:"2-4 PM",rev:400}]},
  {n:"Gonzales FC",b:14,s:5274,t:"up",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",since:"Sep 2025",fav:"Prairieville Athletic Complex",photo:"GF",
   hist:[{id:"11244970",asset:"Prairieville Athletic Complex",date:"2/7/2026",time:"8-10 AM",rev:475},{id:"25800922",asset:"Prairieville Athletic Complex",date:"2/9/2026",time:"7:30-9 PM",rev:475},{id:"83746251",asset:"Dutchtown Practice Fields",date:"1/25/2026",time:"5-7 PM",rev:300},{id:"63849201",asset:"Prairieville Athletic Complex",date:"1/11/2026",time:"6-8 PM",rev:475},{id:"92837461",asset:"Dutchtown Practice Fields",date:"12/3/2025",time:"3-5 PM",rev:300}]},
  {n:"Ascension Elite Cheer",b:12,s:4380,t:"stable",email:"elitecheer@ascension.org",phone:"(225) 555-0137",since:"Aug 2025",fav:"St. Amant Gymnasium",photo:"AE",
   hist:[{id:"20617491",asset:"St. Amant Gymnasium",date:"2/6/2026",time:"5-7 PM",rev:325},{id:"74629183",asset:"St. Amant Gymnasium",date:"1/22/2026",time:"6-8 PM",rev:325},{id:"56283910",asset:"Dutchtown Gymnasium",date:"1/8/2026",time:"3-5 PM",rev:350},{id:"19384756",asset:"St. Amant Gymnasium",date:"12/15/2025",time:"5-7 PM",rev:325}]},
  {n:"Louisiana Tigers AAU",b:10,s:3698,t:"up",email:"latigersaau@gmail.com",phone:"(225) 555-0419",since:"Oct 2025",fav:"Dutchtown Gymnasium",photo:"LT",
   hist:[{id:"37524827",asset:"Dutchtown Gymnasium",date:"2/11/2026",time:"6-8 PM",rev:350},{id:"82639104",asset:"Dutchtown Gymnasium",date:"1/28/2026",time:"5-7 PM",rev:350},{id:"19283746",asset:"East Ascension Gymnasium",date:"1/15/2026",time:"2-4 PM",rev:400}]},
  {n:"River Parish Runners",b:6,s:1845,t:"down",email:"rprunners@hotmail.com",phone:"(225) 555-0753",since:"Nov 2025",fav:"Gator Stadium",photo:"RP",
   hist:[{id:"73829104",asset:"Gator Stadium",date:"1/20/2026",time:"4-6 PM",rev:395},{id:"62839104",asset:"Spartan Stadium",date:"1/6/2026",time:"3-5 PM",rev:450}]},
];
const upcoming=[
  {id:"20617491",a:"St. Amant Gymnasium",c:"Ascension Elite Cheer",d:"2/6/2026",dLong:"Fri 2/6/2026",t:"5:00-7:00 PM",r:325,fac:"St. Amant High School",email:"elitecheer@ascension.org",phone:"2255550137",team:"Elite Cheer",people:18,activity:"Cheerleading",created:"02/03/2026 09:33 am",amenities:"N/A",insStart:"02/09/2025",insEnd:"02/09/2026",insActive:true,insNote:"Our AI Failed to find Insurance Coverage limit. Please look into document.",resId:"X82KLyH7x2",pp:true,status:"confirmed"},
  {id:"11244970",a:"Prairieville Athletic Complex",c:"Gonzales FC",d:"2/7/2026",dLong:"Sat 2/7/2026",t:"8:00-10:00 AM",r:475,fac:"Prairieville High School",email:"gonzalesfc@yahoo.com",phone:"2255550294",team:"Gonzales FC U16",people:24,activity:"Soccer",created:"02/01/2026 11:15 am",amenities:"Field Lights, Scoreboard",insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insNote:"Insurance expired. Please request updated certificate.",resId:"K93MNpR4w1",pp:true,status:"at-risk"},
  {id:"37538201",a:"Dutchtown Gymnasium",c:"Bayou City Volleyball",d:"2/7/2026",dLong:"Sat 2/7/2026",t:"8:00-10:00 AM",r:350,fac:"Dutchtown High School",email:"bayoucityvb@gmail.com",phone:"2255550182",team:"Bayou City VB",people:22,activity:"Volleyball",created:"01/28/2026 02:47 pm",amenities:"Scoreboard, Bleachers",insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insNote:null,resId:"P47QRsT8z3",pp:true,status:"confirmed"},
  {id:"54148775",a:"Dutchtown Gymnasium",c:"Bayou City Volleyball",d:"2/9/2026",dLong:"Mon 2/9/2026",t:"6:00-8:00 PM",r:350,fac:"Dutchtown High School",email:"bayoucityvb@gmail.com",phone:"2255550182",team:"Bayou City VB",people:18,activity:"Volleyball Practice",created:"01/28/2026 02:50 pm",amenities:"N/A",insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insNote:null,resId:"W82XYzA5b6",pp:true,status:"confirmed"},
  {id:"25800922",a:"Prairieville Athletic Complex",c:"Gonzales FC",d:"2/9/2026",dLong:"Mon 2/9/2026",t:"7:30-9:00 PM",r:475,fac:"Prairieville High School",email:"gonzalesfc@yahoo.com",phone:"2255550294",team:"Gonzales FC U16",people:22,activity:"Soccer",created:"02/01/2026 11:20 am",amenities:"Field Lights",insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insNote:"Insurance expired. Please request updated certificate.",resId:"J55KLmN2c8",pp:true,status:"at-risk"},
  {id:"37524827",a:"Dutchtown Gymnasium",c:"Louisiana Tigers AAU",d:"2/11/2026",dLong:"Wed 2/11/2026",t:"6:00-8:00 PM",r:350,fac:"Dutchtown High School",email:"latigersaau@gmail.com",phone:"2255550419",team:"LA Tigers",people:14,activity:"Basketball",created:"02/04/2026 08:12 am",amenities:"Scoreboard",insStart:"06/01/2025",insEnd:"06/01/2026",insActive:true,insNote:null,resId:"R29STuV7d4",pp:true,status:"confirmed"},
  {id:"62918345",a:"East Ascension Gymnasium",c:"Ascension YMCA",d:"2/12/2026",dLong:"Thu 2/12/2026",t:"4:00-6:00 PM",r:300,fac:"East Ascension High School",email:"ymca@ascension.org",phone:"2255550821",team:"YMCA Youth",people:30,activity:"Basketball",created:"02/05/2026 10:00 am",amenities:"Bleacher Setup",insStart:"01/01/2026",insEnd:"01/01/2027",insActive:true,insNote:null,resId:"M12NPqR3e9",pp:true,status:"pending"},
  {id:"48192736",a:"Gator Stadium",c:"River Parish Runners",d:"2/13/2026",dLong:"Fri 2/13/2026",t:"6:00-8:00 AM",r:190,fac:"East Ascension High School",email:"rprunners@hotmail.com",phone:"2255550753",team:"RP Runners",people:12,activity:"Track & Field",created:"02/04/2026 03:15 pm",amenities:"Track Usage",insStart:"04/01/2025",insEnd:"04/01/2026",insActive:true,insNote:null,resId:"T67UVwX4f2",pp:true,status:"confirmed"},
];
/* Calendar: mixed synced events (school/district) + PP- prefixed PracticePlan bookings */
/* src: "pp"=PracticePlan, "google"=Google Calendar, "rankone"=RankOne, "outlook"=Outlook */
const calEvents={
  2:[{l:"JV Basketball vs. Hahnville",t:"5:30 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"PP - River Parish Track",t:"4-6 PM",c:C.blue,a:"Spartan Stadium",src:"pp"}],
  3:[{l:"Faculty Meeting",t:"3:30 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"},{l:"PP - Elite Cheer Practice",t:"6-8 PM",c:C.blue,a:"SA Gym",src:"pp"}],
  4:[{l:"Varsity Basketball vs. St. Amant",t:"7:00 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"Swim Team Practice",t:"3:30-5 PM",c:"#94A3B8",a:"EA Pool",src:"google"}],
  5:[{l:"PP - Gonzales FC Practice",t:"5-7 PM",c:C.blue,a:"PV Complex",src:"pp"},{l:"Girls Soccer vs. Central",t:"5:30 PM",c:"#94A3B8",a:"DT Stadium",src:"rankone"}],
  6:[{l:"PP - Elite Cheer",t:"5-7 PM",c:C.blue,a:"SA Gym",src:"pp"},{l:"Varsity Baseball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"},{l:"Board Meeting",t:"6 PM",c:"#94A3B8",a:"District Office",src:"outlook"}],
  7:[{l:"PP - Bayou City VB",t:"8-10 AM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - Gonzales FC",t:"8-10 AM",c:C.blue,a:"PV Complex",src:"pp"},{l:"ACT Prep Workshop",t:"9 AM-12 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"}],
  9:[{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - Gonzales FC",t:"7:30-9 PM",c:C.blue,a:"PV Complex",src:"pp"},{l:"JV Baseball vs. Lutcher",t:"4:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"}],
  10:[{l:"Wrestling District Meet",t:"9 AM-4 PM",c:"#94A3B8",a:"EA Gym",src:"rankone"},{l:"PP - LA Tigers Practice",t:"6-8 PM",c:C.blue,a:"EA Gym",src:"pp"}],
  11:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Varsity Softball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"SA Fields",src:"rankone"},{l:"PTA Meeting",t:"6 PM",c:"#94A3B8",a:"PV Gym",src:"google"}],
  12:[{l:"Varsity Basketball @ Thibodaux",t:"7 PM",c:"#94A3B8",a:"Away",src:"rankone"},{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"}],
  13:[{l:"PP - Ascension Dance",t:"5-7 PM",c:C.blue,a:"SA Gym",src:"pp"},{l:"Baseball Scrimmage",t:"4 PM",c:"#94A3B8",a:"Spartan Stadium",src:"rankone"},{l:"PP - River Parish",t:"4-6 PM",c:C.blue,a:"Gator Stadium",src:"pp"}],
  14:[{l:"Valentines Dance",t:"7-10 PM",c:"#94A3B8",a:"DT Gym",src:"google"},{l:"PP - Gonzales FC",t:"9-11 AM",c:C.blue,a:"PV Complex",src:"pp"}],
  16:[{l:"Presidents Day - No School",t:"All Day",c:"#94A3B8",a:"District",src:"outlook"},{l:"PP - Bayou City VB Tourney",t:"8 AM-4 PM",c:C.blue,a:"DT Gym",src:"pp"}],
  17:[{l:"PP - Elite Cheer Comp Prep",t:"5-8 PM",c:C.blue,a:"SA Gym",src:"pp"},{l:"Track Meet Setup",t:"3 PM",c:"#94A3B8",a:"Spartan Stadium",src:"google"}],
  18:[{l:"Varsity Basketball Playoffs",t:"7 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"PP - Gonzales FC",t:"9-11 AM",c:C.blue,a:"PV Complex",src:"pp"}],
  19:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"EA Gym",src:"pp"}],
  20:[{l:"Teacher Inservice",t:"All Day",c:"#94A3B8",a:"All Campuses",src:"outlook"},{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - River Parish",t:"4-6 PM",c:C.blue,a:"Gator Stadium",src:"pp"}],
  21:[{l:"District Track Invitational",t:"8 AM-3 PM",c:"#94A3B8",a:"Spartan Stadium",src:"rankone"},{l:"PP - Gonzales FC Tourney",t:"8 AM-12 PM",c:C.blue,a:"PV Complex",src:"pp"}],
  23:[{l:"PP - Elite Cheer",t:"6-8 PM",c:C.blue,a:"SA Gym",src:"pp"},{l:"Science Fair Setup",t:"3-5 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"}],
  24:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Softball vs. Denham Springs",t:"4:30 PM",c:"#94A3B8",a:"SA Fields",src:"rankone"}],
  25:[{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Spring Football Mtg",t:"6 PM",c:"#94A3B8",a:"DT Stadium",src:"google"}],
  26:[{l:"PP - Gonzales FC",t:"5-7 PM",c:C.blue,a:"PV Complex",src:"pp"},{l:"Baseball vs. Walker",t:"6 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"}],
  27:[{l:"PP - Community Youth BBall",t:"9 AM-12 PM",c:C.blue,a:"DO Gym",src:"pp"},{l:"PP - Elite Cheer Showcase",t:"1-4 PM",c:C.blue,a:"SA Gym",src:"pp"}],
  28:[{l:"PP - Bayou City VB",t:"4-6 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Baseball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"},{l:"PP - Ascension Dance",t:"6-8 PM",c:C.blue,a:"SA Gym",src:"pp"}],
};
const amenityLib=[
  /* AV & Tech */
  {id:"aud",n:"Audio / Sound System",cat:"AV & Tech",p:125,desc:"Portable or venue sound system"},
  {id:"jmb",n:"Jumbotron / Video Board",cat:"AV & Tech",p:400,desc:"Video display board for replays and info"},
  {id:"lvs",n:"Livestream Setup",cat:"AV & Tech",p:225,desc:"Camera, encoder, and streaming for online broadcast"},
  {id:"scor",n:"Scoreboard Operation",cat:"AV & Tech",p:150,desc:"Dedicated scoreboard operator for the event"},
  {id:"tick",n:"Ticket Scanning",cat:"AV & Tech",p:175,desc:"Digital ticket scanning at entry gates"},
  {id:"wifi",n:"WiFi Access",cat:"AV & Tech",p:75,desc:"Venue WiFi access for staff and guests"},
  {id:"proj",n:"Projector & Screen",cat:"AV & Tech",p:100,desc:"Portable projector and screen setup"},
  {id:"mic",n:"Wireless Microphones",cat:"AV & Tech",p:75,desc:"Handheld or lapel wireless mic system"},
  {id:"avcu",n:"Custom AV & Tech",cat:"AV & Tech",p:0,desc:"Add a custom AV or technology amenity"},
  /* Equipment */
  {id:"gym",n:"Gym Floor Covers",cat:"Equipment",p:150,desc:"Protective floor covering for non-sport events"},
  {id:"nets",n:"Nets / Goals Setup",cat:"Equipment",p:75,desc:"Sport-specific net or goal installation"},
  {id:"stage",n:"Stage / Platform",cat:"Equipment",p:350,desc:"Portable stage or raised platform setup"},
  {id:"tab",n:"Tables & Chairs (50+)",cat:"Equipment",p:100,desc:"Folding tables and chairs for events"},
  {id:"tarp",n:"Tarps / Field Protection",cat:"Equipment",p:125,desc:"Protective tarps for field surface"},
  {id:"tent",n:"Pop-Up Tents / Canopies",cat:"Equipment",p:150,desc:"Portable shade canopies for outdoor events"},
  {id:"pad",n:"Crash Pads / Mats",cat:"Equipment",p:60,desc:"Gymnastics or wrestling mats and padding"},
  {id:"rack",n:"Ball Racks / Carts",cat:"Equipment",p:25,desc:"Portable ball racks and equipment carts"},
  {id:"line",n:"Line Marking / Paint",cat:"Equipment",p:200,desc:"Field or court line painting and marking"},
  {id:"podi",n:"Podium / Lectern",cat:"Equipment",p:50,desc:"Portable podium for presentations and ceremonies"},
  {id:"eqcu",n:"Custom Equipment",cat:"Equipment",p:0,desc:"Add a custom equipment amenity"},
  /* Event Staff */
  {id:"ann",n:"Announcer (PA System)",cat:"Event Staff",p:175,desc:"Live PA announcer for games and events"},
  {id:"ath",n:"Athletic Trainer On-Site",cat:"Event Staff",p:200,desc:"Certified athletic trainer present during event"},
  {id:"clk",n:"Clock Operator",cat:"Event Staff",p:100,desc:"Dedicated operator for game and shot clocks"},
  {id:"emt",n:"EMT / First Aid",cat:"Event Staff",p:250,desc:"Emergency medical technician on standby"},
  {id:"park",n:"Parking Management",cat:"Event Staff",p:150,desc:"Directed parking and traffic control"},
  {id:"sec",n:"Security Officer",cat:"Event Staff",p:225,desc:"Licensed security officer on-site"},
  {id:"ref",n:"Referees / Officials",cat:"Event Staff",p:300,desc:"Certified game officials for competitive events"},
  {id:"evco",n:"Event Coordinator",cat:"Event Staff",p:350,desc:"Dedicated on-site coordinator for event logistics"},
  {id:"jani",n:"Janitorial Mid-Event",cat:"Event Staff",p:100,desc:"Custodial staff on standby during event"},
  {id:"stcu",n:"Custom Staff",cat:"Event Staff",p:0,desc:"Add a custom event staff amenity"},
  /* Facility */
  {id:"ac",n:"AC / Climate Control",cat:"Facility",p:100,desc:"Indoor HVAC and temperature regulation"},
  {id:"blch",n:"Bleacher Setup (1000+)",cat:"Facility",p:300,desc:"Extended seating for large events"},
  {id:"cust",n:"Custodial / Cleanup",cat:"Facility",p:125,desc:"Post-event custodial and cleanup crew"},
  {id:"fld",n:"Field Lights",cat:"Facility",p:200,desc:"Outdoor field and stadium lighting"},
  {id:"gen",n:"Generator / Backup Power",cat:"Facility",p:175,desc:"Portable generator for power backup"},
  {id:"lck",n:"Locker Rooms",cat:"Facility",p:200,desc:"Access to team locker rooms and showers"},
  {id:"pbx",n:"Press Box Access",cat:"Facility",p:250,desc:"Press box for media and game operations"},
  {id:"port",n:"Portable Restrooms",cat:"Facility",p:200,desc:"Additional portable restroom units for large events"},
  {id:"trk",n:"Track Usage",cat:"Facility",p:190,desc:"Access to running track surface"},
  {id:"wrmup",n:"Warm-Up Area Access",cat:"Facility",p:75,desc:"Dedicated warm-up or stretching space"},
  {id:"storg",n:"Equipment Storage",cat:"Facility",p:50,desc:"Secure on-site storage for renter equipment"},
  {id:"handicap",n:"ADA Accessibility Setup",cat:"Facility",p:100,desc:"Wheelchair ramps, accessible seating, and pathways"},
  {id:"facu",n:"Custom Facility",cat:"Facility",p:0,desc:"Add a custom facility amenity"},
  /* Food & Beverage */
  {id:"conc",n:"Concessions",cat:"Food & Beverage",p:350,desc:"Food and drink service for spectators"},
  {id:"wat",n:"Water / Hydration Station",cat:"Food & Beverage",p:50,desc:"Water coolers and hydration for participants"},
  {id:"cater",n:"Catering Allowed",cat:"Food & Beverage",p:100,desc:"Permission for outside catering services"},
  {id:"vend",n:"Vending Machine Access",cat:"Food & Beverage",p:25,desc:"Unlocked vending machines during event"},
  {id:"ice",n:"Ice / Cooler Station",cat:"Food & Beverage",p:30,desc:"Ice bins and cooler stations for teams"},
  {id:"fbcu",n:"Custom Food & Bev",cat:"Food & Beverage",p:0,desc:"Add a custom food and beverage amenity"},
];
const amenityCats=["All","AV & Tech","Equipment","Event Staff","Facility","Food & Beverage"];
/* Which amenities are enabled at district level, and per-venue assignments */
const defaultEnabled=["ac","blch","conc","fld","lck","pbx","scor","sec","trk","ann"];
const defaultVenueAssign={
  "Dutchtown Gymnasium":["ac","blch","scor","lck","sec","conc","clk"],
  "Spartan Stadium":["fld","pbx","scor","sec","conc","trk","ann","park"],
  "St. Amant Gymnasium":["ac","blch","scor","lck","sec"],
  "Prairieville Gymnasium":["ac","blch","scor","lck"],
  "Prairieville Athletic Complex":["fld","scor","sec","conc","park","wat"],
  "East Ascension Gymnasium":["ac","blch","scor","lck","sec"],
  "Gator Stadium":["fld","scor","trk","sec","pbx"],
  "Tiger Stadium":["fld","scor","sec","ann"],
};
const amenities=amenityLib.filter(a=>defaultEnabled.includes(a.id));
/* Notifications */
const notifsInit=[{type:"alert",msg:"Gonzales FC insurance expired 01/15/2026 - 2 upcoming bookings at risk",time:"2h ago",read:false},{type:"approval",msg:"Pending Approval: Bayou City Volleyball - Dutchtown Gym, 2/14 6-9 PM ($525)",time:"35m ago",read:false,approvalId:"APR-0042"},{type:"info",msg:"Bayou City Volleyball booked Dutchtown Gym for 2/7",time:"5h ago",read:false},{type:"approval",msg:"Pending Approval: Louisiana Tigers AAU - EA Gymnasium, 2/15 10AM-2PM ($400)",time:"4h ago",read:false,approvalId:"APR-0041"},{type:"success",msg:"February payout processed - $8,761.25",time:"1d ago",read:true},{type:"alert",msg:"RankOne sync conflict: Varsity Basketball overlaps PP booking on 2/18 at DT Gym",time:"1d ago",read:false},{type:"approval",msg:"Pending Approval: Gonzales FC - Prairieville Complex, 2/22 8AM-12PM ($475)",time:"1d ago",read:false,approvalId:"APR-0040"},{type:"info",msg:"Louisiana Tigers AAU completed onboarding",time:"3d ago",read:true}];
/* Approvals data */
let approvalsDataInit=[
  {id:"APR-0042",org:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",discount:0,expiresIn:"2 Days",status:"pending",submitted:"02/04/2026",notes:"Recurring weekly booking request for volleyball practice. Has existing COI on file.",photo:"BC",color:C.blue,insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1042A",asset:"Dutchtown Gymnasium",date:"02/14/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
     {bid:"BK-1042B",asset:"Dutchtown Gymnasium",date:"02/21/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
     {bid:"BK-1042C",asset:"Dutchtown Gymnasium",date:"02/28/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
   ]},
  {id:"APR-0041",org:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"East Ascension High School",discount:0,expiresIn:"3 Days",status:"pending",submitted:"02/03/2026",notes:"Tournament prep session. Will need bleacher setup and scoreboard operation.",photo:"LT",color:C.green,insStart:"06/01/2025",insEnd:"06/01/2026",insActive:true,insLimit:"$500,000",
   bk:[
     {bid:"BK-1041A",asset:"East Ascension Gymnasium",date:"02/15/2026",time:"10:00 AM - 2:00 PM",hours:4,rev:400,activity:"Basketball",people:14,amenities:"Scoreboard, Bleacher Setup",created:"02/03/2026 10:45 am"},
   ]},
  {id:"APR-0040",org:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",discount:0,expiresIn:"0 Days",status:"pending",submitted:"02/02/2026",notes:"Saturday morning scrimmage. Field lights and concession stand requested.",photo:"GF",color:C.purple,insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insLimit:"N/A",
   bk:[
     {bid:"BK-1040A",asset:"Prairieville Athletic Complex",date:"02/22/2026",time:"8:00 AM - 12:00 PM",hours:4,rev:475,activity:"Soccer",people:24,amenities:"Field Lights, Concessions",created:"02/02/2026 03:30 pm"},
     {bid:"BK-1040B",asset:"Prairieville Athletic Complex",date:"03/01/2026",time:"8:00 AM - 12:00 PM",hours:4,rev:475,activity:"Soccer",people:24,amenities:"Field Lights",created:"02/02/2026 03:30 pm"},
   ]},
  {id:"APR-0039",org:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"St. Amant High School",discount:0,expiresIn:"--",status:"approved",submitted:"01/29/2026",notes:"Competition prep. Approved by Coach Bourque.",photo:"AE",color:C.orange,insStart:"02/09/2025",insEnd:"02/09/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1039A",asset:"St. Amant Gymnasium",date:"02/08/2026",time:"9:00 AM - 12:00 PM",hours:3,rev:325,activity:"Cheerleading",people:18,amenities:"N/A",created:"01/29/2026 08:20 am"},
   ]},
  {id:"APR-0038",org:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"St. Amant High School",discount:0,expiresIn:"--",status:"denied",submitted:"01/25/2026",notes:"Denied - track resurfacing scheduled for this date. Offered 2/8 as alternative.",photo:"RP",color:C.g400,insStart:"04/01/2025",insEnd:"04/01/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1038A",asset:"Gator Stadium",date:"02/01/2026",time:"6:00 AM - 8:00 AM",hours:2,rev:190,activity:"Track & Field",people:12,amenities:"N/A",created:"01/25/2026 11:00 am"},
   ]},
];
/* Global approval state management */
let globalApprovals=null;
let globalSetApprovals=null;
let globalPrompt=null;
let globalSetPrompt=null;
let globalRequireSiteAdmin=null;
let globalSetRequireSiteAdmin=null;
let globalAssignedAdmins=null;
let globalSetAssignedAdmins=null;
let globalNotifs=null;
function useApprovals(){return{approvals:globalApprovals||approvalsDataInit,setApprovals:globalSetApprovals||(()=>{}),prompt:globalPrompt,setPrompt:globalSetPrompt||(()=>{})}}
function useSiteAdmin(){return{requireSiteAdmin:globalRequireSiteAdmin??true,setRequireSiteAdmin:globalSetRequireSiteAdmin||(()=>{}),assignedAdmins:globalAssignedAdmins||{},setAssignedAdmins:globalSetAssignedAdmins||(()=>{})}}
function triggerApproval(id){if(globalSetPrompt)globalSetPrompt({id,reason:""})}

/* Approval Confirmation Prompt */
function ApprovalPrompt(){
  const {prompt,setPrompt,approvals,setApprovals}=useApprovals();
  const {assignedAdmins,setAssignedAdmins}=useSiteAdmin();
  const [selAdmin,setSelAdmin]=useState(null);
  const [showAllAdmins,setShowAllAdmins]=useState(false);
  if(!prompt)return null;
  const a=approvals.find(x=>x.id===prompt.id);
  if(!a)return null;
  const hasNote=prompt.reason.trim().length>0;

  /* Site admins for the campus */
  const campusAdmins=usersData.filter(u=>u.role==="Site Admin"&&u.loc===a.campus);
  const allAdmins=usersData.filter(u=>u.role==="Site Admin");
  const relevantAdmins=campusAdmins.length>0?campusAdmins:allAdmins;

  const doAction=(action)=>{
    const note=hasNote?` ${action==="approved"?"Approved":"Denied"} by Marcus Williams: ${prompt.reason.trim()}`:"";
    const adminNote=selAdmin?` Site Admin: ${selAdmin}`:"";
    setApprovals(approvals.map(x=>x.id===prompt.id?{...x,status:action,expiresIn:"--",notes:note?((x.notes||"")+note+adminNote):x.notes}:x));
    if(selAdmin&&action==="approved"){
      const newAssigned={...assignedAdmins};
      /* Map by day-label so calendar can look them up */
      a.bk.forEach(b=>{
        const dayMatch=b.date?parseInt(b.date.split("/")[1]):null;
        const labelKey=dayMatch?`${dayMatch}-PP - ${a.org}`:b.bid;
        newAssigned[labelKey]=selAdmin;
      });
      setAssignedAdmins(newAssigned);
    }
    setPrompt(null);
    setSelAdmin(null);
    setShowAllAdmins(false);
    if(globalShowToast)globalShowToast({
      type:action==="approved"?"success":"error",
      title:action==="approved"?"Reservation Approved":"Reservation Rejected",
      msg:`${a.org} - ${a.id}${selAdmin?` - Assigned to ${selAdmin}`:""}`,
      color:action==="approved"?C.green:C.red
    });
  };
  const totalRev=a.bk.reduce((s,b)=>s+b.rev,0);
  return <>
    <div onClick={()=>{setPrompt(null);setSelAdmin(null);setShowAllAdmins(false)}} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.4)",backdropFilter:"blur(2px)",zIndex:300,animation:"fadeIn .2s ease"}}/>
    <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:440,maxWidth:"92vw",background:C.cardBg,borderRadius:R.lg,boxShadow:`0 20px 60px rgba(0,0,0,${C.bg==="#0F1318"?0.4:0.18})`,zIndex:301,fontFamily:font,animation:"slideUp .25s ease",overflow:"hidden"}}>
      <div style={{padding:"22px 24px 20px"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:38,height:38,borderRadius:10,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13,flexShrink:0}}>{a.photo}</div>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:C.g800,letterSpacing:"-0.01em"}}>{a.org}</div>
              <div style={{fontSize:11,color:C.g500,marginTop:2}}>{a.contact} - <span style={{fontFamily:"monospace",fontWeight:600,color:C.g600}}>{a.id}</span></div>
            </div>
          </div>
          <button onClick={()=>{setPrompt(null);setSelAdmin(null);setShowAllAdmins(false)}} style={{background:C.g100,border:"none",width:28,height:28,borderRadius:R.sm,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(12,C.g500)}</button>
        </div>

        {/* Booking summary */}
        <div style={{display:"flex",gap:0,borderRadius:R.sm,border:`1px solid ${C.g200}`,overflow:"hidden",marginBottom:14}}>
          {[["Asset",a.bk[0].asset],["Date",a.bk.length===1?a.bk[0].date:a.bk[0].date+" +"+(a.bk.length-1)],["Revenue","$"+totalRev.toLocaleString()]].map(([l,v],i)=><div key={l} style={{flex:1,padding:"10px 12px",background:C.g50,borderRight:i<2?`1px solid ${C.g200}`:"none"}}>
            <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:C.g700,marginTop:2}}>{v}</div>
          </div>)}
        </div>

        {/* Insurance status callout */}
        <div style={{padding:"10px 14px",borderRadius:R.sm,background:a.insActive?`${C.green}06`:`${C.red}08`,border:`1px solid ${a.insActive?`${C.green}20`:`${C.red}25`}`,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:8,background:a.insActive?`${C.green}12`:`${C.red}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {a.insActive?I.check(14,C.green):<span style={{fontSize:14}}>⚠</span>}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:a.insActive?C.green:C.red}}>
              {a.insActive?"Insurance Verified":"Insurance Not Verified"}
            </div>
            <div style={{fontSize:10,color:C.g500,marginTop:1}}>
              {a.insActive
                ?<>COI on file - expires {a.insEnd}{a.insLimit&&a.insLimit!=="N/A"?` - ${a.insLimit} coverage`:""}</>
                :<>Certificate expired {a.insEnd}. Request updated COI before approving.</>
              }
            </div>
          </div>
          <button style={{background:"none",border:`1px solid ${C.g200}`,borderRadius:6,padding:"5px 10px",fontSize:10,fontWeight:600,color:C.g600,cursor:"pointer",fontFamily:font,flexShrink:0,whiteSpace:"nowrap"}}>View COI</button>
        </div>

        {/* Site admin assignment */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:600,color:C.g700,marginBottom:6}}>Assign Site Admin</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {(showAllAdmins?allAdmins:relevantAdmins).map(s=>{
              const isSel=selAdmin===s.name;
              const isCampusMatch=s.loc===a.campus;
              return <div key={s.name} onClick={()=>setSelAdmin(isSel?null:s.name)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,border:`1px solid ${isSel?C.blue:C.g200}`,background:isSel?`${C.blue}06`:C.cardBg,cursor:"pointer",transition:"all .12s"}}>
                <div style={{width:26,height:26,borderRadius:7,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:9,flexShrink:0}}>{s.initials}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:12,fontWeight:600,color:C.g800}}>{s.name}</span>
                    {isCampusMatch&&<span style={{fontSize:8,fontWeight:700,color:C.green,background:C.greenL,padding:"1px 5px",borderRadius:3}}>Campus</span>}
                  </div>
                  <div style={{fontSize:10,color:C.g400}}>{s.loc}</div>
                </div>
                {isSel&&<span style={{width:18,height:18,borderRadius:5,background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>✓</span>}
              </div>})}
          </div>
          {!showAllAdmins&&campusAdmins.length>0&&campusAdmins.length<allAdmins.length&&<button onClick={()=>setShowAllAdmins(true)} style={{background:"none",border:"none",color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font,padding:"6px 0 0",display:"flex",alignItems:"center",gap:4}}>Show all site admins ({allAdmins.length})</button>}
          {showAllAdmins&&<button onClick={()=>setShowAllAdmins(false)} style={{background:"none",border:"none",color:C.g400,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font,padding:"6px 0 0"}}>Show campus admin only</button>}
          {!selAdmin&&<div style={{fontSize:10,color:C.g400,marginTop:4,fontStyle:"italic"}}>Select who will be on-site for this rental. You can also assign later from the full review.</div>}
        </div>

        {/* Note */}
        <div style={{marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:600,color:C.g700,marginBottom:5}}>Note <span style={{fontWeight:400,color:C.g400}}>(optional)</span></div>
          <textarea value={prompt.reason} onChange={e=>setPrompt({...prompt,reason:e.target.value})} placeholder="Add a note..." rows={2} style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:12,fontFamily:font,resize:"vertical",color:C.g700,boxSizing:"border-box",background:C.g50}}/>
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>doAction("approved")} style={{flex:1,padding:"11px",borderRadius:R.sm,border:"none",background:C.green,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>Approve</button>
          <button onClick={()=>doAction("denied")} style={{flex:1,padding:"11px",borderRadius:R.sm,border:`1px solid ${C.red}30`,background:C.cardBg,color:C.red,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>Reject</button>
        </div>
      </div>
    </div>
  </>
}
/* pendingApprovals computed per-component from stateful approvals */
/* Users data */
const usersData=[
  {name:"Marcus Williams",email:"m.williams@apsb.org",role:"District Admin",loc:"District Office",status:true,updated:"02/01/2026",initials:"MW",color:C.blue,phone:"(225) 391-7000"},
  {name:"Coach Tony Richard",email:"t.richard@apsb.org",role:"Site Admin",loc:"Dutchtown High School",status:true,updated:"01/28/2026",initials:"TR",color:C.green,phone:"(225) 391-7145"},
  {name:"Denise Landry",email:"d.landry@apsb.org",role:"Site Admin",loc:"East Ascension High School",status:true,updated:"01/25/2026",initials:"DL",color:C.blueDk,phone:"(225) 391-7200"},
  {name:"Coach Ray Bourque",email:"r.bourque@apsb.org",role:"Site Admin",loc:"St. Amant High School",status:true,updated:"01/30/2026",initials:"RB",color:C.purple,phone:"(225) 391-7310"},
  {name:"Amy Melancon",email:"a.melancon@apsb.org",role:"Site Admin",loc:"Prairieville High School",status:true,updated:"02/03/2026",initials:"AM",color:C.blueDk,phone:"(225) 391-7420"},
  {name:"Derek Simmons",email:"d.simmons@apsb.org",role:"Facility Mgr",loc:"Donaldsonville High School",status:true,updated:"01/20/2026",initials:"DS",color:C.g500,phone:"(225) 391-7500"},
  {name:"Bayou City Volleyball",email:"bayoucityvb@gmail.com",role:"Participant",loc:"Dutchtown High School",status:true,updated:"02/05/2026",initials:"BC",color:C.blue,phone:"(225) 555-0182"},
  {name:"Gonzales FC",email:"gonzalesfc@yahoo.com",role:"Participant",loc:"Prairieville High School",status:true,updated:"02/01/2026",initials:"GF",color:C.purple,phone:"(225) 555-0294"},
  {name:"Ascension Elite Cheer",email:"elitecheer@ascension.org",role:"Participant",loc:"St. Amant High School",status:true,updated:"02/03/2026",initials:"AE",color:C.orange,phone:"(225) 555-0137"},
  {name:"Louisiana Tigers AAU",email:"latigersaau@gmail.com",role:"Participant",loc:"Dutchtown High School",status:true,updated:"02/04/2026",initials:"LT",color:C.green,phone:"(225) 555-0419"},
  {name:"River Parish Runners",email:"rprunners@hotmail.com",role:"Participant",loc:"St. Amant High School",status:false,updated:"01/06/2026",initials:"RP",color:C.g400,phone:"(225) 555-0331"},
];
/* Payments data */
const paymentsData=[
  {date:"Feb-05-2026",time:"02:15 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Feb-03-2026",time:"09:22 AM",asset:"Prairieville Athletic Complex",fac:"Prairieville High School",rev:950,count:2,dur:"4h",user:"Gonzales FC",status:"failed"},
  {date:"Feb-01-2026",time:"02:47 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:700,count:2,dur:"4h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Jan-28-2026",time:"11:15 AM",asset:"St. Amant Gymnasium",fac:"St. Amant High School",rev:650,count:2,dur:"4h",user:"Ascension Elite Cheer",status:"completed"},
  {date:"Jan-22-2026",time:"06:00 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Louisiana Tigers AAU",status:"completed"},
  {date:"Jan-20-2026",time:"04:00 PM",asset:"Gator Stadium",fac:"St. Amant High School",rev:395,count:1,dur:"2h",user:"River Parish Runners",status:"pending"},
  {date:"Jan-18-2026",time:"09:00 AM",asset:"East Ascension Gymnasium",fac:"East Ascension High School",rev:400,count:1,dur:"2h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Jan-15-2026",time:"02:00 PM",asset:"East Ascension Gymnasium",fac:"East Ascension High School",rev:400,count:1,dur:"2h",user:"Louisiana Tigers AAU",status:"completed"},
  {date:"Jan-11-2026",time:"06:00 PM",asset:"Prairieville Athletic Complex",fac:"Prairieville High School",rev:475,count:1,dur:"2h",user:"Gonzales FC",status:"completed"},
  {date:"Jan-08-2026",time:"03:00 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Ascension Elite Cheer",status:"completed"},
];
/* Reporting */
const revByFacData=[{m:"Sep",dt:2800,ea:2100,sa:1500,pv:900,dn:550},{m:"Oct",dt:4200,ea:3100,sa:2200,pv:1100,dn:640},{m:"Nov",dt:3600,ea:2700,sa:1800,pv:1000,dn:580},{m:"Dec",dt:2100,ea:1600,sa:1200,pv:600,dn:340},{m:"Jan",dt:5800,ea:4100,sa:2400,pv:1400,dn:520},{m:"Feb",dt:3400,ea:2500,sa:1600,pv:850,dn:411}];
const payoutsData=[{month:"Oct 2025",total:11240,status:"paid",date:"11/01/2025"},{month:"Nov 2025",total:9680,status:"paid",date:"12/01/2025"},{month:"Dec 2025",total:5840,status:"paid",date:"01/02/2026"},{month:"Jan 2026",total:14220,status:"paid",date:"02/01/2026"},{month:"Feb 2026",total:8761.25,status:"processing",date:"03/01/2026"}];
/* Detailed payout transactions mirroring real Stripe transfer data */
const txnData=[
  {id:"7kR2mBxH4q",updatedAt:"02/05/26 10:18 pm",resId:"lpWOuBlkFa",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/06/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SxfeTBPaTHg8GrQh52FYgCD",acctPayId:"py_1SxfeTBUbsUICInXTJ9GVVYD",intentId:"pi_3SwkwnBPaTHg8GrQ4Olhgh3W"},
  {id:"55prUzHLVR",updatedAt:"02/05/26 10:24 pm",resId:"K93MNpR4w1",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"02/06/26",destAcct:"acct_1ScWpNB3rReV834a",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SxfeUBPaTHg8GrQ9xk3R7mN",acctPayId:"py_1SxfeUBUbsUICInX8mL2pQwR",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"SINYt3iC1O",updatedAt:"02/03/26 10:24 pm",resId:"L75jO3fVuv",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"02/04/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SwwhLBPaTHg8GrQLzjmZUx3",acctPayId:"py_1SwwhLBUbsUICInXvLR0sqEO",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"9PSCCpFfci",updatedAt:"02/04/26 10:24 pm",resId:"FtuEkJ4pjD",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/05/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SxJAvBPaTHg8GrQ1ihuoabL",acctPayId:"py_1SxJAvBUbsUICInXiEqFEkvN",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"mQ8nYwZ3kP",updatedAt:"02/02/26 04:15 pm",resId:"R29STuV7d4",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"02/03/26",destAcct:"acct_1ScWpNB3rReV834a",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SwJKmBPaTHg8GrQf7nWxR2e",acctPayId:"py_1SwJKmBUbsUICInXp4L9vTfH",intentId:"pi_3SvR8kBPaTHg8GrQ1mNpQr5Y"},
  {id:"aB4cDeFgHi",updatedAt:"02/01/26 02:47 pm",resId:"P47QRsT8z3",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/02/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1Sw2RsBPaTHg8GrQ3kL8nMpQ",acctPayId:"py_1Sw2RsBUbsUICInXw9fJ2rTv",intentId:"pi_3SvfTnBPaTHg8GrQ0xKjHm4R"},
  {id:"jK5lMnOpQr",updatedAt:"01/30/26 06:24 am",resId:"W82XYzA5b6",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/31/26",destAcct:"acct_1ScWpNB3rReV834a",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1SvFoABPaTHg8GrQWs9Dx6zi",acctPayId:"py_1SvFoAB3rReV834aFf7om983",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"sT6uVwXyZa",updatedAt:"01/28/26 11:15 am",resId:"J55KLmN2c8",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"01/29/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SvFoEBPaTHg8GrQtFK7czfc",acctPayId:"py_1SvFoEB3rReV834ax0CPMHE4",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"bC7dEfGhIj",updatedAt:"01/26/26 09:30 am",resId:"qziBigKYcm",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/27/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SvFoFBPaTHg8GrQ5JBNRprF",acctPayId:"py_1SvFoFB3rReV834aykqtGD2Y",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"kL8mNoPqRs",updatedAt:"01/22/26 06:00 pm",resId:"5KYfqHHuI5",asset:"Gator Stadium",facility:"St. Amant High School",transferDate:"01/23/26",destAcct:"acct_1ScWpNB3rReV834a",amount:395.00,discount:"N/A",status:"success",transferId:"tr_1SvFoHBPaTHg8GrQbKeQkVbJ",acctPayId:"py_1SvFoHB3rReV834a3vewNkQM",intentId:"pi_3SrnEZBPaTHg8GrQ1rjleP6J"},
  {id:"tU9vWxYzAb",updatedAt:"01/20/26 04:00 pm",resId:"gR2Ums4KQH",asset:"Spartan Stadium",facility:"East Ascension High School",transferDate:"01/21/26",destAcct:"acct_1ScWpNB3rReV834a",amount:450.00,discount:"N/A",status:"success",transferId:"tr_1SuRkTBPaTHg8GrQ7nL3mQwE",acctPayId:"py_1SuRkTBUbsUICInXq2K8pRtY",intentId:"pi_3StZ9RBPaTHg8GrQ3jMkLn6W"},
  {id:"cD0eFgHiJk",updatedAt:"01/18/26 09:00 am",resId:"XCTQOLE7wU",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/19/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1StH2nBPaTHg8GrQ5xK7rMpQ",acctPayId:"py_1StH2nBUbsUICInXw3fL9vTh",intentId:"pi_3SsP1mBPaTHg8GrQ2kNjHn8S"},
  {id:"lM1nOpQrSt",updatedAt:"01/15/26 02:00 pm",resId:"lpWOuBlkFa",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/16/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1Ss8LpBPaTHg8GrQ9mN2kQwR",acctPayId:"py_1Ss8LpBUbsUICInXt6J4rTvY",intentId:"pi_3SrG0oBPaTHg8GrQ1lMjKn5W"},
  {id:"uV2wXyZaBc",updatedAt:"01/11/26 06:00 pm",resId:"L75jO3fVuv",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"01/12/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SqYRtBPaTHg8GrQ4kL7mNpS",acctPayId:"py_1SqYRtBUbsUICInXr8J3pQtW",intentId:"pi_3SpgQsBPaTHg8GrQ0jKiHn7R"},
  {id:"dE3fGhIjKl",updatedAt:"01/08/26 03:00 pm",resId:"FtuEkJ4pjD",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/09/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SpOHsBPaTHg8GrQ2nM8kQwT",acctPayId:"py_1SpOHsBUbsUICInXv5L1rTwZ",intentId:"pi_3SoWGrBPaTHg8GrQ3lNjKm6S"},
  {id:"mN4oPqRsTu",updatedAt:"01/06/26 03:00 pm",resId:"J55KLmN2c8",asset:"Spartan Stadium",facility:"East Ascension High School",transferDate:"01/07/26",destAcct:"acct_1ScWpNB3rReV834a",amount:450.00,discount:"N/A",status:"success",transferId:"tr_1SoEAtBPaTHg8GrQ6mL9kNpU",acctPayId:"py_1SoEAtBUbsUICInXw2K4rQtX",intentId:"pi_3SnM9sBPaTHg8GrQ1jMiHn5T"},
  {id:"vW5xYzAbCd",updatedAt:"01/05/26 04:00 pm",resId:"qziBigKYcm",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/06/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"APSD10",status:"success",transferId:"tr_1Sn5BuBPaTHg8GrQ8nM0kQwV",acctPayId:"py_1Sn5BuBUbsUICInXt3L6rTxY",intentId:"pi_3SmD0tBPaTHg8GrQ2lNjKn7U"},
  {id:"eF6gHiJkLm",updatedAt:"12/20/25 10:00 am",resId:"gR2Ums4KQH",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"12/21/25",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SlvCvBPaTHg8GrQ0mL1kNpW",acctPayId:"py_1SlvCvBUbsUICInXr7K5rQtZ",intentId:"pi_3SkD9uBPaTHg8GrQ3jMiHn8V"},
  {id:"nO7pQrStUv",updatedAt:"12/15/25 05:00 pm",resId:"XCTQOLE7wU",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"12/16/25",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SklDwBPaTHg8GrQ2nM2kQwX",acctPayId:"py_1SklDwBUbsUICInXv8L6rTyA",intentId:"pi_3SjsCtBPaTHg8GrQ1lNjKn9W"},
  {id:"wX8yZaBcDe",updatedAt:"12/12/25 08:00 am",resId:"5KYfqHHuI5",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"12/13/25",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SjbExBPaTHg8GrQ4mL3kNpY",acctPayId:"py_1SjbExBUbsUICInXr9K7rQuB",intentId:"pi_3SiiDwBPaTHg8GrQ2jMiHn0X"},
  {id:"fG9hIjKlMn",updatedAt:"12/03/25 03:00 pm",resId:"lpWOuBlkFa",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"12/04/25",destAcct:"acct_1SwUtFBUbsUICInX",amount:300.00,discount:"N/A",status:"success",transferId:"tr_1SiRFyBPaTHg8GrQ6nM4kQwZ",acctPayId:"py_1SiRFyBUbsUICInXv0L8rTzC",intentId:"pi_3ShZExBPaTHg8GrQ3lNjKnAY"},
  {id:"oP0qRsTuVw",updatedAt:"11/22/25 02:00 pm",resId:"L75jO3fVuv",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"11/23/25",destAcct:"acct_1ScWpNB3rReV834a",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1ShHGzBPaTHg8GrQ8mL5kNpA",acctPayId:"py_1ShHGzBUbsUICInXr1K9rQuD",intentId:"pi_3SgPFyBPaTHg8GrQ1jMiHnBZ"},
  {id:"xY1zAbCdEf",updatedAt:"02/03/26 09:22 am",resId:"K93MNpR4w1",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"pending",destAcct:"acct_1ScWpNB3rReV834a",amount:950.00,discount:"N/A",status:"failed",transferId:"--",acctPayId:"--",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
];

/* ======== STYLES ======== */
const font="'Montserrat', sans-serif";
const numFont="'DM Sans', 'Montserrat', sans-serif";
const R={sm:8,md:10,lg:12,xl:16};/* border radius scale */
/* SVG Icons - inline, no emoji */
const I={
  search:(s=14,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  bell:(s=16,c=C.g600)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  x:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  menu:(s=20,c=C.g600)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
  calendar:(s=14,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
  mail:(s=14,c=C.blue)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  phone:(s=14,c=C.g600)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  user:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  edit:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  flag:(s=14,c="#fff")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22V15"/></svg>,
  alert:(s=14,c=C.orange)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  bulb:(s=14,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  trend:(s=14,c=C.blue)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
  sync:(s=14,c=C.g600)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>,
  link:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  hand:(s=16,c="#fff")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  dot:(s=8,c=C.blue)=><svg width={s} height={s} viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={c}/></svg>,
  check:(s=14,c="#fff")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>,
  stadium:(s=14,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><ellipse cx="12" cy="8" rx="10" ry="5"/><path d="M2 8v5c0 2.76 4.48 5 10 5s10-2.24 10-5V8"/></svg>,
  home:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  building:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  key:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  chart:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  users:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  wallet:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  chevL:(s=16,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>,
  chevR:(s=16,c=C.g400)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>,
  sun:(s=16,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>,
  moon:(s=16,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  megaphone:(s=18,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  share:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m8.59 10.49 6.83-3.98"/></svg>,
  download:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  copy:(s=14,c=C.g500)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
};
const _TH=()=>({textAlign:"left",padding:"11px 16px",color:C.g400,fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:`1px solid ${C.g200}`,background:C.g50});
const _TD=()=>({padding:"12px 16px",fontSize:13,borderBottom:`1px solid ${C.g100}`});
const _sel=()=>({padding:"9px 34px 9px 12px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:13,color:C.g700,background:C.cardBg,appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239BA5B3' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",cursor:"pointer",fontWeight:600,fontFamily:font});
const _btnP=()=>({background:C.blue,color:"#fff",border:"none",borderRadius:R.sm,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font,display:"inline-flex",alignItems:"center",gap:6,transition:"all .15s",whiteSpace:"nowrap"});
const _btnO=()=>({background:C.cardBg,color:C.g600,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font,transition:"all .15s",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:6});
/* Proxy objects that always read current theme */
const TH=new Proxy({},{get:(_,p)=>_TH()[p],ownKeys:()=>Object.keys(_TH()),getOwnPropertyDescriptor:(_,p)=>({value:_TH()[p],enumerable:true,configurable:true})});
const TD=new Proxy({},{get:(_,p)=>_TD()[p],ownKeys:()=>Object.keys(_TD()),getOwnPropertyDescriptor:(_,p)=>({value:_TD()[p],enumerable:true,configurable:true})});
const sel=new Proxy({},{get:(_,p)=>_sel()[p],ownKeys:()=>Object.keys(_sel()),getOwnPropertyDescriptor:(_,p)=>({value:_sel()[p],enumerable:true,configurable:true})});
const btnP=new Proxy({},{get:(_,p)=>_btnP()[p],ownKeys:()=>Object.keys(_btnP()),getOwnPropertyDescriptor:(_,p)=>({value:_btnP()[p],enumerable:true,configurable:true})});
const btnO=new Proxy({},{get:(_,p)=>_btnO()[p],ownKeys:()=>Object.keys(_btnO()),getOwnPropertyDescriptor:(_,p)=>({value:_btnO()[p],enumerable:true,configurable:true})});
const pill=(a)=>({padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:"none",fontFamily:font,background:a?C.g800:C.g100,color:a?"#fff":C.g500,transition:"all .15s"});
const statusBadge=(s)=>{const m={completed:{bg:C.greenL,c:C.green},failed:{bg:C.redL,c:C.red},pending:{bg:C.amberL,c:C.amber},processing:{bg:C.blueL,c:C.blue},paid:{bg:C.greenL,c:C.green}};const x=m[s]||m.pending;return{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:x.bg,color:x.c,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em"}};

/* ======== COMPONENTS ======== */
function Card({children,style={},np,className=""}){return <div className={`pp-card ${className}`} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,padding:np?0:20,boxShadow:C.cardShadow,...style}}>{children}</div>}
function Sec({children,action}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h3 style={{margin:0,fontSize:14,fontWeight:700,color:C.g800,letterSpacing:"-0.01em"}}>{children}</h3>{action}</div>}
function Div({children}){return <div style={{display:"flex",alignItems:"center",gap:12,marginTop:8}}><div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.1em",whiteSpace:"nowrap"}}>{children}</div><div style={{flex:1,height:1,background:C.g200}}/></div>}
function Empty({icon,title,desc,action,onAction}){return <div style={{padding:"48px 20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
  <div style={{width:48,height:48,borderRadius:14,background:C.g100,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:4}}>{icon||I.search(22,C.g300)}</div>
  <div style={{fontSize:14,fontWeight:700,color:C.g600}}>{title||"No results found"}</div>
  {desc&&<div style={{fontSize:12,color:C.g400,maxWidth:280,lineHeight:1.5}}>{desc}</div>}
  {action&&<button onClick={onAction} style={{...btnO,fontSize:12,padding:"7px 16px",marginTop:8,color:C.blue,borderColor:`${C.blue}30`}}>{action}</button>}
</div>}
function Skeleton({rows=3}){return <div style={{display:"flex",flexDirection:"column",gap:12,padding:"8px 0"}}>{Array(rows).fill(0).map((_,i)=><div key={i} style={{display:"flex",gap:12,alignItems:"center"}}><div className="pp-skel" style={{width:40,height:40,borderRadius:10,background:C.g100}}/><div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}><div className="pp-skel" style={{height:12,borderRadius:4,background:C.g100,width:`${70-i*15}%`}}/><div className="pp-skel" style={{height:10,borderRadius:4,background:C.g100,width:`${50-i*10}%`}}/></div></div>)}</div>}
function Met({label,value,change,dir,sub,accent=C.blue}){
  const spark=sparkData[label];
  const numericVal=parseFloat(value.replace(/[^0-9.]/g,""));
  const prefix=value.match(/^[^0-9]*/)?.[0]||"";
  const suffix=value.match(/[^0-9.]*$/)?.[0]||"";
  const [display,setDisplay]=useState(0);
  const rafRef=useRef();
  useEffect(()=>{
    if(isNaN(numericVal))return;
    let start=0;const dur=800;const t0=performance.now();
    const tick=(now)=>{const p=Math.min((now-t0)/dur,1);const ease=1-Math.pow(1-p,3);
      setDisplay(ease*numericVal);if(p<1)rafRef.current=requestAnimationFrame(tick)};
    rafRef.current=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[numericVal]);
  const fmt=numericVal>=1000?Math.round(display).toLocaleString():numericVal%1!==0?display.toFixed(numericVal.toString().split(".")[1]?.length||0):Math.round(display).toString();

  return <Card className="pp-met" style={{overflow:"hidden",padding:"14px 16px"}}>
    <div className="pp-met-top" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:4,marginBottom:6}}>
      <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",minWidth:0}}>{label}</div>
      {change&&<span className="pp-met-badge" style={{fontSize:10,fontWeight:700,color:dir==="up"?C.blue:C.g400,background:dir==="up"?C.blueL:C.g100,padding:"2px 7px",borderRadius:20,whiteSpace:"nowrap",flexShrink:0,lineHeight:1.2}}>{dir==="up"?"↑":"↓"} {change}</span>}
    </div>
    <div style={{fontSize:28,fontWeight:800,color:C.g800,lineHeight:1,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",fontFamily:numFont}}>{prefix}{fmt}{suffix}</div>
    <div className="pp-met-bottom" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:6}}>
      {sub&&<div style={{fontSize:11,color:C.g400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",minWidth:0}}>{sub}</div>}
      {spark&&<div style={{flexShrink:0,opacity:0.7}}><Sparkline data={spark} color={dir==="up"?C.blue:C.g400} w={44} h={16}/></div>}
    </div>
  </Card>
}

/* Progress Ring */
function ProgressRing({pct,size=40,stroke=4,color}){
  const r=(size-stroke)/2;const circ=2*Math.PI*r;
  const col=color||(pct>60?C.green:pct>40?C.blue:C.orange);
  const [anim,setAnim]=useState(0);
  useEffect(()=>{let start;const dur=700;
    const tick=(t)=>{if(!start)start=t;const p=Math.min((t-start)/dur,1);setAnim(p*pct);if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  },[pct]);
  return <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.g200} strokeWidth={stroke}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={circ-(anim/100)*circ} strokeLinecap="round" style={{transition:"stroke .3s"}}/></svg>
}

/* Sort icon */
const SortIcon=({dir})=><svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{marginLeft:4,verticalAlign:"middle"}}><path d="M5 1l3 3.5H2L5 1z" fill={dir==="asc"?C.blue:C.g300}/><path d="M5 9L2 5.5h6L5 9z" fill={dir==="desc"?C.blue:C.g300}/></svg>;

/* Create Reservation Modal */
function CreateResModal({open,onClose}){
  const [form,setForm]=useState({campus:"",asset:"",customer:"",date:"",time:"",endTime:"",duration:"2",rate:"175",activity:"",people:"",notes:""});
  const [step,setStep]=useState(1);
  const upd=(k,v)=>{
    const nf={...form,[k]:v};
    /* Auto-calc duration when start/end times set */
    if((k==="time"||k==="endTime")&&nf.time&&nf.endTime){
      const parseT=(t)=>{const [h,rest]=t.split(":");const m=parseInt(rest);const hr=parseInt(h);const pm=t.includes("PM")&&hr!==12;const am=t.includes("AM")&&hr===12;return (pm?hr+12:am?0:hr)+m/60};
      const diff=parseT(nf.endTime)-parseT(nf.time);if(diff>0)nf.duration=String(diff);
    }
    /* Auto-set rate based on campus */
    if(k==="campus"){nf.asset="";nf.rate=v==="Dutchtown High School"?"200":v==="East Ascension High School"?"185":v==="Prairieville High School"?"190":"175"}
    setForm(nf);
  };
  if(!open)return null;
  const rev=parseFloat(form.rate||0)*parseFloat(form.duration||0);
  const processingFee=(rev*0.029).toFixed(2);
  const platformFee=(rev*0.05).toFixed(2);
  const net=(rev-parseFloat(processingFee)-parseFloat(platformFee)).toFixed(2);
  const campusFacs=form.campus?facilities[campuses.find(c=>c.name===form.campus)?.short]||[]:[];
  const canNext=step===1?(form.campus&&form.asset&&form.customer):true;
  const canSubmit=form.campus&&form.asset&&form.customer&&form.date&&form.time;
  const times=["6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM"];
  const Label=({children})=><label style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:5}}>{children}</label>;
  const inp={width:"100%",padding:"10px 12px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:16,fontFamily:font,background:C.g50,color:C.g700,boxSizing:"border-box"};

  return <>
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.35)",backdropFilter:"blur(2px)",zIndex:299,animation:"fadeIn .2s ease"}}/>
    <div className="pp-create-modal" onClick={e=>e.stopPropagation()} style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:540,maxWidth:"94vw",maxHeight:"90vh",background:C.cardBg,borderRadius:R.lg,boxShadow:`0 20px 60px rgba(0,0,0,${C.bg==="#0F1318"?0.4:0.18})`,zIndex:300,fontFamily:font,overflow:"hidden",animation:"slideUp .25s cubic-bezier(.22,1,.36,1)",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"18px 22px",borderBottom:`1px solid ${C.cardBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div>
          <div style={{fontSize:16,fontWeight:800,color:C.g800}}>Create Reservation</div>
          <div style={{fontSize:11,color:C.g400,marginTop:2}}>Step {step} of 2 - {step===1?"Booking Info":"Schedule & Pricing"}</div>
        </div>
        <button onClick={onClose} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(12,C.g500)}</button>
      </div>
      {/* Step indicator */}
      <div style={{display:"flex",gap:4,padding:"0 22px",paddingTop:14,flexShrink:0}}>
        {[1,2].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=step?C.blue:C.g200,transition:"background .2s"}}/>)}
      </div>
      <div style={{padding:"14px 22px 18px",display:"flex",flexDirection:"column",gap:12,overflow:"auto",flex:1}}>
        {step===1&&<>
          <div><Label>Campus</Label>
            <select value={form.campus} onChange={e=>upd("campus",e.target.value)} style={{...sel,width:"100%"}}><option value="">Select campus...</option>{campuses.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
          <div><Label>Facility / Asset</Label>
            <select value={form.asset} onChange={e=>upd("asset",e.target.value)} style={{...sel,width:"100%"}} disabled={!form.campus}><option value="">Select facility...</option>{campusFacs.map(f=><option key={f} value={facilityFull[f]||f}>{facilityFull[f]||f}</option>)}</select>
            {!form.campus&&<div style={{fontSize:10,color:C.g400,marginTop:4,fontStyle:"italic"}}>Select a campus first</div>}
          </div>
          <div><Label>Customer / Organization</Label>
            <input type="text" value={form.customer} onChange={e=>upd("customer",e.target.value)} placeholder="e.g. Bayou City Volleyball" style={inp}/>
            {form.customer.length>1&&<div style={{marginTop:4,borderRadius:R.sm,border:`1px solid ${C.g200}`,overflow:"hidden"}}>{topCustData.filter(c=>c.n.toLowerCase().includes(form.customer.toLowerCase())).slice(0,3).map(c=><div key={c.n} onClick={()=>upd("customer",c.n)} style={{padding:"8px 12px",fontSize:12,color:C.g700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${C.g100}`}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:22,height:22,borderRadius:6,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:C.blue}}>{c.photo}</div>
              <span style={{fontWeight:600}}>{c.n}</span><span style={{fontSize:10,color:C.g400,marginLeft:"auto"}}>{c.b} bookings</span>
            </div>)}</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><Label>Activity Type</Label>
              <select value={form.activity} onChange={e=>upd("activity",e.target.value)} style={{...sel,width:"100%"}}><option value="">Select...</option>{["Basketball","Volleyball","Soccer","Cheerleading","Track & Field","Wrestling","Meeting/Event","Other"].map(a=><option key={a}>{a}</option>)}</select></div>
            <div><Label>Est. Attendees</Label>
              <input type="number" value={form.people} onChange={e=>upd("people",e.target.value)} placeholder="e.g. 25" style={inp}/></div>
          </div>
        </>}
        {step===2&&<>
          <div><Label>Date</Label>
            <input type="date" value={form.date} onChange={e=>upd("date",e.target.value)} style={inp}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><Label>Start Time</Label>
              <select value={form.time} onChange={e=>upd("time",e.target.value)} style={{...sel,width:"100%"}}><option value="">Select...</option>{times.map(t=><option key={t}>{t}</option>)}</select></div>
            <div><Label>End Time</Label>
              <select value={form.endTime} onChange={e=>upd("endTime",e.target.value)} style={{...sel,width:"100%"}}><option value="">Select...</option>{times.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><Label>Duration (hrs)</Label>
              <input type="number" value={form.duration} onChange={e=>upd("duration",e.target.value)} min="1" max="12" style={inp}/></div>
            <div><Label>Rate ($/hr)</Label>
              <input type="number" value={form.rate} onChange={e=>upd("rate",e.target.value)} style={inp}/></div>
          </div>
          <div><Label>Notes (optional)</Label>
            <textarea value={form.notes} onChange={e=>upd("notes",e.target.value)} placeholder="Setup needs, equipment, special instructions..." rows={2} style={{...inp,resize:"vertical",lineHeight:1.5}}/></div>
          {/* Price preview */}
          {rev>0&&<div style={{borderRadius:R.sm,border:`1px solid ${C.green}30`,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",background:`${C.green}06`,display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.green}15`}}>
              <span style={{fontSize:13,fontWeight:700,color:C.g800}}>Revenue Summary</span>
              <span style={{fontSize:10,color:C.g400}}>{form.duration}hr x ${form.rate}/hr</span>
            </div>
            <div style={{padding:"8px 16px"}}>
              {[["Rental Total","$"+rev.toLocaleString()],["Processing (2.9%)","-$"+processingFee],["Platform (5.0%)","-$"+platformFee]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,color:C.g500}}><span>{l}</span><span style={{fontWeight:600,color:v.startsWith("-")?C.g400:C.g700}}>{v}</span></div>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",background:C.g50,borderTop:`1px solid ${C.g100}`}}>
              <span style={{fontSize:13,fontWeight:700,color:C.g800}}>Net to District</span>
              <span style={{fontSize:18,fontWeight:800,color:C.green,fontFamily:numFont}}>${net}</span>
            </div>
          </div>}
        </>}
      </div>
      <div style={{padding:"14px 22px",borderTop:`1px solid ${C.cardBorder}`,display:"flex",gap:10,justifyContent:"space-between",flexShrink:0}}>
        {step===1?<div/>:<button onClick={()=>setStep(1)} style={{...btnO}}>← Back</button>}
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnO,background:C.cardBg}}>Cancel</button>
          {step===1?<button onClick={()=>{if(canNext)setStep(2)}} style={{...btnP,opacity:canNext?1:0.5,cursor:canNext?"pointer":"not-allowed"}}>Next →</button>
          :<button onClick={()=>{if(canSubmit){globalShowToast({type:"success",title:"Reservation Created",msg:`${form.customer} - ${form.asset} on ${form.date}`,color:C.green});setStep(1);setForm({campus:"",asset:"",customer:"",date:"",time:"",endTime:"",duration:"2",rate:"175",activity:"",people:"",notes:""});onClose()}}} style={{...btnP,opacity:canSubmit?1:0.5,cursor:canSubmit?"pointer":"not-allowed"}}>Create Reservation</button>}
        </div>
      </div>
    </div>
  </>
}
const Tip=({active,payload,label})=>{if(!active||!payload?.length)return null;return <div style={{background:"#1A2030",color:"#fff",padding:"10px 14px",borderRadius:R.sm,fontSize:12,fontFamily:numFont,boxShadow:"0 8px 24px rgba(0,0,0,0.18)",border:"1px solid rgba(255,255,255,0.06)"}}><div style={{fontWeight:700,marginBottom:4,letterSpacing:"-0.01em",fontFamily:font}}>{label}</div>{payload.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}><span style={{width:7,height:7,borderRadius:2,background:p.color}}/><span style={{opacity:0.6,fontSize:11}}>{p.name}:</span><span style={{fontWeight:700}}>{typeof p.value==="number"?`$${p.value.toLocaleString()}`:p.value}</span></div>)}</div>};
function HC({v}){const i=v/6;const blue=C.blue;return <td style={{width:38,height:30,textAlign:"center",fontSize:11,fontWeight:600,background:i===0?C.g100:`${blue}${Math.round((.15+i*.6)*255).toString(16).padStart(2,"0")}`,color:i>.5?"#fff":C.g600,borderRadius:R.sm-2,border:`2px solid ${C.cardBg}`}}>{v||""}</td>}

/* ======== SLIDE PANELS (preserved) ======== */
function SlidePanel({open,onClose,children,width=500}){if(!open)return null;return <><style>{`@keyframes slideIn{from{transform:translateX(100%);opacity:0.5}to{transform:translateX(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}.slide-panel{animation:slideIn .32s cubic-bezier(.22,1,.36,1) forwards}.slide-overlay{animation:fadeIn .25s ease forwards}.slide-section{animation:slideUp .35s ease forwards;opacity:0}@media(max-width:768px){.slide-panel{width:100vw !important;max-width:100vw !important;height:100dvh !important;height:100vh !important}}`}</style><div className="slide-overlay" onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.35)",backdropFilter:"blur(2px)",zIndex:199}}/><div className="slide-panel" style={{position:"fixed",top:0,right:0,width,maxWidth:"92vw",height:"100dvh",background:C.cardBg,boxShadow:`-8px 0 40px rgba(0,0,0,${C.bg==="#0F1318"?0.3:0.12}), -1px 0 0 ${C.cardBorder}`,zIndex:200,display:"flex",flexDirection:"column",fontFamily:font,overflow:"hidden"}}>{children}</div></>}

function CustomerPanel({cust,onClose}){if(!cust)return null;return <SlidePanel open={true} onClose={onClose} width={480}>
  <div style={{padding:"28px 30px",borderBottom:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{display:"flex",gap:16,alignItems:"center"}}><div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:20}}>{cust.photo}</div><div><div style={{fontSize:20,fontWeight:800,color:C.g800}}>{cust.n}</div><div style={{fontSize:12,color:C.g400,marginTop:2}}>Customer since {cust.since}</div></div></div><button onClick={onClose} style={{background:C.g100,border:"none",width:32,height:32,borderRadius:8,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,C.g500)}</button></div>
  <div style={{flex:1,overflow:"auto"}}><div style={{padding:"20px 30px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{[["Email",cust.email],["Phone",cust.phone],["Total Spent",`$${cust.s.toLocaleString()}`],["Total Bookings",cust.b],["Favorite Asset",cust.fav],["Trend",cust.t==="up"?"↑ Increasing":cust.t==="down"?"↓ Decreasing":"- Stable"]].map(([l,v],i)=><div className="slide-section" key={l} style={{animationDelay:`${i*50+100}ms`,background:C.g50,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.g200}`}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{l}</div><div style={{fontSize:14,fontWeight:600,color:C.g700}}>{v}</div></div>)}</div>
  <div style={{padding:"8px 30px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{fontSize:14,fontWeight:700,color:C.g800}}>Reservation History</span><span style={{fontSize:11,color:C.g400}}>{cust.hist.length} total</span></div>{cust.hist.map((h,i)=><div className="slide-section" key={h.id} style={{animationDelay:`${i*60+400}ms`,display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<cust.hist.length-1?`1px solid ${C.g100}`:"none"}}><div style={{width:40,height:40,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.calendar(16,C.blue)}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{h.asset}</div><div style={{fontSize:11,color:C.g400}}>{h.date} - {h.time}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:14,fontWeight:700,color:C.g800}}>${h.rev.toFixed(2)}</div><div style={{fontSize:10,color:C.g400,fontVariantNumeric:"tabular-nums"}}>#{h.id}</div></div></div>)}</div></div>
  <div style={{padding:"16px 30px 24px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:10}}><button style={{...btnP,flex:1,justifyContent:"center"}}>{I.mail(13,"#fff")} Send Email</button><button style={{...btnO,flex:1,display:"flex",justifyContent:"center",alignItems:"center",gap:6}}>{I.calendar(13,C.g600)} New Booking</button></div>
</SlidePanel>}

function ReservationPanel({res,onClose,approval}){
  if(!res&&!approval)return null;
  const a=approval||null;
  const name=a?a.contact:res?.c;
  const team=a?a.org:res?.team;
  const email=a?a.email:res?.email;
  const phone=a?a.phone:res?.phone;
  const campus=a?a.campus:res?.fac;
  const resId=a?a.id:res?.resId?`#${res.resId}`:`#${res?.id}`;
  const insActive=a?a.insActive:res?.insActive;
  const insStart=a?a.insStart:res?.insStart;
  const insEnd=a?a.insEnd:res?.insEnd;
  const insLimit=a?a.insLimit:"$300,000";
  const insNote=a?(!a.insActive?"Insurance expired. Please request updated certificate.":null):res?.insNote;
  const isPending=a?a.status==="pending":false;
  const bookings=a?a.bk:[{bid:res?.resId||res?.id,asset:res?.a,date:res?.dLong,time:res?.t,hours:2,rev:res?.r||0,activity:res?.activity,people:res?.people,amenities:res?.amenities,created:res?.created}];
  const totalRev=bookings.reduce((s,b)=>s+b.rev,0);
  const totalHrs=bookings.reduce((s,b)=>s+b.hours,0);
  const multiBook=bookings.length>1;

  const partName=a?a.org:res?.c;
  const cust=topCustData.find(c=>c.n===partName);

  const [selected,setSelected]=useState(()=>bookings.map(b=>b.bid));
  const [expandedBk,setExpandedBk]=useState(bookings[0]?.bid||null);
  const [selSupervisor,setSelSupervisor]=useState(null);
  const [reason,setReason]=useState("");
  const [panelTab,setPanelTab]=useState("details");

  const toggle=(bid)=>{setSelected(s=>s.includes(bid)?s.filter(x=>x!==bid):[...s,bid])};
  const allSel=selected.length===bookings.length;
  const noneSel=selected.length===0;
  const selRev=bookings.filter(b=>selected.includes(b.bid)).reduce((s,b)=>s+b.rev,0);

  /* Supervisor data with availability */
  const supervisors=usersData.filter(u=>u.role==="Site Admin").map(s=>{
    const schedules={
      "Coach Tony Richard":[{d:"02/06/2026",t:"3:30-5:30 PM",ev:"JV Basketball Practice"},{d:"02/07/2026",t:"8:00 AM-12:00 PM",ev:"Varsity Baseball Scrimmage"},{d:"02/09/2026",t:"6:00-8:00 PM",ev:"Open Gym Supervision"},{d:"02/11/2026",t:"5:00-7:00 PM",ev:"Volleyball Officials Meeting"},{d:"02/14/2026",t:"6:00-9:00 PM",ev:"Valentines Dance Supervision"}],
      "Denise Landry":[{d:"02/07/2026",t:"9:00 AM-4:00 PM",ev:"Wrestling District Meet"},{d:"02/10/2026",t:"6:00-8:00 PM",ev:"LA Tigers Practice"}],
      "Coach Ray Bourque":[{d:"02/06/2026",t:"5:00-7:00 PM",ev:"Elite Cheer (current)"},{d:"02/08/2026",t:"9:00 AM-12:00 PM",ev:"Competition Prep"},{d:"02/13/2026",t:"5:00-7:00 PM",ev:"Ascension Dance"}],
      "Amy Melancon":[{d:"02/07/2026",t:"8:00-10:00 AM",ev:"Gonzales FC Scrimmage"},{d:"02/09/2026",t:"7:30-9:00 PM",ev:"Gonzales FC Practice"},{d:"02/22/2026",t:"8:00 AM-12:00 PM",ev:"Field Day Setup"}],
    };
    const sched=schedules[s.name]||[];
    const bkDates=bookings.map(b=>b.date);
    const conflicts=sched.filter(x=>bkDates.includes(x.d));
    const nextEvent=sched.filter(x=>!conflicts.find(c=>c===x))[0];
    return {...s,sched,conflicts,nextEvent};
  });

  return <SlidePanel open={true} onClose={onClose} width={540}>
  {/* ===== HEADER ===== */}
  <div style={{padding:"20px 28px 0",borderBottom:`1px solid ${C.g200}`,flexShrink:0}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:42,height:42,borderRadius:12,background:a?.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:14,flexShrink:0}}>{a?.photo||team?.slice(0,2)||"--"}</div>
        <div>
          <div style={{fontSize:18,fontWeight:800,color:C.g800,lineHeight:1.2}}>{team||name}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:3,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:C.g500,fontFamily:"monospace"}}>{resId}</span>
            {isPending&&<span style={{fontSize:9,fontWeight:700,color:C.orange,background:C.orangeL,padding:"2px 8px",borderRadius:8}}>Pending</span>}
            {a&&a.status==="approved"&&<span style={{fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"2px 8px",borderRadius:8}}>Approved</span>}
            {a&&a.status==="denied"&&<span style={{fontSize:9,fontWeight:700,color:C.red,background:C.redL,padding:"2px 8px",borderRadius:8}}>Denied</span>}
          </div>
        </div>
      </div>
      <button onClick={onClose} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.x(14,C.g500)}</button>
    </div>
    {/* Stats row */}
    <div style={{display:"flex",gap:0,margin:"0 -28px",borderTop:`1px solid ${C.g200}`}}>
      {[["Revenue",`$${totalRev.toLocaleString()}`],["Bookings",""+bookings.length],["Hours",totalHrs+"h"],["Campus",campus]].map(([l,v],i)=><div key={l} style={{flex:1,padding:"10px 12px",textAlign:"center",...(i<3?{borderRight:`1px solid ${C.g200}`}:{})}}>
        <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
        <div style={{fontSize:12,fontWeight:700,color:C.g800,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:numFont}}>{v}</div>
      </div>)}
    </div>
    {/* Tab nav */}
    <div style={{display:"flex",gap:0,margin:"0 -28px"}}>
      {[["details","Reservation"],["history",cust?`${partName} History (${cust.hist.length})`:"History"]].map(([k,l])=>
        <button key={k} onClick={()=>setPanelTab(k)} style={{flex:1,padding:"10px 0",fontSize:12,fontWeight:panelTab===k?700:500,color:panelTab===k?C.blue:C.g400,background:"none",border:"none",borderBottom:panelTab===k?`2px solid ${C.blue}`:"2px solid transparent",cursor:"pointer",fontFamily:font,transition:"all .12s"}}>{l}</button>
      )}
    </div>
  </div>

  <div style={{flex:1,overflow:"auto",WebkitOverflowScrolling:"touch"}}>

  {/* ===== TAB: RESERVATION DETAILS ===== */}
  {panelTab==="details"&&<>

    {/* -- Participant -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      {/* Status Timeline */}
      {(()=>{
        const steps=["Submitted","Approved","Confirmed","Completed"];
        const st=isPending?"Submitted":a?.status==="approved"?"Approved":a?.status==="denied"?"Denied":res?.status==="confirmed"?"Confirmed":res?.status==="at-risk"?"Confirmed":"Submitted";
        const isDenied=a?.status==="denied";
        const activeIdx=isDenied?-1:steps.indexOf(st);
        return <div style={{display:"flex",alignItems:"center",marginBottom:16,gap:0}}>
          {steps.map((s,i)=>{
            const done=!isDenied&&i<=activeIdx;
            const current=!isDenied&&i===activeIdx;
            const denied=isDenied&&i===0;
            const clr=denied?C.red:done?C.green:C.g300;
            return <React.Fragment key={s}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:0,position:"relative"}}>
                <div style={{width:22,height:22,borderRadius:11,background:done||denied?clr:C.cardBg,border:`2px solid ${clr}`,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>
                  {done&&!denied?<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  :denied?I.x(10,"#fff")
                  :current?<div style={{width:8,height:8,borderRadius:4,background:C.green}}/>
                  :null}
                </div>
                <span style={{fontSize:8,fontWeight:700,color:done||denied?clr:C.g400,textTransform:"uppercase",letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{isDenied&&i===0?"Denied":s}</span>
              </div>
              {i<steps.length-1&&<div style={{flex:1,height:2,background:!isDenied&&i<activeIdx?C.green:C.g200,borderRadius:1,margin:"0 -2px",marginBottom:16}}/>}
            </React.Fragment>
          })}
        </div>
      })()}
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Participant</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
        {[["Contact",name],["Organization",team],["Email",email],["Phone",phone]].map(([l,v])=><div key={l} style={{padding:"4px 0"}}>
          <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
          <div style={{fontSize:12,fontWeight:600,color:l==="Email"?C.blue:C.g700,marginTop:1}}>{v}</div>
        </div>)}
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <button style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>View Insurance</button>
        <button style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>View Residency</button>
      </div>
      {/* Insurance status */}
      <div style={{marginTop:8,display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderRadius:6,background:insActive?`${C.green}06`:`${C.red}06`,border:`1px solid ${insActive?`${C.green}18`:`${C.red}18`}`}}>
        <span style={{width:6,height:6,borderRadius:3,background:insActive?C.green:C.red,flexShrink:0}}/>
        <div style={{flex:1,fontSize:11,color:C.g600}}>
          <span style={{fontWeight:700,color:insActive?C.green:C.red}}>Insurance {insActive?"Active":"Expired"}</span>
          <span style={{color:C.g400}}> - {insStart} to {insEnd}</span>
          {insActive&&insLimit!=="N/A"&&<span style={{color:C.g400}}> - Coverage: {insLimit}</span>}
        </div>
      </div>
      {insNote&&<div style={{marginTop:4,padding:"6px 12px",borderRadius:6,background:`${C.red}06`,border:`1px solid ${C.red}15`,fontSize:11,fontWeight:600,color:C.red}}>{insNote}</div>}
    </div>

    {/* -- Bookings -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Bookings ({bookings.length})</div>
        {multiBook&&isPending&&<div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:10,color:C.g400}}>{selected.length}/{bookings.length}</span>
          <button onClick={()=>setSelected(allSel?[]:bookings.map(b=>b.bid))} style={{background:"none",border:"none",color:C.blue,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font,padding:0}}>{allSel?"Deselect All":"Select All"}</button>
        </div>}
      </div>

      {bookings.map((b)=>{
        const isSel=selected.includes(b.bid);
        const isExp=expandedBk===b.bid;
        return <div key={b.bid} style={{marginBottom:6,borderRadius:8,border:`1px solid ${!isPending?C.g200:isSel?`${C.blue}30`:C.g200}`,background:!isPending?C.cardBg:isSel?`${C.blue}03`:C.cardBg,overflow:"hidden",transition:"all .12s"}}>
          <div style={{padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
            {multiBook&&isPending&&<div onClick={(e)=>{e.stopPropagation();toggle(b.bid)}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${isSel?C.blue:C.g300}`,background:isSel?C.blue:C.cardBg,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all .1s"}}>
              {isSel&&<span style={{color:"#fff",fontSize:10,fontWeight:800}}>✓</span>}
            </div>}
            <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>setExpandedBk(isExp?null:b.bid)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.g800}}>{b.asset}</div>
                  <div style={{fontSize:10,color:C.g500,marginTop:1}}>{b.date} - {b.time} - {b.hours}h</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  <span style={{fontSize:13,fontWeight:800,color:C.g800}}>${b.rev.toFixed(2)}</span>
                  <span style={{width:20,height:20,borderRadius:5,background:isExp?C.blue:C.g100,color:isExp?"#fff":C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,transition:"all .1s"}}>{isExp?"\u2212":"+"}</span>
                </div>
              </div>
            </div>
          </div>
          {isExp&&<div style={{padding:"0 12px 10px",marginLeft:multiBook&&isPending?26:0}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2,padding:"8px 10px",background:C.g50,borderRadius:6}}>
              {[["Activity",b.activity],["People",b.people],["Amenities",b.amenities||"N/A"],["Created",b.created],["Booking ID",b.bid],["Hours",b.hours+"h"]].map(([l,v])=><div key={l} style={{padding:"3px 0"}}>
                <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
                <div style={{fontSize:11,fontWeight:600,color:C.g700}}>{v}</div>
              </div>)}
            </div>
          </div>}
        </div>})}

      {/* Totals + discount */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0 0",marginTop:2}}>
        <span style={{fontSize:11,color:C.g400}}>
          {isPending&&multiBook?<>{selected.length} of {bookings.length} selected - ${selRev.toLocaleString()}</>:
          <>{bookings.length} booking{bookings.length>1?"s":""} - ${totalRev.toLocaleString()} total</>}
        </span>
      </div>
      <div style={{marginTop:8,display:"flex",gap:6}}>
        <input type="text" placeholder="Discount code" style={{flex:1,padding:"7px 10px",border:`1px solid ${C.g200}`,borderRadius:6,fontSize:11,fontFamily:font,background:C.g50,color:C.g700}}/>
        <button style={{background:C.blue,color:"#fff",border:"none",borderRadius:6,padding:"7px 14px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font}}>Apply</button>
      </div>
    </div>

    {/* -- Assign Supervisor -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Assign Supervisor</div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {supervisors.map(s=>{
          const isSel=selSupervisor===s.name;
          const hasConflict=s.conflicts.length>0;
          return <div key={s.name} onClick={()=>setSelSupervisor(isSel?null:s.name)} style={{padding:"8px 10px",borderRadius:8,border:`1px solid ${isSel?C.blue:C.g200}`,background:isSel?`${C.blue}04`:C.cardBg,cursor:"pointer",transition:"all .12s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:7,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:9,flexShrink:0}}>{s.initials}</div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:C.g800}}>{s.name}</div>
                  <div style={{fontSize:9,color:C.g400}}>{s.loc}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {hasConflict
                  ?<span style={{fontSize:9,fontWeight:700,color:C.orange,background:C.orangeL,padding:"2px 6px",borderRadius:8}}>Busy ({s.conflicts.length})</span>
                  :<span style={{fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"2px 6px",borderRadius:8}}>Available</span>}
                {isSel&&<span style={{width:16,height:16,borderRadius:4,background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>✓</span>}
              </div>
            </div>
            {isSel&&<div style={{marginTop:6,paddingTop:6,borderTop:`1px solid ${C.g100}`,fontSize:10}}>
              {/* Contact options */}
              <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:hasConflict?6:4}}>
                <a href={`mailto:${s.email}`} onClick={e=>e.stopPropagation()} style={{fontSize:10,color:C.blue,fontWeight:600,textDecoration:"none"}}>{s.email}</a>
                <span style={{fontSize:10,color:C.g500,fontWeight:600}}>{s.phone}</span>
              </div>
              {hasConflict&&s.conflicts.map((c,ci)=><div key={ci} style={{padding:"3px 8px",borderRadius:4,background:C.orangeL,marginBottom:3,color:C.g600}}><span style={{fontWeight:700,color:C.orange}}>Conflict:</span> {c.ev} - {c.d} {c.t}</div>)}
              {s.sched.filter(ev=>!s.conflicts.includes(ev)).slice(0,3).map((ev,ei)=><div key={ei} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",color:C.g500}}>
                <span>{ev.ev}</span><span style={{color:C.g400}}>{ev.d}</span>
              </div>)}
              {s.sched.length>3+s.conflicts.length&&<div style={{color:C.g400,marginTop:2}}>+{s.sched.length-3-s.conflicts.length} more</div>}
            </div>}
          </div>})}
      </div>
    </div>

    {/* -- Notes -- */}
    {a?.notes&&<div style={{padding:"16px 28px"}}>
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Notes</div>
      <div style={{fontSize:12,color:C.g600,lineHeight:1.5,padding:"8px 12px",background:C.g50,borderRadius:6,border:`1px solid ${C.g200}`}}>{a.notes}</div>
    </div>}
  </>}

  {/* ===== TAB: PARTICIPANT HISTORY ===== */}
  {panelTab==="history"&&<>
    {cust?<>
      {/* Profile card */}
      <div style={{padding:"20px 28px",borderBottom:`1px solid ${C.g200}`,background:C.g50}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:14,background:a?.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:16,flexShrink:0}}>{cust.photo}</div>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:C.g800}}>{cust.n}</div>
            <div style={{fontSize:11,color:C.g400}}>Member since {cust.since}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Lifetime Bookings",""+cust.b],["Lifetime Revenue","$"+cust.s.toLocaleString()],["Trend",cust.t==="up"?"Increasing":cust.t==="down"?"Decreasing":"Stable"]].map(([l,v])=><div key={l} style={{padding:"8px 10px",background:C.cardBg,borderRadius:6,border:`1px solid ${C.cardBorder}`}}>
            <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:13,fontWeight:700,color:l==="Trend"?(cust.t==="up"?C.green:cust.t==="down"?C.orange:C.g600):C.g800,marginTop:2}}>{v}</div>
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:10}}>
          {[["Email",cust.email],["Phone",cust.phone],["Favorite Facility",cust.fav],["Avg per Booking","$"+(cust.s/cust.b).toFixed(0)]].map(([l,v])=><div key={l} style={{padding:"4px 0"}}>
            <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:11,fontWeight:600,color:l==="Email"?C.blue:C.g700,marginTop:1}}>{v}</div>
          </div>)}
        </div>
      </div>
      {/* Booking list */}
      <div style={{padding:"12px 28px 8px"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Past Reservations ({cust.hist.length})</div>
      </div>
      {cust.hist.map((h,i)=><div key={h.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 28px",borderBottom:`1px solid ${C.g100}`,background:i%2===0?C.cardBg:C.g50}}>
        <div style={{width:32,height:32,borderRadius:8,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.calendar(16,C.blue)}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12,fontWeight:600,color:C.g700}}>{h.asset}</div>
          <div style={{fontSize:10,color:C.g400}}>{h.date} - {h.time}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:13,fontWeight:700,color:C.g800}}>${h.rev.toFixed(2)}</div>
          <div style={{fontSize:9,color:C.g400,fontFamily:"monospace"}}>#{h.id}</div>
        </div>
      </div>)}
      {/* Contact actions */}
      <div style={{padding:"16px 28px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:8}}>
        <button style={{flex:1,padding:"9px 0",borderRadius:6,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.blue,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>Email Participant</button>
        <button style={{flex:1,padding:"9px 0",borderRadius:6,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>New Booking</button>
      </div>
    </>:<div style={{padding:"60px 28px",textAlign:"center",color:C.g400}}>
      <div style={{marginBottom:8}}>{I.edit(24,C.g300)}</div>
      <div style={{fontSize:13,fontWeight:600}}>No history found</div>
      <div style={{fontSize:11,marginTop:4}}>This participant doesn't have any past bookings on record.</div>
    </div>}
  </>}

  </div>

  {/* ===== STICKY FOOTER ===== */}
  {isPending&&panelTab==="details"?<div style={{padding:"12px 28px 18px",borderTop:`1px solid ${C.cardBorder}`,background:C.cardBg,flexShrink:0}}>
    {multiBook&&!allSel&&selected.length>0&&<div style={{padding:"6px 10px",borderRadius:6,background:`${C.orange}06`,border:`1px solid ${C.orange}15`,marginBottom:8,fontSize:10,color:C.g600,lineHeight:1.4}}>
      Approving {selected.length} selected booking{selected.length>1?"s":""} will automatically <span style={{fontWeight:700,color:C.red}}>reject</span> the {bookings.length-selected.length} unselected.
    </div>}
    <button disabled={noneSel} onClick={()=>{triggerApproval(a.id);onClose()}} style={{width:"100%",padding:"11px",borderRadius:8,border:"none",background:noneSel?C.g200:C.blue,color:noneSel?C.g400:"#fff",fontSize:13,fontWeight:700,cursor:noneSel?"not-allowed":"pointer",fontFamily:font,transition:"all .15s"}}>
      {allSel?"Review & Approve / Reject"
        :selected.length>0?`Review ${selected.length} of ${bookings.length} Bookings`
        :"Select Bookings to Review"}
    </button>
  </div>
  :panelTab==="details"?<div style={{padding:"12px 28px 18px",borderTop:`1px solid ${C.cardBorder}`,background:C.cardBg,flexShrink:0}}>
    <button onClick={()=>{globalShowToast({type:"success",title:"Reservation Cancelled",msg:"The reservation has been cancelled",color:C.red});onClose()}} style={{width:"100%",padding:"11px",borderRadius:8,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.red,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font}}>Cancel Reservation</button>
  </div>:null}
</SlidePanel>}

/* ======== DASHBOARD ======== */
function Dashboard(){
  const [assetRange,setAssetRange]=useState("month");
  const [selRes,setSelRes]=useState(null);
  const [selApproval,setSelApproval]=useState(null);
  const [showAllRes,setShowAllRes]=useState(false);
  const [showActivity,setShowActivity]=useState(false);
  const [selMonth,setSelMonth]=useState(null);
  const [revPeriod,setRevPeriod]=useState("ytd");
  const {approvals}=useApprovals();
  const pendingApprovals=approvals.filter(a=>a.status==="pending");
  const ap=assetPerfData[assetRange];
  const totalFacRev=facMix.reduce((s,f)=>s+f.v,0);
  const todayRes=upcoming.filter(x=>x.d==="2/6/2026");
  const unreadNotifs=(globalNotifs||notifsInit).filter(n=>!n.read).length;

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {selRes!==null&&<ReservationPanel res={upcoming[selRes]} onClose={()=>setSelRes(null)}/>}
    {selApproval!==null&&<ReservationPanel approval={selApproval} onClose={()=>setSelApproval(null)}/>}

    {/* Pending Approvals */}
    {pendingApprovals.length>0&&(()=>{
      const expToday=pendingApprovals.filter(a=>a.expiresIn==="0 Days");
      const totalPendRev=pendingApprovals.reduce((s,a)=>s+a.bk.reduce((ss,b)=>ss+b.rev,0),0);
      return <div className="pp-pending-bar" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",borderRadius:R.lg,background:C.cardBg,border:`1.5px solid ${C.blue}`,boxShadow:`0 0 0 3px ${C.blue}10`}}>
        <div style={{width:8,height:8,borderRadius:4,background:C.blue,flexShrink:0,animation:"pulse 1.5s ease infinite"}}/>
        <span style={{fontSize:13,fontWeight:700,color:C.g800,whiteSpace:"nowrap"}}>{pendingApprovals.length} Pending Approval{pendingApprovals.length>1?"s":""}</span>
        <span style={{width:1,height:16,background:C.g200,flexShrink:0}}/>
        <span style={{fontSize:12,color:C.g500}}>${totalPendRev.toLocaleString()} revenue</span>
        {expToday.length>0&&<span style={{background:C.redL,color:C.red,padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:800,flexShrink:0}}>EXPIRES TODAY</span>}
        <div style={{flex:1}}/>
        <button onClick={()=>{globalSetTab("Rentals");globalSetRentalsTab("approvals")}} style={btnP}>Review{pendingApprovals.length>1?" All":""}</button>
      </div>})()}

    {/* Metrics */}
    <div className="pp-metrics" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
      <Met label="YTD Revenue" value="$61,011" change="+28%" dir="up" sub="vs last year"/>
      <Met label="This Month" value="$8,761" change="+18.4%" dir="up" sub="projected $14.2k"/>
      <Met label="Bookings" value="192" change="+34" dir="up" sub="YTD"/>
      <Met label="Avg Rate" value="$318" change="+$42" dir="up" sub="vs $276 prior"/>
      <Met label="Util. Rate" value="52%" change="+9%" dir="up" sub="all assets"/>
      <Met label="Customers" value="23" change="+5" dir="up" sub="trailing 90 days"/>
    </div>

    {/* ─── AI Insights ─── */}
    <Card>
      <AIInsights/>
    </Card>

    {/* ─── SECTION: Revenue ─── */}
    <Div>Revenue</Div>

    {/* Revenue Trend - full width */}
    <Card><Sec action={<div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{display:"flex",gap:0,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,overflow:"hidden"}}>{[["6m","6 Mo"],["ytd","YTD"],["1y","1 Year"]].map(([k,l])=><button key={k} onClick={()=>setRevPeriod(k)} style={{padding:"4px 10px",fontSize:10,fontWeight:revPeriod===k?700:500,background:revPeriod===k?C.blue:C.cardBg,color:revPeriod===k?"#fff":C.g400,border:"none",cursor:"pointer",fontFamily:font,transition:"all .12s"}}>{l}</button>)}</div>{selMonth&&<button onClick={()=>setSelMonth(null)} style={{...btnO,fontSize:10,padding:"3px 10px",color:C.blue,borderColor:`${C.blue}30`}}>Clear x</button>}</div>}>Revenue Trend {selMonth&&<span style={{fontSize:12,fontWeight:500,color:C.blue}}>- {selMonth}</span>}</Sec><ResponsiveContainer width="100%" height={220}><AreaChart data={revPeriod==="6m"?monthlyRev.slice(-6):revPeriod==="1y"?monthlyRev:monthlyRev} onClick={(e)=>{if(e&&e.activeLabel)setSelMonth(prev=>prev===e.activeLabel?null:e.activeLabel)}}><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={.15}/><stop offset="100%" stopColor={C.blue} stopOpacity={.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} tickFormatter={v=>"$"+(v/1000).toFixed(1)+"k"}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="r" name="Revenue" stroke={C.blue} strokeWidth={2} fill="url(#gr)" dot={(props)=>{const {cx,cy,payload,index}=props;return (<circle key={index} cx={cx} cy={cy} r={selMonth===payload.m?6:3} fill={C.blue} stroke={selMonth===payload.m?"#fff":C.cardBg} strokeWidth={selMonth===payload.m?3:2} style={{cursor:"pointer",transition:"r .2s"}}/>)}} activeDot={{r:5,stroke:C.blue,strokeWidth:2,fill:C.cardBg}}/></AreaChart></ResponsiveContainer>
      {selMonth&&<div style={{marginTop:8,padding:"10px 14px",background:C.blueL,borderRadius:R.sm,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:12,fontWeight:600,color:C.blue}}>{selMonth} - ${(monthlyRev.find(m=>m.m===selMonth)||{}).r?monthlyRev.find(m=>m.m===selMonth).r.toLocaleString():""} revenue</span>
        <span style={{fontSize:11,color:C.g400,marginLeft:"auto"}}>Click chart to filter</span>
      </div>}
    </Card>

    {/* Revenue by Campus + Top Organizations - side by side */}
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:300}}><Sec>Revenue by Campus</Sec>
        {/* Stacked bar summary */}
        <div style={{display:"flex",height:6,borderRadius:3,overflow:"hidden",marginBottom:16}}>{facMix.map((f,i)=><div key={f.n} style={{flex:f.v,background:f.c,transition:"flex .3s"}}/>)}</div>
        {/* Campus rows */}
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {facMix.map((f,i)=>{const pct=Math.round(f.v/totalFacRev*100);return <div key={f.n} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<facMix.length-1?`1px solid ${C.g100}`:"none"}}>
          <div style={{width:3,height:28,borderRadius:2,background:f.c,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
              <span style={{fontSize:12,fontWeight:600,color:C.g700}}>{f.n.replace(" High School","")}</span>
              <span style={{fontSize:13,fontWeight:800,color:C.g800,fontFamily:numFont}}>${f.v.toLocaleString()}</span>
            </div>
            <div style={{height:3,borderRadius:2,background:C.g100}}>
              <div style={{height:"100%",borderRadius:2,background:f.c,width:`${pct}%`,opacity:0.6,transition:"width .5s"}}/>
            </div>
          </div>
          <span style={{fontSize:10,fontWeight:700,color:C.g400,width:30,textAlign:"right",flexShrink:0}}>{pct}%</span>
        </div>})}
        </div>
        <div style={{padding:"10px 14px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}><div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total</div><div style={{fontSize:18,fontWeight:800,color:C.g800,fontFamily:numFont}}>${totalFacRev.toLocaleString()}</div></div><div style={{fontSize:11,color:C.g400}}>{facMix.length} campuses - {facMix.reduce((s,f)=>s+f.assets,0)} assets</div></div>
      </Card>
      <Card style={{flex:1,minWidth:300}}><Sec>Top Organizations</Sec>{topCustData.map((c,i)=><div key={c.n} onClick={()=>globalShowCust(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 4px",borderBottom:i<4?`1px solid ${C.g100}`:"none",cursor:"pointer",borderRadius:8,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{width:36,height:36,borderRadius:12,background:`linear-gradient(135deg,${[C.blue,"#4DA8D8",C.blueDk,"#2A8CBF",C.g500][i]},${[C.blueDk,C.blue,"#4DA8D8",C.blueDk,C.g600][i]})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13,flexShrink:0}}>{c.photo}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:C.g700}}>{c.n}</div><div style={{fontSize:11,color:C.g400}}>{c.b} bookings - {c.fav}</div></div><div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:800,color:C.g800,fontFamily:numFont}}>${c.s.toLocaleString()}</div></div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.g300} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg></div></div>)}</Card>
    </div>

    {/* ─── SECTION: Bookings & Operations ─── */}
    <Div>Bookings & Operations</Div>

    {/* Upcoming Reservations */}
    <div className="pp-res-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
      <div style={{cursor:"pointer",minWidth:0}} onClick={()=>{globalSetTab("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("reservations")},100)}}><span style={{fontSize:14,fontWeight:700,color:C.g800}}>Upcoming Reservations</span><span className="pp-res-meta" style={{fontSize:11,color:C.g400,marginLeft:8}}>{upcoming.length} total</span><span className="pp-res-meta" style={{fontSize:10,color:C.blue,marginLeft:6,fontWeight:600}}>View all  </span></div>
      <button onClick={()=>globalCreateRes()} style={{...btnP,whiteSpace:"nowrap",flexShrink:0}}><span className="pp-btn-full">+ New Reservation</span><span className="pp-btn-short">+ New</span></button>
    </div>
    <Card np><div className="pp-table-wrap"><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{[{h:"Res #",k:"id"},{h:"Asset",k:"a"},{h:"Customer",k:"c"},{h:"Date",k:"d"},{h:"Time",k:"t"},{h:"Status",k:"status"},{h:"Revenue",k:"r"},{h:"",k:""}].map(col=><th key={col.h||"act"} style={{...TH,cursor:col.k?"pointer":"default",userSelect:"none"}}>{col.h}</th>)}</tr></thead><tbody>{(()=>{const monthMap={Aug:"8",Sep:"9",Oct:"10",Nov:"11",Dec:"12",Jan:"1",Feb:"2"};const filt=selMonth?upcoming.filter(x=>{const m=x.d.split("/")[0];return m===monthMap[selMonth]}):upcoming;const shown=showAllRes?filt:filt.slice(0,3);return shown.map((x,i)=>{
      const stMap={"confirmed":{bg:C.greenL,c:C.green,label:"Confirmed"},"pending":{bg:C.amberL,c:C.amber,label:"Pending"},"at-risk":{bg:C.redL,c:C.red,label:"At Risk"}};
      const st=stMap[x.status]||stMap.confirmed;
      return <tr key={x.id} style={{cursor:"pointer",background:x.status==="at-risk"?`${C.red}05`:undefined}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background=x.status==="at-risk"?`${C.red}05`:""}>
        <td style={{...TD,fontWeight:700,color:C.blue,fontVariantNumeric:"tabular-nums"}}>{x.id}</td>
        <td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td>
        <td style={{...TD,color:C.g600}}>{x.c}</td>
        <td style={{...TD,color:C.g600,whiteSpace:"nowrap"}}>{x.d}</td>
        <td style={{...TD,color:C.g600,whiteSpace:"nowrap"}}>{x.t}</td>
        <td style={TD}><span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,background:st.bg,color:st.c,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em"}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{st.label}</span></td>
        <td style={{...TD,fontWeight:700,color:C.g800,fontVariantNumeric:"tabular-nums"}}>${x.r.toFixed(2)}</td>
        <td style={{...TD,whiteSpace:"nowrap"}}><div style={{display:"flex",gap:4}}>
          <button onClick={e=>{e.stopPropagation();setSelRes(i)}} style={{...btnO,padding:"5px 12px",fontSize:11}}>View</button>
          <button onClick={e=>{e.stopPropagation();globalShowToast({type:"success",title:"Reservation Cancelled",msg:x.c+" - "+x.id,color:C.red})}} style={{background:"none",border:`1px solid ${C.red}25`,borderRadius:R.sm,padding:"5px 10px",fontSize:11,fontWeight:600,color:C.red,cursor:"pointer",fontFamily:font}}>Cancel</button>
        </div></td>
      </tr>})})()}</tbody></table></div>
      <div style={{padding:"12px 20px",borderTop:`1px solid ${C.g100}`,textAlign:"center"}}>
        <button onClick={()=>setShowAllRes(!showAllRes)} style={{background:"none",border:"none",fontSize:12,fontWeight:600,color:C.blue,cursor:"pointer",fontFamily:font}}>{showAllRes?"Show Less":"View All "+upcoming.length+" Reservations"}</button>
      </div>
    </Card>

    {/* Asset Performance + Recent Activity */}
    <Card><Sec action={<div style={{display:"flex",gap:4}}>{["day","week","month","year"].map(p=><button key={p} onClick={()=>setAssetRange(p)} style={pill(assetRange===p)}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>)}</div>}>Asset Performance</Sec>
      <div className="pp-table-wrap"><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Asset","Revenue","Bookings","Utilization"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{ap.map((x,i)=><tr key={x.a} style={{background:i%2===0?C.g50:C.cardBg}}><td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td><td style={{...TD,fontWeight:700,color:C.g800}}>${x.r.toFixed(2)}</td><td style={TD}>{x.b}</td><td style={TD}><div style={{display:"flex",alignItems:"center",gap:8}}><ProgressRing pct={x.u} size={32} stroke={3}/><span style={{fontSize:11,fontWeight:700,color:C.g600}}>{x.u}%</span></div></td></tr>)}</tbody></table></div>
      <div style={{marginTop:14,padding:"10px 14px",background:C.g50,borderRadius:8,display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:C.g400}}>Total ({assetRange})</span><span style={{fontWeight:800,color:C.g800}}>${ap.reduce((s,x)=>s+x.r,0).toFixed(2)}</span></div>
      <div style={{marginTop:16,borderTop:`1px solid ${C.g200}`,paddingTop:14}}>
        <div onClick={()=>setShowActivity(!showActivity)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em"}}>Recent Activity</div>
          <span style={{fontSize:10,color:C.blue,fontWeight:600}}>{showActivity?"Hide":"Show"}</span>
        </div>
        {showActivity&&<div style={{marginTop:10}}>{[
          {time:"Today, 9:15 AM",text:"Bayou City VB checked in at Dutchtown Gymnasium",type:"checkin"},
          {time:"Today, 8:02 AM",text:"Gonzales FC reservation confirmed for 02/14",type:"confirm"},
          {time:"Yesterday",text:"$425.00 payment received from LA Tigers AAU",type:"payment"},
          {time:"Yesterday",text:"Coach Bourque approved Elite Cheer practice (02/13)",type:"approved"},
          {time:"02/04/2026",text:"River Parish Runners completed session at Gator Stadium",type:"checkin"},
        ].map((ev,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"6px 0",borderBottom:i<4?`1px solid ${C.g100}`:"none"}}>
          <div style={{width:6,height:6,borderRadius:3,background:ev.type==="payment"?C.blue:ev.type==="approved"?C.green:C.g400,flexShrink:0,marginTop:5}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,color:C.g700,lineHeight:1.4}}>{ev.text}</div>
            <div style={{fontSize:10,color:C.g400,marginTop:1}}>{ev.time}</div>
          </div>
        </div>)}
        </div>}
      </div>
    </Card>


  </div>
}

/* ======== RENTALS (sub-tabs: Locations, Reservations, Approvals) ======== */
function FacilityPanel({selFacility,setSelFacility}){
  if(selFacility===null)return null;
  const c=campuses[selFacility];const facs=facilities[c.short]||[];const rateDefaults=[200,185,175,190,165];const utilizations=[62,54,31,48,29];const bookingCounts=[42,38,12,28,8];
  const [editRates,setEditRates]=useState(()=>facs.map((_,fi)=>String(rateDefaults[selFacility]+fi*15)));
  const [campusStatus,setCampusStatus]=useState(true);
  const [facAvail,setFacAvail]=useState(()=>facs.map((_,fi)=>[0,1,2,3,4,5,6].map(di=>fi<5?(di+fi)%3!==0:true)));
  const [contactName,setContactName]=useState(c.name.includes("Dutchtown")?"Mike Reynolds":c.name.includes("East")?"Sarah Chen":"TBD");
  const [contactEmail,setContactEmail]=useState(contactName==="TBD"?"":"admin@"+c.short.toLowerCase().replace(/ /g,"")+".edu");
  const [contactPhone,setContactPhone]=useState(contactName==="TBD"?"":"(225) 555-01"+selFacility+"0");
  const inp={width:"100%",padding:"8px 10px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:16,fontFamily:font,background:C.g50,color:C.g700,boxSizing:"border-box"};
  const Label=({children})=><label style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:4}}>{children}</label>;

  const toggleDay=(fi,di)=>{
    setFacAvail(prev=>{const n=[...prev];n[fi]=[...n[fi]];n[fi][di]=!n[fi][di];return n});
  };

  return <SlidePanel open={true} onClose={()=>setSelFacility(null)} width={520}>
    <div style={{padding:"20px 24px",borderBottom:`1px solid ${C.g200}`,flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Edit Campus</div>
          <div style={{fontSize:18,fontWeight:800,color:C.g800}}>{c.name}</div>
        </div>
        <button onClick={()=>setSelFacility(null)} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,C.g500)}</button>
      </div>
    </div>
    <div style={{flex:1,overflow:"auto",WebkitOverflowScrolling:"touch",padding:"16px 24px"}}>
      {/* Campus toggle + stats */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,fontWeight:600,color:C.g600}}>Campus Status</span>
          <div onClick={()=>setCampusStatus(!campusStatus)} style={{width:38,height:20,borderRadius:10,background:campusStatus?C.green:C.g300,cursor:"pointer",position:"relative",transition:"background .2s"}}>
            <div style={{width:14,height:14,borderRadius:"50%",background:"#fff",position:"absolute",top:3,...(campusStatus?{right:3}:{left:3}),boxShadow:"0 1px 2px rgba(0,0,0,.2)",transition:"all .15s"}}/>
          </div>
          <span style={{fontSize:10,fontWeight:600,color:campusStatus?C.green:C.g400}}>{campusStatus?"Published":"Draft"}</span>
        </div>
        <span style={{fontSize:10,color:C.g400}}>{facs.length} facilities</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
        {[["Utilization",utilizations[selFacility]+"%",utilizations[selFacility]>50?C.green:C.orange],["Bookings",bookingCounts[selFacility]+" YTD",C.blue],["Revenue","$"+Math.round(bookingCounts[selFacility]*rateDefaults[selFacility]*1.8).toLocaleString(),C.g800]].map(([l,v,clr])=><div key={l} style={{padding:"10px",background:C.g50,borderRadius:R.sm,border:`1px solid ${C.g200}`,textAlign:"center"}}>
          <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
          <div style={{fontSize:16,fontWeight:800,color:clr,marginTop:2}}>{v}</div>
        </div>)}
      </div>

      {/* Campus contact */}
      <div style={{fontSize:11,fontWeight:700,color:C.g800,marginBottom:8}}>Campus Contact</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
        <div><Label>Contact Name</Label><input value={contactName} onChange={e=>setContactName(e.target.value)} style={inp}/></div>
        <div><Label>Email</Label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} style={inp}/></div>
        <div><Label>Phone</Label><input value={contactPhone} onChange={e=>setContactPhone(e.target.value)} style={inp}/></div>
        <div><Label>Location</Label><input value={c.city+", Louisiana"} readOnly style={{...inp,color:C.g400}}/></div>
      </div>

      {/* Facilities - editable */}
      <div style={{fontSize:11,fontWeight:700,color:C.g800,marginBottom:8}}>Facilities ({facs.length})</div>
      {facs.map((f,fi)=>{const fullN=facilityFull[f]||f;return <div key={f} style={{padding:"12px",borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,marginBottom:8,background:C.cardBg}}>
        <div style={{fontSize:13,fontWeight:700,color:C.g800,marginBottom:10}}>{fullN}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div>
            <Label>Hourly Rate ($)</Label>
            <input type="number" value={editRates[fi]||""} onChange={e=>{const n=[...editRates];n[fi]=e.target.value;setEditRates(n)}} style={inp}/>
          </div>
          <div>
            <Label>Capacity</Label>
            <input value={[200,500,150,300,100][fi]} readOnly style={{...inp,color:C.g400}}/>
          </div>
        </div>
        <Label>Availability</Label>
        <div style={{display:"flex",gap:3,marginBottom:2}}>
          {["M","T","W","T","F","S","S"].map((d,di)=>{
            const on=facAvail[fi]?.[di]??true;
            return <div key={di} onClick={()=>toggleDay(fi,di)} style={{flex:1,textAlign:"center",cursor:"pointer",padding:"4px 0",borderRadius:4,background:on?`${C.green}12`:`${C.red}08`,border:`1px solid ${on?`${C.green}30`:`${C.red}20`}`,transition:"all .15s"}}>
              <div style={{fontSize:8,fontWeight:700,color:on?C.green:C.g400}}>{d}</div>
            </div>
          })}
        </div>
        <div style={{fontSize:9,color:C.g400,marginTop:4}}>Click days to toggle availability</div>
      </div>})}

      {/* Sticky save/cancel footer */}
      <div style={{position:"sticky",bottom:0,margin:"8px -16px -16px",padding:"16px 16px",paddingBottom:"max(16px, env(safe-area-inset-bottom, 16px))",borderTop:`2px solid ${C.g200}`,display:"flex",gap:10,background:C.cardBg,boxShadow:`0 -4px 16px rgba(0,0,0,${C.bg==="#0F1318"?0.25:0.08})`}}>
        <button onClick={()=>setSelFacility(null)} style={{...btnO,flex:1,display:"flex",justifyContent:"center",padding:"12px 14px"}}>Cancel</button>
        <button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Campus Updated",msg:c.name+" settings saved successfully",color:C.green});setSelFacility(null)}} style={{...btnP,flex:2,justifyContent:"center",padding:"12px 14px"}}>Save Changes</button>
      </div>
    </div>
  </SlidePanel>
}

function Rentals(){
  const {dark}=useContext(ThemeCtx);
  const [subTab,setSubTab]=useState("approvals");
  const [view,setView]=useState("cal");
  const [campusFilt,setCampusFilt]=useState("all");
  const [facilityFilt,setFacilityFilt]=useState("all");
  const [srcFilt,setSrcFilt]=useState("all");
  const [approvalFilt,setApprovalFilt]=useState("all");
  const [expandedApproval,setExpandedApproval]=useState(null);
  const [selApproval,setSelApproval]=useState(null);
  const [selRes,setSelRes]=useState(null);
  const [showSyncMenu,setShowSyncMenu]=useState(false);
  const [locView,setLocView]=useState("list");
  const {requireSiteAdmin,assignedAdmins}=useSiteAdmin();
  globalSetRentalsTab=setSubTab;
  /* Helper: is a PP event unassigned? Checks all assigned keys for day+partial match */
  const isUnassigned=(ev,day)=>{
    if(ev.src!=="pp"||!requireSiteAdmin)return false;
    const exactKey=`${day}-${ev.l}`;
    if(assignedAdmins[exactKey])return false;
    /* Check if any key matches this day and org name fragment */
    const evName=ev.l.replace("PP - ","").toLowerCase();
    const dayKeys=Object.keys(assignedAdmins).filter(k=>k.startsWith(`${day}-`));
    return !dayKeys.some(k=>{
      const kName=k.replace(`${day}-`,"").replace("PP - ","").toLowerCase();
      return evName.includes(kName.split(" ")[0])||kName.includes(evName.split(" ")[0]);
    });
  };
  const dw=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const days=[...Array(6).fill(null),...Array.from({length:28},(_,i)=>i+1)];
  const wks=[];for(let i=0;i<days.length;i+=7)wks.push(days.slice(i,i+7));
  const openCalEvent=(ev,day)=>{
    if(ev.src!=="pp")return;
    const label=ev.l.replace("PP - ","").toLowerCase();
    const dateStr=`2/${day}/2026`;
    const idx=upcoming.findIndex(r=>r.c.toLowerCase().includes(label.split(" ")[0].toLowerCase())&&r.d===dateStr);
    if(idx>=0)setSelRes(idx);
    else{
      const idxFuzzy=upcoming.findIndex(r=>r.c.toLowerCase().includes(label.split(" ")[0].toLowerCase()));
      if(idxFuzzy>=0)setSelRes(idxFuzzy);
    }
  };
  const {approvals:approvalsData}=useApprovals();
  const pendingApprovals=approvalsData.filter(a=>a.status==="pending");
  const availFacilities=campusFilt==="all"?Object.values(facilities).flat():facilities[campusFilt]||[];
  const campusFacilities=campusFilt==="all"?Object.values(facilities).flat().concat(["District Office","District","Away","All Campuses"]):facilities[campusFilt]||[];
  const filterEvts=(evts)=>{
    let f=evts;
    if(srcFilt==="pp")f=f.filter(e=>e.src==="pp");
    else if(srcFilt==="synced")f=f.filter(e=>e.src!=="pp");
    if(campusFilt!=="all")f=f.filter(e=>campusFacilities.includes(e.a));
    if(facilityFilt!=="all")f=f.filter(e=>e.a===facilityFilt);
    return f;
  };

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {selApproval!==null&&<ReservationPanel approval={selApproval} onClose={()=>setSelApproval(null)}/>}
    {selRes!==null&&<ReservationPanel res={upcoming[selRes]} onClose={()=>setSelRes(null)}/>}

    {/* Sub-tab navigation */}
    <div className="pp-rentals-tabs" style={{display:"flex",gap:0,borderBottom:`1px solid ${C.cardBorder}`}}>
      {[["approvals","Approvals",pendingApprovals.length],["reservations","Reservations",null],["locations","Locations",null]].map(([k,l,badge])=>
        <button key={k} onClick={()=>setSubTab(k)} style={{padding:"12px 20px",fontSize:13,fontWeight:subTab===k?700:500,color:subTab===k?C.g800:C.g500,background:"none",border:"none",borderBottom:subTab===k?`2px solid ${C.blue}`:"2px solid transparent",marginBottom:-1,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:6,letterSpacing:"-0.01em",whiteSpace:"nowrap"}}>
          {l}
          {badge>0&&<span style={{background:C.blue,color:"#fff",fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:8,minWidth:18,textAlign:"center"}}>{badge}</span>}
        </button>
      )}
    </div>

    {/* ============ LOCATIONS TAB ============ */}
    {subTab==="locations"&&<>
      <div className="pp-r-toolbar" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div className="pp-r-search" style={{position:"relative",flex:"1 1 200px",maxWidth:280}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}>{I.search(14,C.g400)}</span><input type="text" placeholder="Search locations..." style={{width:"100%",padding:"9px 14px 9px 32px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:13,fontFamily:font,background:C.g50,color:C.g700,boxSizing:"border-box"}}/></div>
          <div style={{display:"flex",gap:0,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,overflow:"hidden"}}>
            {[["list","List"],["map","Map"]].map(([k,l])=><button key={k} onClick={()=>setLocView(k)} style={{padding:"8px 14px",fontSize:12,fontWeight:locView===k?700:500,background:locView===k?C.blue:C.cardBg,color:locView===k?"#fff":C.g400,border:"none",cursor:"pointer",fontFamily:font,transition:"all .12s"}}>{l}</button>)}
          </div>
        </div>
        <button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Location Added",msg:"New location configured",color:C.green})}} style={btnP}>+ Add Location</button>
      </div>

      {locView==="map"&&<Card style={{padding:0,overflow:"hidden"}}>
        <iframe title="District Campuses" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Ascension+Parish+School+Board,+Donaldsonville+LA&zoom=11" style={{width:"100%",height:340,border:"none",display:"block",filter:dark?"invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)":"none"}} loading="lazy"/>
        <div style={{padding:"14px 18px",borderTop:`1px solid ${C.cardBorder}`,display:"flex",gap:8,flexWrap:"wrap"}}>
          {campuses.map((c,i)=><div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:C.g50,borderRadius:8,border:`1px solid ${C.cardBorder}`,flex:"1 1 200px"}}>
            <div style={{width:8,height:8,borderRadius:4,background:[C.blue,C.green,"#F59E0B","#7C3AED",C.orange][i],flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g700}}>{c.short}</div>
              <div style={{fontSize:10,color:C.g400}}>{c.city}, LA - {[3,3,2,2,2][i]} assets</div>
            </div>
            <button onClick={()=>globalShowFacility(i)} style={{...btnO,padding:"3px 10px",fontSize:10}}>View</button>
          </div>)}
        </div>
      </Card>}

      {locView==="list"&&<>
      <Card np className="pp-loc-card"><div className="pp-loc-desktop">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["","Name","Assets","Status","Last Updated","Hourly Rate",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{campuses.map((c,i)=><tr key={c.id} style={{background:i%2===0?C.g50:C.cardBg}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.g50:C.cardBg}>
            <td style={{...TD,width:50}}><div style={{width:38,height:20,borderRadius:10,background:C.green,position:"relative",cursor:"pointer"}}><div style={{width:14,height:14,borderRadius:"50%",background:"#fff",position:"absolute",top:3,right:3,boxShadow:"0 1px 2px rgba(0,0,0,.2)"}}/></div></td>
            <td style={{...TD,fontWeight:700,color:C.g700}}><div>{c.name}</div><div style={{fontSize:11,color:C.g400,fontWeight:400,marginTop:1}}>{c.city}, LA</div></td>
            <td style={TD}><span style={{color:C.blue,fontWeight:700,cursor:"pointer"}}>{[3,3,2,2,2][i]} assets</span></td>
            <td style={TD}><span style={{...statusBadge("completed"),fontSize:10}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>Published</span></td>
            <td style={{...TD,color:C.g500,fontSize:12}}>02/04/2026</td>
            <td style={{...TD,color:C.g500,fontSize:12}}>$175/hr avg</td>
            <td style={{...TD,textAlign:"right"}}><button onClick={()=>globalShowFacility(i)} style={{background:C.blue,color:"#fff",border:"none",borderRadius:R.sm,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font}}>Manage</button></td>
          </tr>)}</tbody>
        </table>
      </div>
      {/* Mobile location cards */}
      <div className="pp-loc-mobile" style={{display:"flex",flexDirection:"column",gap:8,padding:12}}>
        {campuses.map((c,i)=><div key={c.id} style={{padding:14,borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,background:C.cardBg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.g800}}>{c.name}</div>
              <div style={{fontSize:11,color:C.g400,marginTop:2}}>{c.city}, LA</div>
            </div>
            <span style={{...statusBadge("completed"),fontSize:9}}><span style={{width:4,height:4,borderRadius:"50%",background:"currentColor"}}/>Published</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
            {[["Assets",`${[3,3,2,2,2][i]}`],["Rate","$175/hr"],["Updated","02/04"]].map(([l,v])=><div key={l} style={{padding:"8px 10px",background:C.g50,borderRadius:6,border:`1px solid ${C.cardBorder}`}}>
              <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:C.g700,marginTop:2}}>{v}</div>
            </div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            <button onClick={()=>globalShowFacility(i)} style={{...btnP,fontSize:12,padding:"8px",display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>Manage</button>
          </div>
        </div>)}
      </div></Card></>}
    </>}

    {/* ============ RESERVATIONS TAB ============ */}
    {subTab==="reservations"&&<>
      {/* Action bar */}
      <div className="pp-r-row1" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div style={{display:"flex",gap:0,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,overflow:"hidden",flexShrink:0}}>
          {[["cal","Calendar"],["list","List"]].map(([k,l])=><button key={k} onClick={()=>setView(k)} style={{padding:"9px 20px",fontSize:12,fontWeight:view===k?700:500,cursor:"pointer",fontFamily:font,border:"none",background:view===k?C.blue:C.cardBg,color:view===k?"#fff":C.g500,transition:"all .15s",letterSpacing:"-0.01em"}}>{l}</button>)}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowSyncMenu(!showSyncMenu)} style={{...btnO,display:"flex",alignItems:"center",gap:6,fontSize:12,padding:"9px 14px"}}><span className="pp-pulse-dot" style={{width:6,height:6,borderRadius:3,background:C.green,flexShrink:0}}/><span className="pp-btn-full" style={{whiteSpace:"nowrap"}}>Calendar Integrated - Google</span><span className="pp-btn-short" style={{display:"none",whiteSpace:"nowrap"}}>Integrated</span> <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{flexShrink:0}}><path d="M1 1l4 4 4-4" stroke={C.g400} strokeWidth="1.5" fill="none"/></svg></button>
            {showSyncMenu&&<div style={{position:"absolute",top:"100%",right:0,marginTop:8,background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,boxShadow:`0 16px 48px rgba(0,0,0,${C.bg==="#0F1318"?0.35:0.12}), 0 4px 12px rgba(0,0,0,${C.bg==="#0F1318"?0.2:0.06})`,padding:8,minWidth:260,zIndex:50}}>
              <div style={{padding:"6px 14px 10px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Connected</div>
              {[["Google Calendar","District calendar sync",C.blue,true],["Outlook 365","Staff calendar integration","#0078D4",true],["RankOne","Athletic scheduling","#1B4D3E",true]].map(([name,desc,clr,active])=>
                <button key={name} onClick={()=>{setShowSyncMenu(false);if(globalShowToast)globalShowToast({type:"info",title:`${name} Synced`,msg:"Calendar refreshed successfully",color:C.blue})}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 14px",background:"none",border:"none",borderRadius:R.sm,cursor:"pointer",fontFamily:font,textAlign:"left",transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span style={{width:8,height:8,borderRadius:4,background:C.green,flexShrink:0}}/>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{name}</div><div style={{fontSize:11,color:C.g400,marginTop:1}}>{desc}</div></div>
                  <span style={{fontSize:10,fontWeight:600,color:C.g400}}>{I.sync(11,C.g400)}</span>
                </button>)}
              <div style={{height:1,background:C.g200,margin:"6px 0"}}/>
              <div style={{padding:"6px 14px 6px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Add Integration</div>
              {[["iCal URL","Import from any calendar feed"],["DragonFly","Athletic scheduling"],["Custom API","Connect via webhook"]].map(([name,desc])=>
                <button key={name} onClick={()=>{setShowSyncMenu(false);if(globalShowToast)globalShowToast({type:"info",title:`Connect ${name}`,msg:"Visit Organization > Integrations to set up",color:C.blue})}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 14px",background:"none",border:"none",borderRadius:R.sm,cursor:"pointer",fontFamily:font,textAlign:"left",transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span style={{width:8,height:8,borderRadius:4,background:C.g300,flexShrink:0}}/>
                  <div><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{name}</div><div style={{fontSize:11,color:C.g400,marginTop:1}}>{desc}</div></div>
                </button>)}
            </div>}
          </div>
          <button onClick={()=>globalCreateRes()} style={{...btnP,padding:"9px 18px",whiteSpace:"nowrap",flexShrink:0}}><span className="pp-btn-full">+ New Reservation</span><span className="pp-btn-short">+ New</span></button>
        </div>
      </div>

      {/* Filter bar - inside a card for visual grouping */}
      <Card style={{padding:0,overflow:"visible"}}>
        {/* Dropdowns + source pills */}
        <div className="pp-r-row2" style={{display:"flex",alignItems:"center",gap:10,padding:"14px 20px",flexWrap:"wrap"}}>
          <div className="pp-r-selects" style={{display:"flex",gap:8,alignItems:"center"}}>
            <select value={campusFilt} onChange={e=>{setCampusFilt(e.target.value);setFacilityFilt("all")}} style={{...sel,minWidth:150}}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.short}>{c.short}</option>)}</select>
            <select value={facilityFilt} onChange={e=>setFacilityFilt(e.target.value)} style={{...sel,minWidth:160}}><option value="all">All Facilities</option>{availFacilities.map(f=><option key={f} value={f}>{facilityFull[f]||f}</option>)}</select>
          </div>
          <div className="pp-r-pills" style={{display:"flex",gap:3,background:C.g100,borderRadius:10,padding:3}}>{[["all","All Events"],["pp","PP Bookings"],["synced","Synced"]].map(([k,l])=><button key={k} onClick={()=>setSrcFilt(k)} style={pill(srcFilt===k)}>{l}</button>)}</div>
        </div>

        {/* Divider */}
        <div style={{height:1,background:C.g100,margin:"0 20px"}}/>

        {/* Legend + stats */}
        {(()=>{const allFiltered=Object.values(calEvents).flat().filter(e=>filterEvts([e]).length>0);const ppF=allFiltered.filter(e=>e.src==="pp").length;const syncF=allFiltered.filter(e=>e.src!=="pp").length;const unassignedCount=requireSiteAdmin?Object.entries(calEvents).reduce((sum,[day,evts])=>sum+filterEvts(evts).filter(e=>isUnassigned(e,parseInt(day))).length,0):0;return <div className="pp-r-legend" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            {facilityFilt!=="all"&&<span style={{fontSize:12,fontWeight:700,color:C.g700,marginRight:4}}>{facilityFull[facilityFilt]||facilityFilt}</span>}
            {campusFilt!=="all"&&facilityFilt==="all"&&<span style={{fontSize:12,fontWeight:700,color:C.g700,marginRight:4}}>{campusFilt}</span>}
            {[["PP Bookings",C.blue],["Google",C.green],["RankOne","#94A3B8"],["Outlook","#7C3AED"]].map(([n,clr])=><div key={n} style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,color:C.g500}}><span style={{width:8,height:8,borderRadius:2,background:clr,flexShrink:0}}/><span style={{fontWeight:600}}>{n}</span></div>)}
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center",fontSize:12,color:C.g400}}>
            <span><strong style={{color:C.blue,fontWeight:800}}>{ppF}</strong> bookings</span>
            <span style={{width:1,height:12,background:C.g200}}/>
            <span><strong style={{color:C.g600,fontWeight:800}}>{syncF}</strong> synced</span>
            {unassignedCount>0&&<><span style={{width:1,height:12,background:C.g200}}/><span style={{display:"inline-flex",alignItems:"center",gap:4,color:C.amber,fontWeight:700,fontSize:11}}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:14,height:14,borderRadius:7,background:C.amberL}}>{I.user(9,C.amber)}</span>{unassignedCount} unassigned</span></>}
          </div>
        </div>})()}
      </Card>

      {/* Calendar or list */}
      {view==="cal"?<Card np><div className="pp-calendar-wrap">
        <div style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.cardBorder}`}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><button style={{...btnO,padding:"6px 12px",fontSize:13}}>‹</button><span style={{fontSize:16,fontWeight:800,color:C.g800,letterSpacing:"-0.02em"}}>February 2026</span><button style={{...btnO,padding:"6px 12px",fontSize:13}}>›</button><button onClick={()=>{const el=document.querySelector('[data-today="true"]');if(el)el.scrollIntoView({behavior:"smooth",block:"center"});if(globalShowToast)globalShowToast({type:"success",title:"Today",msg:"Showing February 11, 2026",color:C.blue})}} style={{...btnO,padding:"5px 12px",fontSize:11,color:C.blue,borderColor:`${C.blue}30`,fontWeight:700}}>Today</button></div>
          <div className="pp-r-district" style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,color:C.g500,fontWeight:500}}>{facilityFilt!=="all"?(facilityFull[facilityFilt]||facilityFilt):campusFilt!=="all"?campusFilt:"All Facilities"}</span></div>
        </div>
        {/* Desktop: grid calendar */}
        <div className="pp-cal-grid">
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{dw.map(d=><th key={d} style={{padding:"12px 4px",textAlign:"center",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:`1px solid ${C.cardBorder}`}}>{d}</th>)}</tr></thead>
          <tbody>{wks.map((wk,wi)=><tr key={wi}>{wk.map((day,di)=>{const isToday=day===11;
            let evts=day?filterEvts(calEvents[day]||[]):[];
            return <td key={di} data-today={isToday?"true":undefined} style={{height:evts.length>1?Math.max(84,48+evts.length*28):84,verticalAlign:"top",borderBottom:`1px solid ${C.g100}`,borderRight:di<6?`1px solid ${C.g100}`:"none",background:!day?C.g50:isToday?C.blueL:C.cardBg,padding:2,width:"14.28%"}}>
              {day&&<div style={{padding:2}}>
                <span style={{fontSize:11,fontWeight:isToday?800:500,color:isToday?"#fff":C.g600,background:isToday?C.blue:"none",borderRadius:isToday?"50%":"5px",padding:isToday?"1px 0":"0",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:1,...(isToday?{width:22,height:22,boxShadow:`0 0 0 3px ${C.blue}25`}:{})}}>{day}</span>
                {evts.slice(0,3).map((ev,ei)=>{const isPP=ev.src==="pp";const bg=isPP?C.blue:ev.src==="google"?C.green:ev.src==="outlook"?"#7C3AED":"#94A3B8";const noAdmin=isUnassigned(ev,day);return <div key={ei} onClick={()=>openCalEvent(ev,day)} style={{background:bg,color:"#fff",borderRadius:4,padding:"3px 5px",fontSize:9,lineHeight:1.3,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",opacity:isPP?1:0.65,cursor:isPP?"pointer":"default",position:"relative"}}>{noAdmin&&<span title="No site admin assigned" style={{position:"absolute",top:1,right:1,display:"flex",alignItems:"center",justifyContent:"center",width:10,height:10,borderRadius:5,background:"#F59E0B",border:"1px solid rgba(255,255,255,0.9)"}}><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>}<div style={{fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.l}</div><div style={{fontSize:8,fontWeight:600,opacity:0.95,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",letterSpacing:"0.01em"}}>{facilityFull[ev.a]||ev.a}</div><div style={{opacity:.7,fontSize:7}}>{ev.t}</div></div>})}
                {evts.length>3&&<div style={{fontSize:9,color:C.g400,fontWeight:700,marginTop:1,paddingLeft:2}}>+{evts.length-3} more</div>}
              </div>}</td>})}</tr>)}</tbody>
        </table>
        </div>
        {/* Mobile: agenda view */}
        <div className="pp-cal-agenda">
          <div style={{display:"flex",gap:2,padding:"12px 16px",overflowX:"auto",WebkitOverflowScrolling:"touch",borderBottom:`1px solid ${C.cardBorder}`}}>
            {Array.from({length:28},(_,i)=>i+1).map(day=>{
              let evts=filterEvts(calEvents[day]||[]);
              const isToday=day===11;const hasEvts=evts.length>0;const dayIdx=(day+6-1)%7;
              return <div key={day} data-today={isToday?"true":undefined} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:38,padding:"6px 4px",borderRadius:R.sm,background:isToday?C.blueL:"transparent"}}>
                <span style={{fontSize:9,fontWeight:600,color:C.g400}}>{["M","T","W","T","F","S","S"][dayIdx]}</span>
                <span style={{fontSize:14,fontWeight:isToday?800:hasEvts?700:500,color:isToday?"#fff":hasEvts?C.g800:C.g400,...(isToday?{background:C.blue,borderRadius:"50%",width:24,height:24,display:"inline-flex",alignItems:"center",justifyContent:"center"}:{})}}>{day}</span>
                {hasEvts&&<div style={{display:"flex",gap:2,marginTop:1}}>{evts.slice(0,3).map((ev,ei)=><span key={ei} style={{width:4,height:4,borderRadius:2,background:ev.src==="pp"?C.blue:ev.src==="google"?C.green:ev.src==="outlook"?"#7C3AED":"#94A3B8"}}/>)}</div>}
              </div>
            })}
          </div>
          <div style={{padding:"8px 16px 16px"}}>
            {Array.from({length:28},(_,i)=>i+1).map(day=>{
              let evts=filterEvts(calEvents[day]||[]);
              if(evts.length===0)return null;
              const dayIdx=(day+6-1)%7;const isToday=day===11;
              return <div key={day} data-today={isToday?"true":undefined} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:`1px solid ${C.g100}`}}>
                <div style={{width:42,textAlign:"center",flexShrink:0,paddingTop:2}}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.04em"}}>{dw[dayIdx]}</div>
                  <div style={{fontSize:22,fontWeight:800,color:isToday?"#fff":C.g800,lineHeight:1.2,...(isToday?{background:C.blue,borderRadius:"50%",width:32,height:32,display:"inline-flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 0 3px ${C.blue}25`}:{})}}>{day}</div>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:6,minWidth:0}}>
                  {evts.map((ev,ei)=>{const isPP=ev.src==="pp";const srcClr=isPP?C.blue:ev.src==="google"?C.green:ev.src==="outlook"?"#7C3AED":"#94A3B8";const noAdmin=isUnassigned(ev,day);return <div key={ei} onClick={()=>openCalEvent(ev,day)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:isPP?`${C.blue}08`:C.g50,borderRadius:10,borderLeft:`3px solid ${srcClr}`,cursor:isPP?"pointer":"default",transition:"background .12s"}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.g800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.l}</div>
                      <div style={{fontSize:11,color:C.g600,marginTop:3,fontWeight:500}}>{facilityFull[ev.a]||ev.a}</div>
                      <div style={{fontSize:10,color:C.g400,marginTop:2}}>{ev.t}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                      {isPP&&<span style={{fontSize:9,fontWeight:800,color:C.blue,background:C.blueL,padding:"3px 8px",borderRadius:4,letterSpacing:"0.02em"}}>PP</span>}
                      {noAdmin&&<span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:8,fontWeight:700,color:C.amber,background:C.amberL,padding:"2px 6px",borderRadius:4}}>{I.user(8,C.amber)} No Admin Assigned</span>}
                    </div>
                  </div>})}
                </div>
              </div>
            })}
          </div>
        </div>
        {/* Empty state for filtered views */}
        {(()=>{const totalVisible=Object.values(calEvents).flat().filter(e=>filterEvts([e]).length>0).length;return totalVisible===0?<div style={{padding:"40px 20px",textAlign:"center",color:C.g400}}>
          <div style={{fontSize:32,marginBottom:8}}>📅</div>
          <div style={{fontSize:14,fontWeight:600,color:C.g600}}>No events found</div>
          <div style={{fontSize:12,marginTop:4}}>No {srcFilt==="pp"?"PracticePlan bookings":srcFilt==="synced"?"synced events":"events"} match the current filters{campusFilt!=="all"?` for ${campusFilt}`:""}{facilityFilt!=="all"?` at ${facilityFull[facilityFilt]||facilityFilt}`:""}.</div>
        </div>:null})()}
      </div></Card>

      :<Card np><div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:700}}><thead><tr>{["","Res #","Asset","Campus","Customer","Date","Time","Revenue","Status",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{upcoming.map((x,i)=>{
            const stMap={"confirmed":{bg:C.greenL,c:C.green,label:"Confirmed"},"pending":{bg:C.amberL,c:C.amber,label:"Pending"},"at-risk":{bg:C.redL,c:C.red,label:"At Risk"}};
            const st=stMap[x.status]||stMap.confirmed;
            return <tr key={x.id} style={{background:i%2===0?C.g50:C.cardBg}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.g50:C.cardBg}>
              <td style={{...TD,width:24}}>{I.dot(8,x.status==="at-risk"?C.red:C.green)}</td>
              <td style={{...TD,fontWeight:700,color:C.blue,fontVariantNumeric:"tabular-nums"}}>{x.id}</td>
              <td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td>
              <td style={{...TD,color:C.g500,fontSize:12}}>{x.fac}</td>
              <td style={{...TD,color:C.g600}}>{x.c}</td>
              <td style={{...TD,color:C.g600,whiteSpace:"nowrap"}}>{x.d}</td>
              <td style={{...TD,color:C.g600,whiteSpace:"nowrap"}}>{x.t}</td>
              <td style={{...TD,fontWeight:700,color:C.g800,fontVariantNumeric:"tabular-nums"}}>${x.r.toFixed(2)}</td>
              <td style={TD}><span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:20,background:st.bg,color:st.c,fontSize:10,fontWeight:700,textTransform:"uppercase"}}><span style={{width:4,height:4,borderRadius:"50%",background:"currentColor"}}/>{st.label}</span></td>
              <td style={{...TD,textAlign:"right"}}><button onClick={()=>setSelRes(i)} style={{...btnO,padding:"5px 12px",fontSize:11}}>View</button></td>
            </tr>})}</tbody>
        </table>
      </div></Card>}
    </>}

    {/* ============ APPROVALS TAB ============ */}
    {subTab==="approvals"&&<>
      {/* Pending approvals - main content */}
      {pendingApprovals.length>0?<>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:14,fontWeight:700,color:C.g800}}>Pending Requests</span>
            <span style={{background:C.amber,color:"#fff",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:8}}>{pendingApprovals.length}</span>
          </div>
        </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {pendingApprovals.map((a)=>{
        const totalRev=a.bk.reduce((s,b)=>s+b.rev,0);
        const totalHrs=a.bk.reduce((s,b)=>s+b.hours,0);
        const isPending=true;
        const isUrgent=a.expiresIn==="0 Days";
        const stColor=C.amber;
        const stBg=C.amberL;
        return <div key={a.id} className="pp-appr" style={{background:C.cardBg,borderRadius:R.lg,border:isUrgent?`1.5px solid ${C.red}30`:`1px solid ${C.cardBorder}`,boxShadow:C.cardShadow,overflow:"hidden"}}>

          {/* Status accent bar */}
          <div style={{height:3,background:stColor}}/>

          {/* Header */}
          <div style={{padding:"12px 16px 10px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:9,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:12,flexShrink:0}}>{a.photo}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{a.org}</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:10,background:stBg,color:stColor,fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.03em"}}><span style={{width:4,height:4,borderRadius:"50%",background:"currentColor"}}/>{a.status}</span>
                {isUrgent&&<span style={{background:C.red,color:"#fff",padding:"2px 6px",borderRadius:4,fontSize:8,fontWeight:800}}>EXPIRES TODAY</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>
                <span className="pp-appr-contact" style={{fontSize:10,color:C.g400}}>{a.contact}</span>
                <span style={{fontSize:10,color:C.g300}}>-</span>
                <span style={{fontSize:10,color:C.blue,fontFamily:"monospace"}}>{a.id}</span>
                <span style={{fontSize:10,color:C.g300}}>-</span>
                {a.insActive?
                  <span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"1px 7px",borderRadius:8}}>{I.check(9,C.green)} Insured</span>:
                  <span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:9,fontWeight:700,color:C.red,background:C.redL,padding:"1px 7px",borderRadius:8}}>⚠ No Insurance</span>
                }
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:18,fontWeight:800,color:C.g800,fontFamily:numFont}}>${totalRev.toLocaleString()}</div>
              <div style={{fontSize:10,color:C.g400}}>{totalHrs}h total</div>
            </div>
          </div>

          {/* Booking rows */}
          <div style={{borderTop:`1px solid ${C.g100}`}}>
            {a.bk.map((b,bi)=><div key={b.bid} className="pp-appr-bk" style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",borderBottom:bi<a.bk.length-1?`1px solid ${C.g100}`:"none"}}>
              <div style={{width:22,height:22,borderRadius:6,background:`${stColor}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:stColor}}>{bi+1}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <span style={{fontSize:12,fontWeight:600,color:C.g800}}>{b.asset}</span>
                <span style={{fontSize:11,color:C.g400,marginLeft:6}}>{b.activity} - {b.people}p</span>
              </div>
              <div className="pp-appr-bk-meta" style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <span style={{fontSize:11,color:C.g500}}>{b.date}</span>
                <span style={{fontSize:11,color:C.g400}}>{b.time}</span>
                <span style={{fontSize:12,fontWeight:700,color:C.g800,minWidth:44,textAlign:"right"}}>${b.rev}</span>
              </div>
            </div>)}
          </div>

          {/* Footer */}
          <div style={{padding:"10px 16px",borderTop:`1px solid ${C.g100}`,display:"flex",alignItems:"center",gap:10}}>
            {a.notes&&<div style={{fontSize:10,color:C.g400,fontStyle:"italic",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{a.notes}"</div>}
            {!a.notes&&<div style={{flex:1}}/>}
            <div className="pp-appr-btns" style={{display:"flex",gap:6,flexShrink:0}}>
              <button onClick={()=>setSelApproval(a)} style={{...btnO,fontSize:11,padding:"7px 14px"}}>Full Review</button>
              {isPending&&<button onClick={()=>triggerApproval(a.id)} style={{background:C.blue,color:"#fff",border:"none",borderRadius:R.sm,padding:"7px 14px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font}}>Quick Review</button>}
            </div>
          </div>
        </div>})}
      </div>
      </>:<Card><div style={{padding:"40px 0",textAlign:"center",color:C.g400}}><div style={{fontSize:36,marginBottom:8}}>✓</div><div style={{fontSize:14,fontWeight:600,color:C.g600}}>All caught up</div><div style={{fontSize:12,marginTop:4}}>No pending approval requests.</div></div></Card>}

      {/* History - collapsible */}
      {(()=>{const resolved=approvalsData.filter(a=>a.status!=="pending");
        if(resolved.length===0)return null;
        return <>
          <div onClick={()=>setApprovalFilt(approvalFilt==="history"?"all":"history")} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",padding:"12px 0",marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,fontWeight:700,color:C.g600}}>History</span>
              <span style={{fontSize:10,fontWeight:600,color:C.g400,background:C.g100,padding:"2px 8px",borderRadius:6}}>{resolved.length}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2" strokeLinecap="round" style={{transform:approvalFilt==="history"?"rotate(180deg)":"none",transition:"transform .2s"}}><path d="M6 9l6 6 6-6"/></svg>
          </div>
          {approvalFilt==="history"&&<div style={{display:"flex",flexDirection:"column",gap:0}}>
            {resolved.map((a,i)=>{
              const totalRev=a.bk.reduce((s,b)=>s+b.rev,0);
              const stColor=a.status==="approved"?C.green:C.red;
              return <div key={a.id} onClick={()=>setSelApproval(a)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 4px",borderBottom:i<resolved.length-1?`1px solid ${C.g100}`:"none",cursor:"pointer",borderRadius:6,transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:6,height:6,borderRadius:3,background:stColor,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.g700}}>{a.org}</div>
                  <div style={{fontSize:11,color:C.g400}}>{a.bk.length} booking{a.bk.length>1?"s":""} - {a.bk[0]?.asset||"N/A"}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.g700}}>${totalRev.toLocaleString()}</div>
                  <span style={{fontSize:9,fontWeight:700,color:stColor,textTransform:"uppercase"}}>{a.status}</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.g300} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            })}
          </div>}
        </>
      })()}
    </>}
  </div>
}

/* ======== ORGANIZATION ======== */
function Org(){
  const {dark}=useContext(ThemeCtx);
  const [orgTab,setOrgTab]=useState("overview");
  const [editMode,setEditMode]=useState(false);
  const orgTabs=[["overview","Overview"],["amenities","Amenities"],["integrations","Integrations"],["team","Team"],["activity","Activity Log"]];
  const [amenSearch,setAmenSearch]=useState("");
  const [amenCat,setAmenCat]=useState("All");
  const [amenView,setAmenView]=useState("library");
  const [enabledAmens,setEnabledAmens]=useState(()=>new Set(defaultEnabled));
  const [venueAssign,setVenueAssign]=useState(()=>({...defaultVenueAssign}));
  const [amenVenue,setAmenVenue]=useState("Dutchtown Gymnasium");
  const [amenPrices,setAmenPrices]=useState(()=>{const m={};amenityLib.forEach(a=>m[a.id]=a.p);return m});

  const integrations=[
    {name:"RankOne",desc:"Athletic scheduling & eligibility",status:"connected",lastSync:"2 min ago",abbr:"R1",abbrBg:"#1B4D3E",color:C.green,events:347},
    {name:"DragonFly",desc:"Athletic scheduling & facility management",status:"disconnected",lastSync:"--",abbr:"DF",abbrBg:"#B8860B",color:"#B8860B",events:null},
    {name:"Google Calendar",desc:"District calendar sync",status:"connected",lastSync:"5 min ago",abbr:"GC",abbrBg:"#4285F4",color:C.blue,events:89},
    {name:"Outlook 365",desc:"Staff calendar integration",status:"connected",lastSync:"12 min ago",abbr:"O3",abbrBg:"#0078D4",color:"#0078D4",events:24},
    {name:"QuickBooks",desc:"Accounting & invoicing",status:"disconnected",lastSync:"--",abbr:"QB",abbrBg:C.g400,color:C.g400,events:null},
    {name:"Custom API",desc:"Connect your own system via webhook or REST API",status:"disconnected",lastSync:"--",abbr:"{ }",abbrBg:C.g500,color:C.g500,events:null},
  ];

  const teamMembers=[
    {name:"Marcus Williams",email:"m.williams@ascension.k12.la.us",role:"District Admin",campus:"All Campuses",status:"active",lastActive:"Just now",initials:"MW",color:C.blue},
    {name:"Dr. Edith Walker",email:"e.walker@ascension.k12.la.us",role:"Superintendent",campus:"All Campuses",status:"active",lastActive:"1h ago",initials:"EW",color:C.blueDk},
    {name:"David Chen",email:"d.chen@ascension.k12.la.us",role:"Facility Manager",campus:"Dutchtown HS",status:"active",lastActive:"3h ago",initials:"DC",color:C.green},
    {name:"Amy Thibodaux",email:"a.thibodaux@ascension.k12.la.us",role:"Facility Manager",campus:"East Ascension HS",status:"active",lastActive:"Yesterday",initials:"AT",color:"#4DA8D8"},
    {name:"Robert Guidry",email:"r.guidry@ascension.k12.la.us",role:"Finance Director",campus:"All Campuses",status:"active",lastActive:"2d ago",initials:"RG",color:C.amber},
    {name:"Lisa Breaux",email:"l.breaux@ascension.k12.la.us",role:"Approver",campus:"St. Amant HS, Prairieville HS",status:"invited",lastActive:"Pending",initials:"LB",color:C.g400},
  ];

  const activityLog=[
    {action:"Reservation Approved",detail:"APR-0042 - Bayou City Volleyball - Dutchtown Gymnasium",user:"Marcus Williams",time:"35 min ago",icon:I.check(12,C.green),color:C.greenL},
    {action:"Payment Received",detail:"$475.00 - Gonzales FC - Prairieville Athletic Complex",user:"System",time:"2h ago",icon:I.wallet(12,C.green),color:C.greenL},
    {action:"Insurance Alert",detail:"Gonzales FC COI expired - 2 upcoming bookings flagged",user:"System",time:"3h ago",icon:I.alert(12,C.orange),color:C.orangeL},
    {action:"New Reservation",detail:"Ascension YMCA - East Ascension Gymnasium - 2/12",user:"System",time:"5h ago",icon:I.calendar(12,C.blue),color:C.blueL},
    {action:"Calendar Synced",detail:"RankOne - 3 new events imported for February",user:"System",time:"6h ago",icon:I.sync(12,C.blue),color:C.blueL},
    {action:"Role Updated",detail:'Lisa Breaux invited as Approver for St. Amant HS',user:"Marcus Williams",time:"1d ago",icon:I.user(12,C.blue),color:C.blueL},
    {action:"Reservation Denied",detail:"APR-0038 - River Parish Runners - track resurfacing conflict",user:"Marcus Williams",time:"1d ago",icon:I.x(12,C.red),color:C.redL},
    {action:"Payout Processed",detail:"February payout - $8,761.25 deposited to district account",user:"System",time:"1d ago",icon:I.wallet(12,C.green),color:C.greenL},
    {action:"Settings Updated",detail:"Tax rate updated from 0% to 0% (no change)",user:"David Chen",time:"3d ago",icon:I.edit(12,C.g500),color:C.g100},
    {action:"New Customer",detail:"Louisiana Tigers AAU completed onboarding and uploaded COI",user:"System",time:"3d ago",icon:I.user(12,C.green),color:C.greenL},
  ];

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {/* Sub-tabs */}
    <div className="pp-sub-tabs" style={{display:"flex",gap:0,borderBottom:`1px solid ${C.cardBorder}`,overflowX:"auto"}}>
      {orgTabs.map(([k,l])=>
        <button key={k} onClick={()=>setOrgTab(k)} style={{padding:"12px 20px",fontSize:13,fontWeight:orgTab===k?700:500,color:orgTab===k?C.g800:C.g500,background:"none",border:"none",borderBottom:orgTab===k?`2px solid ${C.blue}`:"2px solid transparent",marginBottom:-1,cursor:"pointer",fontFamily:font,letterSpacing:"-0.01em",whiteSpace:"nowrap"}}>{l}</button>
      )}
    </div>

    {/* OVERVIEW TAB */}
    {orgTab==="overview"&&<>
      <Div>District Profile</Div>
      {/* Map + District Info row */}
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <Card style={{flex:1.2,minWidth:280,padding:0,overflow:"hidden",position:"relative"}}>
          <iframe
            title="District Location"
            src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=1100+Webster+St,+Donaldsonville,+LA+70346&zoom=13"+(dark?"&maptype=roadmap":"&maptype=roadmap")}
            style={{width:"100%",height:"100%",minHeight:260,border:"none",display:"block",filter:dark?"invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)":"none"}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 16px",background:`linear-gradient(transparent, ${dark?"rgba(15,19,24,0.95)":"rgba(0,0,0,0.7)"})`,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:28,height:28,borderRadius:8,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.link(13,"#fff")}</div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",lineHeight:1.3}}>1100 Webster St</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>Donaldsonville, LA 70346</div>
            </div>
          </div>
        </Card>
        <Card style={{flex:2,minWidth:320}}>
          <Sec action={<button onClick={()=>{setEditMode(!editMode);if(editMode&&globalShowToast)globalShowToast({type:"success",title:"Changes Saved",msg:"District information updated",color:C.green})}} style={editMode?{...btnP}:btnO}>{editMode?<>{I.check(12,"#fff")} Save</>:<>{I.edit(12,C.g500)} Edit</>}</button>}>District Information</Sec>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[["District","Ascension Parish School Board"],["Address","1100 Webster St, Donaldsonville, LA 70346"],["Phone","(225) 391-7000"],["Timezone","America/Chicago"],["Superintendent","Dr. Edith M. Walker"],["Campuses Enrolled","5 of 32"]].map(([l,v])=><div key={l}>
              <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5}}>{l}</div>
              {editMode?<input defaultValue={v} style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.blue}40`,borderRadius:8,fontSize:13,fontFamily:font,background:C.g50,color:C.g700,boxSizing:"border-box",outline:"none",boxShadow:`0 0 0 3px ${C.blue}10`}}/>
              :<div style={{fontSize:13,color:C.g700,fontWeight:500,background:C.g50,padding:"10px 12px",borderRadius:8,border:`1px solid ${C.cardBorder}`}}>{v}</div>}
            </div>)}
          </div>
        </Card>
      </div>
      <Card>
          <Sec action={<button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Account Added",msg:"New payment account configured",color:C.green})}} style={{...btnO,fontSize:12,padding:"5px 12px"}}>+ Add</button>}>Payment Accounts</Sec>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {campuses.map((c,ci)=><div key={c.id} style={{padding:"12px 14px",borderRadius:8,border:`1px solid ${C.cardBorder}`,background:C.g50,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:12,fontWeight:600,color:C.g700}}>{c.short}</div><div style={{fontSize:11,color:C.g400,marginTop:2,fontFamily:"monospace"}}>**** **** **** {["4821","7293","3018","5547","1962"][ci]}</div></div>
            <span style={{...statusBadge("completed"),fontSize:9}}><span style={{width:4,height:4,borderRadius:"50%",background:"currentColor"}}/>Active</span>
          </div>)}
          </div>
      </Card>


      <Div>Services & Amenities</Div>
      <Card><Sec action={<button onClick={()=>setOrgTab("amenities")} style={{...btnO,fontSize:12,padding:"5px 14px",color:C.blue,borderColor:`${C.blue}30`}}>Manage All ({amenityLib.length}) →</button>}>Amenities & Add-ons</Sec><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>{amenityLib.filter(a=>enabledAmens.has(a.id)).slice(0,8).map(a=><div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:C.g50,borderRadius:10,border:`1px solid ${C.cardBorder}`}}><span style={{fontSize:13,color:C.g700,fontWeight:600}}>{a.n}</span><span style={{fontSize:13,fontWeight:800,color:C.blue}}>${amenPrices[a.id]||a.p}</span></div>)}{enabledAmens.size>8&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"11px 14px",background:C.g50,borderRadius:10,border:`1px dashed ${C.cardBorder}`,color:C.g400,fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={()=>setOrgTab("amenities")}>+{enabledAmens.size-8} more</div>}</div></Card>
      <Div>Settings</Div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        <Card style={{flex:1}}><Sec>Notification Preferences</Sec>
          {[["Email - New Reservations",true],["Email - Payment Confirmations",true],["Email - Insurance Alerts",true],["SMS - Urgent Approvals",true],["SMS - Payment Failures",false],["Weekly Digest Report",true]].map(([n,on])=><div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}>
            <span style={{fontSize:13,color:C.g600}}>{n}</span>
            <div style={{width:42,height:22,borderRadius:11,background:on?C.green:C.g300,cursor:"pointer",position:"relative",transition:"background .2s"}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,...(on?{right:3}:{left:3}),boxShadow:"0 1px 3px rgba(0,0,0,.2)",transition:"all .15s"}}/></div>
          </div>)}
        </Card>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:20}}>
          <Card><Sec>Workflow Settings</Sec>
            {(()=>{const {requireSiteAdmin,setRequireSiteAdmin}=useSiteAdmin();return <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}>
                <div style={{flex:1,marginRight:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.g700}}>Site Admin Tracking</div>
                  <div style={{fontSize:11,color:C.g400,marginTop:3,lineHeight:1.5}}>When enabled, PP bookings without an assigned site admin are flagged on the calendar. Disable if your district manages on-site supervision outside of PracticePlan.</div>
                </div>
                <div onClick={()=>setRequireSiteAdmin(!requireSiteAdmin)} style={{width:42,height:22,borderRadius:11,background:requireSiteAdmin?C.green:C.g300,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0,marginTop:2}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,...(requireSiteAdmin?{right:3}:{left:3}),boxShadow:"0 1px 3px rgba(0,0,0,.2)",transition:"all .15s"}}/></div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0"}}>
                <div style={{flex:1,marginRight:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.g700}}>Require Approval for Rentals</div>
                  <div style={{fontSize:11,color:C.g400,marginTop:3,lineHeight:1.5}}>All rental requests must be reviewed and approved before being confirmed. Disable for auto-approval of qualifying bookings.</div>
                </div>
                <div style={{width:42,height:22,borderRadius:11,background:C.green,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0,marginTop:2}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,right:3,boxShadow:"0 1px 3px rgba(0,0,0,.2)",transition:"all .15s"}}/></div>
              </div>
            </>})()}
          </Card>
          <Card><Sec>Booking Settings</Sec>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{fontSize:13,fontWeight:600,color:C.g700}}>Sales Tax Rate</span><div style={{fontSize:10,color:C.g400,marginTop:1}}>Applied to all rental invoices</div></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><input type="text" defaultValue="0" style={{width:56,padding:"8px 10px",border:`1px solid ${C.cardBorder}`,borderRadius:8,fontSize:14,fontWeight:700,textAlign:"center",fontFamily:font,background:C.g50,color:C.g700}}/><span style={{fontSize:14,color:C.g400,fontWeight:700}}>%</span></div>
            </div>
            <div style={{height:1,background:C.g100}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{fontSize:13,fontWeight:600,color:C.g700}}>Minimum Booking Duration</span><div style={{fontSize:10,color:C.g400,marginTop:1}}>Shortest rental block allowed</div></div>
              <select defaultValue="1" style={{...sel,width:100,textAlign:"center"}}><option value="1">1 hour</option><option value="2">2 hours</option><option value="3">3 hours</option><option value="4">4 hours</option></select>
            </div>
            <div style={{height:1,background:C.g100}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{fontSize:13,fontWeight:600,color:C.g700}}>Advance Booking Window</span><div style={{fontSize:10,color:C.g400,marginTop:1}}>How far ahead renters can book</div></div>
              <select defaultValue="90" style={{...sel,width:100,textAlign:"center"}}><option value="30">30 days</option><option value="60">60 days</option><option value="90">90 days</option><option value="180">180 days</option><option value="365">1 year</option></select>
            </div>
            <div style={{height:1,background:C.g100}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{fontSize:13,fontWeight:600,color:C.g700}}>Auto-Approve Returning Orgs</span><div style={{fontSize:10,color:C.g400,marginTop:1}}>Skip approval for orgs with 3+ completed bookings</div></div>
              <div style={{width:38,height:20,borderRadius:10,background:C.g300,cursor:"pointer",position:"relative"}}><div style={{width:14,height:14,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:3,boxShadow:"0 1px 2px rgba(0,0,0,.2)"}}/></div>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </>}

    {/* AMENITIES TAB */}
    {orgTab==="amenities"&&<>
      {/* Compact summary */}
      <div className="pp-amen-summary" style={{display:"flex",justifyContent:"center",gap:0,marginBottom:4}}>
        <div style={{display:"flex",gap:0,background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:R.lg,overflow:"hidden",width:"100%",maxWidth:600}}>
          {[["Available",amenityLib.length,C.g800],["Enabled",enabledAmens.size,C.green],["Categories",amenityCats.length-1,C.blue],["Venues",Object.keys(venueAssign).length,C.g800]].map(([l,v,clr],i,arr)=><div key={l} style={{flex:1,padding:"16px 24px",textAlign:"center",borderRight:i<arr.length-1?`1px solid ${C.cardBorder}`:"none"}}>
            <div className="pp-amen-label" style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div className="pp-amen-value" style={{fontSize:28,fontWeight:900,color:clr,marginTop:4,fontFamily:numFont}}>{v}</div>
          </div>)}
        </div>
      </div>

      {/* View toggle - centered */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{display:"flex",gap:0,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,overflow:"hidden"}}>
          {[["library","Amenity Library"],["venues","Venue Assignments"]].map(([k,l])=><button key={k} onClick={()=>setAmenView(k)} style={{padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font,border:"none",background:amenView===k?C.blue:C.cardBg,color:amenView===k?"#fff":C.g500,transition:"all .15s"}}>{l}</button>)}
        </div>
        {amenView==="library"&&<div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
          <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}>{I.search(13,C.g400)}</span><input type="text" value={amenSearch} onChange={e=>setAmenSearch(e.target.value)} placeholder="Search amenities..." style={{padding:"8px 14px 8px 30px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:12,fontFamily:font,width:180,background:C.g50,color:C.g700,boxSizing:"border-box"}}/></div>
          <div className="pp-r-pills pp-amen-pills" style={{display:"flex",gap:3,background:C.g100,borderRadius:10,padding:3}}>{amenityCats.map(cat=><button key={cat} onClick={()=>setAmenCat(cat)} style={pill(amenCat===cat)}>{cat}</button>)}</div>
        </div>}
      </div>

      {/* LIBRARY VIEW */}
      {amenView==="library"&&<>{amenityCats.filter(c=>c!=="All").filter(c=>amenCat==="All"||amenCat===c).map(cat=>{
        const items=amenityLib.filter(a=>a.cat===cat&&(amenSearch===""||a.n.toLowerCase().includes(amenSearch.toLowerCase())||a.desc.toLowerCase().includes(amenSearch.toLowerCase())));
        if(items.length===0)return null;
        return <Card key={cat}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{cat}</span>
            <span style={{fontSize:11,color:C.g400,fontWeight:600}}>{items.length} item{items.length!==1?"s":""}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {items.map((a,i)=>{
              const on=enabledAmens.has(a.id);
              const assignCount=Object.values(venueAssign).filter(v=>v.includes(a.id)).length;
              return <div key={a.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<items.length-1?`1px solid ${C.g100}`:"none"}}>
                {/* Toggle */}
                <div onClick={()=>{const next=new Set(enabledAmens);if(on){next.delete(a.id);const va={...venueAssign};Object.keys(va).forEach(v=>{va[v]=va[v].filter(x=>x!==a.id)});setVenueAssign(va)}else next.add(a.id);setEnabledAmens(next);if(globalShowToast)globalShowToast({type:on?"info":"success",title:on?"Amenity Disabled":"Amenity Enabled",msg:a.n,color:on?C.g500:C.green})}} style={{width:40,height:22,borderRadius:11,background:on?C.green:C.g300,cursor:"pointer",position:"relative",flexShrink:0,transition:"background .2s"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,...(on?{right:3}:{left:3}),boxShadow:"0 1px 3px rgba(0,0,0,.2)",transition:"all .15s"}}/>
                </div>
                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:13,fontWeight:700,color:on?C.g800:C.g400}}>{a.n}</span>
                    {assignCount>0&&on&&<span style={{fontSize:10,fontWeight:700,color:C.blue,background:C.blueL,padding:"1px 6px",borderRadius:4}}>{assignCount} venue{assignCount!==1?"s":""}</span>}
                  </div>
                  <div style={{fontSize:11,color:C.g400,marginTop:2}}>{a.desc}</div>
                </div>
                {/* Price */}
                <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:11,color:C.g400}}>$</span>
                  <input type="number" value={amenPrices[a.id]||0} onChange={e=>{setAmenPrices({...amenPrices,[a.id]:parseInt(e.target.value)||0})}} style={{width:52,padding:"5px 6px",border:`1px solid ${on?C.cardBorder:C.g200}`,borderRadius:6,fontSize:13,fontWeight:700,textAlign:"right",fontFamily:font,background:on?C.g50:C.g100,color:on?C.g800:C.g400,boxSizing:"border-box"}}/>
                </div>
              </div>
            })}
          </div>
        </Card>
      })}
      {amenSearch&&amenityLib.filter(a=>(amenCat==="All"||a.cat===amenCat)&&(a.n.toLowerCase().includes(amenSearch.toLowerCase())||a.desc.toLowerCase().includes(amenSearch.toLowerCase()))).length===0&&<Card><div style={{padding:"40px 0",textAlign:"center",color:C.g400}}><div style={{fontSize:14,fontWeight:600,color:C.g600}}>No amenities match "{amenSearch}"</div><div style={{fontSize:12,marginTop:4}}>Try a different search term or category.</div></div></Card>}
      </>}

      {/* VENUE ASSIGNMENTS VIEW */}
      {amenView==="venues"&&<>
        <Card>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <span style={{fontSize:13,fontWeight:700,color:C.g800}}>Select Venue:</span>
            <select value={amenVenue} onChange={e=>setAmenVenue(e.target.value)} style={{...sel,minWidth:220}}>{Object.keys(defaultVenueAssign).map(v=><option key={v} value={v}>{v}</option>)}</select>
            <span style={{fontSize:11,color:C.g400}}>{(venueAssign[amenVenue]||[]).length} of {enabledAmens.size} amenities assigned</span>
          </div>

          {/* Progress */}
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.g400,marginBottom:4}}>
              <span>Coverage</span>
              <span style={{fontWeight:700}}>{Math.round(((venueAssign[amenVenue]||[]).length/Math.max(enabledAmens.size,1))*100)}%</span>
            </div>
            <div style={{width:"100%",height:6,background:C.g100,borderRadius:3,overflow:"hidden"}}>
              <div style={{width:`${((venueAssign[amenVenue]||[]).length/Math.max(enabledAmens.size,1))*100}%`,height:"100%",background:C.blue,borderRadius:3,transition:"width .3s"}}/>
            </div>
          </div>

          {/* Amenity checklist for this venue */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:0}}>
            {amenityLib.filter(a=>enabledAmens.has(a.id)).map((a,i)=>{
              const assigned=(venueAssign[amenVenue]||[]).includes(a.id);
              return <div key={a.id} onClick={()=>{
                const va={...venueAssign};const list=[...(va[amenVenue]||[])];
                if(assigned){va[amenVenue]=list.filter(x=>x!==a.id)}else{list.push(a.id);va[amenVenue]=list}
                setVenueAssign(va);
              }} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:`1px solid ${C.g100}`,borderRadius:0,transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${assigned?C.green:C.g300}`,background:assigned?C.green:C.cardBg,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s",flexShrink:0}}>
                  {assigned&&I.check(13,"#fff")}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:600,color:assigned?C.g800:C.g500}}>{a.n}</div>
                  <div style={{fontSize:10,color:C.g400}}>{a.cat}</div>
                </div>
                <span style={{fontSize:12,fontWeight:700,color:assigned?C.blue:C.g300,flexShrink:0}}>${amenPrices[a.id]||a.p}</span>
              </div>
            })}
          </div>
        </Card>

        {/* Quick overview: all venues */}
        <Card>
          <Sec>All Venue Assignments</Sec>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:600}}>
              <thead><tr>
                <th style={{...TH,position:"sticky",left:0,background:C.g50,zIndex:1}}>Venue</th>
                {amenityLib.filter(a=>enabledAmens.has(a.id)).map(a=><th key={a.id} style={{...TH,textAlign:"center",padding:"8px 6px",fontSize:8,lineHeight:1.2,minWidth:36}} title={a.n}>{a.n.split(" ")[0].slice(0,5)}</th>)}
                <th style={TH}>Total</th>
              </tr></thead>
              <tbody>{Object.entries(venueAssign).map(([venue,ids],vi)=>{
                const venueEnabled=ids.filter(id=>enabledAmens.has(id));
                return <tr key={venue} style={{background:vi%2===0?C.g50:C.cardBg,cursor:"pointer"}} onClick={()=>{setAmenVenue(venue)}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=vi%2===0?C.g50:C.cardBg}>
                  <td style={{...TD,fontWeight:600,color:venue===amenVenue?C.blue:C.g700,fontSize:11,position:"sticky",left:0,background:"inherit",whiteSpace:"nowrap"}}>{venue}</td>
                  {amenityLib.filter(a=>enabledAmens.has(a.id)).map(a=><td key={a.id} style={{...TD,textAlign:"center",padding:"8px 4px"}}>{venueEnabled.includes(a.id)?<span style={{color:C.green,fontSize:14}}>●</span>:<span style={{color:C.g200}}>-</span>}</td>)}
                  <td style={{...TD,fontWeight:700,color:C.g800,textAlign:"center"}}>{venueEnabled.length}</td>
                </tr>
              })}</tbody>
            </table>
          </div>
        </Card>
      </>}
    </>}

    {/* INTEGRATIONS TAB */}
    {orgTab==="integrations"&&<>
      {/* Active Integrations */}
      <Div>Active Integrations</Div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {integrations.filter(ig=>ig.status==="connected").map(ig=>
          <div key={ig.name} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,boxShadow:C.cardShadow,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{height:3,background:ig.abbrBg}}/>
          <div style={{padding:"16px 18px",display:"flex",flexDirection:"column",flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:ig.abbrBg,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:ig.abbr.length>2?10:13,flexShrink:0}}>{ig.abbr}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14,fontWeight:700,color:C.g800}}>{ig.name}</span>
                  <span className="pp-pulse-dot" style={{width:8,height:8,borderRadius:4,background:C.green,flexShrink:0}}/>
                </div>
                <div style={{fontSize:11,color:C.g400,marginTop:1}}>{ig.desc}</div>
              </div>
            </div>
            <div style={{flex:1,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:0,borderRadius:8,overflow:"hidden",border:`1px solid ${C.g100}`,height:"100%",minHeight:42}}>
                <div style={{flex:1,padding:"8px 12px",borderRight:`1px solid ${C.g100}`}}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.05em"}}>Last sync</div>
                  <div style={{fontSize:12,fontWeight:700,color:C.g700,marginTop:1}}>{ig.lastSync}</div>
                </div>
                <div style={{flex:1,padding:"8px 12px",borderRight:`1px solid ${C.g100}`}}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.05em"}}>Events</div>
                  <div style={{fontSize:12,fontWeight:700,color:C.g700,marginTop:1}}>{ig.events!=null?ig.events:"--"}</div>
                </div>
                <div style={{padding:"8px 12px",display:"flex",alignItems:"center",gap:5}}>
                  <span className="pp-pulse-dot" style={{width:6,height:6,borderRadius:3,background:C.green}}/>
                  <span style={{fontSize:11,fontWeight:700,color:C.green}}>Healthy</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{if(globalShowToast)globalShowToast({type:"info",title:`${ig.name} Synced`,msg:"Integration synced successfully",color:C.blue})}} style={{flex:1,background:C.g50,color:C.g700,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>{I.sync(13,C.g500)} Sync Now</button>
              <button style={{flex:1,background:C.g50,color:C.g500,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,padding:"10px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Settings</button>
            </div>
          </div>
        </div>)}
      </div>

      {/* Available Integrations */}
      <Div>Available Integrations</Div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {integrations.filter(ig=>ig.status!=="connected").map(ig=>
          <div key={ig.name} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,boxShadow:C.cardShadow,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{height:3,background:C.g200}}/>
          <div style={{padding:"16px 18px",display:"flex",flexDirection:"column",flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:C.g200,display:"flex",alignItems:"center",justifyContent:"center",color:C.g500,fontWeight:800,fontSize:ig.abbr.length>2?10:13,flexShrink:0}}>{ig.abbr}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14,fontWeight:700,color:C.g800}}>{ig.name}</span>
                  <span style={{width:6,height:6,borderRadius:3,background:C.g300,flexShrink:0}}/>
                </div>
                <div style={{fontSize:11,color:C.g400,marginTop:1}}>{ig.desc}</div>
              </div>
            </div>
            <div style={{flex:1,marginBottom:14}}>
              <div style={{padding:"12px 14px",background:C.g50,borderRadius:8,border:`1px dashed ${C.g200}`,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",minHeight:42}}>
                <div style={{fontSize:12,color:C.g400}}>Not connected</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{flex:2,background:C.blue,color:"#fff",border:"none",borderRadius:R.sm,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>Connect {ig.name}</button>
              <button style={{flex:1,background:C.g50,color:C.g500,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,padding:"10px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font}}>Learn More</button>
            </div>
          </div>
        </div>)}
      </div>

      {/* Suggest an integration CTA */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"16px 0 4px"}}>
        <button onClick={()=>globalShowSuggest()} style={{background:"none",border:"none",cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g100} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          <span style={{fontSize:12,fontWeight:600,color:C.g400}}>Need a different integration? <span style={{color:C.blue,fontWeight:700}}>Suggest one</span></span>
        </button>
      </div>

      {/* Payout Accounts */}
      <Div>Payout Accounts</Div>
      <Card>
        <Sec>Primary Account</Sec>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:700,color:C.g800}}>Ascension Parish School Board</div>
            <div style={{fontSize:11,color:C.g400,marginTop:1}}>Default account for all facility revenue</div>
          </div>
          <span style={{display:"inline-flex",alignItems:"center",gap:4,background:C.greenL,color:C.green,padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:700}}><span className="pp-pulse-dot" style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>Verified</span>
        </div>
        <div style={{padding:"12px 16px",background:C.g50,borderRadius:8,border:`1px solid ${C.cardBorder}`,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:C.g600}}>JPMorgan Chase - ****7291</div>
              <div style={{fontSize:10,color:C.g400,marginTop:1}}>ACH Direct Deposit - Bi-monthly schedule</div>
            </div>
            <button style={{...btnO,fontSize:11,padding:"5px 12px"}}>Edit</button>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.g400,marginBottom:4}}>
          <span>Receives revenue from:</span>
          <span style={{fontWeight:700,color:C.g600}}>All campuses (default)</span>
        </div>
      </Card>

      {/* Facility-specific accounts */}
      <Card>
        <Sec action={<button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Account Added",msg:"New payout account created. Map it to a campus or facility below.",color:C.green})}} style={{...btnP,fontSize:11,padding:"6px 14px"}}><span style={{fontSize:14,lineHeight:1}}>+</span> Add Account</button>}>Facility-Specific Accounts</Sec>
        <div style={{fontSize:12,color:C.g500,lineHeight:1.5,marginBottom:16}}>
          Route revenue from specific campuses or facilities to separate bank accounts. Any facility not mapped will use the primary account above.
        </div>

        {/* Existing mapped accounts */}
        {[
          {name:"Dutchtown Athletic Fund",bank:"Regions Bank - ****4182",campus:"Dutchtown High School",facilities:["Dutchtown Gymnasium","Dutchtown Stadium","Dutchtown Fields"],verified:true},
          {name:"EA Booster Club Account",bank:"Capital One - ****6530",campus:"East Ascension High School",facilities:["East Ascension Gym","Spartan Stadium"],verified:true},
        ].map((acct,i)=><div key={i} style={{padding:"14px 16px",background:C.g50,borderRadius:10,border:`1px solid ${C.cardBorder}`,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.g700}}>{acct.name}</div>
              <div style={{fontSize:11,color:C.g400,marginTop:2}}>{acct.bank} - ACH</div>
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {acct.verified&&<span style={{fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"2px 7px",borderRadius:4}}>Verified</span>}
              <button style={{...btnO,fontSize:10,padding:"4px 10px"}}>Edit</button>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.05em",marginTop:2,whiteSpace:"nowrap"}}>Mapped to</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {acct.facilities.map(f=><span key={f} style={{fontSize:10,fontWeight:600,color:C.blue,background:C.blueL,padding:"3px 8px",borderRadius:4}}>{f}</span>)}
            </div>
          </div>
        </div>)}

        {/* Add new account form placeholder */}
        <div style={{padding:"14px 16px",borderRadius:10,border:`1px dashed ${C.g200}`,display:"flex",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer"}} onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Account Added",msg:"New payout account created. Map it to a campus or facility below.",color:C.green})}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          <span style={{fontSize:12,fontWeight:600,color:C.g400}}>Add another payout account</span>
        </div>
      </Card>

      <div style={{padding:"10px 14px",background:`${C.blue}06`,borderRadius:8,border:`1px solid ${C.blue}15`}}>
        <div style={{fontSize:11,color:C.g500,lineHeight:1.5}}>Revenue is deposited on a bi-monthly schedule after processing fees are deducted. Next payout estimated <span style={{fontWeight:700,color:C.g700}}>March 1, 2026</span>. Facility-specific accounts receive only the revenue from their mapped locations.</div>
      </div>
    </>}

    {/* TEAM TAB */}
    {orgTab==="team"&&<>
      <Card>
        <Sec action={<button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Invitation Sent",msg:"New team member invited via email",color:C.green})}} style={btnP}><span style={{fontSize:15}}>+</span> Invite Member</button>}>Team Members ({teamMembers.length})</Sec>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr>{["Member","Role","Campus Access","Status","Last Active",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{teamMembers.map((m,i)=><tr key={m.name} style={{background:i%2===0?C.g50:C.cardBg}}>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:m.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:11,flexShrink:0}}>{m.initials}</div>
              <div><span style={{fontWeight:700,color:C.g700,display:"block"}}>{m.name}</span><span style={{fontSize:11,color:C.g400}}>{m.email}</span></div>
            </div></td>
            <td style={{...TD,fontWeight:600,color:C.g700}}>{m.role}</td>
            <td style={{...TD,color:C.g500,fontSize:12}}>{m.campus}</td>
            <td style={TD}><span style={statusBadge(m.status==="active"?"completed":"pending")}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{m.status==="active"?"Active":"Invited"}</span></td>
            <td style={{...TD,color:C.g400,fontSize:12}}>{m.lastActive}</td>
            <td style={TD}><div style={{display:"flex",gap:4}}>
              <button style={{...btnO,padding:"4px 10px",fontSize:11}}>Edit</button>
              {m.name!=="Marcus Williams"&&<button style={{...btnO,padding:"4px 10px",fontSize:11,color:C.red,borderColor:`${C.red}25`}}>Remove</button>}
            </div></td>
          </tr>)}</tbody>
        </table>
      </Card>
    </>}


    {/* ACTIVITY LOG TAB */}
    {orgTab==="activity"&&<Card>
      <Sec action={<div style={{display:"flex",gap:8,alignItems:"center"}}><select style={sel}><option>All Activity</option><option>Reservations</option><option>Payments</option><option>System</option><option>User Actions</option></select><ExportBtns/></div>}>Activity Log</Sec>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {activityLog.map((a,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"14px 0",borderBottom:i<activityLog.length-1?`1px solid ${C.g100}`:"none"}}>
          <div style={{width:34,height:34,borderRadius:10,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>{a.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
              <div><span style={{fontSize:13,fontWeight:700,color:C.g800}}>{a.action}</span><span style={{fontSize:12,color:C.g500,marginLeft:8}}>by {a.user}</span></div>
              <span style={{fontSize:11,color:C.g400,whiteSpace:"nowrap",flexShrink:0}}>{a.time}</span>
            </div>
            <div style={{fontSize:12,color:C.g500,marginTop:4,lineHeight:1.5}}>{a.detail}</div>
          </div>
        </div>)}
      </div>
      <div style={{marginTop:16,padding:"12px 0",borderTop:`1px solid ${C.g100}`,textAlign:"center"}}><button style={{...btnO,fontSize:12}}>Load More Activity</button></div>
    </Card>}
  </div>
}

/* ======== REPORTING (expanded ratings) ======== */
/* Ratings data: individual reviews with user info, comments, contact */
const ratingsData=[
  {id:1,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"02/04/2026",comment:"Gym was spotless and the scoreboard worked perfectly. Best facility we rent in the parish. Will keep coming back every week.",sentiment:"positive",booked:18,photo:"BC",color:C.blue},
  {id:2,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:4,date:"02/02/2026",comment:"Great fields - well maintained. Only complaint is the parking lot lights were off and families had to walk to their cars in the dark after our 9 PM session.",sentiment:"mixed",booked:14,photo:"GF",color:C.purple},
  {id:3,user:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"St. Amant High School",asset:"St. Amant Gymnasium",rating:5,date:"01/30/2026",comment:"Love this gym for cheer practice. The floor is in great shape and Coach Bourque always has the facility ready for us when we arrive.",sentiment:"positive",booked:12,photo:"AE",color:C.orange},
  {id:4,user:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"01/26/2026",comment:"Our AAU kids love playing here. Hoops are regulation, bleachers are solid, and the AC actually works. 10/10.",sentiment:"positive",booked:10,photo:"LT",color:C.green},
  {id:5,user:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"St. Amant High School",asset:"Gator Stadium",rating:2,date:"01/18/2026",comment:"Track surface had some uneven patches near lane 3 that made our runners nervous. Also the gate was locked when we arrived and nobody was there to let us in for 20 minutes. Need better coordination.",sentiment:"negative",booked:6,photo:"RP",color:C.g400},
  {id:6,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"East Ascension High School",asset:"East Ascension Gymnasium",rating:3,date:"01/15/2026",comment:"Gym is fine but the nets were missing a crank handle and we had to improvise. Submitted a maintenance request - hope it gets fixed before next time.",sentiment:"mixed",booked:18,photo:"BC",color:C.blue},
  {id:7,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:5,date:"01/10/2026",comment:"Saturday morning scrimmage went perfectly. Fields were lined, goals were set up, and the concession stand was open. Parents loved it.",sentiment:"positive",booked:14,photo:"GF",color:C.purple},
  {id:8,user:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"East Ascension High School",asset:"East Ascension Gymnasium",rating:4,date:"01/08/2026",comment:"Good gym but could use some updated padding on the walls behind the baskets. Kids play hard and that's a safety concern.",sentiment:"mixed",booked:10,photo:"LT",color:C.green},
  {id:9,user:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:4,date:"01/05/2026",comment:"Facility was great but the custodian had to come move some wrestling mats that were left out. Minor issue but added 15 min to our setup.",sentiment:"mixed",booked:12,photo:"AE",color:C.orange},
  {id:10,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"12/20/2025",comment:"Always a great experience at Dutchtown. The staff is friendly and the gym is tournament-ready.",sentiment:"positive",booked:18,photo:"BC",color:C.blue},
  {id:11,user:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"East Ascension High School",asset:"Spartan Stadium",rating:3,date:"01/06/2026",comment:"Decent track but the starting blocks were missing from lanes 5-8. Had to borrow from the school's equipment shed. Water fountain was also broken.",sentiment:"mixed",booked:6,photo:"RP",color:C.g400},
  {id:12,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:4,date:"12/15/2025",comment:"Solid session. One of the field lights in the southwest corner was flickering but otherwise everything was good.",sentiment:"mixed",booked:14,photo:"GF",color:C.purple},
];
const ratingTrendData=[{m:"Sep",avg:3.8,count:6},{m:"Oct",avg:4.0,count:9},{m:"Nov",avg:4.1,count:11},{m:"Dec",avg:4.3,count:8},{m:"Jan",avg:4.1,count:14},{m:"Feb",avg:4.5,count:4}];
const sentimentColors={positive:C.blue,mixed:C.g400,negative:C.red};

function Reporting(){
  const [rt,setRt]=useState(0);
  globalSetRt=setRt;
  const [ratingsView,setRatingsView]=useState("overview");
  const [ratingsCampus,setRatingsCampus]=useState("all");
  const [ratingSentiment,setRatingSentiment]=useState("all");
  const [expandedReview,setExpandedReview]=useState(null);
  const [payStatusFilt,setPayStatusFilt]=useState("all");
  const rTabs=["Ratings & Reviews","Revenue - Campus","Revenue - Facility","Revenue - Participant","Payouts Report","Bulk Payments"];

  const filteredRatings=ratingsData.filter(r=>{
    if(ratingsCampus!=="all"&&r.campus!==ratingsCampus)return false;
    if(ratingSentiment!=="all"&&r.sentiment!==ratingSentiment)return false;
    return true;
  });
  const avgRating=(filteredRatings.reduce((s,r)=>s+r.rating,0)/filteredRatings.length||0).toFixed(1);
  const distrib=[1,2,3,4,5].map(s=>filteredRatings.filter(r=>r.rating===s).length);
  const maxDistrib=Math.max(...distrib,1);

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {/* Report tabs - horizontal scroll pills */}
    <div className="pp-report-tabs" style={{display:"flex",gap:0,borderBottom:`1px solid ${C.cardBorder}`,justifyContent:"center"}}>
      {rTabs.map((t,i)=>{
        const short=t.replace("Revenue - ","").replace("Ratings & Reviews","Reviews").replace("Payouts Report","Payouts").replace("Bulk Payments","Bulk");
        return <button key={t} onClick={()=>setRt(i)} style={{padding:"10px 16px",fontSize:12,fontWeight:rt===i?700:500,color:rt===i?C.g800:C.g400,background:"none",border:"none",borderBottom:rt===i?`2px solid ${C.blue}`:"2px solid transparent",marginBottom:-1,cursor:"pointer",fontFamily:font,whiteSpace:"nowrap",letterSpacing:"-0.01em"}}><span className="pp-tab-full">{t}</span><span className="pp-tab-short" style={{display:"none"}}>{short}</span></button>
      })}
    </div>

    {/* Report controls */}
    <div className="pp-report-controls" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
      <div className="pp-report-range" style={{display:"flex",gap:6,alignItems:"center"}}>
        <select style={{...sel,minWidth:130}}><option>This Month</option><option>Last Month</option><option>This Quarter</option><option>Last Quarter</option><option>Year to Date</option><option>Last Year</option><option>Custom Range</option></select>
        <span style={{fontSize:12,color:C.g400,fontWeight:500,whiteSpace:"nowrap"}}>Feb 1 - Feb 28, 2026</span>
      </div>
      <div className="pp-report-actions" style={{display:"flex",gap:4}}>
        <button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Report Exported",msg:`${rTabs[rt]} exported as CSV`,color:C.green})}} style={{padding:"7px 14px",borderRadius:6,border:"none",background:C.g800,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:5,transition:"opacity .15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{I.link(11,"#fff")} Export</button>
        <button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Report Scheduled",msg:"Weekly email report scheduled for Mondays at 8 AM",color:C.blue})}} style={{padding:"7px 14px",borderRadius:6,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.g600,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:5}}>{I.mail(11,C.g400)} Schedule</button>
      </div>
    </div>

    {rt===0&&<>
      <Div>Overview</Div>
      {/* Ratings header metrics */}
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <Card style={{flex:1,minWidth:160,textAlign:"center"}}>
          <div style={{fontSize:42,fontWeight:900,color:C.g800,lineHeight:1,fontFamily:numFont}}>{avgRating}</div>
          <div style={{margin:"6px 0 4px"}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<Math.round(parseFloat(avgRating))?"#FBBF24":C.g300,fontSize:18}}>★</span>)}</div>
          <div style={{fontSize:11,color:C.g400,fontWeight:600}}>{filteredRatings.length} total reviews</div>
        </Card>
        <Card style={{flex:1.5,minWidth:200}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Distribution</div>
          {[5,4,3,2,1].map(star=>{const cnt=distrib[star-1];return <div key={star} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:700,color:C.g600,width:14,textAlign:"right"}}>{star}</span>
            <span style={{color:"#FBBF24",fontSize:12}}>★</span>
            <div style={{flex:1,height:8,background:C.g100,borderRadius:4,overflow:"hidden"}}><div style={{width:`${(cnt/maxDistrib)*100}%`,height:"100%",background:star>=4?C.green:star===3?C.orange:C.red,borderRadius:4,transition:"width .3s"}}/></div>
            <span style={{fontSize:11,fontWeight:700,color:C.g500,width:20,textAlign:"right"}}>{cnt}</span>
          </div>})}
        </Card>
        <Card style={{flex:1,minWidth:160}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Sentiment</div>
          {[["positive","Positive",ratingsData.filter(r=>r.sentiment==="positive").length],["mixed","Mixed",ratingsData.filter(r=>r.sentiment==="mixed").length],["negative","Needs Attn",ratingsData.filter(r=>r.sentiment==="negative").length]].map(([k,l,n])=><div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{width:8,height:8,borderRadius:4,background:sentimentColors[k]}}/>
              <span style={{fontSize:12,fontWeight:600,color:C.g700}}>{l}</span>
            </div>
            <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{n}</span>
          </div>)}
        </Card>
        <Card style={{flex:1,minWidth:160}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Action Items</div>
          <div style={{fontSize:28,fontWeight:900,color:C.red,lineHeight:1}}>{ratingsData.filter(r=>r.rating<=2).length}</div>
          <div style={{fontSize:11,color:C.g500,marginTop:4,fontWeight:600}}>Reviews rated 2 or below</div>
          <div style={{fontSize:11,color:C.red,marginTop:6,fontWeight:700,cursor:"pointer"}} onClick={()=>{setRatingSentiment("negative");setRatingsView("reviews")}}>→ View & follow up</div>
        </Card>
      </div>

      <Div>Trends & Analysis</Div>
      {/* Rating trend chart */}
      <Card>
        <Sec action={<div style={{display:"flex",gap:4}}>{[["overview","Overview"],["reviews","All Reviews"]].map(([k,l])=><button key={k} onClick={()=>setRatingsView(k)} style={pill(ratingsView===k)}>{l}</button>)}</div>}>Rating Trends</Sec>
        {ratingsView==="overview"&&<>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ratingTrendData}><defs><linearGradient id="ratingGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FBBF24" stopOpacity={.3}/><stop offset="100%" stopColor="#FBBF24" stopOpacity={.02}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis domain={[1,5]} axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} ticks={[1,2,3,4,5]}/><Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="avg" name="Avg Rating" stroke="#FBBF24" strokeWidth={2.5} fill="url(#ratingGr)" dot={{r:5,fill:"#FBBF24",strokeWidth:2,stroke:C.cardBg}} activeDot={{r:7,stroke:"#FBBF24",strokeWidth:2,fill:C.cardBg}}/>
            </AreaChart>
          </ResponsiveContainer>
          <div className="pp-rating-months" style={{display:"flex",gap:0,marginTop:12,borderTop:`1px solid ${C.g100}`,paddingTop:12}}>
            {ratingTrendData.map((d,i)=><div key={d.m} style={{flex:1,textAlign:"center",padding:"4px 0",borderRight:i<ratingTrendData.length-1?`1px solid ${C.g100}`:"none"}}>
              <div style={{fontSize:9,color:C.g400,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em"}}>{d.m}</div>
              <div style={{fontSize:15,fontWeight:800,color:C.g800,margin:"2px 0",fontFamily:numFont}}>{d.avg}</div>
              <div style={{display:"flex",justifyContent:"center",gap:1}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<Math.round(d.avg)?"#FBBF24":C.g200,fontSize:8}}>★</span>)}</div>
              <div style={{fontSize:8,color:C.g400,marginTop:1}}>{d.count}</div>
            </div>)}
          </div>
        </>}
      </Card>

      {/* Campus breakdown table */}
      <Card>
        <Sec action={<select value={ratingsCampus} onChange={e=>setRatingsCampus(e.target.value)} style={sel}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.name}>{c.short}</option>)}</select>}>Ratings by Campus</Sec>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Campus","Total Reviews","Avg Rating","Trend (3mo)","Positive","Needs Attn",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{campuses.map((c,i)=>{
            const cr=ratingsData.filter(r=>r.campus===c.name);const cAvg=cr.length?(cr.reduce((s,r)=>s+r.rating,0)/cr.length).toFixed(1):"--";
            const pos=cr.filter(r=>r.sentiment==="positive").length;const neg=cr.filter(r=>r.sentiment==="negative").length;
            return <tr key={c.id} style={{background:i%2===0?C.g50:C.cardBg}}>
              <td style={{...TD,fontWeight:600,color:C.g700}}>{c.name}</td>
              <td style={TD}>{cr.length}</td>
              <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:800,color:parseFloat(cAvg)>=4?C.green:parseFloat(cAvg)>=3?C.orange:C.red}}>{cAvg}</span>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<Math.round(parseFloat(cAvg)||0)?"#FBBF24":C.g300,fontSize:12}}>★</span>)}</div></td>
              <td style={TD}><span style={{fontSize:12,fontWeight:700,color:[C.green,C.green,C.green,C.orange,C.orange][i]}}>{["↑ +0.3","↑ +0.1","↑ +0.2","- 0.0","↓ -0.1"][i]}</span></td>
              <td style={TD}><span style={{background:C.greenL,color:C.green,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}}>{pos}</span></td>
              <td style={TD}>{neg>0?<span style={{background:C.redL,color:C.red,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}}>{neg}</span>:<span style={{color:C.g300}}>--</span>}</td>
              <td style={TD}><button onClick={()=>{setRatingsCampus(c.name);setRatingsView("reviews")}} style={{...btnO,padding:"4px 10px",fontSize:11,color:C.blue,borderColor:`${C.blue}40`}}>View Reviews</button></td>
            </tr>})}</tbody>
        </table>
      </Card>

      {/* Individual Reviews Feed */}
      {ratingsView==="reviews"&&<><Div>Reviews</Div><Card>
        <Sec action={<div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>{[["all","All"],["positive","Positive"],["mixed","Mixed"],["negative","Needs Attn"]].map(([k,l])=><button key={k} onClick={()=>setRatingSentiment(k)} style={pill(ratingSentiment===k)}>{l}</button>)}</div>
        </div>}>Individual Reviews ({filteredRatings.length})</Sec>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {filteredRatings.map((r,i)=><div key={r.id} style={{padding:"16px 0",borderBottom:i<filteredRatings.length-1?`1px solid ${C.g100}`:"none"}}>
            {/* Review header row */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",flex:1}}>
                <div style={{width:40,height:40,borderRadius:12,background:r.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13,flexShrink:0}}>{r.photo}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:14,fontWeight:700,color:C.g800}}>{r.user}</span>
                    <span style={{background:sentimentColors[r.sentiment]+"18",color:sentimentColors[r.sentiment],padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{r.sentiment==="negative"?"Needs Follow-up":r.sentiment}</span>
                  </div>
                  <div style={{fontSize:12,color:C.g500,marginTop:2}}>{r.asset} - {r.campus}</div>
                  <div style={{margin:"6px 0"}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<r.rating?"#FBBF24":C.g300,fontSize:15}}>★</span>)}</div>
                  <div style={{fontSize:13,color:C.g700,lineHeight:1.55,fontStyle:"italic"}}>"{r.comment}"</div>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:11,color:C.g400}}>{r.date}</div>
                <button onClick={()=>setExpandedReview(expandedReview===r.id?null:r.id)} style={{marginTop:6,background:expandedReview===r.id?C.blue:C.blueL,color:expandedReview===r.id?"#fff":C.blue,border:`1px solid ${expandedReview===r.id?C.blue:`${C.blue}30`}`,borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}><span style={{fontSize:12}}>{expandedReview===r.id?I.x(11,"#fff"):I.user(11,C.blue)}</span>{expandedReview===r.id?"Close":"Contact & Follow-up"}</button>
              </div>
            </div>
            {/* Expanded contact/follow-up card */}
            {expandedReview===r.id&&<div style={{marginTop:12,marginLeft:52,padding:"14px 18px",background:`linear-gradient(135deg,${C.g50},${C.blueL}40)`,borderRadius:12,border:`1px solid ${C.g200}`,display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start"}}>
              <div style={{flex:1,minWidth:180}}>
                <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Contact for Follow-up</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {[[I.user(12,C.g500),`${r.contact}`,C.g700],[I.mail(12,C.blue),r.email,C.blue],[I.phone(12,C.g500),r.phone,C.g700]].map(([ic,v,c],j)=><div key={j} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:12}}>{ic}</span>
                    <span style={{fontSize:13,fontWeight:600,color:c}}>{v}</span>
                  </div>)}
                </div>
              </div>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Renter Profile</div>
                <div style={{fontSize:12,color:C.g600}}><span style={{fontWeight:700}}>{r.booked}</span> total bookings</div>
                <div style={{fontSize:12,color:C.g600,marginTop:2}}>Active since {topCustData.find(c=>c.n===r.user)?.since||"2025"}</div>
              </div>
              <div style={{display:"flex",gap:8,alignSelf:"center"}}>
                <button style={{...btnP,fontSize:12,padding:"7px 14px"}}>{I.mail(12,"#fff")} Email</button>
                <button style={{...btnO,fontSize:12,padding:"7px 14px",color:C.blue,borderColor:`${C.blue}40`}}>{I.phone(12,C.blue)} Call</button>
                {r.sentiment==="negative"&&<button style={{background:C.red,color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>{I.flag(12,"#fff")} Flag Issue</button>}
              </div>
            </div>}
          </div>)}
        </div>
        {filteredRatings.length===0&&<Empty icon={I.chart(22,C.g300)} title="No reviews match" desc="Try adjusting your campus or sentiment filters." action="Clear Filters" onAction={()=>{setRatingSentiment("all");setRatingsCampus("all")}}/>}
      </Card></>}

      {/* Negative reviews summary - always visible on overview */}
      {ratingsView==="overview"&&ratingsData.filter(r=>r.rating<=2).length>0&&<><Div>Action Required</Div><Card style={{border:`1px solid ${C.red}20`,background:`linear-gradient(135deg,${C.red}04,${C.cardBg})`}}>
        <Sec action={<button onClick={()=>{setRatingSentiment("negative");setRatingsView("reviews")}} style={{...btnO,fontSize:12,padding:"6px 14px",color:C.red,borderColor:`${C.red}40`}}>View All →</button>}>Reviews Requiring Attention</Sec>
        {ratingsData.filter(r=>r.rating<=2).map(r=><div key={r.id} style={{padding:"14px 0",borderBottom:`1px solid ${C.g100}`,display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.red+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.alert(16,C.red)}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <span style={{fontSize:13,fontWeight:700,color:C.g800}}>{r.user}</span>
                <span style={{fontSize:12,color:C.g400,marginLeft:8}}>rated {r.asset}</span>
                <span style={{marginLeft:6}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<r.rating?"#FBBF24":C.g300,fontSize:12}}>★</span>)}</span>
              </div>
              <span style={{fontSize:11,color:C.g400}}>{r.date}</span>
            </div>
            <div style={{fontSize:12,color:C.g600,marginTop:4,fontStyle:"italic",lineHeight:1.5}}>"{r.comment}"</div>
            <div style={{display:"flex",gap:12,marginTop:8,fontSize:11,color:C.g500,alignItems:"center"}}>
              <span style={{display:"flex",alignItems:"center",gap:3}}>{I.user(11,C.g400)} {r.contact}</span><span style={{display:"flex",alignItems:"center",gap:3}}>{I.mail(11,C.g400)} {r.email}</span><span style={{display:"flex",alignItems:"center",gap:3}}>{I.phone(11,C.g400)} {r.phone}</span>
            </div>
          </div>
        </div>)}
      </Card></>}
    </>}

    {rt===1&&<RevByCampus/>}
    {rt===2&&<RevByFacility/>}
    {rt===3&&<RevByParticipant/>}
    {rt===4&&<PayoutsReport/>}

    {/* BULK PAYMENTS TAB */}
    {rt===5&&<>{(()=>{
      const filtered=payStatusFilt==="all"?paymentsData:paymentsData.filter(p=>p.status===payStatusFilt);
      const totalRev=paymentsData.reduce((s,p)=>s+p.rev,0);
      const completedRev=paymentsData.filter(p=>p.status==="completed").reduce((s,p)=>s+p.rev,0);
      const failedRev=paymentsData.filter(p=>p.status==="failed").reduce((s,p)=>s+p.rev,0);
      const pendingRev=paymentsData.filter(p=>p.status==="pending").reduce((s,p)=>s+p.rev,0);
      return <>
        <div style={{padding:"14px 18px",background:`${C.blue}06`,borderRadius:10,border:`1px solid ${C.blue}15`,marginBottom:16}}>
          <div style={{fontSize:12,color:C.g500,lineHeight:1.6}}>Bulk payments are created when an organization books a facility for multiple days or extended hours at a negotiated rate. These may differ from the standard hourly rate.</div>
        </div>

        {/* Summary stats row */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
          <div style={{display:"flex",gap:0,background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:R.lg,overflow:"hidden"}}>
            {[["Total Processed","$"+totalRev.toLocaleString(),C.g800],["Completed","$"+completedRev.toLocaleString(),C.green],["Pending","$"+pendingRev.toLocaleString(),C.amber],["Failed","$"+failedRev.toLocaleString(),C.red]].map(([l,v,clr],i,arr)=><div key={l} style={{padding:"12px 20px",textAlign:"center",borderRight:i<arr.length-1?`1px solid ${C.cardBorder}`:"none"}}>
              <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
              <div style={{fontSize:18,fontWeight:800,color:clr,marginTop:3,fontFamily:numFont}}>{v}</div>
            </div>)}
          </div>
        </div>

        {/* Volume chart */}
        <Card style={{marginBottom:16}}><Sec>Monthly Volume</Sec>
          <ResponsiveContainer width="100%" height={180}><BarChart data={[{m:"Sep",v:4200,f:180},{m:"Oct",v:5800,f:0},{m:"Nov",v:6100,f:220},{m:"Dec",v:3900,f:0},{m:"Jan",v:8200,f:475},{m:"Feb",v:5100,f:0}]} margin={{left:-10}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/>
            <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:numFont}}/>
            <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:numFont}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="v" name="Completed" fill={C.green} radius={[4,4,0,0]} barSize={16}/>
            <Bar dataKey="f" name="Failed" fill={C.red} radius={[4,4,0,0]} barSize={16}/>
          </BarChart></ResponsiveContainer>
        </Card>

        {/* Filters */}
        <div className="pp-pay-filters" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:14}}>
          <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>
            {["all","completed","pending","failed"].map(s=><button key={s} onClick={()=>setPayStatusFilt(s)} style={pill(payStatusFilt===s)}>{s==="all"?"All":s.charAt(0).toUpperCase()+s.slice(1)}</button>)}
          </div>
          <input type="text" placeholder="Search organization..." style={{padding:"8px 14px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:12,fontFamily:font,width:190,background:C.g50,color:C.g700,boxSizing:"border-box"}}/>
        </div>

        {/* Transactions table */}
        <Card np><div className="pp-table-wrap"><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Date","Facility","Organization","Bookings","Amount","Status"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{filtered.length===0?<tr><td colSpan={6}><Empty icon={I.wallet(22,C.g300)} title="No transactions found" desc="No bulk payments match the current filter." action="Show All" onAction={()=>setPayStatusFilt("all")}/></td></tr>:filtered.map((p,i)=><tr key={i} onClick={()=>globalSetShowPay(p)} style={{background:i%2===0?C.g50:C.cardBg,cursor:"pointer",transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.g50:C.cardBg}>
            <td style={{...TD,color:C.g500}}><div style={{fontWeight:600,color:C.g700}}>{p.date}</div><div style={{fontSize:11}}>{p.time}</div></td>
            <td style={{...TD,color:C.g500,fontSize:12}}>{p.fac}</td>
            <td style={{...TD,fontWeight:600,color:C.g700}}>{p.user}</td>
            <td style={{...TD,color:C.g600,fontFamily:numFont}}>{p.count} ({p.dur})</td>
            <td style={{...TD,fontWeight:700,fontFamily:numFont}}>${p.rev.toFixed(2)}</td>
            <td style={TD}><span style={statusBadge(p.status)}><span style={{width:6,height:6,borderRadius:"50%",background:"currentColor"}}/>{p.status}</span></td>
          </tr>)}</tbody>
        </table></div></Card>
      </>
    })()}</>}
  </div>
}

/* ======== REPORT EXPORT BUTTONS (shared) ======== */
const ExportBtns=()=><div style={{display:"flex",gap:6}}><button style={{...btnO,fontSize:11,padding:"5px 12px"}}>Export CSV</button><button style={{...btnO,fontSize:11,padding:"5px 12px"}}>Export PDF</button></div>;

/* ======== REVENUE - CAMPUS ======== */
const campusRevDetail=[
  {id:"dths",name:"Dutchtown High School",short:"Dutchtown HS",rev:21900,bookings:62,assets:3,util:68,avgRate:353,topAsset:"Dutchtown Gymnasium",topRev:18296,trend:"up",trendPct:"+22%",color:"#0076BB",monthly:[2800,4200,3600,2100,5800,3400]},
  {id:"eahs",name:"East Ascension High School",short:"East Ascension HS",rev:16100,bookings:48,assets:3,util:52,avgRate:335,topAsset:"Spartan Stadium",topRev:14700,trend:"up",trendPct:"+14%",color:"#00A84F",monthly:[2100,3100,2700,1600,4100,2500]},
  {id:"sahs",name:"St. Amant High School",short:"St. Amant HS",rev:12700,bookings:35,assets:2,util:58,avgRate:363,topAsset:"St. Amant Gymnasium",topRev:11865,trend:"stable",trendPct:"+3%",color:"#F59E0B",monthly:[1500,2200,1800,1200,2400,1600]},
  {id:"phs",name:"Prairieville High School",short:"Prairieville HS",rev:9850,bookings:28,assets:2,util:55,avgRate:352,topAsset:"Prairieville Gymnasium",topRev:9450,trend:"up",trendPct:"+31%",color:"#7C3AED",monthly:[900,1100,1000,600,1400,850]},
  {id:"dohs",name:"Donaldsonville High School",short:"Donaldsonville HS",rev:3461,bookings:19,assets:2,util:31,avgRate:182,topAsset:"Tiger Stadium",topRev:2436,trend:"down",trendPct:"-8%",color:"#F15A29",monthly:[550,640,580,340,520,411]},
];
function RevByCampus(){
  const [expanded,setExpanded]=useState(null);
  const totalRev=campusRevDetail.reduce((s,c)=>s+c.rev,0);
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <Div>Summary</Div>
    <div className="pp-report-stat-row" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Revenue</div><div style={{fontSize:24,fontWeight:900,color:C.g800,marginTop:4}}>${totalRev.toLocaleString()}</div></Card>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Bookings</div><div style={{fontSize:24,fontWeight:900,color:C.g800,marginTop:4}}>{campusRevDetail.reduce((s,c)=>s+c.bookings,0)}</div></Card>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Avg Utilization</div><div style={{fontSize:24,fontWeight:900,color:C.g800,marginTop:4}}>{Math.round(campusRevDetail.reduce((s,c)=>s+c.util,0)/5)}%</div></Card>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Avg / Booking</div><div style={{fontSize:24,fontWeight:900,color:C.g800,marginTop:4}}>${Math.round(totalRev/campusRevDetail.reduce((s,c)=>s+c.bookings,0))}</div></Card>
    </div>
    <Div>Revenue Breakdown</Div>
    <Card><Sec>Revenue by Campus (6 Months)</Sec>
      <ResponsiveContainer width="100%" height={320}><BarChart data={revByFacData} margin={{bottom:20}}><CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,fontFamily:font,paddingTop:16,color:C.g500}} iconSize={10} iconType="square"/><Bar dataKey="dt" name="Dutchtown" fill="#0076BB" radius={[3,3,0,0]} barSize={12}/><Bar dataKey="ea" name="East Ascension" fill="#00A84F" radius={[3,3,0,0]} barSize={12}/><Bar dataKey="sa" name="St. Amant" fill="#F59E0B" radius={[3,3,0,0]} barSize={12}/><Bar dataKey="pv" name="Prairieville" fill="#7C3AED" radius={[3,3,0,0]} barSize={12}/><Bar dataKey="dn" name="Donaldsonville" fill="#F15A29" radius={[3,3,0,0]} barSize={12}/></BarChart></ResponsiveContainer>
    </Card>
    <Div>Campus Detail</Div>
    <Card><Sec>Campus Detail</Sec>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["","Campus","Revenue","Bookings","Assets","Utilization","Avg Rate","Top Asset","Trend",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{campusRevDetail.map((c,i)=><React.Fragment key={c.id}>
          <tr style={{background:i%2===0?C.g50:C.cardBg,cursor:"pointer"}} onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
            <td style={{...TD,width:14}}><span style={{width:10,height:10,borderRadius:5,background:c.color,display:"inline-block"}}/></td>
            <td style={{...TD,fontWeight:700,color:C.g700}}>{c.name}</td>
            <td style={{...TD,fontWeight:800}}>${c.rev.toLocaleString()}</td>
            <td style={TD}>{c.bookings}</td>
            <td style={TD}>{c.assets}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:50,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${c.util}%`,height:"100%",background:c.util>=60?C.green:c.util>=40?C.orange:C.red,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700}}>{c.util}%</span></div></td>
            <td style={TD}>${c.avgRate}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{c.topAsset}</td>
            <td style={TD}><span style={{fontSize:12,fontWeight:700,color:C.g800}}>{c.trend==="up"?"↑":"↓"} {c.trendPct}</span></td>
            <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===c.id?C.blue:C.g100,color:expanded===c.id?"#fff":C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===c.id?"−":"+"}</div></td>
          </tr>
          {expanded===c.id&&<tr><td colSpan={10} style={{padding:"0 14px 14px",background:C.blueL+"30"}}>
            <div style={{padding:"16px 20px",background:C.cardBg,borderRadius:10,border:`1px solid ${C.cardBorder}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:12}}>Monthly Revenue Breakdown - {c.short}</div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>{["Sep","Oct","Nov","Dec","Jan","Feb"].map((m,mi)=><div key={m} style={{flex:1,textAlign:"center",padding:"10px 6px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`}}>
                <div style={{fontSize:10,color:C.g400,fontWeight:700}}>{m}</div>
                <div style={{fontSize:15,fontWeight:800,color:C.g800,marginTop:2}}>${(c.monthly[mi]/1000).toFixed(1)}k</div>
              </div>)}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
                {[["Top Earning Asset",c.topAsset],["Top Asset Revenue","$"+c.topRev.toLocaleString()],["Revenue Per Asset","$"+Math.round(c.rev/c.assets).toLocaleString()],["Peak Month",["Sep","Oct","Nov","Dec","Jan","Feb"][c.monthly.indexOf(Math.max(...c.monthly))]]].map(([l,v])=><div key={l}><div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:C.g800,marginTop:2}}>{v}</div></div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table>
    </Card>
  </div>
}

/* ======== REVENUE - FACILITY ======== */
const facilityRevDetail=[
  {a:"Dutchtown Gymnasium",c:"Dutchtown HS",ci:"dths",rev:18296,bookings:42,util:68,avgRate:436,topParticipant:"Bayou City Volleyball",topRev:6840,pct:30,color:"#0076BB",types:{volleyball:8400,basketball:4200,cheer:3600,other:2096}},
  {a:"Spartan Stadium",c:"East Ascension HS",ci:"eahs",rev:14700,bookings:22,util:52,avgRate:668,topParticipant:"River Parish Runners",topRev:1845,pct:24,color:"#00A84F",types:{track:5200,football:4800,soccer:2700,other:2000}},
  {a:"St. Amant Gymnasium",c:"St. Amant HS",ci:"sahs",rev:11865,bookings:30,util:58,avgRate:396,topParticipant:"Ascension Elite Cheer",topRev:4380,pct:19,color:"#F59E0B",types:{cheer:5400,basketball:3200,dance:2100,other:1165}},
  {a:"Prairieville Gymnasium",c:"Prairieville HS",ci:"phs",rev:9450,bookings:28,util:55,avgRate:338,topParticipant:"Gonzales FC",topRev:5274,pct:15,color:"#7C3AED",types:{soccer:5274,basketball:2100,other:2076}},
  {a:"Gator Stadium",c:"St. Amant HS",ci:"sahs",rev:3200,bookings:10,util:31,avgRate:320,topParticipant:"River Parish Runners",topRev:1845,pct:5,color:"#F59E0B",types:{track:2200,other:1000}},
  {a:"Tiger Stadium",c:"Donaldsonville HS",ci:"dohs",rev:2436,bookings:14,util:38,avgRate:174,topParticipant:"Community Youth BBall",topRev:960,pct:4,color:"#F15A29",types:{football:1200,basketball:960,other:276}},
  {a:"Dutchtown Stadium",c:"Dutchtown HS",ci:"dths",rev:1064,bookings:6,util:18,avgRate:177,topParticipant:"Gonzales FC",topRev:475,pct:2,color:"#0076BB",types:{football:600,other:464}},
];
function RevByFacility(){
  const [locFilt,setLocFilt]=useState("all");
  const [expanded,setExpanded]=useState(null);
  const filtered=locFilt==="all"?facilityRevDetail:facilityRevDetail.filter(f=>f.c===locFilt);
  const totalRev=filtered.reduce((s,f)=>s+f.rev,0);const totalBook=filtered.reduce((s,f)=>s+f.bookings,0);
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <Div>Filters</Div>
    <Card>
      <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
        <div style={{flex:1}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Campus</div>
          <select value={locFilt} onChange={e=>setLocFilt(e.target.value)} style={{...sel,width:"100%"}}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.short}>{c.short}</option>)}</select></div>
        <button style={{...btnP,height:38,flexShrink:0,whiteSpace:"nowrap"}}>Search</button>
      </div>
    </Card>
    <Div>Summary</Div>
    <div className="pp-report-stat-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Reservations</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>{totalBook}</div></Card>
      <Card style={{textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Revenue</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>${totalRev.toLocaleString()}</div></Card>
    </div>
    <Div>Results</Div>
    <Card>
      <div className="pp-report-results-hdr" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,gap:8,flexWrap:"wrap"}}><div><span style={{fontSize:15,fontWeight:800,color:C.g800}}>Results Found: {filtered.length}</span></div></div>
      <div className="pp-table-wrap"><table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:700}}><thead><tr>{["Facility","Campus","Bookings","Revenue","Utilization","Avg Rate","Top Participant","% of Total",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{filtered.map((f,i)=><React.Fragment key={f.a}>
          <tr style={{background:i%2===0?C.g50:C.cardBg,cursor:"pointer"}} onClick={()=>setExpanded(expanded===f.a?null:f.a)}>
            <td style={{...TD,fontWeight:600,color:C.g700}}>{f.a}</td>
            <td style={{...TD,color:C.g500,fontSize:12}}>{f.c}</td>
            <td style={{...TD,fontWeight:700}}>{f.bookings}</td>
            <td style={{...TD,fontWeight:800}}>${f.rev.toLocaleString()}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:50,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${f.util}%`,height:"100%",background:f.util>=60?C.green:f.util>=40?C.orange:C.red,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700}}>{f.util}%</span></div></td>
            <td style={TD}>${f.avgRate}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{f.topParticipant}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:60,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${f.pct}%`,height:"100%",background:f.color,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700,color:C.g600}}>{f.pct}%</span></div></td>
            <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===f.a?C.blue:C.g100,color:expanded===f.a?"#fff":C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===f.a?"−":"+"}</div></td>
          </tr>
          {expanded===f.a&&<tr><td colSpan={9} style={{padding:"0 14px 14px",background:C.blueL+"30"}}>
            <div style={{padding:"16px 20px",background:C.cardBg,borderRadius:10,border:`1px solid ${C.cardBorder}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:12}}>Revenue by Activity Type - {f.a}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>{Object.entries(f.types).map(([type,rev])=><div key={type} style={{padding:"10px 16px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`,flex:"1 1 120px",minWidth:100}}>
                <div style={{fontSize:10,color:C.g400,fontWeight:700,textTransform:"capitalize"}}>{type}</div>
                <div style={{fontSize:16,fontWeight:800,color:C.g800,marginTop:2}}>${rev.toLocaleString()}</div>
                <div style={{fontSize:10,color:C.g500}}>{Math.round(rev/f.rev*100)}% of facility</div>
              </div>)}</div>
              <div className="pp-report-stat-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
                {[["Top Participant",f.topParticipant],["Participant Revenue","$"+f.topRev.toLocaleString()],["Revenue Per Booking","$"+f.avgRate],["Capacity Utilization",f.util+"%"]].map(([l,v])=><div key={l}><div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:C.g800,marginTop:2}}>{v}</div></div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table></div>
    </Card>
  </div>
}

/* ======== REVENUE - PARTICIPANT ======== */
function RevByParticipant(){
  const [partFilt,setPartFilt]=useState("all");
  const [expanded,setExpanded]=useState(null);
  const filtered=partFilt==="all"?topCustData:topCustData.filter(c=>c.n===partFilt);
  const totalRev=filtered.reduce((s,c)=>s+c.s,0);const totalBook=filtered.reduce((s,c)=>s+c.b,0);
  const partColors=["#0076BB","#00A84F","#F59E0B","#7C3AED","#F15A29","#EC4899","#06B6D4"];
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <Div>Filters</Div>
    <Card>
      <div className="pp-report-filter-bar" style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:12,alignItems:"end"}}>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>From</div>
          <input type="text" defaultValue="October 09, 2025" style={{...sel,width:"100%"}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>To</div>
          <input type="text" defaultValue="February 06, 2026" style={{...sel,width:"100%"}} readOnly/></div>
        <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Participant</div>
          <div style={{display:"flex",gap:8}}><select value={partFilt} onChange={e=>setPartFilt(e.target.value)} style={{...sel,flex:1}}><option value="all">All Participants</option>{topCustData.map(c=><option key={c.n} value={c.n}>{c.n}</option>)}</select>
          <button style={{...btnP,height:38}}>Search</button></div></div>
      </div>
    </Card>

    <Div>Summary</Div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
      {[["Total Reservations",totalBook,C.g800,null],["Total Revenue",`$${totalRev.toLocaleString()}`,C.g800,null],["Avg per Booking",`$${totalBook?Math.round(totalRev/totalBook):0}`,C.blue,null],["Active Participants",filtered.length,C.green,null]].map(([l,v,clr])=><Card key={l} style={{textAlign:"center",padding:"18px 14px"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
        <div style={{fontSize:26,fontWeight:900,color:clr,marginTop:6,fontFamily:numFont}}>{v}</div>
      </Card>)}
    </div>

    <Div>Participant Breakdown</Div>
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"baseline",gap:10}}>
          <span style={{fontSize:15,fontWeight:800,color:C.g800}}>Participant Breakdown</span>
          <span style={{fontSize:12,color:C.g400}}>{filtered.length} {filtered.length===1?"result":"results"}</span>
        </div>
      </div>
      <div className="pp-table-wrap">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:800}}>
        <thead><tr>
          {["Participant","Bookings","Total Revenue","Avg / Booking","Favorite Facility","Since","Trend",""].map(h=><th key={h} style={{...TH,padding:"10px 12px"}}>{h}</th>)}
        </tr></thead>
        <tbody>{filtered.map((c,i)=>{const pClr=partColors[i%partColors.length];return <React.Fragment key={c.n}>
          <tr style={{background:i%2===0?C.g50:C.cardBg,cursor:"pointer",transition:"background .12s"}} onClick={()=>setExpanded(expanded===c.n?null:c.n)} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.g50:C.cardBg}>
            <td style={{...TD,padding:"12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:10,background:pClr,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:11,flexShrink:0}}>{c.photo}</div>
                <div>
                  <div style={{fontWeight:700,color:C.g800,fontSize:13}}>{c.n}</div>
                  <div style={{fontSize:11,color:C.g400,marginTop:1}}>{c.email}</div>
                </div>
              </div>
            </td>
            <td style={{...TD,padding:"12px"}}><span style={{fontWeight:700,fontSize:14}}>{c.b}</span></td>
            <td style={{...TD,padding:"12px"}}><span style={{fontWeight:800,fontSize:14,color:C.g800}}>${c.s.toLocaleString()}</span></td>
            <td style={{...TD,padding:"12px",color:C.g600}}>${Math.round(c.s/c.b)}</td>
            <td style={{...TD,padding:"12px",fontSize:12,color:C.g500}}>{c.fav}</td>
            <td style={{...TD,padding:"12px",fontSize:12,color:C.g500}}>{c.since}</td>
            <td style={{...TD,padding:"12px"}}>{c.t==="up"?<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,color:C.green,background:`${C.green}12`,padding:"3px 8px",borderRadius:6}}>↑ Growing</span>:c.t==="down"?<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,color:C.red,background:`${C.red}10`,padding:"3px 8px",borderRadius:6}}>↓ Declining</span>:<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,color:C.g400,background:C.g100,padding:"3px 8px",borderRadius:6}}>- Stable</span>}</td>
            <td style={{...TD,padding:"12px 10px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===c.n?pClr:C.g100,color:expanded===c.n?"#fff":C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===c.n?"−":"+"}</div></td>
          </tr>
          {expanded===c.n&&<tr><td colSpan={8} style={{padding:"0 12px 14px",background:`${pClr}08`}}>
            <div style={{padding:"18px 22px",background:C.cardBg,borderRadius:12,border:`1px solid ${C.cardBorder}`,boxShadow:`0 2px 8px rgba(0,0,0,${C.bg==="#0F1318"?0.15:0.04})`}}>
              {/* Booking History header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:C.g800}}>Booking History</div>
                <div style={{display:"flex",gap:6}}>
                  <button style={{...btnP,fontSize:11,padding:"6px 14px"}}>{I.mail(11,"#fff")} Email</button>
                  <button style={{...btnO,fontSize:11,padding:"6px 14px",color:pClr,borderColor:`${pClr}40`}}>{I.phone(11,pClr)} Call</button>
                </div>
              </div>
              {/* Booking table */}
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,marginBottom:16}}>
                <thead><tr>{["Res ID","Asset","Date","Time","Revenue"].map(h=><th key={h} style={{...TH,fontSize:9,padding:"8px 10px"}}>{h}</th>)}</tr></thead>
                <tbody>{c.hist.map((h,hi)=><tr key={h.id} style={{background:hi%2===0?C.g50:C.cardBg}}>
                  <td style={{...TD,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:pClr,fontWeight:700}}>{h.id}</td>
                  <td style={{...TD,padding:"8px 10px",fontWeight:600,color:C.g700}}>{h.asset}</td>
                  <td style={{...TD,padding:"8px 10px",color:C.g500}}>{h.date}</td>
                  <td style={{...TD,padding:"8px 10px",color:C.g500}}>{h.time}</td>
                  <td style={{...TD,padding:"8px 10px",fontWeight:700}}>${h.rev}</td>
                </tr>)}</tbody>
              </table>
              {/* Contact details grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14,padding:"14px 16px",background:C.g50,borderRadius:8,border:`1px solid ${C.g100}`}}>
                {[["Contact Email",c.email],["Phone",c.phone],["Favorite Facility",c.fav],["Member Since",c.since]].map(([l,v])=><div key={l}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
                  <div style={{fontSize:12,fontWeight:600,color:C.g700,marginTop:3}}>{v}</div>
                </div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>})}</tbody>
      </table>
      </div>
    </Card>
  </div>
}

/* ======== PAYOUTS REPORT (full transaction-level detail) ======== */
function PayoutsReport(){
  const [locFilt,setLocFilt]=useState("all");
  const [assetFilt,setAssetFilt]=useState("all");
  const [statusFilt,setStatusFilt]=useState("all");
  const [expandedTxn,setExpandedTxn]=useState(null);
  const [perPage,setPerPage]=useState(10);

  const filtered=txnData.filter(t=>{
    if(locFilt!=="all"&&t.facility!==locFilt)return false;
    if(assetFilt!=="all"&&t.asset!==assetFilt)return false;
    if(statusFilt!=="all"&&t.status!==statusFilt)return false;
    return true;
  });
  const totalAmt=filtered.reduce((s,t)=>s+t.amount,0);
  const successAmt=filtered.filter(t=>t.status==="success").reduce((s,t)=>s+t.amount,0);
  const failedAmt=filtered.filter(t=>t.status==="failed").reduce((s,t)=>s+t.amount,0);
  const shown=filtered.slice(0,perPage);
  const allAssets=[...new Set(txnData.map(t=>t.asset))];

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <Div>Filters</Div>
    <Card>
      <div className="pp-report-filter-bar" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,alignItems:"end"}}>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Campus</div>
          <select value={locFilt} onChange={e=>{setLocFilt(e.target.value);setAssetFilt("all")}} style={{...sel,width:"100%"}}><option value="all">All</option>{campuses.map(c=><option key={c.id} value={c.name}>{c.short}</option>)}</select></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Asset</div>
          <select value={assetFilt} onChange={e=>setAssetFilt(e.target.value)} style={{...sel,width:"100%"}}><option value="all">{locFilt==="all"?"All Assets":"All"}</option>{(locFilt==="all"?allAssets:allAssets.filter(a=>txnData.some(t=>t.asset===a&&t.facility===locFilt))).map(a=><option key={a} value={a}>{a}</option>)}</select></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>From</div>
          <input type="text" defaultValue="Oct 09, 2025" style={{...sel,width:"100%",cursor:"text"}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>To</div>
          <input type="text" defaultValue="Feb 06, 2026" style={{...sel,width:"100%",cursor:"text"}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Status</div>
          <select value={statusFilt} onChange={e=>setStatusFilt(e.target.value)} style={{...sel,width:"100%"}}><option value="all">All</option><option value="success">Success</option><option value="failed">Failed</option></select></div>
        <button style={{...btnP,height:38,width:"100%"}}>Search</button>
      </div>
    </Card>

    <Div>Summary</Div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
      <Card style={{padding:"20px 18px",background:`linear-gradient(135deg,${C.blue}08,${C.cardBg})`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Transactions</div>
        <div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:6}}>{filtered.length}</div>
        <div style={{fontSize:11,color:C.g400,marginTop:4}}>{filtered.filter(t=>t.status==="success").length} successful</div>
      </Card>
      <Card style={{padding:"20px 18px",background:`linear-gradient(135deg,${C.green}06,${C.cardBg})`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Gross Revenue</div>
        <div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:6}}>${totalAmt.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:600,marginTop:4}}>5% transaction fee</div>
      </Card>
      <Card style={{padding:"20px 18px"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Net to District</div>
        <div style={{fontSize:28,fontWeight:900,color:C.green,marginTop:6}}>${(successAmt*0.95).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div style={{fontSize:11,color:C.g400,marginTop:4}}>After fees</div>
      </Card>
      {failedAmt>0&&<Card style={{padding:"20px 18px",border:`1px solid ${C.red}20`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.06em"}}>Failed / At Risk</div>
        <div style={{fontSize:28,fontWeight:900,color:C.red,marginTop:6}}>${failedAmt.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div style={{fontSize:11,color:C.g400,marginTop:4}}>Requires attention</div>
      </Card>}
    </div>

    {/* Monthly payout summary */}
    <Div>Monthly Payouts</Div>
    <Card>
      <Sec>Monthly Payout Summary</Sec>
      <div className="pp-table-wrap">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:600}}>
        <thead><tr>{["Month","Gross Amount","Fee (5%)","Net Payout","Transactions","Status","Deposit Date"].map(h=><th key={h} style={{...TH,padding:"10px 12px"}}>{h}</th>)}</tr></thead>
        <tbody>{payoutsData.map((p,i)=>{const txnCount=[4,5,3,8,6][i]||0;const fee=p.total*0.05;const net=p.total-fee;
          return <tr key={p.month} style={{background:i%2===0?C.g50:C.cardBg}}>
          <td style={{...TD,padding:"12px",fontWeight:700,color:C.g800}}>{p.month}</td>
          <td style={{...TD,padding:"12px",fontWeight:600}}>${p.total.toLocaleString()}</td>
          <td style={{...TD,padding:"12px",color:C.g400,fontSize:12}}>-${fee.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
          <td style={{...TD,padding:"12px",fontWeight:800,color:C.green}}>${net.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
          <td style={{...TD,padding:"12px",textAlign:"center"}}>{txnCount}</td>
          <td style={{...TD,padding:"12px"}}><span style={{...statusBadge(p.status==="paid"?"completed":p.status),fontSize:10}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{p.status==="paid"?"Deposited":p.status}</span></td>
          <td style={{...TD,padding:"12px",color:C.g500,fontSize:12}}>{p.date}</td>
        </tr>})}</tbody>
        <tfoot><tr style={{background:C.g50,borderTop:`2px solid ${C.g200}`}}>
          <td style={{...TD,padding:"12px",fontWeight:800,color:C.g800}}>Total</td>
          <td style={{...TD,padding:"12px",fontWeight:800}}>${payoutsData.reduce((s,p)=>s+p.total,0).toLocaleString()}</td>
          <td style={{...TD,padding:"12px",fontWeight:600,color:C.g400}}>-${(payoutsData.reduce((s,p)=>s+p.total,0)*0.05).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
          <td style={{...TD,padding:"12px",fontWeight:800,color:C.green}}>${(payoutsData.reduce((s,p)=>s+p.total,0)*0.95).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
          <td style={{...TD,padding:"12px",textAlign:"center",fontWeight:700}}>{[4,5,3,8,6].reduce((a,b)=>a+b,0)}</td>
          <td colSpan={2}/>
        </tr></tfoot>
      </table>
      </div>
    </Card>

    <Div>Transaction Detail</Div>
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"baseline",gap:10}}>
          <span style={{fontSize:15,fontWeight:800,color:C.g800}}>Transaction Details</span>
          <span style={{fontSize:12,color:C.g400}}>{filtered.length} {filtered.length===1?"transaction":"transactions"}</span>
        </div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:900}}>
          <thead><tr>{["ID","Updated At","Res ID","Asset","Campus","Transfer Date","Amount","Discount","Status",""].map(h=><th key={h} style={{...TH,fontSize:9,padding:"8px 10px"}}>{h}</th>)}</tr></thead>
          <tbody>{shown.map((t,i)=><React.Fragment key={t.id}>
            <tr key={t.id} style={{background:t.status==="failed"?`${C.red}06`:i%2===0?C.g50:C.cardBg,cursor:"pointer"}} onClick={()=>setExpandedTxn(expandedTxn===t.id?null:t.id)}>
              <td style={{...TD,padding:"10px",fontWeight:700,color:C.blue,fontFamily:"monospace",fontSize:11}}>{t.id}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.updatedAt}</td>
              <td style={{...TD,padding:"10px",fontFamily:"monospace",fontSize:10,color:C.g500}}>{t.resId}</td>
              <td style={{...TD,padding:"10px",fontWeight:600,color:C.g700}}>{t.asset}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.facility}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.transferDate}</td>
              <td style={{...TD,padding:"10px",fontWeight:700,color:t.status==="failed"?C.red:C.g800}}>${t.amount.toFixed(2)}</td>
              <td style={{...TD,padding:"10px",color:t.discount!=="N/A"?C.blue:C.g400,fontSize:11,fontWeight:t.discount!=="N/A"?700:400}}>{t.discount}</td>
              <td style={{...TD,padding:"10px"}}><span style={{...statusBadge(t.status==="success"?"completed":"failed"),fontSize:10,padding:"2px 8px"}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{t.status}</span></td>
              <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expandedTxn===t.id?C.blue:C.g100,color:expandedTxn===t.id?"#fff":C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expandedTxn===t.id?"−":"+"}</div></td>
            </tr>
            {expandedTxn===t.id&&<tr key={t.id+"exp"}><td colSpan={10} style={{padding:"0 10px 12px",background:C.blueL+"40"}}>
              <div style={{padding:"14px 18px",borderRadius:10,background:C.cardBg,border:`1px solid ${C.cardBorder}`,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                {[["Destination Account",t.destAcct],["Transfer ID",t.transferId],["Account Payment ID",t.acctPayId],["Payment Intent ID",t.intentId],["Facility",t.facility],["Transfer Date",t.transferDate]].map(([l,v])=><div key={l}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{l}</div>
                  <div style={{fontSize:11,color:C.g700,fontFamily:l.includes("ID")||l.includes("Account")?"monospace":"inherit",wordBreak:"break-all",fontWeight:500}}>{v}</div>
                </div>)}
              </div>
            </td></tr>}
          </React.Fragment>)}</tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14,paddingTop:14,borderTop:`1px solid ${C.g200}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} style={{...sel,padding:"6px 28px 6px 10px",fontSize:12}}><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option></select>
          <span style={{fontSize:11,color:C.g400}}>per page</span>
        </div>
        <div style={{fontSize:12,color:C.g500}}>Showing {Math.min(perPage,filtered.length)} of {filtered.length} transactions</div>
        <div style={{display:"flex",gap:4}}>
          <button style={{...btnO,padding:"5px 10px",fontSize:12}}>‹ Prev</button>
          <button style={{...btnO,padding:"5px 10px",fontSize:12,background:C.blue,color:"#fff",border:"none"}}>1</button>
          {filtered.length>perPage&&<button style={{...btnO,padding:"5px 10px",fontSize:12}}>2</button>}
          {filtered.length>perPage*2&&<button style={{...btnO,padding:"5px 10px",fontSize:12}}>3</button>}
          <button style={{...btnO,padding:"5px 10px",fontSize:12}}>Next ›</button>
        </div>
      </div>
    </Card>
  </div>
}

/* ======== USERS & ROLE MANAGEMENT ======== */
/* District staff only - participants are external and not managed here */
const staffData=[
  {name:"Marcus Williams",email:"m.williams@apsb.org",role:"District Admin",loc:"District Office",campus:"all",status:true,updated:"02/01/2026",initials:"MW",color:C.blue,phone:"(225) 391-7001"},
  {name:"Coach Tony Richard",email:"t.richard@apsb.org",role:"Site Admin",loc:"Dutchtown High School",campus:"dths",status:true,updated:"01/28/2026",initials:"TR",color:C.green,phone:"(225) 391-7145"},
  {name:"Denise Landry",email:"d.landry@apsb.org",role:"Site Admin",loc:"East Ascension High School",campus:"eahs",status:true,updated:"01/25/2026",initials:"DL",color:C.blueDk,phone:"(225) 391-7200"},
  {name:"Coach Ray Bourque",email:"r.bourque@apsb.org",role:"Site Admin",loc:"St. Amant High School",campus:"sahs",status:true,updated:"01/30/2026",initials:"RB",color:C.purple,phone:"(225) 391-7310"},
  {name:"Amy Melancon",email:"a.melancon@apsb.org",role:"Site Admin",loc:"Prairieville High School",campus:"phs",status:true,updated:"02/03/2026",initials:"AM",color:C.blueDk,phone:"(225) 391-7420"},
  {name:"Derek Simmons",email:"d.simmons@apsb.org",role:"Facility Manager",loc:"Donaldsonville High School",campus:"dohs",status:true,updated:"01/20/2026",initials:"DS",color:C.g500,phone:"(225) 391-7500"},
  {name:"Claire Dupuis",email:"c.dupuis@apsb.org",role:"Facility Manager",loc:"Dutchtown High School",campus:"dths",status:true,updated:"02/05/2026",initials:"CD",color:C.green,phone:"(225) 391-7146"},
  {name:"Brad Nguyen",email:"b.nguyen@apsb.org",role:"Read Only",loc:"District Office",campus:"all",status:true,updated:"01/15/2026",initials:"BN",color:C.g400,phone:"(225) 391-7002"},
  {name:"Janet Boudreaux",email:"j.boudreaux@apsb.org",role:"Site Admin",loc:"St. Amant High School",campus:"sahs",status:false,updated:"12/10/2025",initials:"JB",color:C.g400,phone:"(225) 391-7312"},
];
const roleDefinitions=[
  {role:"District Admin",desc:"Full access to all campuses, users, settings, and financial data",color:C.blue,perms:{reservations:["read","create","update","delete"],dashboard:["read","create","update","delete"],facilities:["read","create","update","delete"],organizations:["read","create","update","delete"],reporting:["read","create","update","delete"],users:["read","create","update","delete"],approvals:["read","create","update","delete"],settings:["read","create","update","delete"],payouts:["read","create","update","delete"],roles:["read","create","update","delete"]}},
  {role:"Site Admin",desc:"Full access within assigned campus. Cannot manage other campuses or district settings",color:"#4DA8D8",perms:{reservations:["read","create","update","delete"],dashboard:["read"],facilities:["read","create","update"],organizations:["read"],reporting:["read"],users:["read"],approvals:["read","create","update"],settings:["read"],payouts:["read"],roles:[]}},
  {role:"Facility Manager",desc:"Manage reservations and facility operations at assigned campus. No financial access",color:C.blueDk,perms:{reservations:["read","create","update"],dashboard:["read"],facilities:["read","update"],organizations:["read"],reporting:[],users:[],approvals:["read","create"],settings:[],payouts:[],roles:[]}},
  {role:"Read Only",desc:"View-only access to dashboards and reports. Ideal for board members or oversight",color:C.g400,perms:{reservations:["read"],dashboard:["read"],facilities:["read"],organizations:["read"],reporting:["read"],users:[],approvals:[],settings:[],payouts:["read"],roles:[]}},
];
const permFeatures=["reservations","dashboard","facilities","organizations","reporting","users","approvals","settings","payouts","roles"];
const permLabels={reservations:"Reservations",dashboard:"Dashboard",facilities:"Facilities",organizations:"Organizations",reporting:"Reporting",users:"Users",approvals:"Approvals",settings:"Settings",payouts:"Payouts & Finance",roles:"Role Management"};
const permTypes=["read","create","update","delete"];

function Users(){
  const [search,setSearch]=useState("");
  const [roleFilter,setRoleFilter]=useState("all");
  const [showRoles,setShowRoles]=useState(false);
  const [editRole,setEditRole]=useState(null);
  const [editPerms,setEditPerms]=useState(null);
  const filtered=staffData.filter(u=>{
    const matchSearch=u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole=roleFilter==="all"||u.role===roleFilter;
    return matchSearch&&matchRole;
  });
  const roleBadge=(r)=>{const m={"District Admin":{bg:C.blueL,c:C.blue},"Site Admin":{bg:C.blueL,c:C.blueDk},"Facility Manager":{bg:C.g100,c:C.g600},"Read Only":{bg:C.g100,c:C.g500}};const x=m[r]||m["Read Only"];return{background:x.bg,color:x.c,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}};
  const campusLabel=(c)=>c==="all"?"All Campuses":campuses.find(x=>x.id===c)?.short||c;
  const togglePerm=(feat,perm)=>{if(!editPerms)return;const cur=editPerms[feat]||[];setEditPerms({...editPerms,[feat]:cur.includes(perm)?cur.filter(p=>p!==perm):[...cur,perm]})};

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {/* Role Editor Slideout */}
    {editRole!==null&&<SlidePanel open={true} onClose={()=>{setEditRole(null);setEditPerms(null)}} width={560}>
      <div style={{padding:"24px 30px",borderBottom:`1px solid ${C.g200}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Roles Management &gt; Edit Role</div>
            <div style={{fontSize:20,fontWeight:800,color:C.g800}}>{editRole.role}</div>
            <div style={{fontSize:12,color:C.g500,marginTop:4}}>{editRole.desc}</div>
          </div>
          <button onClick={()=>{setEditRole(null);setEditPerms(null)}} style={{background:C.g100,border:"none",width:32,height:32,borderRadius:8,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,C.g500)}</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:14}}>
          <span style={roleBadge(editRole.role)}>{editRole.role}</span>
          <span style={{fontSize:11,color:C.g400}}>{staffData.filter(s=>s.role===editRole.role).length} staff member{staffData.filter(s=>s.role===editRole.role).length!==1?"s":""} assigned</span>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"0 30px"}}>
        <div style={{padding:"20px 0 10px"}}><div style={{fontSize:14,fontWeight:800,color:C.g800,marginBottom:4}}>Permission Access</div><div style={{fontSize:12,color:C.g400}}>Toggle individual permissions for this role across all features</div></div>
        {/* Permission matrix */}
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 2px",fontSize:12}}>
          <thead><tr>
            <th style={{textAlign:"left",padding:"10px 12px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Feature</th>
            {permTypes.map(p=><th key={p} style={{textAlign:"center",padding:"10px 8px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",width:70}}>{p}</th>)}
          </tr></thead>
          <tbody>{permFeatures.map((feat,fi)=>{
            const perms=editPerms?editPerms[feat]||[]:editRole.perms[feat]||[];
            return <tr key={feat} style={{background:fi%2===0?C.blueL+"40":C.cardBg}}>
              <td style={{padding:"12px",fontWeight:700,color:C.g700,borderRadius:"8px 0 0 8px"}}>{permLabels[feat]}</td>
              {permTypes.map(pt=><td key={pt} style={{textAlign:"center",padding:"8px",...(pt==="delete"?{borderRadius:"0 8px 8px 0"}:{})}}>
                <div onClick={()=>editPerms&&togglePerm(feat,pt)} style={{width:24,height:24,borderRadius:6,border:`2px solid ${perms.includes(pt)?C.green:C.g300}`,background:perms.includes(pt)?C.green:C.cardBg,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:editPerms?"pointer":"default",transition:"all .15s"}}>{perms.includes(pt)&&I.check(14,"#fff")}</div>
              </td>)}
            </tr>})}</tbody>
        </table>
        {/* Assigned staff */}
        <div style={{marginTop:24,paddingBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:10}}>Assigned Staff ({staffData.filter(s=>s.role===editRole.role).length})</div>
          {staffData.filter(s=>s.role===editRole.role).map(s=><div key={s.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:11}}>{s.initials}</div>
              <div><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{s.name}</div><div style={{fontSize:11,color:C.g400}}>{s.loc}</div></div>
            </div>
            <span style={{fontSize:11,color:s.status?C.green:C.g400,fontWeight:600}}>{s.status?"Active":"Inactive"}</span>
          </div>)}
        </div>
      </div>
      <div style={{padding:"16px 30px 24px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:10}}>
        {!editPerms?<button onClick={()=>setEditPerms({...editRole.perms})} style={{...btnP,flex:1,justifyContent:"center"}}>{I.edit(12,"#fff")} Edit Permissions</button>
        :<><button onClick={()=>{setEditPerms(null)}} style={{...btnP,flex:1,justifyContent:"center",background:C.green}}>{I.check(12,"#fff")} Save Changes</button><button onClick={()=>setEditPerms(null)} style={{...btnO,flex:1,display:"flex",justifyContent:"center"}}>Cancel</button></>}
        <button style={{...btnO,color:C.red,borderColor:`${C.red}30`}}>Delete Role</button>
      </div>
    </SlidePanel>}

    {/* Header */}
    <div className="pp-users-toolbar" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <div className="pp-users-filters" style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
        <div style={{position:"relative",flex:"1 1 180px",maxWidth:280}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}>{I.search(14,C.g400)}</span><input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search staff..." style={{padding:"9px 14px 9px 32px",border:`1px solid ${C.g200}`,borderRadius:8,fontSize:13,width:"100%",fontFamily:font,boxSizing:"border-box",background:C.g50,color:C.g700}}/></div>
        <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value)} style={sel}><option value="all">All Roles</option>{roleDefinitions.map(r=><option key={r.role} value={r.role}>{r.role}</option>)}</select>
        <span style={{fontSize:12,color:C.g400,whiteSpace:"nowrap"}}>{filtered.length} staff member{filtered.length!==1?"s":""}</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setShowRoles(!showRoles)} style={{...btnO,color:C.blue,borderColor:`${C.blue}40`,background:showRoles?C.blueL:C.cardBg}}>{showRoles?"Hide":"Manage"} Roles</button>
        <button style={btnP}><span style={{fontSize:15}}>+</span> Invite Staff</button>
      </div>
    </div>

    {/* Role Management Panel */}
    {showRoles&&<><Div>Role Definitions</Div><Card style={{border:`1px solid ${C.blue}20`,background:`linear-gradient(135deg,${C.blueL}40,${C.cardBg})`}}>
      <Sec action={<button style={{...btnP,fontSize:12,padding:"6px 14px"}}>+ Create Role</button>}>Role Definitions</Sec>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
        {roleDefinitions.map(rd=>{const count=staffData.filter(s=>s.role===rd.role).length;const permCount=Object.values(rd.perms).flat().length;
          return <div key={rd.role} onClick={()=>{setEditRole(rd);setEditPerms(null)}} style={{padding:"18px",background:C.cardBg,borderRadius:12,border:`1px solid ${C.cardBorder}`,cursor:"pointer",transition:"all .15s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=rd.color;e.currentTarget.style.boxShadow=`0 2px 12px ${rd.color}18`}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.cardBorder;e.currentTarget.style.boxShadow="none"}}>
            <div style={{position:"absolute",top:-10,right:-10,width:50,height:50,borderRadius:"50%",background:rd.color,opacity:0.06}}/>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{width:10,height:10,borderRadius:5,background:rd.color}}/>
              <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{rd.role}</span>
            </div>
            <div style={{fontSize:11,color:C.g500,lineHeight:1.5,marginBottom:12,minHeight:34}}>{rd.desc}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,fontSize:11,color:C.g400}}>
                <span><span style={{fontWeight:800,color:C.g600}}>{count}</span> staff</span>
                <span><span style={{fontWeight:800,color:C.g600}}>{permCount}</span> perms</span>
              </div>
              <span style={{fontSize:11,color:C.blue,fontWeight:700}}>Edit →</span>
            </div>
            {/* Mini permission preview */}
            <div style={{display:"flex",gap:3,marginTop:10,flexWrap:"wrap"}}>{permFeatures.slice(0,6).map(f=>{const has=(rd.perms[f]||[]).length>0;return <span key={f} style={{padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:700,background:has?`${rd.color}12`:C.g100,color:has?rd.color:C.g300}}>{permLabels[f].slice(0,5)}</span>})}</div>
          </div>})}
      </div>
      {/* Quick comparison matrix */}
      <div style={{marginTop:16,overflowX:"auto"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Permission Comparison</div>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 2px",fontSize:11}}>
          <thead><tr><th style={{textAlign:"left",padding:"8px 10px",fontSize:10,fontWeight:700,color:C.g400}}>Feature</th>{roleDefinitions.map(rd=><th key={rd.role} style={{textAlign:"center",padding:"8px 6px",fontSize:10,fontWeight:700,color:rd.color,minWidth:80}}>{rd.role.replace(" ","\n")}</th>)}</tr></thead>
          <tbody>{permFeatures.map((f,fi)=><tr key={f} style={{background:fi%2===0?C.g50:C.cardBg}}>
            <td style={{padding:"8px 10px",fontWeight:600,color:C.g700,borderRadius:"6px 0 0 6px"}}>{permLabels[f]}</td>
            {roleDefinitions.map(rd=>{const p=rd.perms[f]||[];return <td key={rd.role} style={{textAlign:"center",padding:"6px",...(rd===roleDefinitions[roleDefinitions.length-1]?{borderRadius:"0 6px 6px 0"}:{})}}>
              {p.length===0?<span style={{color:C.g300,fontSize:13}}>-</span>
              :p.length===4?<span style={{background:C.greenL,color:C.green,padding:"2px 8px",borderRadius:4,fontWeight:700,fontSize:10}}>Full</span>
              :<span style={{background:C.orangeL,color:C.orange,padding:"2px 8px",borderRadius:4,fontWeight:700,fontSize:10}}>{p.length===1?"R":p.length===2?"R/C":"R/C/U"}</span>}
            </td>})}
          </tr>)}</tbody>
        </table>
      </div>
    </Card></>}

    <Div>Staff Directory</Div>
    {/* Info banner */}
    <div style={{padding:"10px 16px",background:C.g50,borderRadius:10,border:`1px solid ${C.g200}`,display:"flex",alignItems:"center",gap:10}}>
      <span>{I.alert(14,C.g400)}</span>
      <span style={{fontSize:12,color:C.g500}}>Participant organizations (Bayou City Volleyball, Gonzales FC, etc.) manage their own accounts externally. This panel manages district staff access only.</span>
    </div>

    {/* Staff table */}
    <Card np>
      <div className="pp-table-wrap">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:700}}>
        <thead><tr>{["","Staff Member","Email","Role","Campus","Phone","Last Active",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{filtered.length===0?<tr><td colSpan={8}><Empty icon={I.user(22,C.g300)} title="No staff members found" desc="Try adjusting your search or role filter." action="Clear Filters" onAction={()=>{setSearch("");setRoleFilter("all")}}/></td></tr>:filtered.map((u,i)=><tr key={u.name} style={{background:i%2===0?C.g50:C.cardBg}}>
          <td style={TD}><div style={{width:38,height:20,borderRadius:10,background:u.status?C.green:C.g300,position:"relative",cursor:"pointer"}}><div style={{width:14,height:14,borderRadius:"50%",background:"#fff",position:"absolute",top:3,...(u.status?{right:3}:{left:3}),boxShadow:"0 1px 2px rgba(0,0,0,.2)",transition:"all .15s"}}/></div></td>
          <td style={TD}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:u.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:10}}>{u.initials}</div><div><span style={{fontWeight:700,color:C.g700,display:"block"}}>{u.name}</span><span style={{fontSize:11,color:C.g400}}>{campusLabel(u.campus)}</span></div></div></td>
          <td style={{...TD,color:C.g500,fontSize:12}}>{u.email}</td>
          <td style={TD}><span style={roleBadge(u.role)}>{u.role}</span></td>
          <td style={{...TD,color:C.g600,fontSize:12}}>{u.loc}</td>
          <td style={{...TD,color:C.g500,fontSize:12}}>{u.phone}</td>
          <td style={{...TD,color:C.g400,fontSize:12}}>{u.updated}</td>
          <td style={TD}><button style={{...btnO,padding:"4px 12px",fontSize:12,color:C.blue,borderColor:`${C.blue}40`}}>Edit</button></td>
        </tr>)}</tbody>
      </table>
      </div>
    </Card>
  </div>
}

/* ======== PAYMENTS (more rows, mixed statuses) ======== */
/* ======== PROMOTE / GROWTH TOOLS ======== */
function Promote(){
  const [showShare,setShowShare]=useState(false);
  const [copied,setCopied]=useState(false);
  const ppUrl="https://book.practiceplan.com/ascension-parish";
  const shareMsg="Reserve Ascension Parish facilities on PracticePlan - gyms, fields, and auditoriums available for your team or organization. Book online instantly!";

  const doCopy=()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);if(globalShowToast)globalShowToast({type:"success",title:"Link Copied",msg:"Booking URL copied to clipboard",color:C.green})};

  const tools=[
    {icon:I.share(20,C.blue),title:"Share to Social",desc:"Post your booking link on social media, email, or messaging apps",action:()=>setShowShare(true),accent:C.blue},
    {icon:I.mail(20,C.green),title:"Email Templates",desc:"Pre-written outreach emails for youth leagues, churches, and community orgs",accent:C.green},
    {icon:I.download(20,"#8B5CF6"),title:"Marketing Assets",desc:"QR codes, printable flyers, digital graphics, and signage templates",accent:"#8B5CF6"},
    {icon:I.link(20,C.amber),title:"Embed on Website",desc:"Add a booking widget or badge to your district website",accent:C.amber},
    {icon:I.bulb(20,C.blue),title:"AI Growth Coach",desc:"Personalized suggestions to increase bookings and revenue",accent:C.blue},
    {icon:I.calendar(20,C.green),title:"Seasonal Playbook",desc:"Maximize revenue with seasonal strategies - spring sports, summer camps, fall leagues",accent:C.green},
  ];

  const bestPractices=[
    {title:"Add your booking link to the district website",desc:"Districts that link PracticePlan from their facilities page see 3x more organic bookings.",done:true},
    {title:"Share with local youth sports leagues",desc:"Email your top 10 local organizations with your direct booking link and QR code.",done:true},
    {title:"Post on community boards",desc:"Share on Nextdoor, local Facebook Groups, and your district's social accounts.",done:false},
    {title:"Display QR codes at facilities",desc:"Print and post QR code flyers at each gym entrance and field gate.",done:false},
    {title:"Set competitive weekday rates",desc:"Weekday evenings are underutilized - a lower rate can fill empty slots.",done:false},
    {title:"Respond to inquiries within 24 hours",desc:"Fast response time is the #1 factor in converting first-time renters to repeat bookers.",done:true},
  ];

  const assets=[
    {name:"Booking QR Code",type:"PNG",size:"42 KB",icon:"QR"},
    {name:"Facility Rental Flyer",type:"PDF",size:"1.2 MB",icon:"FL"},
    {name:"Social Media Graphics Pack",type:"ZIP",size:"3.8 MB",icon:"SM"},
    {name:"Email Header Banner",type:"PNG",size:"186 KB",icon:"EM"},
    {name:"Parking Lot Signage",type:"PDF",size:"890 KB",icon:"SN"},
    {name:"Rate Card Template",type:"DOCX",size:"245 KB",icon:"RC"},
  ];

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {/* Hero / CTA */}
    <div style={{background:`linear-gradient(135deg, ${C.blue}, ${C.green})`,borderRadius:R.lg,padding:"28px 28px 24px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:60,background:"rgba(255,255,255,0.08)"}}/>
      <div style={{position:"absolute",bottom:-30,right:60,width:80,height:80,borderRadius:40,background:"rgba(255,255,255,0.05)"}}/>
      <div style={{position:"relative"}}>
        <div style={{fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3,marginBottom:6}}>Promote Your Facilities</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.85)",lineHeight:1.6,maxWidth:480,marginBottom:18}}>Help community organizations find and book your spaces. The more visibility your facilities get, the more revenue they generate.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>setShowShare(true)} style={{background:"#fff",color:C.blue,border:"none",borderRadius:R.sm,padding:"11px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:8}}>{I.share(14,C.blue)} Share Booking Link</button>
          <button onClick={()=>{doCopy()}} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",borderRadius:R.sm,padding:"11px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:8,backdropFilter:"blur(4px)"}}>{I.copy(14,"#fff")} Copy Link</button>
        </div>
      </div>
    </div>

    {/* Quick URL bar */}
    <Card>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,padding:"10px 14px",background:C.g50,borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,fontSize:12,color:C.g600,fontFamily:numFont,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ppUrl}</div>
        <button onClick={doCopy} style={{...btnP,padding:"10px 16px",flexShrink:0}}>{copied?<>{I.check(13,"#fff")} Copied</>:<>{I.copy(13,"#fff")} Copy</>}</button>
      </div>
    </Card>

    {/* Growth Tools grid */}
    <Div>Growth Tools</Div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
      {tools.map((t,i)=><div key={i} onClick={t.action||undefined} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,padding:"18px 20px",cursor:t.action?"pointer":"default",transition:"all .15s",boxShadow:C.cardShadow}} onMouseEnter={e=>{if(t.action)e.currentTarget.style.borderColor=`${t.accent}40`}} onMouseLeave={e=>e.currentTarget.style.borderColor=C.cardBorder}>
        <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
          <div style={{width:40,height:40,borderRadius:10,background:`${t.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{t.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:C.g800,marginBottom:3}}>{t.title}</div>
            <div style={{fontSize:12,color:C.g500,lineHeight:1.5}}>{t.desc}</div>
          </div>
          {t.action&&<span style={{color:C.g300,fontSize:16,marginTop:2}}>›</span>}
        </div>
      </div>)}
    </div>

    {/* Best Practices checklist */}
    <Div>Best Practices</Div>
    <Card>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:C.g800}}>Onboarding Checklist</div>
        <span style={{fontSize:11,fontWeight:600,color:C.green}}>{bestPractices.filter(b=>b.done).length} of {bestPractices.length} complete</span>
      </div>
      <div style={{display:"flex",gap:3,marginBottom:18}}>
        {bestPractices.map((b,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:b.done?C.green:C.g200,transition:"all .3s"}}/>)}
      </div>
      {bestPractices.map((b,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",borderBottom:i<bestPractices.length-1?`1px solid ${C.g100}`:"none"}}>
        <div style={{width:22,height:22,borderRadius:6,background:b.done?C.green:`${C.g200}`,border:b.done?"none":`2px solid ${C.g300}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,cursor:"pointer"}}>{b.done&&I.check(12,"#fff")}</div>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:b.done?C.g500:C.g800,textDecoration:b.done?"line-through":"none"}}>{b.title}</div>
          <div style={{fontSize:11,color:C.g400,marginTop:2,lineHeight:1.5}}>{b.desc}</div>
        </div>
      </div>)}
    </Card>

    {/* Marketing Assets / File Repository */}
    <Div>Marketing Assets</Div>
    <Card>
      <Sec action={<button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"All Assets Downloaded",msg:"Marketing pack saved to your device",color:C.green})}} style={{...btnO,fontSize:11,padding:"6px 14px"}}>{I.download(12,C.g500)} Download All</button>}>Toolkit</Sec>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:8}}>
        {assets.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:C.g50,borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,cursor:"pointer",transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue} onMouseLeave={e=>e.currentTarget.style.borderColor=C.cardBorder} onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Downloaded",msg:`${a.name}.${a.type.toLowerCase()} saved`,color:C.green})}}>
          <div style={{width:36,height:36,borderRadius:8,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:9,fontWeight:800,color:C.blue,letterSpacing:"0.03em"}}>{a.icon}</span>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:C.g700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{a.name}</div>
            <div style={{fontSize:10,color:C.g400,marginTop:1}}>{a.type} - {a.size}</div>
          </div>
          {I.download(13,C.g400)}
        </div>)}
      </div>
    </Card>

    {/* Video Tutorials */}
    <Div>Video Tutorials</Div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
      {[
        {title:"Getting Started with PracticePlan",duration:"3:24",desc:"Set up your district, add campuses, and publish your first facility",views:"1.2K"},
        {title:"Managing Bookings & Approvals",duration:"4:51",desc:"Review requests, approve or decline, and communicate with renters",views:"847"},
        {title:"Setting Rates & Availability",duration:"2:38",desc:"Configure hourly rates, blackout dates, and day-of-week availability",views:"634"},
        {title:"Reading Your Revenue Reports",duration:"3:12",desc:"Understand your dashboard metrics, payout schedule, and growth trends",views:"521"},
        {title:"Promoting Your Facilities",duration:"2:55",desc:"Share your booking page, use QR codes, and reach community organizations",views:"389"},
        {title:"Adding Amenities & Add-ons",duration:"2:10",desc:"Offer equipment, AV, event staff, and concessions as bookable extras",views:"312"},
      ].map((v,i)=><div key={i} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,overflow:"hidden",cursor:"pointer",transition:"all .15s",boxShadow:C.cardShadow}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${C.blue}40`} onMouseLeave={e=>e.currentTarget.style.borderColor=C.cardBorder}>
        {/* Video thumbnail placeholder */}
        <div style={{height:120,background:`linear-gradient(135deg, ${C.g100}, ${C.g200})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          <div style={{width:44,height:44,borderRadius:22,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
            <div style={{width:0,height:0,borderTop:"8px solid transparent",borderBottom:"8px solid transparent",borderLeft:"14px solid #fff",marginLeft:3}}/>
          </div>
          <span style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.7)",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:4}}>{v.duration}</span>
        </div>
        <div style={{padding:"12px 14px"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.g800,lineHeight:1.3,marginBottom:4}}>{v.title}</div>
          <div style={{fontSize:11,color:C.g400,lineHeight:1.4}}>{v.desc}</div>
          <div style={{fontSize:10,color:C.g400,marginTop:6}}>{v.views} views</div>
        </div>
      </div>)}
    </div>

    {/* Success Stories */}
    <Div>Success Stories</Div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
      {[
        {district:"Katy ISD",state:"Texas",stat:"$127K",label:"first-year revenue",quote:"PracticePlan turned our empty weekend gyms into a real revenue stream. Setup took less than a week.",person:"Mike Torres, Athletic Director"},
        {district:"Gwinnett County Schools",state:"Georgia",stat:"340%",label:"booking increase",quote:"We went from managing rentals in spreadsheets to fully automated. The community loves how easy it is to book.",person:"Sarah Lin, Facilities Coordinator"},
        {district:"City of Frisco",state:"Texas",stat:"$84K",label:"in 6 months",quote:"Our parks and rec facilities were underutilized. PracticePlan helped us fill evenings and weekends with zero added staff.",person:"James Okafor, Parks Director"},
      ].map((s,i)=><Card key={i}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg, ${C.blue}15, ${C.green}15)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:10,fontWeight:800,color:C.blue}}>{s.district.split(" ")[0].slice(0,2).toUpperCase()}</span>
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.g800}}>{s.district}</div>
            <div style={{fontSize:10,color:C.g400}}>{s.state}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:10}}>
          <span style={{fontSize:24,fontWeight:800,color:C.blue,fontFamily:numFont}}>{s.stat}</span>
          <span style={{fontSize:11,color:C.g400}}>{s.label}</span>
        </div>
        <div style={{fontSize:12,color:C.g500,lineHeight:1.6,fontStyle:"italic",marginBottom:10}}>"{s.quote}"</div>
        <div style={{fontSize:11,fontWeight:600,color:C.g600}}>- {s.person}</div>
      </Card>)}
    </div>

    {/* Refer & Suggest */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12,marginTop:4}}>
      {/* Refer a District */}
      <div style={{background:`linear-gradient(135deg, ${C.blue}08, ${C.green}08)`,borderRadius:R.lg,border:`1px solid ${C.green}25`,padding:"22px 24px",cursor:"pointer"}} onClick={()=>globalShowReferral()}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg, ${C.blue}, ${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.mail(18,"#fff")}</div>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.g800}}>Refer a District</div>
            <div style={{fontSize:12,color:C.g500,marginTop:2}}>Know a school or city that could benefit?</div>
          </div>
        </div>
        <div style={{fontSize:12,color:C.g500,lineHeight:1.6,marginBottom:14}}>Help another district unlock revenue from their unused facilities. We'll reach out on your behalf - they get started completely free.</div>
        <div style={{display:"flex",alignItems:"center",gap:6,color:C.blue,fontSize:12,fontWeight:700}}>Send an Invite <span style={{fontSize:15}}>→</span></div>
      </div>

      {/* Suggest a Feature */}
      <div style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,padding:"22px 24px",cursor:"pointer",boxShadow:C.cardShadow}} onClick={()=>globalShowSuggest()}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.g100,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.g500} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.g800}}>Suggest a Feature</div>
            <div style={{fontSize:12,color:C.g500,marginTop:2}}>Help us build what you need</div>
          </div>
        </div>
        <div style={{fontSize:12,color:C.g500,lineHeight:1.6,marginBottom:14}}>Have an idea for a tool, integration, or workflow that would make PracticePlan even better? We read every suggestion and ship fast.</div>
        <div style={{display:"flex",alignItems:"center",gap:6,color:C.blue,fontSize:12,fontWeight:700}}>Share Your Idea <span style={{fontSize:15}}>→</span></div>
      </div>
    </div>

    {/* Share Modal */}
    {showShare&&<div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.5)",backdropFilter:"blur(6px)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowShare(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.cardBg,borderRadius:16,boxShadow:`0 24px 80px rgba(0,0,0,${C.bg==="#0F1318"?0.5:0.2})`,width:"100%",maxWidth:460,overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg, ${C.blue}, ${C.green})`,padding:"24px 28px 20px",position:"relative"}}>
          <button onClick={()=>setShowShare(false)} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,"#fff")}</button>
          <div style={{fontSize:18,fontWeight:800,color:"#fff",lineHeight:1.3}}>Share Your Booking Page</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:6,lineHeight:1.5}}>Let your community know they can reserve Ascension Parish facilities online.</div>
        </div>

        <div style={{padding:"24px 28px"}}>
          {/* URL + Copy */}
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            <div style={{flex:1,padding:"10px 14px",background:C.g50,borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,fontSize:12,color:C.g600,fontFamily:numFont,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ppUrl}</div>
            <button onClick={doCopy} style={{...btnP,padding:"10px 14px",flexShrink:0,fontSize:12}}>{copied?"Copied!":"Copy"}</button>
          </div>

          {/* Pre-filled message */}
          <div style={{marginBottom:20}}>
            <label style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>Message</label>
            <div style={{padding:"12px 14px",background:C.g50,borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,fontSize:12,color:C.g600,lineHeight:1.6}}>{shareMsg}</div>
          </div>

          {/* Social buttons */}
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Share via</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
            {[
              ["X / Twitter","#000","𝕏"],
              ["Facebook","#1877F2","f"],
              ["Instagram","#E4405F","ig"],
              ["LinkedIn","#0A66C2","in"],
              ["Email","#EA4335","@"],
              ["Text / SMS","#25D366","✉"],
            ].map(([name,bg,abbr])=>
              <button key={name} onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:`Shared on ${name}`,msg:"Your booking link has been shared",color:C.green});setShowShare(false)}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 10px",background:C.g50,border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,cursor:"pointer",fontFamily:font,transition:"all .12s"}} onMouseEnter={e=>{e.currentTarget.style.background=bg;e.currentTarget.style.borderColor=bg;e.currentTarget.querySelector(".sh-icon").style.background="#fff";e.currentTarget.querySelector(".sh-icon").style.color=bg;e.currentTarget.querySelector(".sh-lbl").style.color="#fff"}} onMouseLeave={e=>{e.currentTarget.style.background=C.g50;e.currentTarget.style.borderColor=C.cardBorder;e.currentTarget.querySelector(".sh-icon").style.background=bg;e.currentTarget.querySelector(".sh-icon").style.color="#fff";e.currentTarget.querySelector(".sh-lbl").style.color=C.g600}}>
                <div className="sh-icon" style={{width:36,height:36,borderRadius:10,background:bg,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:abbr.length>1?11:16,fontWeight:800,transition:"all .15s"}}>{abbr}</div>
                <span className="sh-lbl" style={{fontSize:10,fontWeight:600,color:C.g600,transition:"color .15s"}}>{name}</span>
              </button>
            )}
          </div>

          {/* Community boards suggestion */}
          <div style={{padding:"12px 14px",background:`${C.blue}06`,borderRadius:8,border:`1px solid ${C.blue}15`,fontSize:11,color:C.g500,lineHeight:1.6}}>
            <strong style={{color:C.g700}}>Tip:</strong> Post on Nextdoor, local Facebook Groups, and your district's official social accounts for maximum reach. Community boards often drive the most new bookings.
          </div>
        </div>
      </div>
    </div>}
  </div>
}

/* ======== APP SHELL ======== */
/* ======== COMMAND PALETTE (Cmd+K) ======== */
function CmdPalette({open,onClose,onNavigate}){
  const [q,setQ]=useState("");
  const ref=useRef(null);
  const [sel,setSel]=useState(0);
  useEffect(()=>{if(open){setQ("");setSel(0);setTimeout(()=>ref.current?.focus(),50)}},[open]);

  const cmdItems=[
    {type:"page",label:"Dashboard",desc:"Overview and metrics",icon:I.home(14,C.blue),action:()=>onNavigate("Dashboard")},
    {type:"page",label:"Rentals - Approvals",desc:"Review pending approvals",icon:I.key(14,C.blue),action:()=>{onNavigate("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("approvals")},100)}},
    {type:"page",label:"Rentals - Reservations",desc:"Calendar and booking list",icon:I.calendar(14,C.blue),action:()=>{onNavigate("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("reservations")},100)}},
    {type:"page",label:"Rentals - Locations",desc:"Manage campuses and venues",icon:I.building(14,C.blue),action:()=>{onNavigate("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("locations")},100)}},
    {type:"page",label:"Organization",desc:"District settings and config",icon:I.building(14,C.blue),action:()=>onNavigate("Organization")},
    {type:"page",label:"Reporting",desc:"Revenue, ratings, and payouts",icon:I.chart(14,C.blue),action:()=>onNavigate("Reporting")},
    {type:"page",label:"Users & Roles",desc:"Manage team access",icon:I.user(14,C.blue),action:()=>onNavigate("Users")},
    {type:"page",label:"Bulk Payments",desc:"Bulk payment transactions",icon:I.wallet(14,C.blue),action:()=>{onNavigate("Reporting");setTimeout(()=>{if(globalSetRt)globalSetRt(5)},100)}},
    {type:"page",label:"Promote",desc:"Growth tools, sharing, and marketing assets",icon:I.megaphone(14,C.blue),action:()=>onNavigate("Promote")},
    {type:"action",label:"Create Reservation",desc:"Open new booking form",icon:<span style={{fontSize:14}}>+</span>,action:()=>{onNavigate("Dashboard")}},
    {type:"action",label:"Toggle Dark Mode",desc:"Switch theme",icon:I.moon(14,C.g500),action:()=>{document.querySelector(".pp-theme-toggle")?.click()}},
    ...approvalsDataInit.filter(a=>a.status==="pending").map(a=>({type:"approval",label:`${a.id} - ${a.org}`,desc:`${a.campus} - ${a.bk.length} booking${a.bk.length>1?"s":""} - $${a.bk.reduce((s,b)=>s+b.rev,0).toLocaleString()}`,icon:I.alert(14,C.orange),action:()=>{onNavigate("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("approvals")},100)}})),
    ...campuses.map(c=>({type:"campus",label:c.name,desc:`${(facilities[c.short]||[]).length} facilities - ${c.city}`,icon:I.building(14,C.green),action:()=>{onNavigate("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("locations")},100)}})),
    ...upcoming.slice(0,4).map(r=>({type:"reservation",label:`${r.id} - ${r.c}`,desc:`${r.a} - ${r.d} ${r.t}`,icon:I.key(14,C.g400),action:()=>onNavigate("Rentals")})),
    ...topCustData.map(c=>({type:"customer",label:c.n,desc:`${c.b} bookings - $${c.s.toLocaleString()}`,icon:I.user(14,C.g400),action:()=>onNavigate("Dashboard")})),
  ];

  const filtered=q.trim()===""?cmdItems:cmdItems.filter(it=>(it.label+it.desc).toLowerCase().includes(q.toLowerCase()));
  const capped=filtered.slice(0,10);

  const handleKey=(e)=>{
    if(e.key==="ArrowDown"){e.preventDefault();setSel(s=>Math.min(s+1,capped.length-1))}
    else if(e.key==="ArrowUp"){e.preventDefault();setSel(s=>Math.max(s-1,0))}
    else if(e.key==="Enter"&&capped[sel]){capped[sel].action();onClose()}
    else if(e.key==="Escape")onClose();
  };

  if(!open)return null;
  const grouped={};capped.forEach(it=>{const g=it.type==="page"?"Navigate":it.type==="action"?"Actions":it.type==="approval"?"Pending Approvals":it.type==="campus"?"Campuses":it.type==="reservation"?"Reservations":"Customers";if(!grouped[g])grouped[g]=[];grouped[g].push(it)});
  let flatIdx=0;

  return <><div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.45)",backdropFilter:"blur(4px)",zIndex:500,animation:"fadeIn .15s ease"}}/>
    <div style={{position:"fixed",top:"18%",left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,zIndex:501,animation:"slideUp .2s cubic-bezier(.22,1,.36,1)"}}>
      <div style={{background:C.cardBg,borderRadius:16,border:`1px solid ${C.cardBorder}`,boxShadow:`0 24px 80px rgba(0,0,0,${C.bg==="#0F1318"?0.5:0.2}), 0 8px 24px rgba(0,0,0,${C.bg==="#0F1318"?0.3:0.1})`,overflow:"hidden",fontFamily:font}}>
        {/* Search input */}
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:`1px solid ${C.g100}`}}>
          {I.search(16,C.g400)}
          <input ref={ref} value={q} onChange={e=>{setQ(e.target.value);setSel(0)}} onKeyDown={handleKey} placeholder="Search pages, reservations, customers..." style={{flex:1,border:"none",background:"transparent",fontSize:14,fontFamily:font,color:C.g800,outline:"none"}}/>
          <kbd style={{fontSize:10,fontWeight:700,color:C.g400,background:C.g100,padding:"2px 6px",borderRadius:4,border:`1px solid ${C.g200}`}}>ESC</kbd>
        </div>
        {/* Results */}
        <div style={{maxHeight:360,overflowY:"auto",padding:"6px 0"}}>
          {capped.length===0&&<div style={{padding:"24px 18px",textAlign:"center",color:C.g400,fontSize:13}}>No results for "{q}"</div>}
          {Object.entries(grouped).map(([group,items])=><div key={group}>
            <div style={{padding:"8px 18px 4px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em"}}>{group}</div>
            {items.map(it=>{const idx=flatIdx++;const isSel=idx===sel;return <div key={it.label} onClick={()=>{it.action();onClose()}} onMouseEnter={()=>setSel(idx)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 18px",cursor:"pointer",background:isSel?C.blueL:"transparent",transition:"background .08s"}}>
              <span style={{flexShrink:0,width:24,height:24,borderRadius:6,background:isSel?`${C.blue}20`:C.g100,display:"flex",alignItems:"center",justifyContent:"center"}}>{it.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:isSel?C.blue:C.g800}}>{it.label}</div>
                <div style={{fontSize:11,color:C.g400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.desc}</div>
              </div>
              {isSel&&<kbd style={{fontSize:9,color:C.g400,background:C.g100,padding:"1px 5px",borderRadius:3}}>↵</kbd>}
            </div>})}
          </div>)}
        </div>
        {/* Footer hint */}
        <div style={{padding:"8px 18px",borderTop:`1px solid ${C.g100}`,display:"flex",gap:12,fontSize:10,color:C.g400}}>
          <span><kbd style={{background:C.g100,padding:"1px 4px",borderRadius:3,fontWeight:700,marginRight:3}}>↑↓</kbd> navigate</span>
          <span><kbd style={{background:C.g100,padding:"1px 4px",borderRadius:3,fontWeight:700,marginRight:3}}>↵</kbd> select</span>
          <span><kbd style={{background:C.g100,padding:"1px 4px",borderRadius:3,fontWeight:700,marginRight:3}}>esc</kbd> close</span>
        </div>
      </div>
    </div>
  </>;
}

/* ======== AI INSIGHTS PANEL ======== */
function AIInsights(){
  const [mode,setMode]=useState("idle"); /* idle | loading | active */
  const [phase,setPhase]=useState(0);
  const [charIdx,setCharIdx]=useState(0);
  const [autoPlay,setAutoPlay]=useState(false);
  const [showDots,setShowDots]=useState(true);
  const [loadStep,setLoadStep]=useState(0);
  const [btnHover,setBtnHover]=useState(false);

  const insights=[
    {tag:"Action Required",title:"Gonzales FC has 2 bookings at risk",body:"Insurance expired 01/15/2026 for Gonzales FC, affecting their 2/22 and 3/1 bookings at Prairieville Complex ($950 revenue at risk). Request an updated COI immediately to avoid cancellation.",stat:"$950",statLabel:"at risk",priority:"high"},
    {tag:"Revenue Opportunity",title:"Saturday AM is your money maker",body:"Dutchtown and Prairieville 8-10 AM slots generate 38% of total revenue from just 12% of available hours. A $50 weekend premium could add $2,400/mo without impacting demand.",stat:"+$2.4k",statLabel:"/mo potential",priority:"info"},
    {tag:"Low Utilization",title:"Donaldsonville is 21% below average",body:"Donaldsonville HS (31%) and East Ascension (29%) are well below the 52% district average. Youth soccer and church groups in the Gonzales area are untapped demand - consider a targeted email campaign.",stat:"31%",statLabel:"utilization",priority:"warn"},
    {tag:"Retention",title:"3 customers ready for seasonal contracts",body:"Bayou City VB (weekly Fri), Gonzales FC (weekly Sat), and LA Tigers (bi-weekly Tue) show repeating patterns. Converting to quarterly contracts could lock in ~$18,000 in guaranteed revenue and reduce admin overhead by 40%.",stat:"~$18K",statLabel:"/qtr locked in",priority:"info"},
  ];

  const loadSteps=["Scanning 192 bookings...","Analyzing revenue patterns...","Checking insurance compliance...","Identifying opportunities..."];

  /* Loading sequence */
  useEffect(()=>{
    if(mode!=="loading")return;
    if(loadStep<loadSteps.length){
      const t=setTimeout(()=>setLoadStep(s=>s+1),600);
      return ()=>clearTimeout(t);
    }
    const t=setTimeout(()=>setMode("active"),300);
    return ()=>clearTimeout(t);
  },[mode,loadStep]);

  const cur=insights[phase];
  const fullLen=cur.body.length;
  const isTyping=mode==="active"&&charIdx<fullLen;

  useEffect(()=>{
    if(mode!=="active")return;
    if(charIdx<fullLen){
      if(charIdx===0&&showDots){
        const t=setTimeout(()=>setShowDots(false),800);
        return ()=>clearTimeout(t);
      }
      const speed=charIdx<8?28:charIdx%3===0?14:6;
      const t=setTimeout(()=>setCharIdx(c=>Math.min(c+2,fullLen)),speed);
      return ()=>clearTimeout(t);
    }
    if(autoPlay&&phase<insights.length-1){
      const t=setTimeout(()=>{setPhase(p=>p+1);setCharIdx(0);setShowDots(true)},2000);
      return ()=>clearTimeout(t);
    }
    if(autoPlay&&phase===insights.length-1)setAutoPlay(false);
  },[mode,charIdx,phase,autoPlay,fullLen,showDots]);

  const goTo=(i)=>{
    setAutoPlay(false);
    setPhase(i);
    setCharIdx(insights[i].body.length);
    setShowDots(false);
  };

  /* ── Idle CTA ── */
  if(mode==="idle") return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
    <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
      <div style={{width:32,height:32,borderRadius:8,background:C.g100,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.bulb(15,C.g400)}</div>
      <div style={{minWidth:0}}>
        <div style={{fontSize:13,fontWeight:700,color:C.g800}}>AI Insights</div>
        <div style={{fontSize:11,color:C.g400}}>Analyze your revenue, bookings, and operations</div>
      </div>
    </div>
    <button
      onClick={()=>setMode("loading")}
      onMouseEnter={()=>setBtnHover(true)}
      onMouseLeave={()=>setBtnHover(false)}
      style={{padding:"8px 20px",borderRadius:8,background:btnHover?C.blue:C.g800,color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font,whiteSpace:"nowrap",flexShrink:0,transition:"all .2s",transform:btnHover?"translateY(-1px)":"none",boxShadow:btnHover?`0 4px 12px ${C.blue}40`:"none",display:"flex",alignItems:"center",gap:6}}>
      {I.bulb(12,"#fff")} Generate
    </button>
  </div>

  /* ── Loading state ── */
  if(mode==="loading") return <div style={{animation:"fadeIn .3s ease"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
      <span style={{fontSize:13,fontWeight:800,color:C.g800}}>Analyzing</span>
      <div style={{display:"inline-flex",gap:3,alignItems:"center"}}>
        {[0,1,2].map(d=><span key={d} style={{width:3,height:3,borderRadius:2,background:C.blue,animation:`aiDot .9s ${d*0.15}s ease-in-out infinite`}}/>)}
      </div>
    </div>
    {/* Progress bar */}
    <div style={{height:2,borderRadius:1,background:C.g100,marginBottom:16,overflow:"hidden"}}>
      <div style={{height:"100%",borderRadius:1,background:C.blue,transition:"width .5s ease",width:`${Math.min((loadStep/loadSteps.length)*100,100)}%`}}/>
    </div>
    {/* Step list */}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {loadSteps.map((step,i)=>{
        const done=i<loadStep;
        const active=i===loadStep&&loadStep<loadSteps.length;
        const pending=i>loadStep;
        return <div key={i} style={{display:"flex",alignItems:"center",gap:10,opacity:pending?0.3:1,transition:"opacity .3s"}}>
          <div style={{width:18,height:18,borderRadius:5,background:done?`${C.blue}15`:active?C.g100:"transparent",border:done||active?`1.5px solid ${done?C.blue:C.g300}`:`1.5px solid ${C.g200}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
            {done&&I.check(9,C.blue)}
            {active&&<div style={{width:6,height:6,borderRadius:3,background:C.blue,animation:"pulse 1s ease infinite"}}/>}
          </div>
          <span style={{fontSize:12,color:done?C.g700:active?C.g600:C.g400,fontWeight:active?600:400,transition:"all .3s"}}>{step}</span>
        </div>
      })}
    </div>
  </div>

  /* ── Active insights ── */
  return <div className="pp-ai-wrap" style={{animation:"fadeIn .4s ease"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:13,fontWeight:800,color:C.g800,letterSpacing:"-0.01em"}}>Insights</span>
        {isTyping&&<div style={{display:"inline-flex",gap:3,alignItems:"center"}}>
          {[0,1,2].map(d=><span key={d} style={{width:3,height:3,borderRadius:2,background:C.g400,animation:`aiDot .9s ${d*0.15}s ease-in-out infinite`}}/>)}
        </div>}
        {!isTyping&&<span style={{fontSize:9,fontWeight:600,color:C.green,background:C.greenL,padding:"2px 7px",borderRadius:4}}>4 found</span>}
      </div>
      <span style={{fontSize:10,color:C.g400,fontWeight:500}}>{phase+1} / {insights.length}</span>
    </div>

    <div style={{display:"flex",gap:4,marginBottom:16}}>
      {insights.map((_,i)=>{
        const done=i<phase||(i===phase&&charIdx>=insights[i].body.length);
        const active=i===phase;
        return <div key={i} onClick={()=>goTo(i)} style={{flex:1,height:3,borderRadius:2,background:active?C.blue:done?`${C.blue}40`:C.g200,cursor:"pointer",transition:"all .3s"}}/>
      })}
    </div>

    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:9,fontWeight:700,color:cur.priority==="high"?C.red:C.g500,textTransform:"uppercase",letterSpacing:"0.06em",background:cur.priority==="high"?C.redL:C.g100,padding:"3px 8px",borderRadius:4}}>{cur.tag}</span>
      </div>
      <div style={{fontSize:15,fontWeight:800,color:C.g800,lineHeight:1.3,marginBottom:8}}>{cur.title}</div>
      <div style={{fontSize:13,color:C.g500,lineHeight:1.7,minHeight:42}}>
        {charIdx===0&&showDots?
          <span style={{display:"inline-flex",gap:3,padding:"4px 0"}}>
            {[0,1,2].map(d=><span key={d} style={{width:5,height:5,borderRadius:3,background:C.g300,animation:`aiDot .9s ${d*0.15}s ease-in-out infinite`}}/>)}
          </span>
        :
          <>
            {cur.body.slice(0,charIdx).split(/(\$[\d,]+(?:\/mo)?|\d+%|~\$[\d,]+K?)/).map((part,pi)=>
              /^\$|^\d+%|^~\$/.test(part)?<strong key={pi} style={{color:C.g800,fontWeight:700}}>{part}</strong>:<span key={pi}>{part}</span>
            )}
            {isTyping&&<span style={{display:"inline-block",width:1.5,height:14,background:C.blue,marginLeft:1,animation:"blink 0.6s step-end infinite",verticalAlign:"text-bottom"}}/>}
          </>
        }
      </div>
    </div>

    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,paddingTop:12,borderTop:`1px solid ${C.g100}`}}>
      <div style={{display:"flex",alignItems:"baseline",gap:6}}>
        <span style={{fontSize:22,fontWeight:800,color:C.g800,letterSpacing:"-0.02em",fontFamily:numFont}}>{cur.stat}</span>
        <span style={{fontSize:10,color:C.g400,fontWeight:500}}>{cur.statLabel}</span>
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <button onClick={()=>goTo(phase>0?phase-1:insights.length-1)} style={{width:28,height:28,borderRadius:6,background:C.g100,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:C.g500,fontSize:14,fontFamily:font,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.g200} onMouseLeave={e=>e.currentTarget.style.background=C.g100}>‹</button>
        <button onClick={()=>goTo(phase<insights.length-1?phase+1:0)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:6,background:phase<insights.length-1?C.blue:C.g100,color:phase<insights.length-1?"#fff":C.g500,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:font,transition:"all .15s",whiteSpace:"nowrap"}}>
          {phase<insights.length-1?<>Next Insight <span style={{fontSize:13}}>›</span></>:<>Back to first</>}
        </button>
      </div>
    </div>
  </div>
}

const pages={Dashboard,Rentals,Organization:Org,Reporting,Users,Promote};
const tabIcons={Dashboard:"home",Rentals:"key",Organization:"building",Reporting:"chart",Users:"users",Promote:"megaphone"};
/* shared tab setter - set by App */
let globalSetTab=()=>{};
let globalSetRentalsTab=()=>{};
let globalShowToast=()=>{};
let globalCreateRes=()=>{};
let globalShowCust=()=>{};
let globalShowPay=null;
let globalSetShowPay=()=>{};
let globalSetRt=()=>{};
let globalShowReferral=()=>{};
let globalShowSuggest=()=>{};
let globalShowFacility=()=>{};
let globalSetFacility=null;

/* sparkline data for metrics */
const sparkData={
  "YTD Revenue":[28,34,31,42,48,52,61],
  "This Month":[1.2,2.8,4.1,5.6,6.9,7.8,8.7],
  "Bookings":[22,28,25,31,27,34,25],
  "Avg Rate":[265,278,290,295,301,310,318],
  "Util. Rate":[38,41,43,44,46,49,52],
  "Customers":[12,14,15,17,19,21,23],
};
function Sparkline({data,color=C.blue,w=60,h=24}){
  const mn=Math.min(...data),mx=Math.max(...data),rng=mx-mn||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-mn)/rng)*h}`).join(" ");
  const areaPath=`M0,${h} L${pts.split(" ").map((p,i)=>i===0?p.replace(/^[^,]+,/,`0,`):p).join(" L")} L${w},${h} Z`;
  return <svg width={w} height={h} style={{display:"block"}}><defs><linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.15"/><stop offset="100%" stopColor={color} stopOpacity="0.02"/></linearGradient></defs><path d={`M${pts.replace(/ /g," L")}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d={areaPath} fill={`url(#sg-${color.replace("#","")})`}/></svg>
}

/* Toast notifications */
function ToastContainer({toasts,removeToast}){
  return <div style={{position:"fixed",bottom:24,right:24,zIndex:400,display:"flex",flexDirection:"column-reverse",gap:8,pointerEvents:"none"}}>
    {toasts.map(t=><div key={t.id} style={{pointerEvents:"auto",display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:C.cardBg,borderRadius:R.lg,boxShadow:`0 8px 32px rgba(0,0,0,${C.bg==="#0F1318"?0.3:0.12}), 0 2px 8px rgba(0,0,0,${C.bg==="#0F1318"?0.15:0.06})`,border:`1px solid ${C.cardBorder}`,borderLeft:`3px solid ${t.color||C.green}`,fontFamily:font,minWidth:280,maxWidth:400,animation:"toastIn .35s cubic-bezier(.22,1,.36,1) forwards"}}>
      <div style={{width:24,height:24,borderRadius:6,background:`${t.color||C.green}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        {t.type==="success"?I.check(14,C.green):t.type==="error"?I.alert(14,C.red):I.check(14,C.blue)}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:700,color:C.g800}}>{t.title}</div>
        {t.msg&&<div style={{fontSize:11,color:C.g500,marginTop:1}}>{t.msg}</div>}
      </div>
      <button onClick={()=>removeToast(t.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"}}>{I.x(12,C.g400)}</button>
    </div>)}
  </div>
}

export default function App(){
  /* Prevent iOS zoom on input focus */
  useEffect(()=>{
    let vp=document.querySelector('meta[name="viewport"]');
    if(!vp){vp=document.createElement('meta');vp.name='viewport';document.head.appendChild(vp)}
    vp.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no';
  },[]);
  const [dark,setDark]=useState(false);
  const toggleDark=()=>{const next=!dark;setDark(next);Object.assign(C,next?darkC:lightC)};
  /* Apply theme immediately */
  Object.assign(C,dark?darkC:lightC);
  const [tab,setTab]=useState("Dashboard");
  const [pageKey,setPageKey]=useState(0);
  const [sideOpen,setSideOpen]=useState(true);
  const [loading,setLoading]=useState(false);
  const [showCreateRes,setShowCreateRes]=useState(false);
  const [appSelCust,setAppSelCust]=useState(null);
  const [appSelPay,setAppSelPay]=useState(null);
  const [appSelFacility,setAppSelFacility]=useState(null);
  globalCreateRes=()=>setShowCreateRes(true);
  globalShowCust=(i)=>setAppSelCust(i);
  globalSetShowPay=(p)=>setAppSelPay(p);
  globalShowFacility=(i)=>setAppSelFacility(i);
  const switchTab=(t)=>{
    if(t===tab)return;
    setLoading(true);setTab(t);setPageKey(k=>k+1);
    setTimeout(()=>setLoading(false),350);
  };
  globalSetTab=switchTab;
  const [showNotifs,setShowNotifs]=useState(false);
  const [mobileNav,setMobileNav]=useState(false);
  const [approvals,setApprovals]=useState(approvalsDataInit);
  const [prompt,setPrompt]=useState(null);
  const [requireSiteAdmin,setRequireSiteAdmin]=useState(true);
  const [assignedAdmins,setAssignedAdmins]=useState({}); /* {reservationId: adminName} */
  const [toasts,setToasts]=useState([]);
  const [notifs,setNotifs]=useState(notifsInit);
  const [cmdOpen,setCmdOpen]=useState(false);
  const [showReferral,setShowReferral]=useState(false);
  const [referralEmail,setReferralEmail]=useState("");
  const [referralName,setReferralName]=useState("");
  const [referralSent,setReferralSent]=useState(false);
  const [showSuggest,setShowSuggest]=useState(false);
  globalShowReferral=()=>setShowReferral(true);
  globalShowSuggest=()=>setShowSuggest(true);
  const [suggestText,setSuggestText]=useState("");
  const [helpOpen,setHelpOpen]=useState(false);
  const [helpMsg,setHelpMsg]=useState("");
  const [helpMessages,setHelpMessages]=useState([{from:"bot",text:"Hi Marcus! How can we help you today?",time:"Just now"}]);
  const addToast=(t)=>{const id=Date.now();setToasts(ts=>[...ts,{...t,id}]);setTimeout(()=>setToasts(ts=>ts.filter(x=>x.id!==id)),4000)};
  const removeToast=(id)=>setToasts(ts=>ts.filter(x=>x.id!==id));
  globalShowToast=addToast;
  globalApprovals=approvals;globalSetApprovals=setApprovals;globalPrompt=prompt;globalSetPrompt=setPrompt;
  globalRequireSiteAdmin=requireSiteAdmin;globalSetRequireSiteAdmin=setRequireSiteAdmin;globalAssignedAdmins=assignedAdmins;globalSetAssignedAdmins=setAssignedAdmins;
  globalNotifs=notifs;

  /* Cmd+K listener */
  useEffect(()=>{
    const handler=(e)=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmdOpen(o=>!o)}};
    window.addEventListener("keydown",handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[]);
  const Page=pages[tab];
  const unread=notifs.filter(n=>!n.read).length;
  const pendingApprovals=approvals.filter(a=>a.status==="pending");

  /* Loading skeleton - page-specific */
  const Skeleton=()=>{
    if(tab==="Dashboard")return <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div className="pp-skeleton" style={{height:48,width:"60%"}}/>
      <div className="pp-skeleton" style={{height:54,width:"100%",borderRadius:12}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{[1,2,3,4,5,6].map(i=><div key={i} className="pp-skeleton" style={{height:88}}/>)}</div>
      <div className="pp-skeleton" style={{height:200,width:"100%"}}/>
      <div style={{display:"flex",gap:16}}><div className="pp-skeleton" style={{height:260,flex:2}}/><div className="pp-skeleton" style={{height:260,flex:1}}/></div>
    </div>;
    if(tab==="Rentals")return <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8}}>{[1,2,3].map(i=><div key={i} className="pp-skeleton" style={{height:40,flex:1}}/>)}</div>
      <div style={{display:"flex",gap:8,justifyContent:"space-between"}}><div className="pp-skeleton" style={{height:40,width:200}}/><div className="pp-skeleton" style={{height:40,width:160}}/></div>
      <div className="pp-skeleton" style={{height:60,width:"100%"}}/>
      <div className="pp-skeleton" style={{height:400,width:"100%"}}/>
    </div>;
    if(tab==="Reporting")return <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8}}>{[1,2,3,4,5].map(i=><div key={i} className="pp-skeleton" style={{height:38,width:140}}/>)}</div>
      <div style={{display:"flex",gap:14}}>{[1,2,3,4].map(i=><div key={i} className="pp-skeleton" style={{height:120,flex:1}}/>)}</div>
      <div className="pp-skeleton" style={{height:280,width:"100%"}}/>
    </div>;
    return <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div className="pp-skeleton" style={{height:80,width:"100%"}}/>
      <div style={{display:"flex",gap:12}}>{[1,2,3,4].map(i=><div key={i} className="pp-skeleton" style={{height:100,flex:1}}/>)}</div>
      <div className="pp-skeleton" style={{height:200,width:"100%"}}/>
    </div>;
  };

  return <ThemeCtx.Provider value={{dark,toggle:toggleDark}}>
  <div className={`pp-shell ${dark?"pp-dark":""}`} style={{minHeight:"100vh",background:C.bg,fontFamily:font,color:C.g700,display:"flex",overflow:"hidden"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    <style>{`
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
      .pp-num{font-family:'DM Sans','Montserrat',sans-serif;font-variant-numeric:tabular-nums}
      .pp-shell td{font-family:'DM Sans','Montserrat',sans-serif;font-variant-numeric:tabular-nums}
      .pp-shell .pp-met{font-variant-numeric:tabular-nums}
      .pp-shell .pp-card [style*="fontWeight"]{font-variant-numeric:tabular-nums}
      html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color-scheme:${dark?"dark":"light"}}

      /* ===== SIDEBAR ===== */
      .pp-sidebar{
        width:${sideOpen?220:64}px;min-height:100vh;background:${C.cardBg};
        border-right:1px solid ${C.cardBorder};display:flex;flex-direction:column;
        position:fixed;top:0;left:0;z-index:101;
        transition:width .25s cubic-bezier(.22,1,.36,1);overflow:hidden;
      }
      .pp-sidebar-head{display:flex;align-items:center;gap:12;padding:0 ${sideOpen?18:0}px;justify-content:${sideOpen?"flex-start":"center"};height:56px;border-bottom:1px solid ${C.g50==="F8FAFB"?C.g100:C.g100};flex-shrink:0}
      .pp-sidebar-toggle{
        position:fixed;left:${sideOpen?208:52}px;top:28px;transform:translateY(-50%);
        width:24px;height:24px;border-radius:12px;background:${C.cardBg};
        border:1px solid ${C.cardBorder};display:flex;align-items:center;justify-content:center;
        cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,${dark?0.2:0.06});z-index:102;transition:all .25s cubic-bezier(.22,1,.36,1);
      }
      .pp-sidebar-toggle:hover{background:${C.g50};border-color:${C.g300}}
      .pp-side-nav{flex:1;padding:12px 8px;display:flex;flex-direction:column;gap:2;overflow-y:auto}
      .pp-side-btn{
        display:flex;align-items:center;gap:${sideOpen?12:0}px;padding:10px ${sideOpen?12:0}px;
        border-radius:${R.sm}px;border:none;background:transparent;
        font-size:13px;font-weight:600;cursor:pointer;font-family:${font};
        color:${C.g500};white-space:nowrap;width:100%;text-align:left;
        transition:all .15s cubic-bezier(.22,1,.36,1);
        ${sideOpen?"":"justify-content:center;"}
        min-height:38px;
      }
      .pp-side-btn:hover{background:${C.g50};color:${C.g700}}
      .pp-side-btn.active{background:${C.blueL};color:${C.blue}}
      .pp-side-label{opacity:${sideOpen?1:0};width:${sideOpen?"auto":"0px"};overflow:hidden;transition:opacity .15s .05s,width .2s;font-size:13px}
      .pp-side-badge{
        margin-left:auto;background:${C.blue};color:#fff;
        font-size:9px;font-weight:800;padding:2px 6px;border-radius:8px;
        opacity:${sideOpen?1:0};transition:opacity .15s;
      }
      .pp-side-user{
        padding:${sideOpen?"16px 18px":"14px 0"};border-top:1px solid ${C.g100};
        display:flex;align-items:center;gap:12px;${sideOpen?"":"justify-content:center;"}
        flex-shrink:0;
      }

      /* ===== TOP BAR ===== */
      .pp-topbar{
        display:flex;align-items:center;justify-content:space-between;
        height:56px;padding:0 24px;background:${C.cardBg};
        border-bottom:1px solid ${C.cardBorder};position:sticky;top:0;z-index:100;
      }
      .pp-content{margin-left:${sideOpen?220:64}px;flex:1;min-width:0;transition:margin-left .25s cubic-bezier(.22,1,.36,1);height:100vh;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
      .pp-search{position:relative}
      .pp-search input{width:180px;border-radius:${R.sm}px;transition:border-color .15s,box-shadow .15s;background:${C.g50};color:${C.g700};border:1px solid ${C.cardBorder}}
      .pp-search input:focus{outline:none;border-color:${C.blue};box-shadow:0 0 0 3px ${C.blue}15}
      .pp-search input::placeholder{color:${C.g400}}
      .pp-shell input::placeholder,.pp-shell textarea::placeholder{color:${C.g400}}
      .pp-shell input,.pp-shell textarea,.pp-shell select{background:${C.g50};color:${C.g700};border-color:${C.cardBorder}}
      .pp-shell input:focus,.pp-shell textarea:focus,.pp-shell select:focus{outline:none;border-color:${C.blue};box-shadow:0 0 0 3px ${C.blue}15}
      .pp-shell option{background:${C.cardBg};color:${C.g700}}
      .pp-main{max-width:1200px;margin:0 auto;padding:24px 28px}
      .pp-notif-panel{width:360px;right:0}

      /* Dark mode toggle */
      .pp-theme-toggle{
        width:36px;height:36px;border-radius:${R.sm}px;
        border:1px solid ${C.cardBorder};background:${C.g50};
        display:flex;align-items:center;justify-content:center;cursor:pointer;
        transition:all .25s;
      }
      .pp-theme-toggle:hover{background:${C.g50};border-color:${C.g300}}

      /* ===== TABLET ===== */
      @media(max-width:1024px){
        .pp-search input{width:140px}
        .pp-main{padding:16px}
        .pp-topbar{padding:0 16px}
      }

      /* ===== MOBILE ===== */
      @media(max-width:768px){
        .pp-sidebar{
          transform:${mobileNav?"translateX(0)":"translateX(-110%)"};
          width:280px !important;
          box-shadow:${mobileNav?`12px 0 60px rgba(0,0,0,${dark?0.5:0.2}), 2px 0 8px rgba(0,0,0,0.05)`:"none"};
          transition:transform .4s cubic-bezier(.32,1.28,.54,1), box-shadow .3s ease !important;
        }
        .pp-sidebar .pp-side-btn{
          opacity:${mobileNav?1:0};
          transform:${mobileNav?"translateX(0)":"translateX(-20px)"};
        }
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(1){transition:opacity .25s .08s,transform .35s .08s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(2){transition:opacity .25s .12s,transform .35s .12s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(3){transition:opacity .25s .16s,transform .35s .16s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(4){transition:opacity .25s .20s,transform .35s .20s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(5){transition:opacity .25s .24s,transform .35s .24s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(6){transition:opacity .25s .28s,transform .35s .28s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-nav .pp-side-btn:nth-child(7){transition:opacity .25s .32s,transform .35s .32s cubic-bezier(.22,1,.36,1),background .15s,color .15s !important}
        .pp-sidebar .pp-side-user{
          opacity:${mobileNav?1:0};
          transform:${mobileNav?"translateY(0)":"translateY(10px)"};
          transition:opacity .3s .3s,transform .4s .3s cubic-bezier(.22,1,.36,1) !important;
        }
        .pp-sidebar .pp-side-refer,.pp-sidebar .pp-side-refer+div{
          opacity:${mobileNav?1:0};
          transform:${mobileNav?"translateY(0)":"translateY(10px)"};
          transition:opacity .3s .25s,transform .4s .25s cubic-bezier(.22,1,.36,1) !important;
        }
        .pp-sidebar-toggle{display:none !important}
        .pp-content{margin-left:0 !important}
        .pp-hamburger{display:flex !important}
        .pp-mobile-overlay{
          display:block !important;
          opacity:${mobileNav?1:0};
          pointer-events:${mobileNav?"auto":"none"};
          backdrop-filter:${mobileNav?"blur(4px)":"blur(0px)"};
          -webkit-backdrop-filter:${mobileNav?"blur(4px)":"blur(0px)"};
          transition:opacity .35s ease, backdrop-filter .35s ease !important;
        }
        .pp-topbar{padding:0 14px}
        .pp-main{padding:12px 10px}
        .pp-page-header{padding:12px 14px !important;gap:8px !important}
        .pp-page-header-left{gap:10px !important}
        .pp-page-logo{width:32px !important;height:32px !important}
        .pp-page-meta>div:first-child{font-size:14px !important}
        .pp-page-header-right{padding-top:0}
        .pp-help-chat{right:12px !important;left:12px !important;width:auto !important;bottom:72px !important}
        .pp-search input{width:120px;font-size:12px !important}
        .pp-notif-panel{position:absolute !important;width:calc(100vw - 24px) !important;right:-12px !important;max-height:70vh;overflow-y:auto}
        .pp-side-label{opacity:1 !important;width:auto !important}
        .pp-side-badge{opacity:1 !important}
        .pp-side-btn{gap:12px !important;padding:10px 12px !important;justify-content:flex-start !important}
        .pp-side-user{padding:14px 16px !important;justify-content:flex-start !important}

        /* Table responsive */
        .pp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -10px;padding:0 10px}
        .pp-table-wrap table{min-width:600px}

        /* All tables in cards should scroll on mobile */
        .pp-card{overflow-x:auto;-webkit-overflow-scrolling:touch}
        .pp-card table{min-width:500px}

        /* Card grid stacking */
        .pp-card{min-width:0 !important}

        /* Sub-tab scrolling */
        .pp-sub-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;position:sticky;top:56px;z-index:10;background:${C.bg};margin:-16px -16px 0;padding:0 16px}
        .pp-sub-tabs::-webkit-scrollbar{display:none}
        .pp-rentals-tabs{position:sticky;top:56px;z-index:10;background:${C.bg};margin:-16px -16px 0;padding:0 16px;justify-content:center}
        .pp-report-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;flex-wrap:nowrap !important;scrollbar-width:none;position:sticky;top:56px;z-index:10;background:${C.bg};margin:-16px -16px 0;padding:0 16px}
        .pp-report-tabs::-webkit-scrollbar{display:none}
        .pp-report-tabs button{white-space:nowrap;flex-shrink:0;padding:10px 12px !important;font-size:11px !important}
        .pp-report-tabs .pp-tab-full{display:none !important}
        .pp-report-tabs .pp-tab-short{display:inline !important}
        .pp-report-controls{flex-direction:column !important;align-items:stretch !important;gap:10px !important}
        .pp-report-range{flex-direction:column !important;gap:6px !important}
        .pp-report-range select{width:100% !important}
        .pp-report-actions{flex-direction:row !important;justify-content:stretch !important}
        .pp-report-actions button{flex:1 !important}

        /* Toast mobile */
        .pp-toast-container{right:12px !important;left:12px !important;bottom:12px !important}

        /* Users toolbar */
        .pp-users-toolbar{flex-direction:column !important;align-items:stretch !important;gap:10px !important}
        .pp-users-filters{flex-direction:column !important;align-items:stretch !important;gap:8px !important}
        .pp-users-filters>div{width:100% !important;max-width:none !important;flex:none !important}
        .pp-users-filters input{width:100% !important;max-width:none !important;box-sizing:border-box !important}
        .pp-users-filters select{width:100% !important}
        .pp-users-filters>span{text-align:center}

        /* Welcome banner */
        .pp-welcome{padding:16px 18px !important}

        /* Approval cards */
        /* Approval cards - now handled by pp-a-* classes */
        .pp-appr-contact{display:none !important}

        /* Theme toggle */
        .pp-theme-toggle{width:32px !important;height:32px !important}

        /* Mobile bottom nav */
        .pp-bottom-nav{display:flex !important}
        .pp-bottom-nav>div{flex-direction:row !important;justify-content:space-around !important;width:100%}
        .pp-create-modal{width:100vw !important;max-width:100vw !important;max-height:100vh !important;height:100vh !important;border-radius:0 !important;top:0 !important;left:0 !important;transform:none !important;z-index:350 !important;overflow-y:auto !important}
        .pp-help-fab{display:none !important}
        .pp-help-chat{display:none !important}
        .pp-content{padding-bottom:64px}
        .pp-toast-container{bottom:72px !important}
      }
      @media(max-width:480px){
        .pp-main{padding:8px 6px}
        .pp-card{border-radius:${R.sm}px !important}
        .pp-welcome{border-radius:${R.sm}px !important}
      }
      @media(min-width:769px){
        .pp-hamburger{display:none !important}
        .pp-mobile-overlay{display:none !important}
      }

      /* ===== KEYFRAMES ===== */
      @keyframes pageEnter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes cardEnter{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes shimmer{from{background-position:-400px 0}to{background-position:400px 0}}
      @keyframes notifSlide{from{opacity:0;transform:translateY(-12px) scale(0.92)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes toastIn{from{opacity:0;transform:translateX(30px) scale(0.9)}to{opacity:1;transform:translateX(0) scale(1)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(0.92)}}
      @keyframes aiDot{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
      @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes bounceIn{0%{opacity:0;transform:scale(0.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(0.95)}100%{transform:scale(1)}}
      @keyframes popIn{0%{opacity:0;transform:scale(0.85)}40%{transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}
      @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 ${C.blue}00}50%{box-shadow:0 0 0 6px ${C.blue}15}}
      @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:0.5}}
      @keyframes metricPop{0%{opacity:0;transform:scale(0.7) translateY(6px)}60%{transform:scale(1.04) translateY(-1px)}100%{opacity:1;transform:scale(1) translateY(0)}}
      @keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}
      .pp-skel{background:linear-gradient(90deg,${C.g100} 25%,${C.g200} 50%,${C.g100} 75%) !important;background-size:400px 100%;animation:shimmer 1.5s infinite ease-in-out}
      @keyframes ppPulse{0%,100%{opacity:1;box-shadow:0 0 0 0 ${C.green}40}50%{opacity:.7;box-shadow:0 0 0 4px ${C.green}00}}
      .pp-pulse-dot{animation:ppPulse 2s ease-in-out infinite}
      @keyframes rowSlideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
      @keyframes badgeBounce{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
      @keyframes checkPop{0%{transform:scale(0) rotate(-45deg);opacity:0}50%{transform:scale(1.2) rotate(0deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
      @keyframes progressFill{from{width:0}to{width:var(--target-w,100%)}}

      .pp-btn-short{display:none}
      .pp-btn-full{display:inline}

      /* ===== LOADING SKELETON ===== */
      .pp-skeleton{background:linear-gradient(90deg,${C.g100} 25%,${C.g50} 50%,${C.g100} 75%);background-size:400px 100%;animation:shimmer 1.5s infinite ease-in-out;border-radius:${R.sm}px}

      /* ===== PAGE TRANSITIONS ===== */
      .pp-page-enter{animation:pageEnter .4s cubic-bezier(.22,1,.36,1) forwards}
      .pp-page-enter>*:nth-child(1){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.02s}
      .pp-page-enter>*:nth-child(2){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.07s}
      .pp-page-enter>*:nth-child(3){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.12s}
      .pp-page-enter>*:nth-child(4){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.17s}
      .pp-page-enter>*:nth-child(5){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.22s}
      .pp-page-enter>*:nth-child(6){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.27s}
      .pp-page-enter>*:nth-child(7){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.32s}
      .pp-page-enter>*:nth-child(8){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.37s}
      .pp-page-enter>*:nth-child(9){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.42s}
      .pp-page-enter>*:nth-child(10){animation:cardEnter .45s cubic-bezier(.22,1,.36,1) both;animation-delay:.47s}

      /* ===== INTERACTIVE CARD POLISH ===== */
      .pp-card{
        transition:transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease, border-color .25s, background .3s !important;
      }
      .pp-card:hover{
        box-shadow:0 6px 24px rgba(0,0,0,${dark?0.18:0.07}), 0 2px 6px rgba(0,0,0,${dark?0.1:0.03}) !important;
        transform:translateY(-2px);
      }
      .pp-card:active{transform:translateY(0) !important;transition-duration:.1s !important}

      /* ===== BUTTON MAGIC ===== */
      button{transition:transform .15s cubic-bezier(.22,1,.36,1), box-shadow .15s, background .15s, color .15s, border-color .15s, opacity .15s, filter .15s !important;white-space:nowrap !important}
      button:hover{filter:brightness(${dark?1.12:1.04})}
      button:active{transform:scale(0.95) !important;transition-duration:.06s !important}

      /* ===== FOCUS RINGS ===== */
      select:focus,input:focus{outline:none;border-color:${C.blue} !important;box-shadow:0 0 0 3px ${C.blue}20 !important;transition:all .2s !important}
      textarea:focus{outline:none;border-color:${C.blue} !important;box-shadow:0 0 0 3px ${C.blue}20 !important}
      input,select,textarea{transition:border-color .2s,box-shadow .2s !important;color:${C.g700};background:${C.g50}}
      table{border-collapse:collapse}

      /* ===== ROW ANIMATIONS ===== */
      tr{transition:background .15s ease, box-shadow .15s !important}
      tbody tr:hover{box-shadow:inset 3px 0 0 ${C.blue}}
      a{transition:color .12s}

      /* ===== NOTIFICATION PANEL ===== */
      .pp-notif-panel{animation:notifSlide .3s cubic-bezier(.34,1.56,.64,1) forwards;transform-origin:top right}

      /* ===== TAB ANIMATIONS ===== */
      .pp-sub-tabs button,.pp-report-tabs button,.pp-rentals-tabs button{
        transition:color .2s, border-color .25s cubic-bezier(.22,1,.36,1), font-weight .1s, background .15s !important;
      }

      /* ===== SIDEBAR ACTIVE GLOW ===== */
      .pp-side-btn.active{position:relative}
      .pp-side-btn.active::before{
        content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
        width:3px;height:20px;border-radius:0 3px 3px 0;background:${C.blue};
        animation:popIn .25s cubic-bezier(.22,1,.36,1) forwards;
      }

      /* ===== BADGE POP ===== */
      .pp-side-badge{animation:badgeBounce .35s cubic-bezier(.22,1,.36,1) forwards}

      /* ===== PENDING BAR GLOW ===== */
      .pp-pending-bar{animation:glowPulse 2.5s ease-in-out infinite}

      /* ===== SLIDE PANELS ===== */
      .slide-panel{animation:slideIn .38s cubic-bezier(.16,1,.3,1) forwards !important}
      .slide-overlay{animation:fadeIn .25s ease forwards}

      /* ===== TOGGLE SWITCHES - elastic snap ===== */
      [style*="borderRadius: 11"]{transition:background .25s cubic-bezier(.22,1,.36,1) !important}
      [style*="borderRadius: 11"]>div{transition:left .3s cubic-bezier(.34,1.56,.64,1), right .3s cubic-bezier(.34,1.56,.64,1) !important}

      /* ===== METRIC NUMBERS ===== */
      .pp-metrics .pp-card{animation:metricPop .5s cubic-bezier(.22,1,.36,1) both}
      .pp-metrics .pp-card:nth-child(1){animation-delay:.05s}
      .pp-metrics .pp-card:nth-child(2){animation-delay:.1s}
      .pp-metrics .pp-card:nth-child(3){animation-delay:.15s}
      .pp-metrics .pp-card:nth-child(4){animation-delay:.2s}
      .pp-metrics .pp-card:nth-child(5){animation-delay:.25s}
      .pp-metrics .pp-card:nth-child(6){animation-delay:.3s}

      .pp-org-stats .pp-card{animation:metricPop .5s cubic-bezier(.22,1,.36,1) both}
      .pp-org-stats .pp-card:nth-child(1){animation-delay:.05s}
      .pp-org-stats .pp-card:nth-child(2){animation-delay:.1s}
      .pp-org-stats .pp-card:nth-child(3){animation-delay:.15s}
      .pp-org-stats .pp-card:nth-child(4){animation-delay:.2s}

      /* ===== UTILIZATION BAR FILL ===== */
      [style*="borderRadius: 3"] > div[style*="height: 100%"]{animation:progressFill .8s cubic-bezier(.22,1,.36,1) forwards}

      /* ===== SMOOTH THEME TRANSITION ===== */
      .pp-shell,.pp-sidebar,.pp-topbar,.pp-card,.pp-main{transition:background .35s cubic-bezier(.22,1,.36,1),border-color .35s,color .3s}

      @media(hover:none){
        .pp-card:hover{transform:none !important;box-shadow:none !important}
        tbody tr:hover{box-shadow:none !important}
      }

      /* ===== GLOBAL MOBILE FOUNDATION ===== */
      @media(max-width:768px){
        table{font-size:12px !important}
        th,td{padding:8px 6px !important;font-size:11px !important}
        .pp-card{padding:14px !important;border-radius:10px !important}
        .pp-card[style*="padding: 0"]{padding:0 !important}
        button{min-height:36px}
        select{min-height:38px;font-size:16px !important}
        input{min-height:38px;box-sizing:border-box;font-size:16px !important}
        input[type="text"],input[type="number"],input[type="date"],input[type="email"],input[type="tel"]{min-height:38px;box-sizing:border-box;font-size:16px !important}
        textarea{font-size:16px !important}
      }
      @media(max-width:768px){
        .pp-main{overflow-x:hidden}
        .pp-main>div{overflow-x:hidden}
        .pp-card{min-width:0 !important}
        [style*="minWidth"]{min-width:0 !important}
        .pp-main [style*="display: flex"][style*="flex-wrap: wrap"],
        .pp-main [style*="display:flex"][style*="flexWrap:wrap"]{flex-direction:column !important}
      }

      /* ===== DASHBOARD MOBILE ===== */
      @media(max-width:768px){
        .pp-welcome{padding:16px 18px !important;border-radius:12px !important}
        .pp-welcome>div:first-child{font-size:16px !important}
        .pp-pending-bar{flex-wrap:wrap !important;gap:8px !important;padding:12px 14px !important}
        .pp-pending-bar button{width:100%}
        .pp-metrics{grid-template-columns:repeat(3,1fr) !important;gap:8px !important}
        .pp-met{padding:10px 10px !important}
        .pp-met .pp-met-top{margin-bottom:4px !important}
        .pp-met .pp-met-badge{font-size:8px !important;padding:1px 5px !important}
        .pp-met div[style*="fontSize:28"]{font-size:20px !important}
        .pp-met .pp-met-bottom{margin-top:4px !important}
        .pp-met .pp-met-bottom div[style*="fontSize:11"]{font-size:9px !important}
        .pp-metrics .pp-card{min-width:0 !important}
        .pp-org-stats{grid-template-columns:1fr 1fr !important;gap:8px !important}
        .pp-org-stats .pp-card{padding:14px 10px !important}
        /* amenity stats - scale down on mobile */
        .pp-amen-summary>div{max-width:100% !important}
        .pp-amen-summary>div>div{padding:10px 12px !important}
        .pp-amen-label{font-size:8px !important}
        .pp-amen-value{font-size:18px !important;margin-top:2px !important}
        .pp-report-filter-bar{grid-template-columns:1fr 1fr !important;gap:8px !important}
        .pp-report-filter-bar select,.pp-report-filter-bar input{width:100% !important;box-sizing:border-box !important}
        .pp-report-stat-row{grid-template-columns:1fr 1fr !important;gap:8px !important}
        .pp-report-stat-row .pp-card{padding:14px 10px !important}
        .pp-btn-full{display:none !important}
        .pp-btn-short{display:inline !important}
        .pp-res-meta{display:none !important}
        .pp-res-header{gap:6px !important}
        .pp-report-results-hdr{flex-direction:column !important;align-items:flex-start !important}
        .pp-ai-active{flex-direction:column !important}
        .pp-ai-stat{width:100% !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:10px 14px !important;flex-direction:row !important}
        .pp-ai-tabs{gap:4px !important}
        .pp-ai-tab-label{font-size:10px !important}
        .pp-ai-tabs button{padding:6px 8px !important}
      }
      }
      @media(min-width:769px) and (max-width:1100px){}
      }

      /* ===== RENTALS - DESKTOP ===== */
      .pp-rentals-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .pp-rentals-tabs::-webkit-scrollbar{display:none}
      .pp-loc-mobile{display:none}
      .pp-loc-desktop{display:block}
      .pp-calendar-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}
      .pp-cal-agenda{display:none}
      .pp-cal-grid{display:block}

      /* ===== RENTALS - MOBILE ===== */
      @media(max-width:768px){
        .pp-cal-grid{display:none !important}
        .pp-cal-agenda{display:block !important}
        .pp-calendar-wrap{overflow-x:visible}
        .pp-r-district{display:none !important}

        .pp-r-row1{flex-wrap:wrap}
        .pp-r-row1 button{font-size:11px !important;padding:8px 12px !important}
        .pp-r-row2{padding:12px 14px !important;gap:8px !important}
        .pp-r-selects{width:100%;gap:6px !important}
        .pp-r-selects select{flex:1;min-width:0 !important;font-size:12px !important;padding:8px 28px 8px 10px !important}
        .pp-r-legend{padding:10px 14px !important;flex-direction:column !important;align-items:center !important;gap:6px !important}
        .pp-r-legend>div{justify-content:center !important}
        .pp-r-pills{flex-shrink:0}
        .pp-r-pills button{flex-shrink:0;font-size:11px !important;padding:6px 10px !important}
        .pp-amen-pills{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:calc(100vw - 48px);scrollbar-width:none}
        .pp-amen-pills::-webkit-scrollbar{display:none}

        .pp-r-toolbar{flex-direction:column !important;align-items:stretch !important;gap:10px !important}
        .pp-r-filters{width:100%;gap:8px !important}
        .pp-r-filters select{width:auto !important}
        .pp-r-search{width:100% !important;max-width:none !important;flex:none !important}
        .pp-r-search input{width:100% !important;box-sizing:border-box !important}

        .pp-loc-desktop{display:none !important}
        .pp-loc-mobile{display:flex !important}

        .pp-appr-contact{display:none !important}
        .pp-appr-bk{flex-direction:column !important;align-items:flex-start !important;gap:4px !important}
        .pp-appr-bk-meta{width:100% !important;justify-content:space-between !important}
        .pp-appr-btns{width:100% !important}
        .pp-appr-btns button{flex:1 !important}
      }

      @media(max-width:768px){
        .pp-pay-filters{flex-direction:column !important;align-items:stretch !important;gap:8px !important}
        .pp-pay-filters>div{width:100% !important}
        .pp-pay-filters input{width:100% !important;box-sizing:border-box}
      }
      .pp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}
      @media(max-width:768px){.pp-table-wrap table{min-width:500px}}
      @media(max-width:640px){[style*="gridTemplateColumns"]{grid-template-columns:1fr 1fr !important}}
      @media(max-width:420px){[style*="gridTemplateColumns"]{grid-template-columns:1fr !important}}
      @media(min-width:641px) and (max-width:768px){[style*="repeat(auto-fill"]{grid-template-columns:repeat(auto-fill,minmax(140px,1fr)) !important}}
      @media(max-width:768px){
        .pp-report-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;white-space:nowrap;flex-wrap:nowrap !important;scrollbar-width:none;position:sticky;top:56px;z-index:10;background:${C.bg};margin:-16px -16px 0;padding:0 10px}
        .pp-report-tabs .pp-tab-full{display:none !important}
        .pp-report-tabs .pp-tab-short{display:inline !important}
        .pp-report-tabs::-webkit-scrollbar{display:none}
        .pp-report-tabs button{flex-shrink:0 !important;white-space:nowrap}
      }
    `}</style>

    <ApprovalPrompt/>
    <ToastContainer toasts={toasts} removeToast={removeToast}/>
    <CmdPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} onNavigate={(t)=>{switchTab(t);setCmdOpen(false)}}/>

    {/* ===== SIDEBAR ===== */}
    <aside className="pp-sidebar">
      <div className="pp-sidebar-head">
        <img src={LOGO} alt="PracticePlan" style={{height:22,flexShrink:0,display:sideOpen?"block":"none",filter:dark?"brightness(1.8)":"none"}}/>
        {!sideOpen&&<img src={FAVICON} alt="" style={{height:24,flexShrink:0,filter:dark?"brightness(1.8)":"none"}}/>}
      </div>
      <div className="pp-side-nav">
        {tabs.map(t=>{
          const ico=I[tabIcons[t]];
          return <button key={t} className={`pp-side-btn ${tab===t?"active":""}`} onClick={()=>{switchTab(t);setMobileNav(false)}}>
            <span style={{flexShrink:0,display:"flex"}}>{ico?.(18,tab===t?C.blue:C.g500)}</span>
            <span className="pp-side-label">{t}</span>
            {t==="Rentals"&&pendingApprovals.length>0&&<span className="pp-side-badge">{pendingApprovals.length}</span>}
          </button>
        })}
      </div>
      {/* Sidebar bottom section */}
      <div style={{marginTop:"auto",flexShrink:0}}>
        {/* Spread the Word */}
        <div className="pp-side-refer" style={{padding:sideOpen?"10px 14px":"10px 0",borderTop:`1px solid ${C.g100}`}}>
          <button onClick={()=>setShowReferral(true)} className="pp-side-btn" style={{background:`${C.green}08`,border:`1px solid ${C.green}20`,borderRadius:R.sm,padding:sideOpen?"10px 12px":"10px 0",display:"flex",alignItems:"center",gap:8,width:"100%",cursor:"pointer",fontFamily:font,justifyContent:sideOpen?"flex-start":"center",transition:"all .15s"}}>
            <span style={{flexShrink:0,display:"flex"}}>{I.mail(16,C.green)}</span>
            <span className="pp-side-label" style={{fontSize:12,fontWeight:700,color:C.green}}>Spread the Word</span>
          </button>
        </div>
        {/* Suggest Feature */}
        <div style={{padding:sideOpen?"4px 14px 10px":"4px 0 10px"}}>
          <button onClick={()=>setShowSuggest(true)} className="pp-side-btn" style={{background:"none",border:"none",padding:sideOpen?"8px 12px":"8px 0",display:"flex",alignItems:"center",gap:8,width:"100%",cursor:"pointer",fontFamily:font,justifyContent:sideOpen?"flex-start":"center"}}>
            <span style={{flexShrink:0,display:"flex"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></span>
            <span className="pp-side-label" style={{fontSize:11,fontWeight:600,color:C.g400}}>Suggest a Feature</span>
          </button>
        </div>
        <div className="pp-side-user">
          <div style={{width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:12,flexShrink:0}}>MW</div>
          {sideOpen&&<div style={{minWidth:0,overflow:"hidden"}}><div style={{fontSize:12,fontWeight:700,color:C.g700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Marcus Williams</div><div style={{fontSize:11,color:C.g400}}>District Admin</div></div>}
        </div>
      </div>
    </aside>
    <div className="pp-sidebar-toggle" onClick={()=>setSideOpen(!sideOpen)}>
      {sideOpen?I.chevL(14,C.g400):I.chevR(14,C.g400)}
    </div>

    {/* Mobile overlay */}
    <div className="pp-mobile-overlay" onClick={()=>setMobileNav(false)} style={{position:"fixed",inset:0,background:`rgba(15,23,42,${mobileNav?0.35:0})`,zIndex:100,display:"none"}}/>

    {/* ===== CONTENT AREA ===== */}
    <div className="pp-content">
      {/* Top bar */}
      <div className="pp-topbar">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button className="pp-hamburger" onClick={()=>setMobileNav(!mobileNav)} style={{background:"none",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .3s cubic-bezier(.22,1,.36,1), background .15s",transform:mobileNav?"rotate(90deg)":"rotate(0deg)",background:mobileNav?C.g100:"transparent"}}>
            {mobileNav?I.x(18,C.g600):I.menu(18,C.g600)}
          </button>
          <div style={{fontSize:15,fontWeight:800,color:C.g800,letterSpacing:"-0.01em"}}>{tab}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div className="pp-search" onClick={()=>setCmdOpen(true)} style={{cursor:"pointer"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}>{I.search(13,C.g400)}</span><input type="text" readOnly placeholder="Search..." style={{padding:"7px 12px 7px 30px",border:`1px solid ${C.cardBorder}`,borderRadius:8,fontSize:12,fontFamily:font,background:C.g50,color:C.g700,cursor:"pointer"}}/><kbd style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",fontSize:9,fontWeight:700,color:C.g400,background:C.g100,padding:"1px 5px",borderRadius:3,border:`1px solid ${C.g200}`,pointerEvents:"none"}}>⌘K</kbd></div>
          {/* Dark mode toggle */}
          <button className="pp-theme-toggle" onClick={toggleDark} title={dark?"Switch to light mode":"Switch to dark mode"}>
            {dark?I.sun(16,C.g500):I.moon(16,C.g500)}
          </button>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowNotifs(!showNotifs)} style={{background:showNotifs?C.blueL:C.cardBg,border:`1px solid ${showNotifs?`${C.blue}20`:C.cardBorder}`,borderRadius:R.sm,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>{I.bell(16,C.g600)}
              {unread>0&&<span style={{position:"absolute",top:-3,right:-3,width:16,height:16,borderRadius:8,background:C.red,color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${C.cardBg}`}}>{unread}</span>}
            </button>
            {showNotifs&&<div className="pp-notif-panel" style={{position:"absolute",top:44,background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,boxShadow:`0 12px 40px rgba(0,0,0,${dark?0.3:0.12}), 0 2px 8px rgba(0,0,0,${dark?0.15:0.04})`,zIndex:150,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,fontWeight:800,color:C.g800}}>Notifications</span><div style={{display:"flex",gap:8,alignItems:"center"}}>{pendingApprovals.length>0&&<span style={{background:C.g800,color:"#fff",padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:800}}>{pendingApprovals.length} pending</span>}<span style={{fontSize:11,color:C.g400}}>{unread} unread</span></div></div>
              <div style={{maxHeight:400,overflow:"auto"}}>
                {notifs.map((n,i)=><div key={i} style={{padding:"12px 18px",borderBottom:`1px solid ${C.g100}`,background:n.read?"transparent":n.type==="approval"?`${C.orange}08`:C.blueL+"60",display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",transition:"background .12s"}} onMouseEnter={e=>{if(n.read)e.currentTarget.style.background=C.g50}} onMouseLeave={e=>{if(n.read)e.currentTarget.style.background="transparent"}} onClick={()=>{
                  setNotifs(ns=>ns.map((x,j)=>j===i?{...x,read:true}:x));
                  if(n.type==="approval"&&n.approvalId){switchTab("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("approvals")},100);setShowNotifs(false)}
                  else if(n.type==="alert"){switchTab("Rentals");setShowNotifs(false)}
                  else if(n.type==="success"&&n.msg.includes("payout")){switchTab("Payments");setShowNotifs(false)}
                }}>
                  <span style={{marginTop:2}}>{n.type==="alert"?I.dot(8,C.red):n.type==="approval"?I.dot(8,C.orange):n.type==="success"?I.dot(8,C.green):I.dot(8,C.blue)}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:n.read?500:600,color:C.g700,lineHeight:1.4}}>{n.msg}</div>
                    <div style={{fontSize:11,color:C.g400,marginTop:3}}>{n.time}</div>
                    {n.type==="approval"&&!n.read&&n.approvalId&&<div style={{display:"flex",gap:6,marginTop:8}}>
                      <button onClick={(e)=>{e.stopPropagation();triggerApproval(n.approvalId);setShowNotifs(false)}} style={{background:C.blue,color:"#fff",border:"none",borderRadius:6,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font}}>Review</button>
                      <button onClick={(e)=>{e.stopPropagation();switchTab("Rentals");setTimeout(()=>{if(globalSetRentalsTab)globalSetRentalsTab("approvals")},100);setShowNotifs(false)}} style={{background:C.cardBg,color:C.blue,border:`1px solid ${C.blue}30`,borderRadius:6,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font}}>View Details</button>
                    </div>}
                  </div>
                  {!n.read&&<span style={{width:8,height:8,borderRadius:4,background:n.type==="approval"?C.orange:C.blue,flexShrink:0,marginTop:5}}/>}
                </div>)}
              </div>
              <div style={{padding:"10px 18px",borderTop:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <button onClick={()=>{setNotifs(ns=>ns.map(n=>({...n,read:true})));if(globalShowToast)globalShowToast({type:"success",title:"All Read",msg:"All notifications marked as read",color:C.green});setShowNotifs(false)}} style={{background:"none",border:"none",color:C.blue,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>Mark all as read</button>
                <button onClick={()=>setShowNotifs(false)} style={{background:"none",border:"none",color:C.g400,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font}}>Dismiss</button>
              </div>
            </div>}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pp-main" onClick={()=>{showNotifs&&setShowNotifs(false)}}>
        <div key={pageKey} className="pp-page-enter">
        <div className="pp-page-header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,padding:"14px 20px",borderRadius:R.lg,background:C.cardBg,border:`1px solid ${C.cardBorder}`,boxShadow:C.cardShadow}}>
          <div className="pp-page-header-left" style={{display:"flex",alignItems:"center",gap:12}}>
            <div className="pp-page-logo" style={{width:36,height:36,borderRadius:10,background:"#1B3A5C",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <img src={DISTRICT_LOGO} alt="" style={{height:22,width:"auto"}}/>
            </div>
            <div className="pp-page-meta">
              <div style={{fontSize:15,fontWeight:800,color:C.g800,letterSpacing:"-0.02em",lineHeight:1.2}}>Ascension Parish School District</div>
              <div style={{fontSize:11,color:C.g400,marginTop:2,fontWeight:500,display:"flex",alignItems:"center",gap:4}}>
                <span style={{cursor:"pointer",transition:"color .12s"}} onClick={()=>switchTab("Dashboard")} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color=C.g400}>Home</span>
                <span style={{color:C.g300}}>›</span>
                <span style={{color:C.g600,fontWeight:600}}>{tab==="Dashboard"?"District Overview":tab==="Rentals"?"Rentals & Scheduling":tab==="Organization"?"District Settings":tab==="Reporting"?"Reports & Analytics":tab==="Users"?"Team Management":"Payments & Billing"}</span>
              </div>
            </div>
          </div>
          <div className="pp-page-header-right" style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:10,color:C.g400,fontWeight:500}}>Feb 2026</span>
            <span style={{width:6,height:6,borderRadius:3,background:C.green}}/>
            <span style={{fontSize:10,color:C.green,fontWeight:700}}>Live</span>
          </div>
        </div>
        {loading?<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{[1,2,3].map(i=><Card key={i}><div className="pp-skel" style={{height:14,borderRadius:4,background:C.g100,width:"60%",marginBottom:10}}/><div className="pp-skel" style={{height:28,borderRadius:6,background:C.g100,width:"40%",marginBottom:8}}/><div className="pp-skel" style={{height:10,borderRadius:4,background:C.g100,width:"50%"}}/></Card>)}</div>
          <Card><div className="pp-skel" style={{height:14,borderRadius:4,background:C.g100,width:"30%",marginBottom:14}}/><div className="pp-skel" style={{height:160,borderRadius:8,background:C.g100}}/></Card>
          <Skeleton rows={4}/>
        </div>:<Page/>}
        </div>
      </main>
    </div>

    {/* ===== REFERRAL MODAL ===== */}
    {showReferral&&<div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.5)",backdropFilter:"blur(6px)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>{setShowReferral(false);setReferralSent(false);setReferralEmail("");setReferralName("")}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.cardBg,borderRadius:16,boxShadow:`0 24px 80px rgba(0,0,0,${dark?0.5:0.2})`,width:"100%",maxWidth:420,overflow:"hidden"}}>
        {!referralSent?<>
          {/* Hero section */}
          <div style={{background:`linear-gradient(135deg, ${C.blue}, ${C.green})`,padding:"28px 28px 24px",position:"relative"}}>
            <button onClick={()=>{setShowReferral(false);setReferralSent(false);setReferralEmail("");setReferralName("")}} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,"#fff")}</button>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",lineHeight:1.3}}>Know someone who could use PracticePlan?</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.85)",marginTop:8,lineHeight:1.5}}>Help a school, church, or city unlock revenue from their unused facilities. We'll reach out on your behalf - they get started free.</div>
          </div>

          {/* Form */}
          <div style={{padding:"24px 28px"}}>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:C.g600,marginBottom:6,display:"block"}}>Their name <span style={{color:C.g400,fontWeight:400}}>(optional)</span></label>
              <input type="text" value={referralName} onChange={e=>setReferralName(e.target.value)} placeholder="e.g. Sarah Johnson" style={{width:"100%",padding:"11px 14px",border:`1px solid ${C.cardBorder}`,borderRadius:10,fontSize:13,fontFamily:font,background:C.bg,color:C.g700,boxSizing:"border-box",outline:"none",transition:"border-color .15s"}} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor=C.cardBorder}/>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:12,fontWeight:600,color:C.g600,marginBottom:6,display:"block"}}>Their email</label>
              <input type="email" value={referralEmail} onChange={e=>setReferralEmail(e.target.value)} placeholder="admin@theirorganization.org" style={{width:"100%",padding:"11px 14px",border:`1px solid ${C.cardBorder}`,borderRadius:10,fontSize:13,fontFamily:font,background:C.bg,color:C.g700,boxSizing:"border-box",outline:"none",transition:"border-color .15s"}} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor=C.cardBorder}/>
            </div>

            {/* Preview */}
            <div style={{padding:"14px 16px",background:C.g50,borderRadius:10,border:`1px solid ${C.g100}`,marginBottom:20}}>
              <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Email preview</div>
              <div style={{fontSize:12,color:C.g600,lineHeight:1.6}}>
                Hi{referralName?` ${referralName.split(" ")[0]}`:""},<br/><br/>
                Marcus Williams at Ascension Parish Schools thought you might be interested in PracticePlan - a free platform that helps organizations earn revenue from their gyms, fields, and facilities.<br/><br/>
                <span style={{color:C.blue,fontWeight:600}}>Get started at practiceplan.com →</span>
              </div>
            </div>

            <button onClick={()=>{if(referralEmail.includes("@")){setReferralSent(true);if(globalShowToast)globalShowToast({type:"success",title:"Sent!",msg:`Invitation sent to ${referralEmail}`,color:C.green})}}} style={{width:"100%",background:`linear-gradient(135deg, ${C.blue}, ${C.green})`,color:"#fff",border:"none",borderRadius:10,padding:"13px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:font,opacity:referralEmail.includes("@")?1:0.4,transition:"opacity .15s"}}>
              Send the Invite
            </button>
          </div>
        </>:<>
          {/* Success state */}
          <div style={{padding:"40px 28px",textAlign:"center"}}>
            <div style={{width:56,height:56,borderRadius:28,background:`linear-gradient(135deg, ${C.blue}15, ${C.green}15)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>{I.check(28,C.green)}</div>
            <div style={{fontSize:18,fontWeight:800,color:C.g800,marginBottom:6}}>You're the best!</div>
            <div style={{fontSize:13,color:C.g500,lineHeight:1.6,maxWidth:280,margin:"0 auto"}}>We just sent {referralName||"them"} an invite at <strong style={{color:C.g700}}>{referralEmail}</strong>. Thanks for helping spread the word.</div>
            <div style={{display:"flex",gap:8,marginTop:24,justifyContent:"center"}}>
              <button onClick={()=>{setReferralSent(false);setReferralEmail("");setReferralName("")}} style={{background:C.g50,color:C.g600,border:`1px solid ${C.cardBorder}`,borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Send Another</button>
              <button onClick={()=>{setShowReferral(false);setReferralSent(false);setReferralEmail("");setReferralName("")}} style={{background:C.blue,color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>Done</button>
            </div>
          </div>
        </>}
      </div>
    </div>}

    {/* ===== SUGGEST FEATURE MODAL ===== */}
    {showSuggest&&<div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.4)",backdropFilter:"blur(4px)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>{setShowSuggest(false);setSuggestText("")}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.cardBg,borderRadius:R.lg,border:`1px solid ${C.cardBorder}`,boxShadow:`0 20px 60px rgba(0,0,0,${dark?0.4:0.15})`,width:"100%",maxWidth:440,overflow:"hidden"}}>
        <div style={{padding:"20px 24px",borderBottom:`1px solid ${C.g100}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:16,fontWeight:800,color:C.g800}}>Suggest a Feature</div>
            <button onClick={()=>{setShowSuggest(false);setSuggestText("")}} style={{background:"none",border:"none",cursor:"pointer",padding:4}}>{I.x(16,C.g400)}</button>
          </div>
          <div style={{fontSize:12,color:C.g500,marginTop:4}}>We'd love to hear your ideas for improving PracticePlan.</div>
        </div>
        <div style={{padding:"20px 24px"}}>
          <label style={{fontSize:11,fontWeight:700,color:C.g500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6,display:"block"}}>Your Suggestion</label>
          <textarea value={suggestText} onChange={e=>setSuggestText(e.target.value)} placeholder="I'd love to see..." rows={4} style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.cardBorder}`,borderRadius:R.sm,fontSize:13,fontFamily:font,background:C.g50,color:C.g700,boxSizing:"border-box",outline:"none",resize:"vertical",lineHeight:1.5}}/>
          <div style={{display:"flex",gap:8,marginTop:16}}>
            <button onClick={()=>{setShowSuggest(false);setSuggestText("")}} style={{...btnO,flex:1,justifyContent:"center",display:"flex",padding:"10px 14px"}}>Cancel</button>
            <button onClick={()=>{setShowSuggest(false);setSuggestText("");if(globalShowToast)globalShowToast({type:"success",title:"Thanks for the feedback!",msg:"Your suggestion has been submitted to the PracticePlan team.",color:C.green})}} style={{flex:1,background:C.blue,color:"#fff",border:"none",borderRadius:R.sm,padding:"10px 16px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font,opacity:suggestText.trim()?1:0.5}}>Submit</button>
          </div>
        </div>
      </div>
    </div>}

    {/* ===== HELP CHAT WIDGET ===== */}
    {helpOpen&&<div className="pp-help-chat" style={{position:"fixed",bottom:80,right:24,width:340,maxHeight:480,background:C.cardBg,borderRadius:16,border:`1px solid ${C.cardBorder}`,boxShadow:`0 16px 48px rgba(0,0,0,${dark?0.35:0.15}), 0 4px 12px rgba(0,0,0,${dark?0.2:0.06})`,zIndex:250,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"14px 18px",background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.mail(14,"#fff")}</div>
          <div><div style={{fontSize:13,fontWeight:700}}>PracticePlan Support</div><div style={{fontSize:10,opacity:0.8}}>Typically replies in minutes</div></div>
        </div>
        <button onClick={()=>setHelpOpen(false)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}>{I.x(16,"#fff")}</button>
      </div>
      <div style={{flex:1,overflow:"auto",padding:14,display:"flex",flexDirection:"column",gap:10,minHeight:200,maxHeight:320}}>
        {helpMessages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.from==="bot"?"flex-start":"flex-end"}}>
          <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.from==="bot"?"4px 14px 14px 14px":"14px 4px 14px 14px",background:m.from==="bot"?C.g50:C.blue,color:m.from==="bot"?C.g700:"#fff",fontSize:12,lineHeight:1.5}}>
            {m.text}
            <div style={{fontSize:9,marginTop:4,opacity:0.6}}>{m.time}</div>
          </div>
        </div>)}
      </div>
      <div style={{padding:"10px 14px",borderTop:`1px solid ${C.g100}`,display:"flex",gap:8}}>
        <input type="text" value={helpMsg} onChange={e=>setHelpMsg(e.target.value)} placeholder="Type a message..." onKeyDown={e=>{if(e.key==="Enter"&&helpMsg.trim()){const newMsg={from:"user",text:helpMsg,time:"Just now"};setHelpMessages(prev=>[...prev,newMsg]);setHelpMsg("");setTimeout(()=>setHelpMessages(prev=>[...prev,{from:"bot",text:"Thanks for reaching out! A support team member will be with you shortly. In the meantime, check our help docs at support.practiceplan.com.",time:"Just now"}]),1200)}}} style={{flex:1,padding:"8px 12px",border:`1px solid ${C.cardBorder}`,borderRadius:20,fontSize:12,fontFamily:font,background:C.g50,color:C.g700,outline:"none",boxSizing:"border-box"}}/>
        <button onClick={()=>{if(helpMsg.trim()){const newMsg={from:"user",text:helpMsg,time:"Just now"};setHelpMessages(prev=>[...prev,newMsg]);setHelpMsg("");setTimeout(()=>setHelpMessages(prev=>[...prev,{from:"bot",text:"Thanks for reaching out! A support team member will be with you shortly. In the meantime, check our help docs at support.practiceplan.com.",time:"Just now"}]),1200)}}} style={{width:34,height:34,borderRadius:17,background:C.blue,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
      </div>
    </div>}
    <button onClick={()=>setHelpOpen(!helpOpen)} style={{position:"fixed",bottom:24,right:24,width:52,height:52,borderRadius:26,background:helpOpen?C.g600:C.blue,color:"#fff",border:"none",boxShadow:`0 4px 16px rgba(0,0,0,${dark?0.3:0.2})`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:250,transition:"all .2s"}} className="pp-help-fab">
      {helpOpen?I.x(22,"#fff"):<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
    </button>

    {/* App-level panels (outside pp-main for mobile z-index) */}
    {appSelCust!==null&&<CustomerPanel cust={topCustData[appSelCust]} onClose={()=>setAppSelCust(null)}/>}
    {appSelFacility!==null&&<FacilityPanel selFacility={appSelFacility} setSelFacility={setAppSelFacility}/>}
    {appSelPay!==null&&(()=>{const p=appSelPay;const fee=(p.rev*0.029).toFixed(2);const platform=(p.rev*0.05).toFixed(2);const net=(p.rev-parseFloat(fee)-parseFloat(platform)).toFixed(2);const close=()=>setAppSelPay(null);return <SlidePanel open={true} onClose={close} width={440}>
      <div style={{padding:"20px 28px",borderBottom:`1px solid ${C.g200}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:C.g800}}>Transaction Details</div>
            <div style={{fontSize:11,color:C.g400,marginTop:3}}>INV-{String(Math.abs(p.rev*1000)).slice(-6).padStart(6,"0")}</div>
          </div>
          <button onClick={close} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.x(14,C.g500)}</button>
        </div>
      </div>
      <div style={{padding:"20px 28px"}}>
        <div style={{display:"flex",gap:0,borderRadius:R.sm,border:`1px solid ${C.g200}`,overflow:"hidden",marginBottom:20}}>
          {[["Status",p.status],["Date",p.date],["Amount","$"+p.rev.toFixed(2)]].map(([l,v],i)=><div key={l} style={{flex:1,padding:"12px 14px",background:C.g50,borderRight:i<2?`1px solid ${C.g200}`:"none"}}>
            <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:13,fontWeight:700,color:l==="Status"?(p.status==="completed"?C.green:p.status==="failed"?C.red:C.amber):C.g800,marginTop:3,textTransform:l==="Status"?"capitalize":"none"}}>{v}</div>
          </div>)}
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Booking Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["Participant",p.user],["Asset",p.asset],["Facility",p.fac],["Duration",p.dur],["Time",p.time],["Bookings",""+p.count]].map(([l,v])=><div key={l}>
              <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
              <div style={{fontSize:12,fontWeight:600,color:C.g700,marginTop:2}}>{v}</div>
            </div>)}
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Revenue Breakdown</div>
          <div style={{borderRadius:R.sm,border:`1px solid ${C.g200}`,overflow:"hidden"}}>
            {[["Rental Fee","$"+p.rev.toFixed(2)],["Processing Fee (2.9%)","-$"+fee],["Platform Fee (5.0%)","-$"+platform]].map(([l,v],i)=><div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderBottom:i<2?`1px solid ${C.g100}`:"none",background:C.cardBg}}>
              <span style={{fontSize:12,color:C.g600}}>{l}</span>
              <span style={{fontSize:12,fontWeight:600,color:v.startsWith("-")?C.g500:C.g800}}>{v}</span>
            </div>)}
            <div style={{display:"flex",justifyContent:"space-between",padding:"12px 14px",background:C.g50,borderTop:`1px solid ${C.g200}`}}>
              <span style={{fontSize:13,fontWeight:700,color:C.g800}}>Net to District</span>
              <span style={{fontSize:14,fontWeight:800,color:C.green}}>${net}</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{if(globalShowToast)globalShowToast({type:"success",title:"Receipt Sent",msg:`Receipt emailed to ${p.user}`,color:C.green});close()}} style={{flex:1,padding:"10px",borderRadius:R.sm,border:`1px solid ${C.cardBorder}`,background:C.cardBg,color:C.g600,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:font}}>Email Receipt</button>
          {p.status==="completed"&&<button onClick={()=>{if(globalShowToast)globalShowToast({type:"info",title:"Refund Initiated",msg:`$${p.rev.toFixed(2)} refund processing for ${p.user}`,color:C.orange});close()}} style={{flex:1,padding:"10px",borderRadius:R.sm,border:`1px solid ${C.red}30`,background:C.cardBg,color:C.red,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:font}}>Issue Refund</button>}
          {p.status==="failed"&&<button onClick={()=>{if(globalShowToast)globalShowToast({type:"info",title:"Retry Sent",msg:`Payment retry initiated for ${p.user}`,color:C.blue});close()}} style={{flex:1,padding:"10px",borderRadius:R.sm,border:"none",background:C.blue,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:font}}>Retry Payment</button>}
        </div>
      </div>
    </SlidePanel>})()}
    <CreateResModal open={showCreateRes} onClose={()=>setShowCreateRes(false)}/>

    {/* Mobile bottom nav */}
    <nav className="pp-bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:C.cardBg,borderTop:`1px solid ${C.cardBorder}`,display:"none",zIndex:200,padding:"6px 0 env(safe-area-inset-bottom, 8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        {[["Dashboard",I.home],["Rentals",I.key],["Organization",I.building],["Reporting",I.chart],["Users",I.user],["Promote",I.megaphone]].map(([t,icon])=>{
          const active=tab===t;
          return <button key={t} onClick={()=>{switchTab(t);setMobileNav(false)}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",fontFamily:font,padding:"6px 8px",minWidth:0,flex:1,position:"relative"}}>
            {active&&<div style={{position:"absolute",top:-1,width:24,height:3,borderRadius:2,background:C.blue}}/>}
            <span style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:8,background:active?C.blueL:"transparent",transition:"background .15s"}}>{icon(18,active?C.blue:C.g400)}</span>
            <span style={{fontSize:9,fontWeight:active?700:500,color:active?C.blue:C.g400,letterSpacing:"-0.01em"}}>{t==="Dashboard"?"Home":t==="Organization"?"Org":t==="Reporting"?"Reports":t}</span>
          </button>
        })}
      </div>
    </nav>

  </div>
  </ThemeCtx.Provider>
}
